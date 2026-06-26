import { useLanguage } from "@/context/LanguageContext";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-white/10" data-testid="footer">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 ${isRTL ? "md:flex-row-reverse" : ""}`}>

          <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
            <img
              src={`${base}/seloaxum-logo.png`}
              alt="Seloaxum Logo"
              className="h-10 w-auto rounded-sm mix-blend-screen opacity-90"
            />
            <span className="font-serif font-bold text-xl text-white">Seloaxum Trading PLC</span>
          </div>

          <div className={`text-white/60 text-sm text-center ${isRTL ? "md:text-right" : "md:text-left"}`}>
            <p>&copy; {currentYear} Seloaxum Trading PLC. {t.footer.rights}</p>
          </div>

          <div className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            <a href="#" className="text-white/60 hover:text-primary transition-colors text-sm" data-testid="link-privacy">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition-colors text-sm" data-testid="link-terms">
              {t.footer.terms}
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
