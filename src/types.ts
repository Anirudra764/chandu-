export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  clientName: string;
  category: 'Meta Ads' | 'Google Ads' | 'SEO' | 'Branding';
  platform: string;
  thumbnailUrl: string;
  resultSummary: string;
  goal: string;
  strategy: string[];
  results: string[];
  visualProofDescription: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  isPrimary?: boolean;
  iconName: string;
  imageUrl?: string;
}

export interface Tool {
  name: string;
  category: 'advertising' | 'design' | 'analytics' | 'productivity';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
}
