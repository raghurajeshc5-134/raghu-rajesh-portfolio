'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Works', href: '/#works' },
    { name: 'About', href: '/#about' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08060d]/85 backdrop-blur-md border-b border-[#1f1931] py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Profile Avatar */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#9333ea]/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Image
                src="/raghu-profile.jpg"
                alt="Raghu Rajesh"
                fill
                sizes="36px"
                className="object-cover object-center"
              />
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm sm:text-base block uppercase text-white">
                RAGHU RAJESH
              </span>
              <span className="text-[10px] text-[#9c95b3] tracking-wider block uppercase font-medium">
                Video Editor &bull; Motion Designer
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-wider text-[#9c95b3] hover:text-[#c084fc] transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="h-4 w-[1px] bg-[#261e3b]" />

            {/* Social Icons (Instagram & LinkedIn only) */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/ragu_rajh/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#140f21] border border-[#271e3d] text-[#9c95b3] hover:text-[#c084fc] hover:border-[#a855f7]/50 transition-all"
                aria-label="Instagram Profile"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/raghu-rajesh-3378a0327"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#140f21] border border-[#271e3d] text-[#9c95b3] hover:text-[#c084fc] hover:border-[#a855f7]/50 transition-all"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>

            {/* CTA Button */}
            <a
              href="/#contact"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#9333ea] text-white text-xs font-semibold uppercase tracking-wider transition-all hover:bg-[#a855f7] hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] active:scale-95"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="https://www.instagram.com/ragu_rajh/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#140f21] border border-[#271e3d] text-[#9c95b3]"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://www.linkedin.com/in/raghu-rajesh-3378a0327"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#140f21] border border-[#271e3d] text-[#9c95b3]"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#140f21] border border-[#271e3d] text-[#9c95b3] hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0914] border-b border-[#221c38] px-6 py-6 space-y-4 animate-in fade-in">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#9c95b3] hover:text-[#c084fc] py-1 transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1e1733] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/ragu_rajh/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#140f21] border border-[#271e3d] text-[#9c95b3] hover:text-[#c084fc]"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/raghu-rajesh-3378a0327"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#140f21] border border-[#271e3d] text-[#9c95b3] hover:text-[#c084fc]"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-full bg-[#9333ea] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
