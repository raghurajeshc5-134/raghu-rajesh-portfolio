'use client';

import { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, Film } from 'lucide-react';
import { Project } from '@/lib/types';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export function VideoModal({ project, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&title=0&byline=0&portrait=0`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(project.video_url);
  const isDirectVideo = !embedUrl && (
    project.video_url.endsWith('.mp4') || 
    project.video_url.endsWith('.webm') || 
    project.video_url.endsWith('.mov') ||
    project.video_url.startsWith('/videos/')
  );
  const isVertical = project.aspect_ratio === '9:16';

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
        return sub.replace('_', ' ');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        className={`relative z-10 w-full ${
          isVertical ? 'max-w-xl' : 'max-w-4xl'
        } my-auto rounded-3xl bg-[#0e0b17] border border-[#261f3b] shadow-2xl overflow-hidden`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1931] bg-[#0a0812]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7]" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#c084fc]">
              {project.category.replace('_', ' ')} &bull; {formatSubcategory(project.subcategory)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#161224] text-[#9c95b3] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div
          className={`relative bg-black flex items-center justify-center ${
            isVertical ? 'aspect-[9/16] max-h-[65vh] mx-auto' : 'aspect-video w-full'
          }`}
        >
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : isDirectVideo ? (
            <video
              src={encodeURI(project.video_url)}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-8">
              <Film className="w-12 h-12 text-[#9c95b3] mx-auto mb-3" />
              <p className="text-sm text-[#9c95b3] mb-4">External Video Preview</p>
              <a
                href={project.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#9333ea] text-white font-bold text-xs uppercase"
              >
                <span>Watch on Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {project.title}
            </h2>
            {project.client_name && (
              <span className="text-xs text-[#a855f7] font-mono font-medium">
                Client: {project.client_name}
              </span>
            )}
          </div>

          <a
            href="/#contact"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#9333ea] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#a855f7] transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] shrink-0"
          >
            <span>Discuss Similar Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
