import { Suspense } from 'react';
import { INITIAL_PROJECTS } from '@/lib/fallback-data';
import { WorksPageContent } from '@/components/WorksPageContent';

export const metadata = {
  title: 'Works & Case Studies — Raghu Rajesh',
  description:
    'Browse selected video editing and motion design work by Raghu Rajesh, including long-form podcasts, commercial ads, YouTube documentaries, and viral shorts.',
};

export default function WorksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08060d] flex items-center justify-center text-white">
          <div className="w-8 h-8 border-2 border-[#a855f7] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <WorksPageContent initialProjects={INITIAL_PROJECTS} />
    </Suspense>
  );
}
