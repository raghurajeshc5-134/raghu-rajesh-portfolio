import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Raghu Rajesh — Video Editor & Motion Designer',
  description:
    'Portfolio of Raghu Rajesh, a video editor and motion designer specializing in long-form videos, podcasts, advertisements, reels, shorts, and motion graphics.',
  keywords: [
    'Video Editor',
    'Motion Designer',
    'Adobe Premiere Pro',
    'Adobe After Effects',
    'Podcast Video Editing',
    'Commercial Video Editing',
    'Instagram Reels Editing',
    'YouTube Shorts',
    'Raghu Rajesh',
  ],
  authors: [{ name: 'Raghu Rajesh' }],
  creator: 'Raghu Rajesh',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Raghu Rajesh — Video Editor & Motion Designer',
    description:
      'Crafting high-retention video edits and motion design that elevate brands, captivate audiences, and convert viewers into loyal clients.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Raghu Rajesh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raghu Rajesh — Video Editor & Motion Designer',
    description:
      'Specializing in narrative pacing, kinetic motion graphics, and high-converting video edits.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`} suppressHydrationWarning>
      <body
        className="bg-[#08060d] text-[#f6f5fa] min-h-screen flex flex-col antialiased selection:bg-[#9333ea] selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
