'use client';

import { useState } from 'react';
import {
  Check,
  Sparkles,
  ArrowRight,
  Clock,
  RotateCcw,
  X,
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  category: string;
  title: string;
  startingPrice: string;
  shortDesc: string;
  tiers?: {
    name: string;
    price: string;
    duration: string;
    desc: string;
    includes: string[];
    revisions: string;
    delivery: string;
    bestFor?: string;
  }[];
  packages?: {
    name: string;
    price: string;
    savings?: string;
  }[];
  notes?: string;
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'reels-shorts',
    category: 'REELS & SHORTS',
    title: 'Short Form Video',
    startingPrice: '₹800',
    shortDesc: 'High-energy vertical videos tailored for Instagram Reels, TikTok, and YouTube Shorts.',
    tiers: [
      {
        name: 'Basic',
        price: '₹800 / video',
        duration: 'Up to 60 seconds',
        desc: 'For simple social-media content and talking-head videos.',
        includes: [
          'Up to 60 seconds final video',
          'Clean cuts & narrative pacing',
          'Basic transitions & jump-cuts',
          'Background music integration',
          'Basic sound effects (SFX)',
          'Color correction',
          'Clean captions / subtitles',
          'B-roll footage placement',
        ],
        revisions: '2 revisions included',
        delivery: '2–3 day turnaround',
        bestFor: 'Talking-head videos, simple Instagram Reels, informational Shorts.',
      },
      {
        name: 'Advanced',
        price: '₹1,500 / video',
        duration: 'Up to 60 seconds',
        desc: 'For high-retention, dynamic content engineered for virality.',
        includes: [
          'Up to 60 seconds final video',
          'Advanced pacing & micro-hooks',
          'Dynamic kinetic captions',
          'Custom motion graphics',
          'Contextual B-roll & stock footage',
          'Layered sound design & SFX',
          'Advanced whip & zoom transitions',
          'Cinematic color grading',
          'Beat-synced music editing',
          'Speed ramps & punch-in zooms',
        ],
        revisions: '3 revisions included',
        delivery: '2–4 day turnaround',
        bestFor: 'Creators, personal brands, promotional content, and high-energy Reels.',
      },
    ],
  },
  {
    id: 'youtube',
    category: 'YOUTUBE',
    title: 'YouTube Editing',
    startingPrice: '₹1,200',
    shortDesc: 'Hook-focused YouTube Shorts and retention-engineered long-form video editing.',
    tiers: [
      {
        name: 'Short-Form',
        price: '₹1,200 / video',
        duration: 'Up to 60 seconds',
        desc: 'Hook-focused YouTube Shorts with high retention architecture.',
        includes: [
          'Up to 60 seconds duration',
          'Retention-engineered hook editing',
          'Dynamic kinetic captions',
          'B-roll & stock footage placement',
          'Layered sound effects',
          'Background music mixing',
          'Motion graphics overlays',
          'Color correction & polish',
        ],
        revisions: '3 revisions included',
        delivery: '2–4 day turnaround',
        bestFor: 'YouTube creators seeking higher subscriber conversion and retention.',
      },
      {
        name: 'Long-Form (Basic)',
        price: '₹2,000 – ₹3,000',
        duration: 'Up to 8 minutes',
        desc: 'Clean cuts, storytelling pacing, audio correction, and b-roll placement.',
        includes: [
          'Up to 8 minutes final video',
          'Clean narrative cuts & pacing',
          'Background music selection',
          'Basic sound effects & leveling',
          'Color correction',
          'B-roll placement',
          'Basic captions & lower thirds',
        ],
        revisions: '2 revisions included',
        delivery: '3–5 day turnaround',
        bestFor: 'Vlogs, tutorials, informational YouTube videos.',
      },
      {
        name: 'Long-Form (Advanced)',
        price: '₹3,500 – ₹5,000',
        duration: 'Up to 15 minutes',
        desc: 'Documentary-style editing with custom motion graphics and sound design.',
        includes: [
          'Up to 15 minutes final video',
          'Advanced storytelling and retention curve',
          'Curated B-roll & cinematic assets',
          'Custom motion graphics & charts',
          'Dynamic subtitles & title cards',
          'Immersive sound design',
          'Full color grading',
          'Seamless transitions & punch-ins',
        ],
        revisions: '3 revisions included',
        delivery: '4–7 day turnaround',
        bestFor: 'Documentary creators, essayists, high-production channels.',
      },
      {
        name: 'Long-Form (Extended)',
        price: '₹5,500 – ₹8,000+',
        duration: '15–30+ minutes',
        desc: 'Comprehensive multi-part projects with heavy B-roll and bespoke graphics.',
        includes: [
          '15–30 minutes final runtime',
          'Deep narrative editing',
          'Substantial B-roll research & placement',
          'Advanced motion design systems',
          'Podcast/interview multi-angle cuts',
          'Priority revisions',
        ],
        revisions: '3 revisions included',
        delivery: 'Custom schedule',
        bestFor: 'In-depth documentaries, masterclasses, and extensive video essays.',
      },
    ],
    packages: [
      { name: '5 Shorts Package', price: '₹5,500', savings: 'Save ₹500 vs individual' },
      { name: '10 Shorts Package', price: '₹10,000', savings: 'Save ₹2,000 vs individual' },
    ],
  },
  {
    id: 'podcast',
    category: 'PODCAST',
    title: 'Podcast Production',
    startingPrice: '₹1,400',
    shortDesc: 'Multicam full-length episode switching, audio cleanup, and viral short clips.',
    tiers: [
      {
        name: 'Podcast Short Clips',
        price: '₹1,000 / clip',
        duration: 'Up to 60 seconds',
        desc: 'Extract key moments into viral vertical clips for social media.',
        includes: [
          'Strong hook isolation',
          'Jump cuts & fast-paced flow',
          'Dynamic captions with highlighted words',
          'B-roll & context overlays',
          'Sound design accents',
          'Color correction',
        ],
        revisions: '2 revisions included',
        delivery: '2–3 day turnaround',
        bestFor: 'Podcasters wanting to grow on Instagram, TikTok, and YouTube Shorts.',
      },
      {
        name: 'Basic Podcast Episode',
        price: '₹1,400 – ₹2,500 / episode',
        duration: 'Up to 45–60 minutes',
        desc: 'Clean multi-camera assembly and audio balancing.',
        includes: [
          'Up to 60 minutes final runtime',
          'Multi-camera switching',
          'Clean cuts & pause/mistake removal',
          'Dialogue leveling & noise cleanup',
          'Basic color correction',
          'Intro / outro placement',
          'Background music where appropriate',
        ],
        revisions: '2 revisions included',
        delivery: '3–5 day turnaround',
        bestFor: 'Interview and conversational podcasts.',
      },
      {
        name: 'Advanced Podcast Episode',
        price: '₹3,000 – ₹4,500 / episode',
        duration: 'Up to 60 minutes',
        desc: 'High-end production with active speaker emphasis and motion graphics.',
        includes: [
          'Multi-camera dynamic switching',
          'Advanced retention pacing',
          'Pro audio restoration & vocal EQ',
          'Comprehensive color grading',
          'Relevant B-roll footage insertion',
          'Dynamic chapter titles & lower-thirds',
          'Speaker emphasis punch-ins',
          'Custom intro/outro animations',
        ],
        revisions: '3 revisions included',
        delivery: '4–6 day turnaround',
        bestFor: 'Top-tier studio podcasts looking for television-level broadcast finish.',
      },
    ],
    packages: [
      { name: '5 Podcast Clips Package', price: '₹4,500', savings: '₹900 per clip' },
      { name: '10 Podcast Clips Package', price: '₹8,000', savings: '₹800 per clip' },
    ],
  },
  {
    id: 'ads-brand',
    category: 'ADS & BRAND CONTENT',
    title: 'Commercial & Ads',
    startingPrice: '₹1,500',
    shortDesc: 'Social-media commercials, high-impact brand teasers, and creative visual ads.',
    tiers: [
      {
        name: 'Basic Brand Ad',
        price: '₹1,500 – ₹3,000',
        duration: '30–45 seconds',
        desc: 'Clean, punchy commercial for social media and marketing campaigns.',
        includes: [
          'Up to 30–45 seconds',
          'Hook-focused commercial editing',
          'Commercial-licensed music mixing',
          'Impact sound effects',
          'Basic color correction',
          'Text animation & call-to-actions',
          'Basic motion graphics',
        ],
        revisions: '2 revisions included',
        delivery: '2–4 day turnaround',
        bestFor: 'E-commerce, startup promos, and social ads.',
      },
      {
        name: 'Advanced Advertisement',
        price: '₹4,000 – ₹7,000',
        duration: 'Up to 60 seconds',
        desc: 'High-production commercial with bespoke motion graphics and sound design.',
        includes: [
          'Up to 60 seconds',
          'High-retention rhythmic editing',
          'Custom After Effects motion design',
          'Full Foley & 3D sound design',
          'Cinematic brand color grading',
          'B-roll & product footage enhancement',
          'Advanced title reveals & end cards',
        ],
        revisions: '3 revisions included',
        delivery: '4–6 day turnaround',
        bestFor: 'Product launches, agency campaigns, and high-budget brand promos.',
      },
      {
        name: 'AI / Creative Advertisement',
        price: '₹5,000 – ₹9,000+',
        duration: '30–60 seconds',
        desc: 'Groundbreaking visual campaigns combining AI generation with pro editing.',
        includes: [
          'Creative concept & storyboard support',
          'AI-generated visual & video elements',
          'Custom AI image/video generation',
          'Advanced timeline compositing',
          'Seamless motion graphics & typography',
          'Custom sound design & mixing',
          'Color match & cinematic grade',
        ],
        revisions: '3 revisions included',
        delivery: '5–8 day turnaround',
        bestFor: 'Futuristic brand spots, conceptual ads, and viral creative campaigns.',
      },
    ],
  },
];

