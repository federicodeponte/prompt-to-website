# Production Deployment Guide

This guide walks you through deploying the Prompt to Website application to production with Supabase and Vercel.

## Prerequisites

- GitHub account (for code hosting)
- Vercel account (for hosting the Next.js app)
- Supabase account (for database and authentication)
- Gemini API key (for AI features)

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in the details:
   - **Name**: `prompt-to-website`
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
4. Wait for the project to be created (~2 minutes)

## Step 2: Run Database Migrations

**⚠️ IMPORTANT:** You need to run BOTH migrations in order:
1. `20241117000001_create_websites_table.sql` - Creates the websites table
2. `20241119000001_add_is_favorite_column.sql` - Adds favorites feature

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. **First migration:** Copy the contents of `supabase/migrations/20241117000001_create_websites_table.sql`
4. Paste into the SQL Editor and click **Run**
5. **Second migration:** Copy the contents of `supabase/migrations/20241119000001_add_is_favorite_column.sql`
6. Paste into the SQL Editor and click **Run**

### Option B: Using Supabase CLI (Easier)

```bash
# Login to Supabase
supabase login

# Link your local project to the remote project
supabase link --project-ref your-project-ref

# Push ALL migrations at once
supabase db push
```

**Verification:**
After running migrations, verify the `websites` table has these columns:
- `id`, `user_id`, `label`, `config`, `created_at`, `updated_at`
- `is_favorite` (BOOLEAN, added in second migration)
- `prompt_history` (TEXT[])

If `is_favorite` is missing, the favorites feature will not work in production!

## Step 3: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 4: Get Gemini API Key

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the generated key

## Step 5: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [https://vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add Environment Variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

6. Click **Deploy**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables when prompted
```

## Step 6: Configure Supabase Email Settings

1. In Supabase dashboard, go to **Authentication** → **Email Templates**
2. Customize the email templates (optional):
   - Confirmation email
   - Reset password email
3. Go to **Authentication** → **URL Configuration**
4. Set **Site URL** to your Vercel domain: `https://your-app.vercel.app`
5. Add **Redirect URLs**:
   ```
   https://your-app.vercel.app
   https://your-app.vercel.app/dashboard
   ```

## Step 7: Test Your Deployment

1. Visit your Vercel URL
2. Click **Sign Up** and create an account
3. Check your email for confirmation
4. Confirm your email and login
5. Test creating a website:
   - Go to editor
   - Generate a website with AI
   - Save it
   - View it in dashboard

## Verification Checklist

- [ ] Database migration applied successfully
- [ ] Sign up flow works (email confirmation sent)
- [ ] Login flow works
- [ ] Dashboard shows empty state for new users
- [ ] Can create and save websites
- [ ] Websites appear in dashboard
- [ ] Can edit and delete websites
- [ ] AI generation works (Gemini API key valid)
- [ ] Export functionality works

## Environment Variables Reference

### Development (.env.local)
```bash
GEMINI_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local_key
```

### Production (Vercel)
```bash
GEMINI_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

## Troubleshooting

### "Invalid API key" error
- Check that GEMINI_API_KEY is set correctly in Vercel
- Verify the key works at https://aistudio.google.com

### "Database connection failed"
- Verify NEXT_PUBLIC_SUPABASE_URL is correct
- Check that NEXT_PUBLIC_SUPABASE_ANON_KEY matches your project

### Email confirmation not received
- Check spam folder
- Verify email settings in Supabase dashboard
- Check Supabase logs in dashboard

### "Row Level Security" errors
- Ensure migration ran successfully
- Check RLS policies are enabled on `websites` table
- Verify user is authenticated before accessing data

### Favorites feature not working
**Symptom:** Clicking the star icon to favorite a project causes errors
**Cause:** The `is_favorite` column migration wasn't applied to production

**Fix:**
1. Go to Supabase SQL Editor
2. Run the migration: `supabase/migrations/20241119000001_add_is_favorite_column.sql`
3. OR use CLI: `supabase db push --linked`

**Verification:** Query the table to check the column exists:
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'websites';
```
You should see `is_favorite` with type `boolean`

## Local Development Setup

```bash
# Install dependencies
npm install

# Start Supabase locally
supabase start

# Copy environment variables
cp .env.example .env.local

# Update .env.local with local Supabase credentials
# (Shown after running `supabase start`)

# Start development server
npm run dev
```

## Database Schema

The `websites` table structure:

```sql
CREATE TABLE websites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  label TEXT NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

Row Level Security (RLS) ensures:
- Users can only read their own websites
- Users can only create websites for themselves
- Users can only update/delete their own websites

## Updating Production

When you push changes to GitHub:

1. Vercel automatically deploys (if auto-deploy is enabled)
2. Database migrations should be run manually in Supabase dashboard
3. Environment variables persist between deployments

## Monitoring

- **Vercel Logs**: https://vercel.com/your-project/logs
- **Supabase Logs**: https://supabase.com/dashboard/project/_/logs
- **Vercel Analytics**: Built-in (already configured)
- **Speed Insights**: Built-in (already configured)

## Costs

- **Vercel**: Free for hobby projects (unlimited bandwidth)
- **Supabase**: Free tier includes:
  - 500MB database
  - 50,000 monthly active users
  - 5GB bandwidth
- **Gemini API**: Free tier includes 60 requests/minute

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check Supabase database logs
3. Verify environment variables are set
4. Test locally with `supabase start` first
5. Review this deployment guide

---

**Next Steps After Deployment:**
- Set up custom domain in Vercel
- Configure email provider (SendGrid, etc.) in Supabase
- Add Google Analytics (optional)
- Set up error tracking (Sentry, etc.)
- Configure backup strategy in Supabase
