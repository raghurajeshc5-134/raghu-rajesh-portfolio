'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Clock, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

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

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project_type: 'Short Form Video',
    budget: '',
    message: '',
    website_hp: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const projectTypeOptions = [
    'Short Form Video',
    'YouTube Editing',
    'Podcast Production',
    'Commercial & Ads',
    'Other',
  ];

  // Exactly four main options with the pricing from the pricing section
  const budgetOptions = [
    'Short Form Video (Starting from ₹800)',
    'YouTube Editing (Starting from ₹1,200)',
    'Podcast Production (Starting from ₹1,400)',
    'Commercial & Ads (Starting from ₹1,500)',
    'Custom / Flexible Quote',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setStatus('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#c084fc', '#ffffff', '#7e22ce'],
        });
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Could not send inquiry right now. You can email directly at raghurajeshc5@gmail.com'
      );
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 border-t border-[#1a1529] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#140f24] border border-[#2b2047] text-xs font-semibold uppercase tracking-wider text-[#c084fc] mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start A Project</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1] mb-5">
                Let&apos;s Work Together
              </h2>

              <p className="text-sm text-[#9c95b3] leading-relaxed mb-8">
                Ready to elevate your video content? Share your project details, timeline, and vision.
                I will review your brief and reply with recommendations within 24 hours.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e0b17] border border-[#201933]">
                  <div className="w-9 h-9 rounded-xl bg-[#171226] flex items-center justify-center text-[#c084fc]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#7e7799]">
                      Response Time
                    </div>
                    <div className="text-xs font-semibold text-white">Within 24 Hours</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0e0b17] border border-[#201933]">
                  <div className="w-9 h-9 rounded-xl bg-[#171226] flex items-center justify-center text-[#c084fc]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#7e7799]">
                      Availability
                    </div>
                    <div className="text-xs font-semibold text-white">Remote &bull; Worldwide</div>
                  </div>
                </div>

                {/* Social Connect Icons Only */}
                <div className="p-4 rounded-2xl bg-[#0e0b17] border border-[#201933] flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Connect on Social</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.instagram.com/ragu_rajh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#140f21] border border-[#2b2144] text-[#9c95b3] hover:text-[#c084fc] hover:border-[#a855f7]/50 transition-colors"
                      title="Instagram"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/raghu-rajesh-3378a0327"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#140f21] border border-[#2b2144] text-[#9c95b3] hover:text-[#c084fc] hover:border-[#a855f7]/50 transition-colors"
                      title="LinkedIn"
                    >
                      <LinkedInIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1a1529] text-xs text-[#7e7799]">
              Direct Inquiries &bull; Confidential &bull; Fast Turnaround
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0b17] border border-[#231c36] shadow-xl">
              {status === 'success' ? (
                <div className="text-center py-10 px-4 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#9333ea]/20 text-[#c084fc] flex items-center justify-center mx-auto mb-2 border border-[#a855f7]/40">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                    Inquiry Sent Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9c95b3] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out, <span className="text-white font-semibold">{formData.name}</span>.
                    I have received your project brief and will get back to you shortly at{' '}
                    <span className="text-[#c084fc] font-mono">{formData.email}</span>.
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          project_type: 'Short Form Video',
                          budget: '',
                          message: '',
                          website_hp: '',
                        });
                        setStatus('idle');
                      }}
                      className="px-5 py-2 rounded-full bg-[#181329] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#251d40] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_hp">Leave this empty</label>
                    <input
                      type="text"
                      id="website_hp"
                      name="website_hp"
                      value={formData.website_hp}
                      onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-bold uppercase tracking-wider text-[#9c95b3] mb-1.5">
                        Your Name <span className="text-[#c084fc]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#261e3d] text-white placeholder-[#58516d] text-xs focus:outline-none focus:border-[#a855f7] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-[#9c95b3] mb-1.5">
                        Your Email <span className="text-[#c084fc]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#261e3d] text-white placeholder-[#58516d] text-xs focus:outline-none focus:border-[#a855f7] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-[11px] font-bold uppercase tracking-wider text-[#9c95b3] mb-1.5">
                      Company / Brand / Channel <span className="text-[10px] text-[#58516d] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="e.g. Media Agency, Creator Channel"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#261e3d] text-white placeholder-[#58516d] text-xs focus:outline-none focus:border-[#a855f7] transition-colors"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9c95b3] mb-2">
                      Project Type <span className="text-[#c084fc]">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypeOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, project_type: type })}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            formData.project_type === type
                              ? 'bg-[#9333ea] text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.35)]'
                              : 'bg-[#130f21] border border-[#261e3d] text-[#9c95b3] hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selector: 4 Main Options matching Pricing */}
                  <div>
                    <label htmlFor="budget" className="block text-[11px] font-bold uppercase tracking-wider text-[#9c95b3] mb-1.5">
                      Budget Range <span className="text-[10px] text-[#58516d] font-normal lowercase">(optional)</span>
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#261e3d] text-white text-xs focus:outline-none focus:border-[#a855f7] transition-colors"
                    >
                      <option value="" className="bg-[#130f21] text-[#716a8c]">Select budget range</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#130f21] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-[11px] font-bold uppercase tracking-wider text-[#9c95b3] mb-1.5">
                      Project Brief &bull; Details <span className="text-[#c084fc]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Tell me about your footage, goals, timeline, and reference links..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#130f21] border border-[#261e3d] text-white placeholder-[#58516d] text-xs focus:outline-none focus:border-[#a855f7] transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 flex items-start gap-2 text-xs text-red-300">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-full bg-[#9333ea] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#a855f7] transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
