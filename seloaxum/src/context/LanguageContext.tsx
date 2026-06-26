import { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "ar" | "zh";

export interface Translations {
  nav: {
    home: string;
    about: string;
    operations: string;
    valueAddition: string;
    contact: string;
    partnerCTA: string;
  };
  hero: {
    badge: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  about: {
    sectionLabel: string;
    heading1: string;
    heading2: string;
    body: string;
    globalReachTitle: string;
    globalReachBody: string;
    strategicShiftTitle: string;
    strategicShiftBody: string;
    premiumQualityTitle: string;
    premiumQualityBody: string;
    teamLabel: string;
    teamSubLabel: string;
    roleAbel: string;
    roleSolomon: string;
    roleDawit: string;
  };
  operations: {
    sectionLabel: string;
    heading: string;
    subheading: string;
    items: { title: string; description: string }[];
  };
  impact: {
    badge: string;
    heading: string;
    body: string;
    jobsLabel: string;
    jobsDesc: string;
    quote: string;
  };
  contact: {
    sectionLabel: string;
    heading: string;
    subheading: string;
    hqLabel: string;
    hqAddress: string;
    phoneLabel: string;
    globalPresenceLabel: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    countryLabel: string;
    countryPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    toastTitle: string;
    toastDesc: string;
    hqName: string;
    globalPresenceValue: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
  };
}

const translations: Record<Lang, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      operations: "Our Operations",
      valueAddition: "Value Addition",
      contact: "Contact",
      partnerCTA: "Partner With Us",
    },
    hero: {
      badge: "Premium Value-Added Exports",
      headline: "Seloaxum: Ethiopian Coffee",
      headlineAccent: "Heritage",
      subheadline:
        "Transforming agricultural excellence from raw supply into world-class, premium value-added coffee products.",
      ctaPrimary: "Partner With Us",
      ctaSecondary: "Explore Operations",
      scroll: "Scroll",
    },
    about: {
      sectionLabel: "About Us",
      heading1: "8 Years of",
      heading2: "Trusted Experience.",
      body: "Seloaxum Trading PLC is an 8-year-veteran Ethiopian coffee exporter with global footprints in Dubai, Sudan, Saudi Arabia, and China. We are evolving from a raw commodity supplier into a premium value-added product exporter.",
      globalReachTitle: "Global Reach",
      globalReachBody: "Exporting to key hubs: Dubai, Sudan, Saudi Arabia, and China.",
      strategicShiftTitle: "Strategic Shift",
      strategicShiftBody: "Transitioning from raw commodity to premium value-added coffee products.",
      premiumQualityTitle: "Premium Quality",
      premiumQualityBody: "World-class sorting and roasting standards.",
      teamLabel: "Meet Our Leadership",
      teamSubLabel: "The experienced team driving Seloaxum's mission forward.",
      roleAbel: "Legal Affairs Directorate",
      roleSolomon: "Chief Executive Officer",
      roleDawit: "International Trade & Product Manager",
    },
    operations: {
      sectionLabel: "Our Operations",
      heading: "Value Addition at Scale",
      subheading:
        "From the highland farms to global markets, every step of our process is engineered for premium quality.",
      items: [
        {
          title: "Modern Coffee Cleaning & Hulling",
          description:
            "State-of-the-art facilities ensuring absolute purity and preparation of the raw coffee cherry.",
        },
        {
          title: "Roasting & Flavor Profile Engineering",
          description:
            "Precision roasting tailored to highlight the unique Ethiopian heritage flavor notes.",
        },
        {
          title: "Premium Branding & Packaging",
          description:
            "World-class presentation that preserves freshness while conveying our rich history.",
        },
        {
          title: "Modern Logistics & Quality Warehousing",
          description:
            "Secure, climate-controlled environments and efficient global distribution networks.",
        },
      ],
    },
    impact: {
      badge: "Industrial Transition",
      heading: "Economic & Social Impact",
      body: "We are deeply committed to Ethiopia's industrial transition. By moving from raw export to value addition, we create sustainable growth.",
      jobsLabel: "Jobs Created",
      jobsDesc:
        "Our operations provide stable, permanent, and temporary employment opportunities specifically targeted at empowering urban youth in our communities.",
      quote:
        "Building a legacy of quality that enriches both the cup and the community.",
    },
    contact: {
      sectionLabel: "Partner With Us",
      heading: "Global Corporate Footprint",
      subheading:
        "Connect with our team to discuss premium coffee supply, value-added products, and international trade partnerships.",
      hqLabel: "Headquarters",
      hqName: "Seloaxum Trading PLC",
      hqAddress: "Denberwa\nAddis Abeba, Ethiopia",
      phoneLabel: "Phone",
      globalPresenceLabel: "Global Presence",
      globalPresenceValue: "Dubai • Sudan • Saudi Arabia • China",
      formTitle: "B2B Inquiry",
      nameLabel: "Full Name",
      namePlaceholder: "John Doe",
      companyLabel: "Company",
      companyPlaceholder: "Acme Imports Ltd.",
      emailLabel: "Work Email",
      emailPlaceholder: "john@example.com",
      countryLabel: "Country",
      countryPlaceholder: "United Arab Emirates",
      messageLabel: "Message / Inquiry Details",
      messagePlaceholder:
        "Please describe your requirements, volume needs, or partnership proposal...",
      submit: "Send Inquiry",
      submitting: "Sending Inquiry...",
      toastTitle: "Inquiry Sent",
      toastDesc: "Thank you for reaching out. Our team will contact you shortly.",
    },
    footer: {
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      operations: "عملياتنا",
      valueAddition: "إضافة القيمة",
      contact: "اتصل بنا",
      partnerCTA: "شاركنا",
    },
    hero: {
      badge: "صادرات متميزة ذات قيمة مضافة",
      headline: "سيلوأكسوم: إرث القهوة الإثيوبية",
      headlineAccent: "الإرث",
      subheadline:
        "تحويل التميز الزراعي من المواد الخام إلى منتجات قهوة عالمية المستوى ذات قيمة مضافة.",
      ctaPrimary: "شاركنا",
      ctaSecondary: "استكشف عملياتنا",
      scroll: "مرر للأسفل",
    },
    about: {
      sectionLabel: "من نحن",
      heading1: "٨ سنوات من",
      heading2: "الخبرة الموثوقة.",
      body: "شركة سيلوأكسوم للتجارة هي مصدّر إثيوبي للقهوة بخبرة ٨ سنوات مع حضور عالمي في دبي والسودان والمملكة العربية السعودية والصين. نحن نتطور من مورد سلع خام إلى مصدّر منتجات متميزة ذات قيمة مضافة.",
      globalReachTitle: "وصول عالمي",
      globalReachBody: "تصدير إلى مراكز رئيسية: دبي، السودان، المملكة العربية السعودية، والصين.",
      strategicShiftTitle: "تحول استراتيجي",
      strategicShiftBody: "الانتقال من السلع الخام إلى منتجات القهوة المتميزة ذات القيمة المضافة.",
      premiumQualityTitle: "جودة متميزة",
      premiumQualityBody: "معايير عالمية في الفرز والتحميص.",
      teamLabel: "تعرف على قيادتنا",
      teamSubLabel: "الفريق المتمرس الذي يدفع مهمة سيلوأكسوم إلى الأمام.",
      roleAbel: "مديرية الشؤون القانونية",
      roleSolomon: "الرئيس التنفيذي",
      roleDawit: "مدير التجارة الدولية والمنتجات",
    },
    operations: {
      sectionLabel: "عملياتنا",
      heading: "إضافة القيمة على نطاق واسع",
      subheading:
        "من مزارع المرتفعات إلى الأسواق العالمية، كل خطوة في عمليتنا مصممة لتحقيق الجودة المتميزة.",
      items: [
        {
          title: "تنظيف القهوة الحديثة وإزالة القشر",
          description:
            "منشآت متطورة تضمن نقاءً مطلقاً وتحضيراً دقيقاً لحبات القهوة الخام.",
        },
        {
          title: "هندسة التحميص وتطوير النكهة",
          description:
            "تحميص دقيق مصمم لإبراز النكهات الإثيوبية الفريدة الأصيلة.",
        },
        {
          title: "العلامة التجارية والتغليف المتميز",
          description:
            "تقديم عالمي المستوى يحافظ على النضارة ويعكس تاريخنا الغني.",
        },
        {
          title: "اللوجستيات الحديثة والتخزين الجيد",
          description:
            "بيئات آمنة ومتحكم بدرجة حرارتها وشبكات توزيع عالمية فعّالة.",
        },
      ],
    },
    impact: {
      badge: "التحول الصناعي",
      heading: "الأثر الاقتصادي والاجتماعي",
      body: "نحن ملتزمون بعمق بالتحول الصناعي في إثيوبيا. من خلال الانتقال من التصدير الخام إلى إضافة القيمة، نخلق نمواً مستداماً.",
      jobsLabel: "وظيفة مُوجَدة",
      jobsDesc:
        "توفر عملياتنا فرص عمل مستقرة ودائمة ومؤقتة تستهدف تحديداً تمكين الشباب الحضري في مجتمعاتنا.",
      quote: "نبني إرثاً من الجودة يُثري كلاً من الكوب والمجتمع.",
    },
    contact: {
      sectionLabel: "شاركنا",
      heading: "حضور مؤسسي عالمي",
      subheading:
        "تواصل مع فريقنا لمناقشة إمدادات القهوة المتميزة والمنتجات ذات القيمة المضافة وشراكات التجارة الدولية.",
      hqLabel: "المقر الرئيسي",
      hqName: "شركة سيلوأكسوم للتجارة",
      hqAddress: "دنبروا\nأديس أبابا، إثيوبيا",
      phoneLabel: "الهاتف",
      globalPresenceLabel: "الحضور العالمي",
      globalPresenceValue: "دبي • السودان • المملكة العربية السعودية • الصين",
      formTitle: "استفسار تجاري",
      nameLabel: "الاسم الكامل",
      namePlaceholder: "محمد أحمد",
      companyLabel: "الشركة",
      companyPlaceholder: "شركة الاستيراد المحدودة",
      emailLabel: "البريد الإلكتروني للعمل",
      emailPlaceholder: "ahmed@example.com",
      countryLabel: "الدولة",
      countryPlaceholder: "الإمارات العربية المتحدة",
      messageLabel: "الرسالة / تفاصيل الاستفسار",
      messagePlaceholder:
        "يرجى وصف متطلباتكم وكميات الطلب أو مقترح الشراكة...",
      submit: "إرسال الاستفسار",
      submitting: "جاري الإرسال...",
      toastTitle: "تم إرسال الاستفسار",
      toastDesc: "شكراً لتواصلكم. سيتصل بكم فريقنا قريباً.",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
    },
  },

  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      operations: "业务运营",
      valueAddition: "增值服务",
      contact: "联系我们",
      partnerCTA: "合作共赢",
    },
    hero: {
      badge: "优质增值出口",
      headline: "锡洛阿克苏姆：埃塞俄比亚咖啡",
      headlineAccent: "文化遗产",
      subheadline:
        "将卓越农业从原料转变为世界级优质增值咖啡产品。",
      ctaPrimary: "合作共赢",
      ctaSecondary: "探索业务",
      scroll: "向下滚动",
    },
    about: {
      sectionLabel: "关于我们",
      heading1: "8年",
      heading2: "值得信赖的经验。",
      body: "锡洛阿克苏姆贸易公司是一家拥有8年经验的埃塞俄比亚咖啡出口商，业务遍及迪拜、苏丹、沙特阿拉伯和中国。我们正从原料供应商转型为优质增值产品出口商。",
      globalReachTitle: "全球覆盖",
      globalReachBody: "出口至主要枢纽：迪拜、苏丹、沙特阿拉伯和中国。",
      strategicShiftTitle: "战略转型",
      strategicShiftBody: "从原料商品转型为优质增值咖啡产品。",
      premiumQualityTitle: "卓越品质",
      premiumQualityBody: "世界级分拣和烘焙标准。",
      teamLabel: "认识我们的领导团队",
      teamSubLabel: "推动Seloaxum使命前行的经验丰富团队。",
      roleAbel: "法律事务主任",
      roleSolomon: "首席执行官",
      roleDawit: "国际贸易与产品经理",
    },
    operations: {
      sectionLabel: "我们的业务",
      heading: "规模化增值",
      subheading:
        "从高原农场到全球市场，我们流程的每一步都为优质品质精心设计。",
      items: [
        {
          title: "现代咖啡清洗与脱壳",
          description:
            "先进设施确保原咖啡豆的绝对纯净与精准处理。",
        },
        {
          title: "烘焙与风味工程",
          description:
            "精准烘焙，彰显独特的埃塞俄比亚风味特色。",
        },
        {
          title: "优质品牌与包装",
          description:
            "世界级呈现，保持新鲜度并传递我们丰富的历史文化。",
        },
        {
          title: "现代物流与优质仓储",
          description:
            "安全的温控环境和高效的全球配送网络。",
        },
      ],
    },
    impact: {
      badge: "工业转型",
      heading: "经济与社会影响",
      body: "我们深度致力于埃塞俄比亚的工业转型。通过从原料出口到增值的转变，我们创造可持续增长。",
      jobsLabel: "创造就业",
      jobsDesc:
        "我们的业务为城市青年提供稳定、永久及临时就业机会，赋能当地社区。",
      quote: "打造一个既丰富杯中之物，也造福社区的传世品质。",
    },
    contact: {
      sectionLabel: "合作共赢",
      heading: "全球企业足迹",
      subheading:
        "联系我们的团队，探讨优质咖啡供应、增值产品及国际贸易合作。",
      hqLabel: "总部",
      hqName: "锡洛阿克苏姆贸易公司",
      hqAddress: "邓贝尔瓦\n亚的斯亚贝巴，埃塞俄比亚",
      phoneLabel: "电话",
      globalPresenceLabel: "全球布局",
      globalPresenceValue: "迪拜 • 苏丹 • 沙特阿拉伯 • 中国",
      formTitle: "B2B询盘",
      nameLabel: "姓名",
      namePlaceholder: "张伟",
      companyLabel: "公司",
      companyPlaceholder: "XX进口有限公司",
      emailLabel: "工作邮箱",
      emailPlaceholder: "zhang@example.com",
      countryLabel: "国家",
      countryPlaceholder: "中国",
      messageLabel: "留言 / 询盘详情",
      messagePlaceholder:
        "请描述您的需求、采购量或合作提案...",
      submit: "发送询盘",
      submitting: "发送中...",
      toastTitle: "询盘已发送",
      toastDesc: "感谢您的联系。我们的团队将尽快与您联系。",
    },
    footer: {
      rights: "版权所有。",
      privacy: "隐私政策",
      terms: "服务条款",
    },
  },
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("seloaxum-lang", newLang);
  };

  useEffect(() => {
    const saved = localStorage.getItem("seloaxum-lang") as Lang | null;
    if (saved && ["en", "ar", "zh"].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    const isRTL = lang === "ar";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const isRTL = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
