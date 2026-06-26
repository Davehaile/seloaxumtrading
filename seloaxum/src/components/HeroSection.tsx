import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function HeroSection() {
  const { t, isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src={`${base}/hero-bg.png`}
          alt="Golden Ethiopian highland coffee farm at dawn"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 pt-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mx-auto mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-white">{t.hero.badge}</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1] tracking-tight text-balance">
            {t.hero.headline}{" "}
            <span className="text-primary italic">{t.hero.headlineAccent}</span>
          </h1>

          <p className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mt-6 ${isRTL ? "font-sans" : ""}`}>
            {t.hero.subheadline}
          </p>

          <div className={`pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 rounded-full text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105"
              data-testid="button-partner-hero"
            >
              <a href="#contact">{t.hero.ctaPrimary}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-medium px-8 h-14 rounded-full text-lg backdrop-blur-sm"
              data-testid="button-explore-hero"
            >
              <a href="#about">{t.hero.ctaSecondary}</a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/70"
      >
        <span className="text-xs uppercase tracking-widest mb-2">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
