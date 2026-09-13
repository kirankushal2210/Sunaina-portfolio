export interface Project {
  id: string;
  title: string;
  category: string;
  posterAsset: string;
  aspectRatio: string;
  metrics: string[];
  content: string;
  client: string;
  year: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
}

export const MOCK_PROJECTS: Project[] = [
  { id: "1", title: "Future Kids - Scholarship Poster", category: "Print", client: "Future Kids", year: "2025", posterAsset: "/projects/fk-scholarship.jpg", aspectRatio: "vertical", metrics: ["10k+ Impressions", "+25% Signups"], content: "Promotional poster for 100% scholarship and aptitude test, highlighting academic excellence." },
  { id: "2", title: "Future Kids - Admissions Open", category: "Social Media", client: "Future Kids", year: "2025", posterAsset: "/projects/fk-admissions.jpg", aspectRatio: "vertical", metrics: ["+140% Engagement"], content: "Creative typography-led admissions open graphic with a welcoming campus environment." },
  { id: "3", title: "The Park Arabian Mandi", category: "Branding", client: "The Park", year: "2025", posterAsset: "/projects/park-mandi-card.jpg", aspectRatio: "horizontal", metrics: ["Brand Identity Established"], content: "Premium business card design with gold foil accents and elegant typography." },
  { id: "4", title: "Wittelsbach - Content Strategy", category: "Social Media", client: "Wittelsbach", year: "2025", posterAsset: "/projects/content-strategy.jpg", aspectRatio: "vertical", metrics: ["Lead Gen Asset"], content: "Bold, visually striking promotional graphic for content strategy services." },
  { id: "5", title: "The Park Arabian Mandi - Packaging", category: "Packaging", client: "The Park", year: "2025", posterAsset: "/projects/mandi-bottle.jpg", aspectRatio: "vertical", metrics: ["Custom FMCG"], content: "Custom water bottle label packaging design with premium forest/animal elements." },
  { id: "6", title: "Bandi Babu - Brand Logo", category: "Branding", client: "Bandi Babu", year: "2024", posterAsset: "/projects/bandi-babu-logo.jpg", aspectRatio: "square", metrics: ["Identity Relaunch"], content: "Character-driven logo design for a traditional food brand featuring custom Telugu typography." },
  { id: "7", title: "Future Kids - Sankranthi Banner", category: "Print", client: "Future Kids", year: "2025", posterAsset: "/projects/fk-sankranthi.jpg", aspectRatio: "horizontal", metrics: ["Event Highlight"], content: "Festive backdrop banner for Sankranthi celebrations featuring cultural elements." },
  { id: "8", title: "Gal Punjabi Dhaba - Menu Design", category: "Print", client: "Gal Punjabi Dhaba", year: "2025", posterAsset: "/projects/punjabi-menu.jpg", aspectRatio: "vertical", metrics: ["Dine-in Utility"], content: "Traditional and extensive dine-in menu design for a Punjabi restaurant." },
];

export const MOCK_EXPERIENCES: Experience[] = [
  { id: "1", company: "NarrativeX Media", role: "Graphic Designer", duration: "January 2026 — Present", description: ["Led design of branding, social, print, and digital creatives.", "Collaborated with cross-functional teams."] },
  { id: "2", company: "Wittelsbach", role: "Graphic Designer", duration: "July 2024 — January 2026", description: ["Created social creatives, print materials, digital marketing assets.", "Assisted brand identity development."] },
  { id: "3", company: "MayaBazar Loft", role: "Album & Graphic Designer", duration: "January — March 2024", description: ["Designed wedding album layouts focusing on composition and storytelling."] },
  { id: "4", company: "Exsconicc", role: "Graphic Design & Social Media Intern", duration: "May — Oct 2023", description: ["Designed social media creatives and assisted in managing presence."] },
  { id: "5", company: "Freelance", role: "Graphic Designer, Packaging, Flyers", duration: "Ongoing", description: ["Designed packaging layouts, flyers, banners, and backdrops."] },
];
