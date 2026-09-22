export type ProjectCategory = 'short_form' | 'long_form';

export type ProjectSubcategory =
  // Short form
  | 'creators_influencers'
  | 'ad_reels'
  | 'brand_promotion'
  // Long form
  | 'podcasts'
  | 'advertisements';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  subcategory: ProjectSubcategory;
  description: string;
  thumbnail_url: string;
  video_url: string;
  client_name?: string | null;
  role?: string | null;
  software: string[];
  featured: boolean;
  display_order: number;
  published: boolean;
  aspect_ratio?: '16:9' | '9:16' | '4:5' | '1:1';
  duration?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  company?: string;
  project_type: string;
  budget?: string;
  message: string;
  status?: 'new' | 'reviewed' | 'contacted' | 'archived';
  created_at?: string;
}
