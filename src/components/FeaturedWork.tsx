'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';

interface FeaturedWorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function FeaturedWork({ projects, onSelectProject }: FeaturedWorkProps) {
  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#181820]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141a] border border-[#242430] text-xs font-semibold uppercase tracking-wider text-[#d0ff71] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Featured Work
            </h2>
          </div>

          <a
            href="#works"
            className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#d0ff71] hover:text-white transition-colors"
          >
            <span>View All Projects ({projects.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-8 rounded-2xl bg-[#0f0f14] border border-[#1f1f28] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              Want to see more category-specific edits?
            </h3>
            <p className="text-sm text-[#94949e]">
              Filter by podcasts, commercials, YouTube documentary edits, or vertical reels.
            </p>
          </div>

          <a
            href="#works"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d0ff71] transition-all"
          >
            <span>Explore Full Works Archive</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
