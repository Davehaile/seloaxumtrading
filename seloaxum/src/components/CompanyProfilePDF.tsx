import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Helvetica",
  fonts: [],
});

const GOLD = "#D4AF37";
const BROWN = "#3B1A08";
const BROWN_LIGHT = "#6B3A2A";
const CREAM = "#FAF6EE";
const GREEN = "#3A6B35";
const WHITE = "#FFFFFF";
const MUTED = "#8B6E5A";

const styles = StyleSheet.create({
  page: {
    backgroundColor: CREAM,
    fontFamily: "Helvetica",
    paddingBottom: 40,
  },

  // ── Cover Page ──────────────────────────────────────────────
  coverPage: {
    backgroundColor: BROWN,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  coverTop: {
    width: "100%",
    backgroundColor: BROWN,
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 40,
  },
  coverLogo: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  coverTitle: {
    fontSize: 36,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 6,
  },
  coverSubtitle: {
    fontSize: 13,
    color: WHITE,
    textAlign: "center",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 30,
    opacity: 0.8,
  },
  coverDivider: {
    width: 80,
    height: 2,
    backgroundColor: GOLD,
    marginBottom: 20,
  },
  coverTagline: {
    fontSize: 12,
    color: WHITE,
    textAlign: "center",
    maxWidth: 380,
    lineHeight: 1.7,
    opacity: 0.85,
  },
  coverBottom: {
    width: "100%",
    backgroundColor: GOLD,
    paddingVertical: 14,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coverBottomText: {
    fontSize: 9,
    color: BROWN,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // ── Section Layout ───────────────────────────────────────────
  section: {
    marginHorizontal: 40,
    marginTop: 36,
  },
  sectionLabel: {
    fontSize: 8,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 22,
    color: BROWN,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    lineHeight: 1.3,
  },
  sectionBody: {
    fontSize: 10,
    color: MUTED,
    lineHeight: 1.7,
    maxWidth: 480,
  },
  divider: {
    height: 1,
    backgroundColor: GOLD,
    opacity: 0.3,
    marginHorizontal: 40,
    marginTop: 24,
  },

  // ── Header strip for inner pages ────────────────────────────
  pageHeader: {
    backgroundColor: BROWN,
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageHeaderLogo: {
    width: 28,
    height: 28,
  },
  pageHeaderTitle: {
    fontSize: 9,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  pageHeaderPage: {
    fontSize: 9,
    color: WHITE,
    opacity: 0.6,
  },

  // ── Destination Badges ────────────────────────────────────────
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16,
  },
  badge: {
    backgroundColor: BROWN,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 9,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // ── Operations Cards ──────────────────────────────────────────
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 16,
  },
  card: {
    width: "47%",
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: GOLD,
  },
  cardTitle: {
    fontSize: 10,
    color: BROWN,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    lineHeight: 1.3,
  },
  cardBody: {
    fontSize: 9,
    color: MUTED,
    lineHeight: 1.6,
  },

  // ── Impact Block ──────────────────────────────────────────────
  impactBox: {
    backgroundColor: BROWN,
    borderRadius: 12,
    padding: 24,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  impactNumber: {
    fontSize: 48,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1,
  },
  impactLabel: {
    fontSize: 9,
    color: WHITE,
    opacity: 0.7,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginTop: 2,
  },
  impactBody: {
    fontSize: 10,
    color: WHITE,
    opacity: 0.85,
    lineHeight: 1.7,
    flex: 1,
  },

  // ── Contact Block ─────────────────────────────────────────────
  contactGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  contactItem: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 14,
    borderTopWidth: 2,
    borderTopColor: GOLD,
  },
  contactLabel: {
    fontSize: 7,
    color: GOLD,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 10,
    color: BROWN,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.5,
  },

  // ── Footer ────────────────────────────────────────────────────
  pageFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: GOLD,
    paddingVertical: 8,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8,
    color: BROWN,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },

  // ── Quote ─────────────────────────────────────────────────────
  quoteBox: {
    borderLeftWidth: 3,
    borderLeftColor: GREEN,
    paddingLeft: 14,
    marginTop: 20,
    marginHorizontal: 40,
  },
  quoteText: {
    fontSize: 11,
    color: BROWN_LIGHT,
    fontFamily: "Helvetica-Oblique",
    lineHeight: 1.7,
  },
});

const PageHeader = ({ page, logoUrl }: { page: string; logoUrl: string }) => (
  <View style={styles.pageHeader} fixed>
    <Image src={logoUrl} style={styles.pageHeaderLogo} />
    <Text style={styles.pageHeaderTitle}>Seloaxum Trading PLC — Company Profile</Text>
    <Text style={styles.pageHeaderPage}>{page}</Text>
  </View>
);

const PageFooter = () => (
  <View style={styles.pageFooter} fixed>
    <Text style={styles.footerText}>Seloaxum Trading PLC • Ethiopian Coffee Heritage</Text>
    <Text style={styles.footerText}>Denberwa, Addis Abeba, Ethiopia • +251 911 54 70 49</Text>
  </View>
);

export default function CompanyProfilePDF({ logoUrl }: { logoUrl: string }) {
  return (
    <Document
      title="Seloaxum Trading PLC — Company Profile"
      author="Seloaxum Trading PLC"
      subject="Premium Ethiopian Coffee Exporter — Corporate Profile"
      keywords="Ethiopian coffee, premium export, value-added, B2B"
    >
      {/* ── PAGE 1: Cover ── */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverTop}>
          <Image src={logoUrl} style={styles.coverLogo} />
          <Text style={styles.coverTitle}>Seloaxum Trading PLC</Text>
          <Text style={styles.coverSubtitle}>Ethiopian Coffee Heritage</Text>
          <View style={styles.coverDivider} />
          <Text style={styles.coverTagline}>
            Transforming agricultural excellence from raw supply into world-class,
            premium value-added coffee products for global markets.
          </Text>
        </View>
        <View style={{ flex: 1, backgroundColor: BROWN }} />
        <View style={styles.coverBottom}>
          <Text style={styles.coverBottomText}>Company Profile 2026</Text>
          <Text style={styles.coverBottomText}>Confidential — B2B Use Only</Text>
        </View>
      </Page>

      {/* ── PAGE 2: About Us ── */}
      <Page size="A4" style={styles.page}>
        <PageHeader page="About Us" logoUrl={logoUrl} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About Us</Text>
          <Text style={styles.sectionTitle}>8 Years of Trusted{"\n"}Export Excellence</Text>
          <Text style={styles.sectionBody}>
            Seloaxum Trading PLC is a premier Ethiopian coffee exporter with eight consecutive years
            of trusted, highly efficient operations in the international trade sector. We have
            established a robust global trade footprint, consistently delivering premium-grade
            Ethiopian coffee to key markets worldwide.{"\n\n"}
            Our strategic corporate evolution reflects a deliberate transition from being a raw
            commodity supplier into a premium, high-quality, value-added product exporter — a shift
            that positions us at the forefront of Ethiopia's growing agri-industrial sector.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Global Export Destinations</Text>
          <Text style={styles.sectionTitle}>Our International Markets</Text>
          <Text style={styles.sectionBody}>
            Our coffee reaches discerning buyers across four major international trade hubs,
            with consistent year-on-year growth in volume and value.
          </Text>
          <View style={styles.badgeRow}>
            {["Dubai", "Sudan", "Saudi Arabia", "China"].map((dest) => (
              <View key={dest} style={styles.badge}>
                <Text style={styles.badgeText}>{dest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>
            "We do not merely export coffee — we export the story of Ethiopian soil,
            generations of knowledge, and a commitment to world-class quality."
          </Text>
        </View>

        <PageFooter />
      </Page>

      {/* ── PAGE 3: Operations ── */}
      <Page size="A4" style={styles.page}>
        <PageHeader page="Our Operations" logoUrl={logoUrl} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Our Operations & Value Addition</Text>
          <Text style={styles.sectionTitle}>End-to-End Processing{"\n"}Capabilities</Text>
          <Text style={styles.sectionBody}>
            From the highland farms of Ethiopia to premium packaging ready for global retail,
            our integrated processing pipeline ensures consistent, superior quality at every stage.
          </Text>

          <View style={styles.cardGrid}>
            {[
              {
                title: "Modern Coffee Cleaning & Hulling",
                body: "State-of-the-art facilities ensuring absolute purity and meticulous preparation of the raw coffee cherry, removing defects at the source.",
              },
              {
                title: "Roasting & Flavor Profile Engineering",
                body: "Precision roasting protocols tailored to highlight the unique terroir-driven flavor notes of Ethiopian highland coffee for global palates.",
              },
              {
                title: "Premium Branding & Packaging",
                body: "World-class, airtight packaging that preserves freshness, extends shelf life for international shipping, and conveys our rich heritage.",
              },
              {
                title: "Modern Logistics & Quality Warehousing",
                body: "Secure, climate-controlled storage environments and efficient last-mile global distribution networks ensuring product integrity at delivery.",
              },
            ].map((op) => (
              <View key={op.title} style={styles.card}>
                <Text style={styles.cardTitle}>{op.title}</Text>
                <Text style={styles.cardBody}>{op.body}</Text>
              </View>
            ))}
          </View>
        </View>

        <PageFooter />
      </Page>

      {/* ── PAGE 4: Impact & Contact ── */}
      <Page size="A4" style={styles.page}>
        <PageHeader page="Impact &amp; Contact" logoUrl={logoUrl} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Economic & Social Impact</Text>
          <Text style={styles.sectionTitle}>Investing in Ethiopia's{"\n"}Industrial Future</Text>
          <Text style={styles.sectionBody}>
            Beyond trade, Seloaxum Trading PLC is a catalyst for Ethiopia's industrial transition.
            By shifting from raw commodity export to value-added manufacturing, we generate
            sustainable economic growth at origin.
          </Text>

          <View style={styles.impactBox}>
            <View>
              <Text style={styles.impactNumber}>50+</Text>
              <Text style={styles.impactLabel}>Jobs Created</Text>
            </View>
            <Text style={styles.impactBody}>
              Permanent and temporary employment opportunities specifically targeted at
              empowering urban youth in our communities, with plans for continued expansion
              as value-addition capacity grows.
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Contact & Corporate Details</Text>
          <Text style={styles.sectionTitle}>Partner With Us</Text>
          <Text style={styles.sectionBody}>
            We welcome inquiries from coffee importers, commodity traders, and retail brands
            seeking a reliable, premium-grade Ethiopian coffee supply partner.
          </Text>

          <View style={styles.contactGrid}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Company</Text>
              <Text style={styles.contactValue}>Seloaxum Trading PLC</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Headquarters</Text>
              <Text style={styles.contactValue}>Denberwa{"\n"}Addis Abeba, Ethiopia</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+251 911 54 70 49</Text>
            </View>
          </View>
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>
            "Building a legacy of quality that enriches both the cup and the community."
          </Text>
        </View>

        <PageFooter />
      </Page>
    </Document>
  );
}
