import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Building, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { pdf } from "@react-pdf/renderer";
import CompanyProfilePDF from "./CompanyProfilePDF";

const LOGO_URL = `${window.location.origin}/seloaxum-logo.png`;

const API_BASE = import.meta.env.VITE_API_URL ?? "";

const DOWNLOAD_LABEL: Record<string, string> = {
  en: "Download Company Profile",
  ar: "تنزيل الملف التعريفي",
  zh: "下载公司简介",
};

export default function ContactSection() {
  const { t, isRTL, lang } = useLanguage();
  const ct = t.contact;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      country: (form.elements.namedItem("country") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Server error");
      }

      toast({ title: ct.toastTitle, description: ct.toastDesc });
      form.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast({
        title: lang === "ar" ? "خطأ" : lang === "zh" ? "提交失败" : "Submission failed",
        description: msg,
        variant: "destructive",
      });
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
              className={`w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border-2 border-primary text-primary font-semibold text-sm transition-all hover:bg-primary hover:text-primary-foreground group disabled:opacity-60 disabled:cursor-not-allowed ${isRTL ? "flex-row-reverse" : ""}`}
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

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{ct.nameLabel}</Label>
                  <Input id="name" name="name" required placeholder={ct.namePlaceholder} className="bg-background h-12" data-testid="input-name" dir={isRTL ? "rtl" : "ltr"} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{ct.companyLabel}</Label>
                  <Input id="company" name="company" required placeholder={ct.companyPlaceholder} className="bg-background h-12" data-testid="input-company" dir={isRTL ? "rtl" : "ltr"} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{ct.emailLabel}</Label>
                  <Input id="email" name="email" type="email" required placeholder={ct.emailPlaceholder} className="bg-background h-12" data-testid="input-email" dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">{ct.countryLabel}</Label>
                  <Input id="country" name="country" required placeholder={ct.countryPlaceholder} className="bg-background h-12" data-testid="input-country" dir={isRTL ? "rtl" : "ltr"} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{ct.messageLabel}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder={ct.messagePlaceholder}
                  className="bg-background min-h-[120px] resize-y"
                  data-testid="input-message"
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                disabled={isSubmitting}
                data-testid="button-submit-contact"
              >
                {isSubmitting ? ct.submitting : (
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
