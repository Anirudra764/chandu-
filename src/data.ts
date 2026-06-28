import { CaseStudy, Service, Tool, Certification } from './types';
import metaAdsImg from './assets/images/give_me_a_clear_cut_202606281122.jpeg';
import youtubeAdsImg from './assets/images/Create_a_premium_3D_isometric_202606281137.jpeg';
import websiteImg from './assets/images/website.jpeg';
import shopyfyImg from './assets/images/shopyfy.jpeg';
import telegramImg from './assets/images/telegram.jpeg';
import metaCampaignImg from './assets/images/meta.jpeg';
import instagramImg from './assets/images/instagram.jpeg';
import dpImg from './assets/images/dp.jpeg';
import bsImg from './assets/images/bs.jpeg';
import iitImg from './assets/images/iit.JPG';
import weImg from './assets/images/we.jpeg';
import bImg from './assets/images/b.jpeg';
import adsImg from './assets/images/ads.jpeg';

export const personalInfo = {
  name: "CHANDAN MAHANTY",
  titles: [
    "Digital Marketing Specialist",
    "Meta Ads Expert",
    "Google Ads Enthusiast",
    "SEO & Growth Marketer"
  ],
  experience: "3 Years Experience",
  clients: "120+ Clients Served",
  budget: "₹10 CR+ Budget Managed",
  shortBio: "3 years of experience. 120+ clients. Campaigns that convert.",
  detailedBio: "I am currently pursuing my BCA at Arka Jain University. Passionate about data-driven performance marketing, I have successfully designed, optimized, and scaled advertising campaigns for over 120 clients. My expertise spans Meta Ads (Facebook & Instagram), Google Search & YouTube campaigns, SEO, lead generation, and funnel building. I love turning attention into real, measurable business revenue.",
  // Privacy note: The following fields are intentionally public contact information
  // displayed in the portfolio's contact section. They are not secrets or API keys.
  whatsappNumber: "9110907676",
  phone: "9110907676",
  email: "chandanmahanty11@gmail.com",
  linkedin: "https://www.linkedin.com/in/chandan-mahanty-8198612a7",
  location: "India"
};

export const stats = [
  {
    id: "stat-1",
    value: 3,
    suffix: "+",
    label: "Years of Experience",
    description: "In performance advertising & strategy",
    accent: "red",
    iconName: "Briefcase"
  },
  {
    id: "stat-2",
    value: 120,
    suffix: "+",
    label: "Clients Served",
    description: "Across small businesses & personal brands",
    accent: "white",
    iconName: "Users"
  },
  {
    id: "stat-3",
    value: 10,
    suffix: " CR+",
    label: "Ad Budget Managed",
    description: "Maximizing ROI across multiple channels",
    accent: "red",
    iconName: "TrendingUp"
  },
  {
    id: "stat-4",
    value: 100,
    suffix: "+",
    label: "Leads Generated",
    description: "High-quality converting business prospects",
    accent: "white",
    iconName: "Target"
  },
  {
    id: "stat-5",
    value: 70,
    suffix: "%+",
    label: "Avg. Campaign Growth",
    description: "Sustained improvement in conversion rate",
    accent: "red",
    iconName: "Percent"
  },
  {
    id: "stat-6",
    value: 1,
    suffix: " (IITB)",
    label: "IIT Bombay Ad Campaign",
    description: "Ran successful institutional-level ads",
    accent: "white",
    iconName: "GraduationCap"
  }
];

