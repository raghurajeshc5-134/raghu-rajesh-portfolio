'use client';

import Image from 'next/image';
import { Film, Zap, Sparkles, Sliders, ShieldCheck } from 'lucide-react';

export function AboutSection() {
  const pillars = [
    {
      icon: Film,
      title: 'Storytelling & Structure',
      desc: 'Crafting raw multicam and b-roll footage into a cohesive narrative that grabs attention from the first 3 seconds.',
    },
    {
      icon: Zap,
      title: 'Retention-Driven Pacing',
      desc: 'Precision jump cuts, rhythmic zooms, and psychological micro-hooks that maximize watch time on algorithmic platforms.',
    },
    {
      icon: Sparkles,
      title: 'Kinetic Motion Graphics',
      desc: 'Custom animated subtitles, dynamic lower thirds, and UI motion graphics that make complex concepts visual.',
    },
    {
      icon: Sliders,
      title: 'Audio Mastering & Color',
      desc: 'Dialogue noise reduction, rich Foley soundscapes, and cinematic color palettes matching brand aesthetics.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 border-t border-[#1a1529] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header with Raghu's Profile Photo */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          {/* Profile Photo Frame */}
          <div className="relative mb-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#9333ea] via-[#c084fc] to-[#7e22ce] shadow-[0_0_35px_rgba(168,85,247,0.35)]">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0e0b17] border-2 border-[#08060d]">
                <Image
                  src="/raghu-profile.jpg"
                  alt="Raghu Rajesh — Video Editor & Motion Designer"
                  fill
                  priority
                  sizes="(max-width: 768px) 112px, 128px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Active Status Badge (Green) */}
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#120f20] border-2 border-[#08060d] flex items-center justify-center shadow-[0_0_8px_rgba(34,197,94,0.6)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
            RAGHU RAJESH
          </h2>

          <p className="text-xs sm:text-sm text-[#c084fc] font-mono uppercase tracking-wider font-semibold mb-4">
            Video Editor &bull; Motion Designer
          </p>

          <p className="text-sm text-[#9c95b3] leading-relaxed">
            I help content creators, agencies, and brands turn raw ideas into high-retention video
            assets that captivate audiences and drive conversions.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-14">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-[#0e0b17] border border-[#201933] hover:border-[#a855f7]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#171129] border border-[#2b2047] flex items-center justify-center text-[#c084fc]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#716a8c]">0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">{pillar.title}</h3>
                <p className="text-xs text-[#9c95b3] leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Software & Tools Suite */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0b17] border border-[#201933]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1c162e]">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                Software &amp; Post-Production Pipeline
              </h3>
              <p className="text-xs text-[#7e7799] mt-0.5">
                Industry-standard Adobe Creative Cloud workflows.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161129] border border-[#2b214c] text-[11px] text-[#c084fc]">
              <span className="w-2 h-2 rounded-full bg-[#c084fc]" />
              <span>4K / 60FPS / Multi-Camera</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#120e1f] border border-[#241c3b] flex items-center gap-4 sm:gap-5 hover:border-[#5c5cff]/40 transition-colors shadow-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#00005b] to-[#04043b] border-2 border-[#5c5cff] text-[#9999ff] flex items-center justify-center font-black text-2xl sm:text-3xl shrink-0 shadow-[0_0_20px_rgba(92,92,255,0.3)] tracking-tight">
                Pr
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-white mb-1">
                  Adobe Premiere Pro
                </h4>
                <p className="text-xs sm:text-[13px] text-[#9c95b3] leading-relaxed">
                  Timeline editing, multicam sync, narrative pacing, and Lumetri color grading.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-[#120e1f] border border-[#241c3b] flex items-center gap-4 sm:gap-5 hover:border-[#b845ff]/40 transition-colors shadow-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#00005b] to-[#20003b] border-2 border-[#b845ff] text-[#e099ff] flex items-center justify-center font-black text-2xl sm:text-3xl shrink-0 shadow-[0_0_20px_rgba(184,69,255,0.3)] tracking-tight">
                Ae
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-white mb-1">
                  Adobe After Effects
                </h4>
                <p className="text-xs sm:text-[13px] text-[#9c95b3] leading-relaxed">
                  Kinetic typography, motion tracking, visual effects, and animated assets.
                </p>
              </div>
            </div>
          </div>

          {/* Discreet Disclaimer */}
          <div className="mt-6 pt-5 border-t border-[#1c162e] flex items-start gap-2.5 text-[11px] text-[#7e7799]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7e7799] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Selected portfolio work includes projects created as part of professional client and
              collaborative engagements. Highlights reflect individual video editing, motion design,
              and post-production contributions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
