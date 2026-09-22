'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Filter, Sparkles, Smartphone, Clapperboard } from 'lucide-react';
import { Project, ProjectCategory, ProjectSubcategory } from '@/lib/types';
import { ProjectCard } from '@/components/ProjectCard';
import { VideoModal } from '@/components/VideoModal';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface WorksPageContentProps {
  initialProjects: Project[];
}

export function WorksPageContent({ initialProjects }: WorksPageContentProps) {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>(
    initialCategoryParam === 'short_form' || initialCategoryParam === 'long_form'
      ? initialCategoryParam
      : 'all'
  );

  const [activeSubcategory, setActiveSubcategory] = useState<'all' | ProjectSubcategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat === 'short_form' || cat === 'long_form') {
      setActiveCategory(cat);
      setActiveSubcategory('all');
    } else if (!cat) {
      setActiveCategory('all');
      setActiveSubcategory('all');
    }
  }, [searchParams]);

  // Exact categories specified:
  // Short form:
  // - Creators / influencers
  // - Ad reels
  // - Brand Promotion
  // Long form:
  // - Podcasts
  // - Advertisements
  const subcategoryFilters: { label: string; value: 'all' | ProjectSubcategory; forCategory?: ProjectCategory }[] = [
    { label: 'All Subcategories', value: 'all' },
    // Short-Form
    { label: 'Creators / Influencers', value: 'creators_influencers', forCategory: 'short_form' },
    { label: 'Ad Reels', value: 'ad_reels', forCategory: 'short_form' },
    { label: 'Brand Promotion', value: 'brand_promotion', forCategory: 'short_form' },
    // Long-Form
    { label: 'Podcasts', value: 'podcasts', forCategory: 'long_form' },
    { label: 'Advertisements', value: 'advertisements', forCategory: 'long_form' },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeCategory !== 'all' && project.category !== activeCategory) {
      return false;
    }
    if (activeSubcategory !== 'all' && project.subcategory !== activeSubcategory) {
      return false;
    }
    return true;
  });

  const shortFormProjects = filteredProjects.filter((p) => p.category === 'short_form');
  const longFormProjects = filteredProjects.filter((p) => p.category === 'long_form');

  const availableSubcategories = subcategoryFilters.filter(
    (item) => item.value === 'all' || !activeCategory || activeCategory === 'all' || item.forCategory === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#08060d] text-white flex flex-col font-sans selection:bg-[#9333ea] selection:text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background ambient purple glow */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#9333ea]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Top Header */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9c95b3] hover:text-[#c084fc] transition-colors mb-6 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#201a33]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#140f24] border border-[#2b2047] text-[10px] font-mono uppercase tracking-widest text-[#c084fc] mb-3 font-semibold shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Portfolio Archive</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  {activeCategory === 'short_form'
                    ? 'Short-Form Edits'
                    : activeCategory === 'long_form'
                    ? 'Long-Form Edits'
                    : 'All Video Works'}
                </h1>
              </div>

              <div className="text-xs font-medium text-[#9c95b3]">
                Showing {filteredProjects.length} of {initialProjects.length} projects
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            {/* Category Tabs */}
            <div className="inline-flex p-1 rounded-2xl bg-[#0f0c18] border border-[#221c38] max-w-full overflow-x-auto shadow-inner">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveSubcategory('all');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.45)]'
                    : 'text-[#9c95b3] hover:text-white'
                }`}
              >
                All Projects
              </button>

              <button
                onClick={() => {
                  setActiveCategory('short_form');
                  setActiveSubcategory('all');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === 'short_form'
                    ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.45)]'
                    : 'text-[#9c95b3] hover:text-white'
                }`}
              >
                Short-Form
              </button>

              <button
                onClick={() => {
                  setActiveCategory('long_form');
                  setActiveSubcategory('all');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === 'long_form'
                    ? 'bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white shadow-[0_0_20px_rgba(168,85,247,0.45)]'
                    : 'text-[#9c95b3] hover:text-white'
                }`}
              >
                Long-Form
              </button>
            </div>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {availableSubcategories.map((sub) => (
                <button
                  key={sub.value}
                  onClick={() => setActiveSubcategory(sub.value)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    activeSubcategory === sub.value
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-[#120f20] border border-[#241e3a] text-[#9c95b3] hover:text-white hover:border-[#382f59]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-3xl bg-[#0f0c18] border border-[#221c38]">
              <Filter className="w-10 h-10 text-[#716a8c] mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No projects found in this category</h3>
              <p className="text-xs text-[#716a8c] mb-4">Try selecting All Projects to view all available video edits.</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setActiveSubcategory('all');
                }}
                className="px-5 py-2 rounded-full bg-[#9333ea] text-white font-bold text-xs uppercase hover:bg-[#a855f7] transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)]"
              >
                Show All Projects
              </button>
            </div>
          ) : activeCategory === 'all' && activeSubcategory === 'all' ? (
            /* GROUPED VIEW: Short-Form First, Then Long-Form */
            <div className="space-y-16">
              {/* Group 1: Short-Form Videos */}
              {shortFormProjects.length > 0 && (
                <section className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#211b33] gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#1d1433] border border-[#332357] flex items-center justify-center text-[#c084fc]">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                          Short-Form Content
                        </h2>
                        <p className="text-xs text-[#9c95b3]">
                          Creators / Influencers &bull; Ad Reels &bull; Brand Promotion
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#c084fc] px-2.5 py-1 rounded-full bg-[#181229] border border-[#302352]">
                        9:16 Vertical
                      </span>
                      <span className="text-xs text-[#807999] font-medium">
                        {shortFormProjects.length} Videos
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {shortFormProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onSelect={setSelectedProject}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Group 2: Long-Form Videos */}
              {longFormProjects.length > 0 && (
                <section className="space-y-6 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#211b33] gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#1d1433] border border-[#332357] flex items-center justify-center text-[#c084fc]">
                        <Clapperboard className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                          Long-Form Content
                        </h2>
                        <p className="text-xs text-[#9c95b3]">
                          Podcasts &bull; Advertisements &bull; Brand Commercials
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#c084fc] px-2.5 py-1 rounded-full bg-[#181229] border border-[#302352]">
                        16:9 Widescreen
                      </span>
                      <span className="text-xs text-[#807999] font-medium">
                        {longFormProjects.length} Videos
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {longFormProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onSelect={setSelectedProject}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : activeCategory === 'short_form' || (activeCategory === 'all' && activeSubcategory !== 'all' && filteredProjects.every((p) => p.category === 'short_form')) ? (
            /* FILTERED SHORT-FORM GRID */
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            /* FILTERED LONG-FORM GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-20 p-8 rounded-3xl bg-[#0e0b17] border border-[#211b33] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Have a video project in mind?
              </h3>
              <p className="text-xs text-[#9c95b3]">
                Let&apos;s talk about pacing, narrative structure, and fast delivery timelines.
              </p>
            </div>

            <Link
              href="/#contact"
              className="px-6 py-3 rounded-full bg-[#9333ea] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#a855f7] transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Video Modal Player */}
      {selectedProject && (
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