export const services: Service[] = [
  {
    id: "srv-meta",
    title: "Meta Ads (Facebook & Instagram)",
    description: "Laser-targeted demographic targeting, high-converting copy, and custom lookalike audience funnels designed to minimize CPL and maximize purchase conversion.",
    category: "Paid Traffic",
    isPrimary: true,
    iconName: "Facebook",
    imageUrl: metaAdsImg
  },

  {
    id: "srv-web",
    title: "Professional Websites",
    description: "Stunning, ultra-fast landing pages and full websites built with strategic visual hierarchies to secure immediate user interest and conversion.",
    category: "Funnel & Web",
    isPrimary: false,
    iconName: "Layout",
    imageUrl: bImg
  },
  {
    id: "srv-funnel",
    title: "Funnel Building & Shopify/WP",
    description: "Complete Shopify store setup and custom WordPress solutions with integrated payment gateways and high-converting marketing funnels.",
    category: "Funnel & Web",
    isPrimary: false,
    iconName: "Cpu",
    imageUrl: shopyfyImg
  },
  {
    id: "srv-branding",
    title: "Branding & Social Media",
    description: "Cohesive visual guidelines, high-fidelity content marketing calendars, and strategic personal branding advice to position you as an industry leader.",
    category: "Organic & Brand",
    isPrimary: false,
    iconName: "Sparkles",
    imageUrl: bsImg
  },
  {
    id: "srv-outreach",
    title: "Email & WhatsApp Marketing",
    description: "Direct outreach automation, campaign flows, and broadcast setups targeting existing contacts to revive passive leads and convert them instantly.",
    category: "Organic & Brand",
    isPrimary: false,
    iconName: "MessageSquare",
    imageUrl: weImg
  },
  {
    id: "srv-youtube",
    title: "YouTube Ads",
    description: "High-impact video ads targeting customers on YouTube to generate high quality leads and scale conversions.",
    category: "Paid Traffic",
    isPrimary: false,
    iconName: "Youtube",
    imageUrl: youtubeAdsImg
  }
];

