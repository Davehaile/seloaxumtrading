import { motion } from "framer-motion";
import { Users, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ImpactSection() {
  const { t, isRTL } = useLanguage();
  const imp = t.impact;

  return (
    <section className="py-24 md:py-32 bg-background" data-testid="section-impact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">

            <div className={`p-10 md:p-14 flex flex-col justify-center bg-primary text-primary-foreground relative overflow-hidden ${isRTL ? "text-right" : ""}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-white mb-6 text-sm font-medium ${isRTL ? "flex-row-reverse" : ""}`}>
                  <Building2 className="w-4 h-4" />
                  <span>{imp.badge}</span>
                </div>
                <h3 className="text-4xl font-serif font-bold mb-6 text-balance text-foreground">
                  {imp.heading}
                </h3>
                <p className="text-primary-foreground/90 text-lg leading-relaxed font-medium">
                  {imp.body}
                </p>
              </motion.div>
            </div>

            <div className="p-10 md:p-14 flex items-center bg-card">
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`w-full ${isRTL ? "text-right" : ""}`}
              >
                <div className={`flex items-center gap-6 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Users className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-5xl font-serif font-bold text-foreground">50+</h4>
                    <p className="text-muted-foreground font-medium uppercase tracking-wide text-sm mt-1">{imp.jobsLabel}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">{imp.jobsDesc}</p>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-sm font-serif italic text-foreground/80">
                    "{imp.quote}"
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