export function PricingSection() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const handleSelectService = (service: ServiceDetail) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 border-t border-[#1a1529] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#140f24] border border-[#2b2047] text-xs font-semibold uppercase tracking-wider text-[#c084fc] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
            Services &amp; Pricing
          </h2>

          <p className="text-sm sm:text-base text-[#9c95b3] leading-relaxed">
            Clear, accessible starting rates. Click any service category to explore deliverables,
            packages, and revision terms.
          </p>
        </div>

        {/* 4 Clean Minimal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => handleSelectService(service)}
              className="group cursor-pointer rounded-3xl bg-[#0e0b17] border border-[#201933] p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#a855f7]/60 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(168,85,247,0.15)]"
            >
              <div>
                <div className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#8b84a3] mb-2">
                  {service.category}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#c084fc] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-[#9c95b3] leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1a1529] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#716a8c] block uppercase font-medium">Starting from</span>
                  <span className="text-base font-black text-[#c084fc] font-mono">
                    {service.startingPrice}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white group-hover:text-[#c084fc] uppercase tracking-wider transition-colors">
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Quote Underneath Banner */}
        <div className="p-8 rounded-3xl bg-[#0e0b17] border border-[#201933] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
              Have a different project in mind?
            </h3>
            <p className="text-xs sm:text-sm text-[#9c95b3] max-w-xl">
              Every project is different. Send me your requirements and raw footage details,
              and I&apos;ll provide a custom quote.
            </p>
          </div>

          <a
            href="/#contact"
            className="shrink-0 px-6 py-3 rounded-full bg-[#9333ea] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#a855f7] transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)]"
          >
            Get A Custom Quote &rarr;
          </a>
        </div>
      </div>

      {/* SERVICE DETAIL MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
          <div className="fixed inset-0" onClick={closeModal} />

          <div className="relative z-10 w-full max-w-2xl my-auto rounded-3xl bg-[#0e0b17] border border-[#261f3b] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1c162e] mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#c084fc]">
                  {selectedService.category}
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mt-1">
                  {selectedService.title}
                </h3>
              </div>

              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg bg-[#161126] text-[#9c95b3] hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Service Tiers */}
            <div className="space-y-5">
              {selectedService.tiers?.map((tier) => (
                <div
                  key={tier.name}
                  className="p-5 rounded-2xl bg-[#120e1f] border border-[#221b38] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-white">{tier.name}</h4>
                      <p className="text-xs text-[#9c95b3]">{tier.desc}</p>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-base font-black text-[#c084fc] font-mono">
                        {tier.price}
                      </span>
                    </div>
                  </div>

                  {/* Included List */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#7e7799] mb-2">
                      Includes:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tier.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-xs text-[#ded9ee]">
                          <Check className="w-3.5 h-3.5 text-[#c084fc] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta Strip */}
                  <div className="pt-3 border-t border-[#1a142c] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#9c95b3]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#a855f7]" />
                        {tier.delivery}
                      </span>
                      <span className="flex items-center gap-1">
                        <RotateCcw className="w-3 h-3 text-[#a855f7]" />
                        {tier.revisions}
                      </span>
                    </div>

                    {tier.bestFor && (
                      <span className="text-[#8e87a6] italic text-[10px]">
                        Best for: {tier.bestFor}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Package Options if available */}
              {selectedService.packages && (
                <div className="p-5 rounded-2xl bg-[#120e1f] border border-[#271e40]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#c084fc] mb-3">
                    Available Packages (Bulk Savings)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.packages.map((pkg) => (
                      <div
                        key={pkg.name}
                        className="p-3.5 rounded-xl bg-[#19142b] border border-[#2f244f] flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{pkg.name}</div>
                          {pkg.savings && (
                            <div className="text-[10px] text-[#c084fc]">{pkg.savings}</div>
                          )}
                        </div>
                        <div className="text-sm font-black text-white font-mono">
                          {pkg.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-[#1c162e] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#7e7799]">
                Ready to get started on this project?
              </span>

              <a
                href="/#contact"
                onClick={closeModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#9333ea] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#a855f7] transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                <span>Select &amp; Inquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
