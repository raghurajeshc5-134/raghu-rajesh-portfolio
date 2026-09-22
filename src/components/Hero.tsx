'use client';

import { Play, ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Deep purple radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-[#9333ea]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[280px] h-[280px] bg-[#a855f7]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120f1e] border border-[#271f3e] mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c084fc]">
            Video Editor &bull; Motion Designer
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] mb-6">
          Transforming Footage Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e9d5ff] to-[#a855f7]">
            Visual Impact
          </span>
        </h1>

        {/* Concise Supporting Copy */}
        <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[#9c95b3] leading-relaxed mb-10 font-normal">
          High-retention editing, kinetic motion graphics, and narrative pacing crafted for ambitious
          creators, agencies, and brands.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <a
            href="#works"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#9333ea] text-white font-bold text-xs uppercase tracking-wider transition-all hover:bg-[#a855f7] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>View Works</span>
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#120f20] border border-[#261f3b] text-white font-bold text-xs uppercase tracking-wider transition-all hover:border-[#a855f7]/50 hover:bg-[#19152b] active:scale-95"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c084fc]" />
          </a>
        </div>

        {/* Software / Tools strip */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-[#1d172e]">
          <span className="text-[11px] font-medium text-[#7e7799] uppercase tracking-wider mr-1">
            Primary Tools:
          </span>

          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#110e1c] border border-[#261e3d] text-xs text-white shadow-sm">
            <span className="w-5 h-5 rounded-md bg-[#00005b] border border-[#5c5cff] text-[#9999ff] text-[10px] font-black flex items-center justify-center">
              Pr
            </span>
            <span className="font-bold text-xs">Adobe Premiere Pro</span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#110e1c] border border-[#261e3d] text-xs text-white shadow-sm">
            <span className="w-5 h-5 rounded-md bg-[#00005b] border border-[#b845ff] text-[#e099ff] text-[10px] font-black flex items-center justify-center">
              Ae
            </span>
            <span className="font-bold text-xs">Adobe After Effects</span>
          </div>
        </div>

        {/* Metrics Strip (Views count removed, 40+ projects, 48 to 72h turnaround) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto mt-12">
          <div className="p-4 rounded-2xl bg-[#0f0c18] border border-[#211b36] shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-[#c084fc] font-mono">40+</div>
            <div className="text-[11px] text-[#8e87a6] mt-0.5 font-medium">Projects Delivered</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0f0c18] border border-[#211b36] shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">48–72h</div>
            <div className="text-[11px] text-[#8e87a6] mt-0.5 font-medium">Turnaround</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#0f0c18] border border-[#211b36] shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
            <div className="text-[11px] text-[#8e87a6] mt-0.5 font-medium">Retention Pacing</div>
          </div>
        </div>
      </div>
    </section>
  );
}
