'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp, Shield } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#06040a] border-t border-[#1a1429] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-1.5">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#9333ea]/60">
              <Image
                src="/raghu-profile.jpg"
                alt="Raghu Rajesh"
                fill
                sizes="24px"
                className="object-cover object-center"
              />
            </div>
            <span className="font-bold tracking-tight text-sm uppercase text-white">
              RAGHU RAJESH
            </span>
          </div>
          <p className="text-[11px] text-[#7e7799]">
            Video Editor &bull; Motion Designer
          </p>
        </div>

        {/* Social Icons Only: Instagram & LinkedIn */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/ragu_rajh/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#120e1f] border border-[#261e3d] text-[#9c95b3] hover:text-[#c084fc] hover:border-[#a855f7]/50 transition-all"
            aria-label="Instagram Profile"
            title="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/raghu-rajesh-3378a0327"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-[#120e1f] border border-[#261e3d] text-[#9c95b3] hover:text-[#c084fc] hover:border-[#a855f7]/50 transition-all"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>

          <Link
            href="/admin"
            className="p-2.5 rounded-xl bg-[#120e1f] border border-[#261e3d] text-[#58516d] hover:text-[#c084fc] hover:border-[#a855f7]/50 transition-all"
            aria-label="Admin Portal"
            title="Admin"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>

        {/* Back to top & Copyright */}
        <div className="flex items-center gap-4 text-[11px] text-[#7e7799]">
          <span>&copy; 2026 Raghu Rajesh. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-[#120e1f] border border-[#261e3d] text-[#9c95b3] hover:text-[#c084fc] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
