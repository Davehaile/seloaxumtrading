import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Lang } from "@/context/LanguageContext";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "عربي", short: "عربي" },
  { code: "zh", label: "中文", short: "中文" },
];

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.operations, href: "#operations" },
    { name: t.nav.valueAddition, href: "#operations" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const textColor = isScrolled ? "text-foreground" : "text-white";
  const textColorMuted = isScrolled ? "text-foreground/70" : "text-white/90";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
      data-testid="navbar"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 group"
          data-testid="link-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={`${base}/seloaxum-logo.png`}
            alt="Seloaxum Logo"
            className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className={`font-serif font-bold text-xl md:text-2xl hidden sm:block ${textColor}`}>
            Seloaxum
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className={`hidden lg:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
          <ul className={`flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${textColorMuted}`}
                  data-testid={`link-nav-${link.href.replace("#", "")}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Language Toggle */}
          <div className="relative" data-testid="lang-switcher">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all ${
                isScrolled
                  ? "border-border text-foreground hover:bg-muted"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              data-testid="button-lang-toggle"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{LANGUAGES.find((l) => l.code === lang)?.short}</span>
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute top-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[120px] ${
                    isRTL ? "left-0" : "right-0"
                  }`}
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary/10 hover:text-primary flex items-center gap-2 ${
                        lang === l.code ? "text-primary font-bold bg-primary/5" : "text-foreground"
                      } ${isRTL ? "text-right flex-row-reverse" : ""}`}
                      data-testid={`button-lang-${l.code}`}
                    >
                      <span className="text-xs font-mono font-bold text-muted-foreground w-6">{l.code.toUpperCase()}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 rounded-full"
            data-testid="button-partner-nav"
          >
            <a href="#contact">{t.nav.partnerCTA}</a>
          </Button>
        </nav>

        {/* Mobile: Lang + Hamburger */}
        <div className={`lg:hidden flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full border transition-all ${
                isScrolled
                  ? "border-border text-foreground"
                  : "border-white/30 text-white"
              }`}
              data-testid="button-lang-toggle-mobile"
            >
              <Globe className="w-3 h-3" />
              <span>{LANGUAGES.find((l) => l.code === lang)?.short}</span>
            </button>
            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className={`absolute top-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden min-w-[110px] z-50 ${
                    isRTL ? "left-0" : "right-0"
                  }`}
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-primary/10 ${
                        lang === l.code ? "text-primary font-bold" : "text-foreground"
                      } ${isRTL ? "text-right" : ""}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className={`p-2 rounded-md ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className={`container mx-auto px-4 py-4 flex flex-col gap-4 ${isRTL ? "items-end" : ""}`}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium text-foreground hover:text-primary py-2 border-b border-border/50 w-full ${isRTL ? "text-right" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button
                asChild
                className="w-full mt-4 bg-primary text-primary-foreground font-medium rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <a href="#contact">{t.nav.partnerCTA}</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
