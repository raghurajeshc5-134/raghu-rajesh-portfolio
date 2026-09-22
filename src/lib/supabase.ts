import { createClient } from '@supabase/supabase-js';
import { Project, Inquiry } from './types';
import { INITIAL_PROJECTS } from './fallback-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.length > 0 &&
    supabaseUrl.startsWith('http') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.length > 10 &&
    !supabaseUrl.includes('placeholder')
  );
};

// Client for frontend / anonymous operations
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Admin client for secure server-side operations (optional)
export const getServiceSupabase = () => {
  if (isSupabaseConfigured() && supabaseServiceKey) {
    return createClient(supabaseUrl, supabaseServiceKey);
  }
  return supabase;
};

// Local storage cache key for local admin demo mode
const LOCAL_PROJECTS_KEY = 'raghu_portfolio_projects';

// Fetch all published projects (ordered by display_order asc)
export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured() || !supabase) {
    // In browser, check if admin modified projects in localStorage
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(LOCAL_PROJECTS_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.filter((p: Project) => p.published);
          }
        }
      } catch {
        // fallback
      }
    }
    return INITIAL_PROJECTS.filter((p) => p.published);
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_PROJECTS.filter((p) => p.published);
    }

    return data as Project[];
  } catch {
    return INITIAL_PROJECTS.filter((p) => p.published);
  }
}

// Fetch featured projects for homepage
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured).slice(0, 6);
}

// Fetch single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured() || !supabase) {
    const all = await getProjects();
    return all.find((p) => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const all = await getProjects();
      return all.find((p) => p.slug === slug) || null;
    }

    return data as Project;
  } catch {
    const all = await getProjects();
    return all.find((p) => p.slug === slug) || null;
  }
}

// Submit a new inquiry
export async function submitInquiry(inquiry: Inquiry): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    // Local development storage simulation
    if (typeof window !== 'undefined') {
      try {
        const stored = JSON.parse(localStorage.getItem('raghu_portfolio_inquiries') || '[]');
        stored.unshift({ ...inquiry, id: crypto.randomUUID(), created_at: new Date().toISOString(), status: 'new' });
        localStorage.setItem('raghu_portfolio_inquiries', JSON.stringify(stored));
      } catch {
        // ignore
      }
    }
    return { success: true };
  }

  try {
    const { error } = await supabase.from('inquiries').insert([
      {
        name: inquiry.name,
        email: inquiry.email,
        company: inquiry.company || null,
        project_type: inquiry.project_type,
        budget: inquiry.budget || null,
        message: inquiry.message,
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : 'Failed to submit inquiry' };
  }
}
