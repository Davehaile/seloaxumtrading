import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Building, Send, Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { pdf } from "@react-pdf/renderer";
import CompanyProfilePDF from "./CompanyProfilePDF";

const LOGO_URL = `${window.location.origin}/seloaxum-logo.png`;

const API_URL = "/api/contact.php";
const MIN_SUBMIT_INTERVAL = 5000; // 5 seconds between submissions (client-side UX)

const DOWNLOAD_LABEL: Record<string, string> = {
  en: "Download Company Profile",
  ar: "تنزيل الملف التعريفي",
  zh: "下载公司简介",
};

const ERROR_MESSAGES: Record<string, Record<string, string>> = {
  en: {
    RATE_LIMIT_EXCEEDED: "Too many requests. Please wait before submitting again.",
    VALIDATION_ERROR: "Please check your input and try again.",
    INVALID_JSON: "Invalid request format.",
    EMAIL_SEND_FAILED: "Failed to send your message. Please try again later.",
    INTERNAL_ERROR: "An unexpected error occurred. Please try again later.",
    NETWORK_ERROR: "Network error. Please check your connection.",
    name: "Name is required",
    email: "Please enter a valid email",
    company: "Company name is required",
    country: "Country is required",
    message: "Message is required",
  },
  ar: {
    RATE_LIMIT_EXCEEDED: "عدد كبير جداً من الطلبات. يرجى الانتظار قبل المحاولة مرة أخرى.",
    VALIDATION_ERROR: "يرجى التحقق من إدخالاتك والمحاولة مرة أخرى.",
    INVALID_JSON: "صيغة الطلب غير صحيحة.",
    EMAIL_SEND_FAILED: "فشل في إرسال رسالتك. يرجى المحاولة لاحقاً.",
    INTERNAL_ERROR: "حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.",
    NETWORK_ERROR: "خطأ في الشبكة. يرجى التحقق من الاتصال.",
    name: "الاسم مطلوب",
    email: "يرجى إدخال بريد إلكتروني صحيح",
    company: "اسم الشركة مطلوب",
    country: "البلد مطلوب",
    message: "الرسالة مطلوبة",
  },
  zh: {
    RATE_LIMIT_EXCEEDED: "请求过于频繁。请稍后再试。",
    VALIDATION_ERROR: "请检查您的输入并重试。",
    INVALID_JSON: "无效的请求格式。",
    EMAIL_SEND_FAILED: "发送失败。请稍后重试。",
    INTERNAL_ERROR: "发生意外错误。请稍后重试。",
    NETWORK_ERROR: "网络错误。请检查您的连接。",
    name: "名称是必需的",
    email: "请输入有效的电子邮件",
    company: "公司名称是必需的",
    country: "国家是必需的",
    message: "消息是必需的",
  },
};

interface FieldErrors {
  [key: string]: string;
}

