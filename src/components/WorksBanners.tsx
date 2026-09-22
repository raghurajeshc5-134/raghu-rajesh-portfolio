'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Film, Play } from 'lucide-react';

export function WorksBanners() {
  return (
    <section id="works" className="py-24 px-4 sm:px-6 border-t border-[#1a1529] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#140f24] border border-[#2b2047] text-xs font-semibold uppercase tracking-wider text-[#c084fc] mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>Curated Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
            Selected Works
          </h2>

          <p className="text-sm sm:text-base text-[#9c95b3] leading-relaxed">
            Choose a format below to explore case studies, retention-driven edits, and video breakdowns.
          </p>
        </div>

        {/* 2 Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Banner 1: Short-Form Edits */}
          <Link
            href="/works?category=short_form"
            className="group relative rounded-3xl bg-[#0e0b17] border border-[#201933] overflow-hidden p-8 sm:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] transition-all duration-300 hover:border-[#a855f7]/60 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(168,85,247,0.18)]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
                alt="Short Form Edits"
                fill
                className="object-cover object-center opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08060d] via-[#08060d]/70 to-[#08060d]/40" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#2c2247] text-[10px] font-mono font-bold uppercase tracking-wider text-[#c084fc]">
                9:16 Vertical Content
              </span>

              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#9333ea] transition-colors">
                <Play className="w-4 h-4 ml-0.5 fill-current" />
              </div>
            </div>

            <div className="relative z-10 pt-16">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#c084fc] transition-colors">
                Short-Form Edits
              </h3>

              <p className="text-xs sm:text-sm text-[#9c95b3] leading-relaxed mb-4 max-w-sm">
                Creators / Influencers &bull; Ad Reels &bull; Brand Promotion with hook pacing and
                kinetic captions.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#c084fc] transition-colors">
                <span>Explore Short-Form Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Banner 2: Long-Form Edits */}
          <Link
            href="/works?category=long_form"
            className="group relative rounded-3xl bg-[#0e0b17] border border-[#201933] overflow-hidden p-8 sm:p-10 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] transition-all duration-300 hover:border-[#a855f7]/60 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(168,85,247,0.18)]"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop"
                alt="Long Form Edits"
                fill
                className="object-cover object-center opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08060d] via-[#08060d]/70 to-[#08060d]/40" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#2c2247] text-[10px] font-mono font-bold uppercase tracking-wider text-[#c084fc]">
                16:9 Cinematic Video
              </span>

              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#9333ea] transition-colors">
                <Play className="w-4 h-4 ml-0.5 fill-current" />
              </div>
            </div>

            <div className="relative z-10 pt-16">
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#c084fc] transition-colors">
                Long-Form Edits
              </h3>

              <p className="text-xs sm:text-sm text-[#9c95b3] leading-relaxed mb-4 max-w-sm">
                Podcasts &bull; Advertisements &bull; Brand Films with narrative multicam pacing and
                audio mastering.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#c084fc] transition-colors">
                <span>Explore Long-Form Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Browse All Projects Button */}
        <div className="text-center pt-2">
          <Link
            href="/works"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#9333ea] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#a855f7] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all active:scale-95"
          >
            <span>Browse All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
