# RAGHU RAJESH C — Video Editor & Motion Designer Portfolio

A minimal, premium, cinematic portfolio website built to attract freelance clients and convert visitors into inquiries. Inspired by the dark, high-contrast creative design of [raghurajesh.framer.ai](https://raghurajesh.framer.ai/).

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.
Admin dashboard is at [http://localhost:3000/admin](http://localhost:3000/admin) (passkey: `raghu-edit-2026`).

---

## 🛠️ Stack & Architecture

- **Next.js 15+ (App Router)** & **React 19**
- **TypeScript** & **Tailwind CSS v4**
- **Supabase** (PostgreSQL Database, Row Level Security, Project CRUD, Inquiries)
- **Resend** (Transactional email notifications to `raghurajeshc5@gmail.com`)
- **Framer Motion & Lucide Icons**

---

## 🚀 Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** &rarr; paste the contents of `supabase/schema.sql` &rarr; click **Run**.
3. Copy your project credentials into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 📬 Email Setup (Resend)

1. Create a free API key at [resend.com](https://resend.com).
2. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key
   CONTACT_RECEIVER_EMAIL=raghurajeshc5@gmail.com
   CONTACT_SENDER_EMAIL=onboarding@resend.dev
   ```

---

## 🚢 Vercel Deployment

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Deploy Raghu Rajesh portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/raghu-rajesh-portfolio.git
   git push -u origin main
   ```
2. Import repository on [Vercel](https://vercel.com).
3. Paste environment variables from `.env.local` into Vercel Project Settings.
4. Click **Deploy**.
