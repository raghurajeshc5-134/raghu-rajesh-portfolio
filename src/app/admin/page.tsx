'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Plus,
  Trash2,
  Edit2,
  Star,
  Film,
  Mail,
  ArrowLeft,
  AlertCircle,
  Database,
  X,
} from 'lucide-react';
import { Project, Inquiry, ProjectCategory, ProjectSubcategory } from '@/lib/types';
import { INITIAL_PROJECTS } from '@/lib/fallback-data';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'inquiries' | 'setup'>('projects');

  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [dataSource, setDataSource] = useState<'supabase' | 'local_fallback'>('local_fallback');
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  useEffect(() => {
    const savedKey = sessionStorage.getItem('raghu_admin_key');
    if (savedKey) {
      setAdminKey(savedKey);
      fetchAdminData(savedKey);
    }
  }, []);

  const fetchAdminData = async (key: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin', {
        headers: { 'x-admin-key': key },
      });

      if (!res.ok) {
        throw new Error('Invalid Secret Key');
      }

      const data = await res.json();
      setProjects(data.projects || INITIAL_PROJECTS);
      setInquiries(data.inquiries || []);
      setDataSource(data.source);
      setIsAuthenticated(true);
      sessionStorage.setItem('raghu_admin_key', key);
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    fetchAdminData(adminKey);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('raghu_admin_key');
    setIsAuthenticated(false);
    setAdminKey('');
  };

  const handleOpenAddModal = () => {
    setEditingProject({
      id: crypto.randomUUID(),
      title: '',
      slug: '',
      category: 'short_form',
      subcategory: 'creators_influencers',
      description: '',
      thumbnail_url: '',
      video_url: '',
      client_name: '',
      role: 'Video Editor & Motion Designer',
      software: ['Adobe Premiere Pro', 'Adobe After Effects'],
      featured: false,
      display_order: projects.length + 1,
      published: true,
      aspect_ratio: '9:16',
      duration: '',
    });
    setModalError('');
    setModalSuccess('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProject({ ...project });
    setModalError('');
    setModalSuccess('');
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.thumbnail_url || !editingProject?.video_url) {
      setModalError('Title, Thumbnail URL, and Video URL are required.');
      return;
    }

    const slug =
      editingProject.slug?.trim() ||
      editingProject.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const projectToSave: Project = {
      id: editingProject.id || crypto.randomUUID(),
      title: editingProject.title.trim(),
      slug,
      category: editingProject.category || 'short_form',
      subcategory: editingProject.subcategory || 'creators_influencers',
      description: editingProject.description || '',
      thumbnail_url: editingProject.thumbnail_url.trim(),
      video_url: editingProject.video_url.trim(),
      client_name: editingProject.client_name?.trim() || null,
      role: editingProject.role?.trim() || 'Video Editor & Motion Designer',
      software: Array.isArray(editingProject.software) ? editingProject.software : ['Adobe Premiere Pro'],
      featured: !!editingProject.featured,
      display_order: Number(editingProject.display_order) || 1,
      published: editingProject.published ?? true,
      aspect_ratio: editingProject.aspect_ratio || '9:16',
      duration: editingProject.duration?.trim() || null,
    };

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(projectToSave),
      });

      const result = await res.json();
      if (!res.ok || result.error) {
        throw new Error(result.error || 'Failed to save project');
      }

      setProjects((prev) => {
        const existingIdx = prev.findIndex((p) => p.id === projectToSave.id);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = projectToSave;
          return updated;
        }
        return [...prev, projectToSave];
      });

      setModalSuccess('Project saved successfully!');
      setTimeout(() => {
        setIsModalOpen(false);
        setModalSuccess('');
      }, 800);
    } catch (err: unknown) {
      setModalError(err instanceof Error ? err.message : 'Error saving project');
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });

      if (!res.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const toggleFeatured = async (project: Project) => {
    const updated = { ...project, featured: !project.featured };
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(updated),
      });
      setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
    } catch (err) {
      console.error(err);
    }
  };

  const togglePublished = async (project: Project) => {
    const updated = { ...project, published: !project.published };
    try {
      await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(updated),
      });
      setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08060d] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0f0c18] border border-[#231d38] shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#171226] border border-[#2d224a] text-[#c084fc] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              Portfolio Admin
            </h1>
            <p className="text-xs text-[#9c95b3] mt-1">
              Enter your Admin Secret Key to manage projects and view client inquiries.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#9c95b3] mb-2">
                Secret Passkey
              </label>
              <input
                type="password"
                required
                placeholder="Enter ADMIN_SECRET_KEY..."
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#140f21] border border-[#271f3e] text-white text-sm focus:outline-none focus:border-[#a855f7] transition-colors"
              />
              <p className="text-[11px] text-[#7e7799] mt-1.5">
                Default local passkey: <code className="text-[#c084fc]">raghu-edit-2026</code>
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-[#9333ea] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#a855f7] transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            >
              {isLoading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-[#7e7799] hover:text-[#c084fc] transition-colors">
                &larr; Back to Portfolio
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08060d] text-white font-sans">
      <header className="border-b border-[#201a33] bg-[#0c0914] px-4 sm:px-8 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-[#140f21] text-[#9c95b3] hover:text-white border border-[#271f3e]"
              title="View Public Site"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-lg font-black uppercase tracking-wider text-white font-mono">
                RAGHU RAJESH &bull; ADMIN
              </h1>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#7e7799]">Storage Source:</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    dataSource === 'supabase'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                      : 'bg-purple-950/60 text-purple-300 border border-purple-800/50'
                  }`}
                >
                  {dataSource === 'supabase' ? 'Supabase Live DB' : 'Local Storage Mode'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9333ea] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#a855f7] transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-full bg-[#140f21] text-[#9c95b3] hover:text-white text-xs font-semibold border border-[#271f3e]"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="flex items-center gap-2 border-b border-[#201a33] pb-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'projects'
                ? 'bg-[#9333ea] text-white'
                : 'text-[#9c95b3] hover:text-white hover:bg-[#140f21]'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-[#9333ea] text-white'
                : 'text-[#9c95b3] hover:text-white hover:bg-[#140f21]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Client Inquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('setup')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'setup'
                ? 'bg-[#9333ea] text-white'
                : 'text-[#9c95b3] hover:text-white hover:bg-[#140f21]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database Setup Guide</span>
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="overflow-x-auto rounded-2xl border border-[#201a33] bg-[#0c0914]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#120e1f] text-[#9c95b3] uppercase font-mono tracking-wider border-b border-[#201a33]">
                  <tr>
                    <th className="px-4 py-3.5">Order</th>
                    <th className="px-4 py-3.5">Thumbnail / Title</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Client / Role</th>
                    <th className="px-4 py-3.5">Featured</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b152b]">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-[#130f21] transition-colors">
                      <td className="px-4 py-4 font-mono text-[#7e7799]">#{proj.display_order}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.thumbnail_url}
                            alt=""
                            className="w-14 h-9 object-cover rounded bg-[#161126] border border-[#2a2045]"
                          />
                          <div>
                            <div className="font-bold text-white max-w-xs truncate">{proj.title}</div>
                            <div className="text-[11px] text-[#7e7799] font-mono truncate max-w-xs">
                              {proj.video_url}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="px-2 py-0.5 rounded bg-[#171129] text-[#c084fc] font-mono uppercase text-[10px] border border-[#2b214c]">
                          {proj.category.replace('_', ' ')} / {proj.subcategory}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="text-white font-medium">{proj.client_name || '—'}</div>
                        <div className="text-[11px] text-[#7e7799]">{proj.role}</div>
                      </td>

                      <td className="px-4 py-4">
                        <button
                          onClick={() => toggleFeatured(proj)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            proj.featured
                              ? 'bg-[#9333ea]/30 border-[#a855f7]/60 text-[#c084fc]'
                              : 'bg-[#140f21] border-[#271f3e] text-[#7e7799]'
                          }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <button
                          onClick={() => togglePublished(proj)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                            proj.published
                              ? 'bg-purple-950/80 text-purple-300 border border-purple-800/60'
                              : 'bg-red-950/80 text-red-400 border border-red-800/60'
                          }`}
                        >
                          {proj.published ? 'Published' : 'Draft'}
                        </button>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(proj)}
                            className="p-1.5 rounded-lg bg-[#140f21] text-[#9c95b3] hover:text-white border border-[#271f3e]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:text-red-200 border border-red-900/60"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            {inquiries.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-[#0c0914] border border-[#201a33]">
                <Mail className="w-10 h-10 text-[#7e7799] mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No Inquiries Yet</h3>
                <p className="text-xs text-[#7e7799]">
                  Submissions from the portfolio contact form will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-6 rounded-2xl bg-[#0e0b17] border border-[#201933] space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{inquiry.name}</h3>
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-xs text-[#c084fc] hover:underline font-mono"
                        >
                          {inquiry.email}
                        </a>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#171129] text-[#9c95b3] font-mono text-[10px] border border-[#2b214c]">
                        {inquiry.project_type}
                      </span>
                    </div>

                    {inquiry.budget && (
                      <div className="text-xs text-[#9c95b3]">
                        <span className="text-[#7e7799]">Budget:</span> {inquiry.budget}
                      </div>
                    )}

                    <div className="p-3.5 rounded-xl bg-[#08060d] border border-[#1b1529] text-xs text-[#dcd7eb] leading-relaxed whitespace-pre-wrap">
                      {inquiry.message}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1a1429] text-[11px] text-[#7e7799]">
                      <span>
                        {inquiry.created_at ? new Date(inquiry.created_at).toLocaleString() : 'Recent'}
                      </span>
                      <a
                        href={`mailto:${inquiry.email}?subject=Re: Video Project Inquiry - Raghu Rajesh`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9333ea] text-white font-bold text-[11px] uppercase"
                      >
                        <span>Reply &rarr;</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'setup' && (
          <div className="max-w-3xl space-y-6">
            <div className="p-8 rounded-3xl bg-[#0e0b17] border border-[#201933] space-y-6">
              <div className="flex items-center gap-3 text-[#c084fc]">
                <Database className="w-6 h-6" />
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  Supabase &amp; Resend Integration Status
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#9c95b3]">
                <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
                  <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#c084fc] underline">supabase.com</a></li>
                  <li>Run the SQL script found in <code className="text-white font-mono">supabase/schema.sql</code></li>
                  <li>Copy your Project URL and anon key into <code className="text-white font-mono">.env.local</code></li>
                  <li>Create a free Resend key at <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-[#c084fc] underline">resend.com</a> to receive inquiries at <code className="text-white font-mono">raghurajeshc5@gmail.com</code></li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl my-auto rounded-3xl bg-[#0e0b17] border border-[#28203f] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#201933]">
              <h3 className="text-lg font-bold text-white uppercase">
                {editingProject.id ? 'Edit Project' : 'Add New Portfolio Project'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg bg-[#140f21] text-[#9c95b3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Category *</label>
                  <select
                    value={editingProject.category || 'short_form'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as ProjectCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7]"
                  >
                    <option value="short_form">Short-Form Video</option>
                    <option value="long_form">Long-Form Video</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Subcategory *</label>
                  <select
                    value={editingProject.subcategory || 'creators_influencers'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        subcategory: e.target.value as ProjectSubcategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7]"
                  >
                    {/* Short Form options */}
                    <option value="creators_influencers">Creators / Influencers</option>
                    <option value="ad_reels">Ad Reels</option>
                    <option value="brand_promotion">Brand Promotion</option>
                    {/* Long Form options */}
                    <option value="podcasts">Podcasts</option>
                    <option value="advertisements">Advertisements</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Aspect Ratio</label>
                  <select
                    value={editingProject.aspect_ratio || '9:16'}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        aspect_ratio: e.target.value as '16:9' | '9:16',
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7]"
                  >
                    <option value="9:16">9:16 (Vertical)</option>
                    <option value="16:9">16:9 (Horizontal)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Thumbnail URL *</label>
                  <input
                    type="url"
                    required
                    value={editingProject.thumbnail_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Video URL *</label>
                  <input
                    type="url"
                    required
                    value={editingProject.video_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, video_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Client / Brand</label>
                  <input
                    type="text"
                    value={editingProject.client_name || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Duration (e.g. 00:35)</label>
                  <input
                    type="text"
                    value={editingProject.duration || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-[#9c95b3] mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#271f3e] text-white text-xs focus:outline-none focus:border-[#a855f7] resize-none"
                />
              </div>

              {modalError && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300">
                  {modalError}
                </div>
              )}

              {modalSuccess && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 text-purple-300">
                  {modalSuccess}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#201933]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#140f21] text-[#9c95b3] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#9333ea] text-white font-bold uppercase hover:bg-[#a855f7]"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