export const caseStudies: CaseStudy[] = [
  {
    id: "case-meta",
    title: "Meta Ads Campaign",
    subtitle: "70%+ growth in highly qualified sales leads",
    clientName: "E-Commerce & Lead-Gen Brand",
    category: "Meta Ads",
    platform: "Facebook & Instagram Ads Manager",
    thumbnailUrl: metaCampaignImg,
    resultSummary: "+70% Lead Volume | -35% CPL reduction",
    goal: "Acquire high-intent prospective buyers while keeping Cost-Per-Lead (CPL) under strict client budgets.",
    strategy: [
      "Designed a dual-phase funnel mapping Top-Of-Funnel educational reels to Retargeting custom video viewers.",
      "Engineered dynamic catalog ads and carousel creatives highlighting real-time user reviews.",
      "Implemented a broad-targeting strategy with customized lookalikes (1% and 2% purchase lists) in Meta Ads Manager."
    ],
    results: [
      "Generated over 4,500 qualified leads in less than 60 days.",
      "Achieved an immediate 70%+ increase in overall lead volume.",
      "Decreased average Customer Acquisition Cost (CAC) by 28% and CPL by 35%."
    ],
    visualProofDescription: "Meta Campaign Dashboard showing continuous downward slope for CPL and upward climb for Conversion Rate."
  },
  {
    id: "case-telegram",
    title: "Telegram Channel Promotion",
    subtitle: "80% explosive subscriber growth organically + paid",
    clientName: "Premium Fin-Tech Advisory Group",
    category: "Branding",
    platform: "Meta & Telegram Ads Network",
    thumbnailUrl: telegramImg,
    resultSummary: "80% Member Growth | 4.5% Engagement Rate",
    goal: "Drive high-retention members into a financial research community seeking daily micro-insights.",
    strategy: [
      "Created an exclusive lead magnet: a free 30-page interactive handbook on performance advertising and marketing.",
      "Executed targeted cross-promotional campaigns and set up interactive link ads in Meta Ads targeting business professionals."
    ],
    results: [
      "Secured an 80% subscription increase within 45 days.",
      "Enhanced community post engagement rate from 1.5% to 4.5%.",
      "Created a robust stream of warm leads resulting in high course enrollment rates."
    ],
    visualProofDescription: "Telegram channel analytics graph showing steep growth curve with zero spike decay."
  },
  {
    id: "case-instagram",
    title: "Instagram Growth Campaign",
    subtitle: "Organic reach explosion & 45% follower surge",
    clientName: "Dr. K. Sharma (Wellness Consultant)",
    category: "Branding",
    platform: "Instagram Business Platform",
    thumbnailUrl: instagramImg,
    resultSummary: "1.2M+ Reach | +45% Follower Growth",
    goal: "Build organic authority and convert casual visual viewers into private telehealth clients.",
    strategy: [
      "Audited current short-form video metrics and introduced high-hook, fast-paced educational Reels.",
      "Implemented SEO-optimized captions, custom thumbnails, and structured comments to prompt user discussion."
    ],
    results: [
      "Expanded monthly organic reach to 1.2M+ views.",
      "Spurred follower counts upward by 45% with organic traffic only.",
      "Drove over 150 bookings for private discovery sessions."
    ],
    visualProofDescription: "Instagram Insights screenshot indicating +340% account reach growth month-over-month."
  },
  {
    id: "case-digital",
    title: "Digital Product Marketing",
    subtitle: "Sustained high-ROAS campaign scaling revenue",
    clientName: "SaaS Outreach Utility",
    category: "Google Ads",
    platform: "Google Performance Max & Search Ads",
    thumbnailUrl: dpImg,
    resultSummary: "4.2x ROAS | 500+ App Installs",
    goal: "Generate consistent, predictable software purchases from technical B2B agencies.",
    strategy: [
      "Mapped exact-match keyword phrases to highly optimized, dark-themed fast landing pages.",
      "Developed Google Performance Max campaigns feeding high-quality dynamic visual assets."
    ],
    results: [
      "Achieved a 4.2x Return on Ad Spend (ROAS).",
      "Generated over 500 premium subscriptions during the trial campaign.",
      "Boosted landing page search click-through rate from 2.4% to 5.8%."
    ],
    visualProofDescription: "Google Ads report dashboard illustrating absolute conversion scaling alongside stable cost metrics."
  },
  {
    id: "case-iitb",
    title: "IIT Bombay Ad Campaign",
    subtitle: "Institutional ads scaling student registrations",
    clientName: "E-Summit, IIT Bombay Division",
    category: "Google Ads",
    platform: "Google Search & YouTube Network",
    thumbnailUrl: iitImg,
    resultSummary: "25k+ Registrations | +25% Target Beat",
    goal: "Drive nationwide registrations for E-Summit tech-entrepreneur events in restricted timelines.",
    strategy: [
      "Configured hyper-demographic targeting pinpointing technical college students interested in start-ups and hackathons.",
      "Created bumper ads on YouTube utilizing active student hooks, followed by immediate search ad retargeting."
    ],
    results: [
      "Secured massive engagement, beating registration benchmarks by 25%.",
      "Lowered acquisition cost per registration to historic low parameters.",
      "Created widespread institutional authority via programmatic YouTube placement."
    ],
    visualProofDescription: "IIT Bombay Campaign execution confirmation detailing over 25,000 active registrations."
  },
  {
    id: "case-freelance",
    title: "Ads Campaigns for Event Promotion",
    subtitle: "Rank 1-3 domination for high-intent keywords",
    clientName: "Elite Dental Care / local businesses",
    category: "SEO",
    platform: "Google Search Engine Rankings",
    thumbnailUrl: adsImg,
    resultSummary: "Rank #1-3 | 120%+ Organic Traffic Increase",
    goal: "Dominate local dental search queries over well-funded directory competitors.",
    strategy: [
      "Conducted a total structural audit of the web core vitals and streamlined metadata structure.",
      "Built semantic local keyword-rich blog content and set up Google Business Profile reviews optimization."
    ],
    results: [
      "Achieved Rank #1-3 across 15 core high-intent local query variants.",
      "Secured a 120%+ increase in search organic traffic over 3 months.",
      "Drove local business appointment phone bookings up by 65%."
    ],
    visualProofDescription: "Ahrefs traffic estimation visual depicting linear organic traffic scale-up."
  }
];

export const tools: Tool[] = [
  { name: "Canva", category: "design" },
  { name: "Meta Ads Manager", category: "advertising" },
  { name: "Google Ads", category: "advertising" },
  { name: "Google Analytics", category: "analytics" },
  { name: "AI & Automation Tools", category: "productivity" },
  { name: "Google Workspace", category: "productivity" },
  { name: "Google Sheets", category: "analytics" },
  { name: "Notion", category: "productivity" },
  { name: "Professional Web Designing", category: "design" }
];

export const certifications: Certification[] = [
  {
    id: "cert-meta",
    title: "Advertising With Meta",
    issuer: "Meta (Facebook)",
    year: "2024"
  },
  {
    id: "cert-google",
    title: "Foundations of Digital Marketing & E-commerce",
    issuer: "Google",
    year: "2024"
  }
];
