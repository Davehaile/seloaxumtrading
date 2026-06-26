import { motion } from "framer-motion";
import { Factory, Coffee, Package, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const ICONS = [Factory, Coffee, Package, Truck];
const STYLES = [
  { color: "text-blue-600", bg: "bg-blue-600/10" },
  { color: "text-primary", bg: "bg-primary/10" },
  { color: "text-accent", bg: "bg-accent/10" },
  { color: "text-secondary-foreground", bg: "bg-secondary-foreground/10" },
];
const IDS = ["cleaning", "roasting", "packaging", "logistics"];

export default function OperationsSection() {
  const { t, isRTL } = useLanguage();
  const op = t.operations;

  return (
    <section
      id="operations"
      className="py-24 md:py-32 bg-secondary text-secondary-foreground relative overflow-hidden"
      data-testid="section-operations"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
        <img
          src={`${base}/facility.png`}
          alt="Modern industrial coffee processing facility"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 space-y-4 ${isRTL ? "text-right" : ""}`}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            {op.sectionLabel}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-white"
          >
            {op.heading}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80"
          >
            {op.subheading}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {op.items.map((item, index) => {
            const Icon = ICONS[index];
            const style = STYLES[index];
            return (
              <motion.div
                key={IDS[index]}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                className={`group relative p-8 rounded-3xl bg-secondary-foreground/5 border border-white/10 hover:bg-secondary-foreground/10 transition-colors duration-300 backdrop-blur-sm ${isRTL ? "text-right" : ""}`}
                data-testid={`card-operation-${IDS[index]}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${style.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${isRTL ? "mr-auto" : ""}`}>
                  <Icon className={`w-7 h-7 ${style.color}`} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 font-serif">{item.title}</h4>
                <p className="text-white/70 leading-relaxed text-sm">{item.description}</p>

                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
