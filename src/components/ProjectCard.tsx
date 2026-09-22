'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Play, Clock } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isVertical = project.aspect_ratio === '9:16' || project.category === 'short_form';
  const isLocalVideo = project.video_url?.startsWith('/videos/');

  const ytMatch = project.video_url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  const ytThumbnail = ytMatch ? `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg` : null;
  const activeThumbnail = (project.thumbnail_url && !project.thumbnail_url.startsWith('/videos/')) ? project.thumbnail_url : ytThumbnail;

  const formatSubcategory = (sub: string) => {
    switch (sub) {
      case 'creators_influencers':
        return 'Creators / Influencers';
      case 'ad_reels':
        return 'Ad Reels';
      case 'brand_promotion':
        return 'Brand Promotion';
      case 'podcasts':
        return 'Podcasts';
      case 'advertisements':
        return 'Advertisements';
      default:
        return 'Video Edit';
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0.5;
    }
  };

  return (
    <div
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative cursor-pointer flex flex-col rounded-2xl bg-[#0e0b17] border border-[#211b33] overflow-hidden transition-all duration-300 hover:border-[#a855f7]/70 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(168,85,247,0.25)] ${
        isVertical ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {/* Video Banner Media Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#141021]">
        {activeThumbnail ? (
          <Image
            src={activeThumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : isLocalVideo ? (
          <video
            ref={videoRef}
            src={`${encodeURI(project.video_url)}#t=0.5`}
            preload="metadata"
            muted
            playsInline
            loop
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a142e] to-[#0c0915] flex items-center justify-center">
            <Play className="w-12 h-12 text-[#9333ea]/40" />
          </div>
        )}

        {/* Ambient Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08060d] via-[#08060d]/30 to-[#08060d]/60 opacity-80 group-hover:opacity-60 transition-opacity" />
      </div>

      {/* Top Header inside Banner */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between gap-2">
        <span className="px-2.5 py-1 rounded-full bg-[#08060d]/85 backdrop-blur-md border border-[#2f274a] text-[10px] font-semibold text-[#c084fc] uppercase tracking-wider shadow-sm">
          {formatSubcategory(project.subcategory)}
        </span>

        {project.duration && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] text-white/90 font-mono shadow-sm">
            <Clock className="w-3 h-3 text-[#a855f7]" />
            {project.duration}
          </span>
        )}
      </div>

      {/* Center Play Button Indicator */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#a855f7] group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]">
          <Play className="w-5 h-5 ml-0.5 fill-current" />
        </div>
      </div>

      {/* Bottom of Banner: Video Name & Client Brand Overlay */}
      <div className="relative z-10 p-4 sm:p-5 bg-gradient-to-t from-[#08060d] via-[#08060d]/90 to-transparent pt-12">
        {project.client_name && (
          <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#a855f7] mb-1">
            {project.client_name}
          </span>
        )}

        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#c084fc] transition-colors leading-snug line-clamp-2 drop-shadow-md">
          {project.title}
        </h3>
      </div>
    </div>
  );
}