export default function ContactSection() {
  const { t, isRTL, lang } = useLanguage();
  const ct = t.contact;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [rateLimitTimeLeft, setRateLimitTimeLeft] = useState<number>(0);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const blob = await pdf(<CompanyProfilePDF logoUrl={LOGO_URL} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Seloaxum-Trading-PLC-Company-Profile.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast({
        title: lang === "ar" ? "خطأ" : lang === "zh" ? "错误" : "Error",
        description: lang === "ar" ? "فشل في إنشاء PDF" : lang === "zh" ? "PDF生成失败" : "Failed to generate PDF",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getErrorMessage = (errorCode: string, fieldName?: string): string => {
    const langErrors = ERROR_MESSAGES[lang] || ERROR_MESSAGES.en;
    
    if (fieldName && langErrors[fieldName]) {
      return langErrors[fieldName];
    }
    
    return langErrors[errorCode] || langErrors.INTERNAL_ERROR;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Client-side rate limiting (UX improvement)
    const now = Date.now();
    if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
      const secondsLeft = Math.ceil((MIN_SUBMIT_INTERVAL - (now - lastSubmitTime)) / 1000);
      setRateLimitTimeLeft(secondsLeft);
      toast({
        title: lang === "ar" ? "يرجى الانتظار" : lang === "zh" ? "请稍候" : "Please wait",
        description: getErrorMessage("RATE_LIMIT_EXCEEDED"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    const form = e.target as HTMLFormElement;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      country: (form.elements.namedItem("country") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // Handle rate limiting (429)
      if (res.status === 429) {
        toast({
          title: lang === "ar" ? "حد معدل الطلب" : lang === "zh" ? "请求过于频繁" : "Rate Limited",
          description: getErrorMessage("RATE_LIMIT_EXCEEDED"),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Handle validation errors (422)
      if (res.status === 422 && data.errors) {
        setFieldErrors(data.errors);
        toast({
          title: lang === "ar" ? "خطأ في التحقق" : lang === "zh" ? "验证错误" : "Validation Error",
          description: getErrorMessage("VALIDATION_ERROR"),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Handle other errors
      if (!res.ok) {
        const errorCode = data.code || "INTERNAL_ERROR";
        toast({
          title: lang === "ar" ? "خطأ" : lang === "zh" ? "提交失败" : "Submission failed",
          description: getErrorMessage(errorCode),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Success
      if (data.status === "mail_sent") {
        toast({
          title: ct.toastTitle,
          description: ct.toastDesc,
        });
        form.reset();
        setLastSubmitTime(now);
        setFieldErrors({});
      } else {
        throw new Error(data.error || "Submission failed");
      }

    } catch (err) {
      const msg = err instanceof Error ? err.message : getErrorMessage("NETWORK_ERROR");
      toast({
        title: lang === "ar" ? "خطأ" : lang === "zh" ? "提交失败" : "Submission failed",
        description: msg,
        variant: "destructive",
      });
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-muted/30 relative" data-testid="section-contact">
      <div className="container mx-auto px-4 md:px-6">

        <div className={`text-center max-w-2xl mx-auto mb-16 space-y-4 ${isRTL ? "text-right" : ""}`}>
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm">{ct.sectionLabel}</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">{ct.heading}</h3>
          <p className="text-lg text-muted-foreground">{ct.subheading}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start max-w-6xl mx-auto">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className={`bg-card p-8 rounded-3xl border border-border shadow-sm ${isRTL ? "text-right" : ""}`}>
              <h4 className="text-2xl font-serif font-bold mb-6 text-foreground">{ct.hqName}</h4>

              <div className="space-y-6">
                <div className={`flex gap-4 items-start ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-foreground uppercase tracking-wider mb-1">{ct.hqLabel}</h5>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{ct.hqAddress}</p>
                  </div>
                </div>

                <div className={`flex gap-4 items-start ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-foreground uppercase tracking-wider mb-1">{ct.phoneLabel}</h5>
                    <p className="text-muted-foreground text-lg" dir="ltr">+251 911 54 70 49</p>
                  </div>
                </div>

                <div className={`flex gap-4 items-start ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-foreground uppercase tracking-wider mb-1">{ct.globalPresenceLabel}</h5>
                    <p className="text-muted-foreground">{ct.globalPresenceValue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* PDF Download Button */}
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className={`w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border-2 border-primary text-primary font-semibold text-sm transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed`}
              data-testid="button-download-profile"
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{isGeneratingPDF ? "..." : DOWNLOAD_LABEL[lang]}</span>
            </button>
          </motion.div>

          {/* B2B Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-3 bg-card p-8 md:p-10 rounded-3xl border border-border shadow-lg ${isRTL ? "text-right" : ""}`}
          >
            <h4 className="text-2xl font-serif font-bold mb-6 text-foreground">{ct.formTitle}</h4>
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">

              {/* Validation errors alert */}
              {Object.keys(fieldErrors).length > 0 && (
                <div className={`flex gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div className={isRTL ? "text-right" : ""}>
                    <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                      {lang === "ar" ? "يوجد أخطاء في النموذج:" : lang === "zh" ? "表单有错误:" : "Form has errors:"}
                    </p>
                    <ul className="text-sm text-red-600 dark:text-red-400 mt-2 space-y-1">
                      {Object.entries(fieldErrors).map(([field, error]) => (
                        <li key={field}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className={fieldErrors.name ? "text-red-600" : ""}>{ct.nameLabel}</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder={ct.namePlaceholder}
                    className={`bg-background h-12 ${fieldErrors.name ? "border-red-500 focus:border-red-500" : ""}`}
                    data-testid="input-name"
                    dir={isRTL ? "rtl" : "ltr"}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className={fieldErrors.company ? "text-red-600" : ""}>{ct.companyLabel}</Label>
                  <Input
                    id="company"
                    name="company"
                    required
                    placeholder={ct.companyPlaceholder}
                    className={`bg-background h-12 ${fieldErrors.company ? "border-red-500 focus:border-red-500" : ""}`}
                    data-testid="input-company"
                    dir={isRTL ? "rtl" : "ltr"}
                    aria-invalid={!!fieldErrors.company}
                    aria-describedby={fieldErrors.company ? "company-error" : undefined}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className={fieldErrors.email ? "text-red-600" : ""}>{ct.emailLabel}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={ct.emailPlaceholder}
                    className={`bg-background h-12 ${fieldErrors.email ? "border-red-500 focus:border-red-500" : ""}`}
                    data-testid="input-email"
                    dir="ltr"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className={fieldErrors.country ? "text-red-600" : ""}>{ct.countryLabel}</Label>
                  <Input
                    id="country"
                    name="country"
                    required
                    placeholder={ct.countryPlaceholder}
                    className={`bg-background h-12 ${fieldErrors.country ? "border-red-500 focus:border-red-500" : ""}`}
                    data-testid="input-country"
                    dir={isRTL ? "rtl" : "ltr"}
                    aria-invalid={!!fieldErrors.country}
                    aria-describedby={fieldErrors.country ? "country-error" : undefined}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className={fieldErrors.message ? "text-red-600" : ""}>{ct.messageLabel}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder={ct.messagePlaceholder}
                  className={`bg-background min-h-[120px] resize-y ${fieldErrors.message ? "border-red-500 focus:border-red-500" : ""}`}
                  data-testid="input-message"
                  dir={isRTL ? "rtl" : "ltr"}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                disabled={isSubmitting || rateLimitTimeLeft > 0}
                data-testid="button-submit-contact"
              >
                {isSubmitting ? (
                  ct.submitting
                ) : rateLimitTimeLeft > 0 ? (
                  `${lang === "ar" ? "الرجاء الانتظار" : lang === "zh" ? "请稍候" : "Wait"} ${rateLimitTimeLeft}s`
                ) : (
                  <span className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                    {ct.submit} <Send className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
