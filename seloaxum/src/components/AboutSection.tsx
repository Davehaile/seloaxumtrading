import { motion } from "framer-motion";
import { Globe, ShieldCheck, TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const TEAM = [
  {
    nameKey: "Abel Assefa",
    roleKey: "roleAbel" as const,
    img: `${base}/team-abel.jpg`,
    featured: false,
  },
  {
    nameKey: "Solomon Mekonnen",
    roleKey: "roleSolomon" as const,
    img: `${base}/team-solomon.jpg`,
    featured: true,
  },
  {
    nameKey: "Dawit Haileslasie",
    roleKey: "roleDawit" as const,
    img: `${base}/team-dawit.jpg`,
    featured: false,
  },
];

export default function AboutSection() {
  const { t, isRTL } = useLanguage();
  const ab = t.about;

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative" data-testid="section-about">
      <div className="container mx-auto px-4 md:px-6 space-y-24">

        {/* Existing about content */}
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? "direction-rtl" : ""}`}>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`space-y-8 ${isRTL ? "text-right" : ""}`}
          >
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">{ab.sectionLabel}</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                {ab.heading1} <br />
                <span className="italic font-light text-secondary">{ab.heading2}</span>
              </h3>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{ab.body}</p>

            <div className={`grid sm:grid-cols-2 gap-6 pt-4 ${isRTL ? "text-right" : ""}`}>
              <div className="space-y-3 p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary ${isRTL ? "mr-auto" : ""}`}>
                  <Globe className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-foreground">{ab.globalReachTitle}</h4>
                <p className="text-sm text-muted-foreground">{ab.globalReachBody}</p>
              </div>

              <div className="space-y-3 p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent ${isRTL ? "mr-auto" : ""}`}>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-foreground">{ab.strategicShiftTitle}</h4>
                <p className="text-sm text-muted-foreground">{ab.strategicShiftBody}</p>
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-background">
              <img
                src={`${base}/coffee-beans.png`}
                alt="Premium roasted coffee beans close-up"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>

            <div className="absolute top-1/2 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />

            <div className={`absolute -bottom-10 ${isRTL ? "-right-10" : "-left-10"} bg-background border border-border p-6 rounded-2xl shadow-xl z-20 max-w-xs`}>
              <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className={isRTL ? "text-right" : ""}>
                  <h5 className="font-bold text-foreground">{ab.premiumQualityTitle}</h5>
                  <p className="text-xs text-muted-foreground">{ab.premiumQualityBody}</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Leadership Team */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className={`text-center mb-14 space-y-3 ${isRTL ? "text-right" : ""}`}
          >
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">{ab.teamLabel}</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{ab.teamSubLabel}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.nameKey}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className={`relative group ${member.featured ? "md:-mt-6" : ""}`}
              >
                {/* Gold top border on featured */}
                {member.featured && (
                  <div className="absolute -top-px left-8 right-8 h-1 rounded-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 z-10" />
                )}

                <div className={`bg-card border rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ${member.featured ? "border-primary/40 shadow-primary/10" : "border-border"}`}>
                  {/* Photo */}
                  <div className={`overflow-hidden ${member.featured ? "aspect-[3/3.8]" : "aspect-[3/3.5]"}`}>
                    <img
                      src={member.img}
                      alt={member.nameKey}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Info */}
                  <div className={`p-5 ${isRTL ? "text-right" : "text-center"}`}>
                    {member.featured && (
                      <span className="inline-block mb-2 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest">
                        CEO
                      </span>
                    )}
                    <h4 className="font-serif font-bold text-foreground text-lg leading-tight">
                      {member.nameKey}
                    </h4>
                    <p className={`mt-1 text-sm text-muted-foreground leading-snug ${member.featured ? "font-medium" : ""}`}>
                      {ab[member.roleKey]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
