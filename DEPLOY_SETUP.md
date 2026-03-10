# OpenClaw Meetup Site - Deploy Setup Guide

Everything is built and ready. Just need 3 steps to go live.

## Step 1: Create GitHub Repo & Push Code

Go to **https://github.com/new** and create a repo named `openclaw-meetup` in your `tjsclawbot-jpg` account.

Then run:

```bash
cd /Users/workbot/.openclaw/workspace/openclaw-meetup
git remote add origin git@github.com:tjsclawbot-jpg/openclaw-meetup.git
git push -u origin main
```

## Step 2: Set Up Supabase Database

Go to **https://supabase.com** → Workbot project → SQL Editor

Run this SQL to create the RSVPs table:

```sql
CREATE TABLE IF NOT EXISTS meetup_rsvps (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  has_guest BOOLEAN DEFAULT false,
  dietary_restrictions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE meetup_rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow inserts" ON meetup_rsvps
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow selects" ON meetup_rsvps
  FOR SELECT USING (true);
```

Get your Supabase credentials from **Settings > API > Project URL and anon key**. Save them for Step 3.

## Step 3: Deploy to Vercel

Go to **https://vercel.com** → Add New → Project → Import Git Repository

Select `tjsclawbot-jpg/openclaw-meetup`

**In Environment Variables, add:**
- `NEXT_PUBLIC_SUPABASE_URL` = (your Supabase URL from step 2)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your Supabase anon key from step 2)

Click Deploy.

**Wait ~3 minutes for build to finish.**

## Done!

Your site will be live at a Vercel URL like: `https://openclaw-meetup-xyz.vercel.app`

**Then:**
- Share the landing page URL for event promotion
- Admin dashboard will be at `/admin/rsvps` (publicly accessible for now)
- RSVPs will save to Supabase in real-time

## Local Testing (Optional)

If you want to test locally before deploying:

```bash
cd /Users/workbot/.openclaw/workspace/openclaw-meetup
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
npm run dev
# Open http://localhost:3000
```

---

**That's it!** Everything else is pre-built and ready to go.
