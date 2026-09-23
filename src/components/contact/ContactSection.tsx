import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import confetti from 'canvas-confetti';
import GridScan from '../react-bits/GridScan';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from '../../context/ThemeContext';

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } });
    setSubmitted(true);

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className={`relative w-full py-28 border-t overflow-hidden transition-colors ${
        isDark ? 'bg-[#060608] border-white/[0.08]' : 'bg-[#f7f7f5] border-zinc-200'
      }`}
    >
      {/* GridScan — official React Bits WebGL background */}
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#C179FE"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          enableGyro={false}
          scanOnClick={false}
          lightMode={!isDark}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        {/* Editorial Heading Finale */}
        <div className="text-center max-w-3xl mx-auto">
          <p
            className={`font-mono text-xs tracking-widest uppercase mb-3 font-semibold ${
              isDark ? 'text-purple-400' : 'text-indigo-600'
            }`}
          >
            INITIATE COLLABORATION
          </p>
          <h2
            className={`font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.98] ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}
          >
            LET'S BUILD <br />
            <span className={isDark ? 'text-zinc-500' : 'text-zinc-400'}>
              SOMETHING MEANINGFUL.
            </span>
          </h2>
          <p
            className={`mt-6 text-base sm:text-lg leading-relaxed max-w-xl mx-auto ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Whether you have a breakthrough product idea, a full-stack platform, or an applied machine learning challenge,
            reach out directly.
          </p>

          {/* Quick Copy Email Action Bar */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium backdrop-blur-md transition active:scale-95 ${
                isDark
                  ? 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'
                  : 'border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400 shadow-sm'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="font-mono text-emerald-600 dark:text-emerald-300">
                    Email Copied to Clipboard
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 opacity-70" />
                  <span className="font-mono">{PERSONAL_INFO.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Contact Form & Socials Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Direct Form */}
          <div
            className={`lg:col-span-7 rounded-3xl border p-6 sm:p-8 backdrop-blur-md transition-colors ${
              isDark
                ? 'border-white/[0.08] bg-[#0c0c14]'
                : 'border-zinc-200 bg-white shadow-sm'
            }`}
          >
            <h3
              className={`font-display text-xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              Send a Direct Message
            </h3>
            <p
              className={`mt-1 text-xs ${
                isDark ? 'text-zinc-400' : 'text-zinc-500'
              }`}
            >
              Responses are typically sent within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`block font-mono text-[11px] uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-purple-400 ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-600'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400'
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block font-mono text-[11px] uppercase tracking-wider mb-1.5 ${
                      isDark ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-purple-400 ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-600'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block font-mono text-[11px] uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                >
                  Project Brief or Inquiry
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about the goals, timeline, or engineering challenge..."
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:border-purple-400 ${
                    isDark
                      ? 'border-white/10 bg-white/[0.03] text-white placeholder:text-zinc-600'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400'
                  }`}
                />
              </div>

              <button
                type="submit"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold transition active:scale-95 ${
                  isDark
                    ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5'
                    : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-md'
                }`}
              >
                <span>{submitted ? 'Message Sent!' : 'Send Message'}</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Socials & Location Details */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-md transition-colors ${
                isDark
                  ? 'border-white/[0.08] bg-[#0c0c14]'
                  : 'border-zinc-200 bg-white shadow-sm'
              }`}
            >
              <h4
                className={`font-display text-base font-bold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                Channels & Presence
              </h4>

              <div className="mt-4 space-y-2.5">
                {[
                  { label: 'GitHub', value: '@amaanshaikh711', href: PERSONAL_INFO.github, icon: <Github className="h-4 w-4" /> },
                  { label: 'LinkedIn', value: '/in/amaanshaikh711', href: PERSONAL_INFO.linkedin, icon: <Linkedin className="h-4 w-4" /> },
                  { label: 'Twitter / X', value: '@amaanshaikh711', href: PERSONAL_INFO.twitter, icon: <Twitter className="h-4 w-4" /> },
                  { label: 'Instagram', value: '@amaanshaikh711', href: PERSONAL_INFO.instagram, icon: <Instagram className="h-4 w-4" /> },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl border transition group ${
                      isDark
                        ? 'border-white/[0.06] bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.04]'
                        : 'border-zinc-200 bg-zinc-50/70 hover:border-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isDark ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-600 group-hover:text-zinc-950'}>
                        {s.icon}
                      </span>
                      <div>
                        <p className={`font-mono text-xs font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                          {s.label}
                        </p>
                        <p className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {s.value}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick status block */}
            <div
              className={`rounded-2xl border p-5 font-mono text-xs flex items-center justify-between ${
                isDark
                  ? 'border-white/[0.08] bg-white/[0.02] text-zinc-400'
                  : 'border-zinc-200 bg-white text-zinc-600'
              }`}
            >
              <span>TIMEZONE: UTC+05:30 (IST)</span>
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>ONLINE</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div
          className={`mt-20 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs ${
            isDark ? 'border-white/[0.08] text-zinc-500' : 'border-zinc-200 text-zinc-500'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <img src="/as-logo.png" alt="AS" className="h-5 w-5 rounded-full object-cover border border-purple-500/30" />
            <p>© {new Date().getFullYear()} Aman Shaikh. Designed & Built with Precision.</p>
          </div>
          <p>AWWWARDS-LEVEL PORTFOLIO · REACT BITS & THREE.JS</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
