-- ==============================================================================
-- RAGHU RAJESH — VIDEO EDITOR & MOTION DESIGNER PORTFOLIO
-- Supabase Schema & Initial Seed Data
-- ==============================================================================

-- 1. Create Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text not null check (category in ('long_form', 'short_form')),
  subcategory text not null check (subcategory in ('creators_influencers', 'ad_reels', 'brand_promotion', 'podcasts', 'advertisements')),
  description text,
  thumbnail_url text,
  video_url text not null,
  client_name text,
  role text default 'Video Editor & Motion Designer',
  software text[] default array['Adobe Premiere Pro', 'Adobe After Effects'],
  featured boolean default false,
  display_order integer default 0,
  published boolean default true,
  aspect_ratio text default '9:16' check (aspect_ratio in ('16:9', '9:16', '4:5', '1:1')),
  duration text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Inquiries Table
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text not null,
  budget text,
  message text not null,
  status text default 'new' check (status in ('new', 'reviewed', 'contacted', 'archived')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Indexes for fast queries
create index if not exists projects_featured_published_idx on public.projects (featured, published, display_order);
create index if not exists projects_category_published_idx on public.projects (category, published, display_order);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);

-- 4. Enable Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.inquiries enable row level security;

-- Drop existing policies if any
drop policy if exists "Allow public read access for published projects" on public.projects;
drop policy if exists "Allow service role full access on projects" on public.projects;
drop policy if exists "Allow public insert for inquiries" on public.inquiries;
drop policy if exists "Allow service role full access on inquiries" on public.inquiries;

-- Projects: Anyone can view published projects
create policy "Allow public read access for published projects"
  on public.projects
  for select
  using (published = true);

-- Projects: Full access for authenticated admin or service role
create policy "Allow service role full access on projects"
  on public.projects
  for all
  using (auth.role() = 'service_role' or auth.role() = 'authenticated');

-- Inquiries: Anyone can submit an inquiry (INSERT only)
create policy "Allow public insert for inquiries"
  on public.inquiries
  for insert
  with check (true);

-- Inquiries: Only service role or authenticated admin can read/manage inquiries
create policy "Allow service role full access on inquiries"
  on public.inquiries
  for all
  using (auth.role() = 'service_role' or auth.role() = 'authenticated');

-- 5. Seed Data (Raghu Rajesh's 9 Real Projects)
insert into public.projects (
  title,
  slug,
  category,
  subcategory,
  description,
  thumbnail_url,
  video_url,
  client_name,
  role,
  software,
  featured,
  display_order,
  published,
  aspect_ratio,
  duration
) values
(
  'Social World — Brand Building',
  'social-world-brand-building',
  'short_form',
  'creators_influencers',
  'Dynamic brand-building vertical reel for creators with hook pacing, animated kinetic captions, and sound design.',
  '',
  '/videos/social world-brand building.mp4',
  'Social World',
  'Short-Form Video Editor',
  array['Adobe Premiere Pro', 'Adobe After Effects'],
  true,
  1,
  true,
  '9:16',
  '00:39'
),
(
  'XExamination — Podcast Reel',
  'xexamination-podcast-reel',
  'short_form',
  'creators_influencers',
  'High-retention podcast highlight short featuring camera punch-ins, synchronized typography, and impactful audio accents.',
  '',
  '/videos/XExamination-podcast reel.mp4',
  'XExamination',
  'Podcast Short-Form Editor',
  array['Adobe Premiere Pro', 'Adobe After Effects'],
  true,
  2,
  true,
  '9:16',
  '01:02'
),
(
  'Mamu Show — Promo',
  'mamu-show-promo',
  'short_form',
  'ad_reels',
  'Fast-paced promotional ad reel cut to music rhythm, featuring kinetic motion elements and commercial hook pacing.',
  '',
  '/videos/mamu show-promo.mp4',
  'Mamu Show',
  'Promotional Ad Editor',
  array['Adobe Premiere Pro', 'Adobe After Effects'],
  true,
  3,
  true,
  '9:16',
  '00:45'
),
(
  'Simco — Paai',
  'simco-paai',
  'short_form',
  'ad_reels',
  'Commercial advertisement reel with macro product transitions, sound design, and clean visual storytelling.',
  '',
  '/videos/simco-paai.mp4',
  'Simco',
  'Commercial Video Editor',
  array['Adobe Premiere Pro', 'Adobe After Effects'],
  true,
  4,
  true,
  '9:16',
  '00:50'
),
(
  'Planet Life — Family Trip',
  'planet-life-family-trip',
  'short_form',
  'brand_promotion',
  'Cinematic brand travel edit featuring emotive lifestyle storytelling, rich color grading, and organic transitions.',
  '',
  '/videos/planet life-family trip.mp4',
  'Planet Life',
  'Brand Editor & Colorist',
  array['Adobe Premiere Pro', 'Adobe After Effects'],
  true,
  5,
  true,
  '9:16',
  '00:38'
),
(
  'Javelin Tiger — Water Usage',
  'javelin-tiger-water-usage',
  'short_form',
  'brand_promotion',
  'Brand awareness video blending kinetic motion graphics, crisp cut timing, and narrative pacing.',
  '',
  '/videos/javelin tiger-water usage.mp4',
  'Javelin Tiger',
  'Motion Designer & Editor',
  array['Adobe Premiere Pro', 'Adobe After Effects'],
  true,
  6,
  true,
  '9:16',
  '00:53'
),
(
  'Akitara — Hair Serum',
  'akitara-hair-serum',
  'short_form',
  'brand_promotion',
  'Aesthetic beauty commercial featuring macro product texture shots, benefit highlights, and elegant sound design.',
  '',
  '/videos/akitara-hair serum.mp4',
  'Akitara',
  'Commercial Brand Editor',
  array['Adobe Premiere Pro', 'Adobe After Effects'],
  true,
  7,
  true,
  '9:16',
  '01:19'
),
(
  'XExamination — Podcast',
  'xexamination-podcast',
  'long_form',
  'podcasts',
  'Full studio podcast episode with multicam switching, dialogue cleanup, sound mastering, and lower-third graphics.',
  '',
  '/videos/XExamination-podcast.mp4',
  'XExamination',
  'Lead Podcast Editor & Sound Designer',
  array['Adobe Premiere Pro', 'Adobe Audition', 'Adobe After Effects'],
  true,
  8,
  true,
  '16:9',
  '00:40'
),
(
  'IQ Bizz Growth — Cafe Business School',
  'iq-bizz-growth-cafe-business-schl',
  'long_form',
  'advertisements',
  'Comprehensive business school commercial featuring on-site documentary b-roll, entrepreneur interviews, and branded motion graphics.',
  '',
  '/videos/IQ Bizz growth -cafe business schl.mp4',
  'IQ Bizz Growth',
  'Documentary & Commercial Editor',
  array['Adobe Premiere Pro', 'Adobe After Effects'],
  true,
  9,
  true,
  '16:9',
  '02:51'
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  subcategory = excluded.subcategory,
  description = excluded.description,
  video_url = excluded.video_url,
  client_name = excluded.client_name,
  role = excluded.role,
  software = excluded.software,
  featured = excluded.featured,
  display_order = excluded.display_order,
  published = excluded.published,
  aspect_ratio = excluded.aspect_ratio,
  duration = excluded.duration,
  updated_at = timezone('utc'::text, now());
