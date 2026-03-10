# OpenClaw Meetup Event Site

Retro arcade-styled event landing page with RSVP system for the OpenClaw meetup at Workhorse Collective (March 12, 2026).

## Tech Stack

- **Next.js 14** (Pages Router)
- **TypeScript**
- **Tailwind CSS** (custom arcade theme)
- **Supabase** (PostgreSQL database)
- **Vercel** (hosting)

## Setup

### 1. Supabase Database Setup

Go to https://supabase.com and create a new project (or use existing "workbot" project).

Run this SQL in the Supabase SQL editor to create the RSVP table:

```sql
CREATE TABLE IF NOT EXISTS meetup_rsvps (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  has_guest BOOLEAN DEFAULT false,
  dietary_restrictions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE meetup_rsvps ENABLE ROW LEVEL SECURITY;

-- Allow all users to insert
CREATE POLICY "Allow inserts" ON meetup_rsvps
  FOR INSERT WITH CHECK (true);

-- Allow all users to select (for admin view)
CREATE POLICY "Allow selects" ON meetup_rsvps
  FOR SELECT USING (true);
```

### 2. Environment Configuration

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials:
- Get `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase project settings

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### 5. Deploy to Vercel

```bash
git init
git add .
git commit -m "Initial commit: OpenClaw meetup site"
git remote add origin https://github.com/tjsclawbot-jpg/openclaw-meetup.git
git push -u origin main
```

In Vercel:
1. Import the GitHub repo
2. Set environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. Deploy!

## Features

### Landing Page (/)
- Retro arcade-styled hero
- Event details (date, time, location)
- RSVP form (name, email, +1 guest, dietary restrictions)
- Success confirmation

### Admin Dashboard (/admin/rsvps)
- Real-time RSVP count
- Guest count totals
- Full RSVP list with details
- Export to CSV
- Refresh button for live updates

## Styling

Uses a custom Tailwind theme with:
- Yellow (#FFD60A) and black (#000000) arcade colors
- "Press Start 2P" pixel art font
- Arcade-style borders and shadows
- Scanline effect for retro CRT feel
- Hover animations and glow effects

## Files Structure

```
pages/
  _app.tsx          - Next.js app wrapper
  _document.tsx     - HTML document setup
  index.tsx         - Landing page (RSVP form)
  api/
    rsvp.ts         - RSVP submission endpoint
  admin/
    rsvps.tsx       - Admin dashboard
lib/
  supabase.ts       - Supabase client & types
styles/
  globals.css       - Tailwind + custom arcade styles
tailwind.config.js  - Tailwind configuration
.env.local          - Environment variables (not in git)
```

## Notes

- Admin dashboard is publicly accessible (consider adding auth for production)
- RSVP form uses Supabase client-side (works without a backend)
- All styling is mobile-responsive
- Uses standard Next.js Pages Router (more stable than App Router)

## Deployment Checklist

- [ ] Supabase database created & schema initialized
- [ ] Environment variables set in Vercel
- [ ] GitHub repo created at tjsclawbot-jpg/openclaw-meetup
- [ ] Vercel auto-deployment enabled
- [ ] RSVP form tested end-to-end
- [ ] Admin dashboard accessible
- [ ] Studio photos integrated as hero images (if needed)
- [ ] Share landing page URL for event promotion

---

**Live Event:** Thursday, March 12, 2026 | 5:30 PM - 7:30 PM  
**Location:** Workhorse Collective, 320 3rd St NE (Rear), Washington DC
