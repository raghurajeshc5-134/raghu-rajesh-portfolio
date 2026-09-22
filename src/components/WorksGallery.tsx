'use client';

import { useState } from 'react';
import { Film, Filter } from 'lucide-react';
import { Project, ProjectCategory, ProjectSubcategory } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

interface WorksGalleryProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function WorksGallery({ projects, onSelectProject }: WorksGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | ProjectCategory>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<'all' | ProjectSubcategory>('all');

  const subcategoryFilters: { label: string; value: 'all' | ProjectSubcategory; forCategory?: ProjectCategory }[] = [
    { label: 'All Subcategories', value: 'all' },
    // Short Form
    { label: 'Creators / Influencers', value: 'creators_influencers', forCategory: 'short_form' },
    { label: 'Ad Reels', value: 'ad_reels', forCategory: 'short_form' },
    { label: 'Brand Promotion', value: 'brand_promotion', forCategory: 'short_form' },
    // Long Form
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

  const availableSubcategories = subcategoryFilters.filter(
    (item) => item.value === 'all' || !activeCategory || activeCategory === 'all' || item.forCategory === activeCategory
  );

  return (
    <section id="works" className="py-24 px-4 sm:px-6 border-t border-[#1a1529] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#140f24] border border-[#2b2047] text-xs font-semibold uppercase tracking-wider text-[#c084fc] mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>Complete Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
            Works &amp; Case Studies
          </h2>

          <p className="text-sm sm:text-base text-[#9c95b3]">
            Explore high-retention vertical edits and cinematic long-form videos.
          </p>
        </div>

        {/* Category Switcher (Without counts as requested) */}
        <div className="flex flex-col items-center justify-center gap-4 mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-[#0e0b17] border border-[#221c38] shadow-inner max-w-full overflow-x-auto">
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveSubcategory('all');
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#9333ea] text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                  : 'text-[#9c95b3] hover:text-white'
              }`}
            >
              All Works
            </button>

            <button
              onClick={() => {
                setActiveCategory('short_form');
                setActiveSubcategory('all');
              }}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'short_form'
                  ? 'bg-[#9333ea] text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]'
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
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'long_form'
                  ? 'bg-[#9333ea] text-white shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                  : 'text-[#9c95b3] hover:text-white'
              }`}
            >
              Long-Form
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
            {availableSubcategories.map((sub) => (
              <button
                key={sub.value}
                onClick={() => setActiveSubcategory(sub.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeSubcategory === sub.value
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#120f20] border border-[#231d36] text-[#9c95b3] hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 px-4 rounded-3xl bg-[#0e0b17] border border-[#201933]">
            <Filter className="w-10 h-10 text-[#7e7799] mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No projects in this filter</h3>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveSubcategory('all');
              }}
              className="mt-3 px-5 py-2 rounded-full bg-[#9333ea] text-white font-bold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
