# Hosting IT QA Monitor in the Cloud

Steps to deploy the app (or the IT QA variant) to a cloud host.

---

## Option 1: Vercel (recommended)

The project is set up for Vercel. Use this for full functionality (API routes, edge functions, serverless).

### 1. Push your code to GitHub

```bash
cd /Users/bhagidaran-0369/QAmonitor
git init
git add .
git commit -m "Initial commit: IT QA Monitor"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/QAmonitor.git
git push -u origin main
```

### 2. Create a Vercel project

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub).
2. Click **Add New** → **Project**.
3. Import your **QAmonitor** (or itqamonitor) repo.
4. Leave **Framework Preset** as **Vite** (or auto-detected).
5. **Build and Output Settings:**
   - **Build Command:** `npm run build`  
     - For **IT QA only**: `npm run build:itqa`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**. First deploy may take a few minutes.

### 3. Set environment variables (optional but recommended)

In Vercel: **Project → Settings → Environment Variables**. Add for production (and preview if you want):

| Variable | Purpose | Where to get it |
|----------|---------|-----------------|
| `GROQ_API_KEY` | AI summarization (World Brief) | [console.groq.com](https://console.groq.com/) |
| `OPENROUTER_API_KEY` | Fallback AI | [openrouter.ai](https://openrouter.ai/) |
| `UPSTASH_REDIS_REST_URL` | Cache (optional) | [upstash.com](https://upstash.com/) |
| `UPSTASH_REDIS_REST_TOKEN` | Cache (optional) | Same as above |

Redeploy after adding variables (**Deployments → ⋮ → Redeploy**).

### 4. Custom domain (optional)

- **Settings → Domains** → add e.g. `itqa.yourdomain.com` or `itqa.worldmonitor.app`.
- Point DNS to Vercel (they show the records).

### 5. Deploy IT QA as a separate project (optional)

To have a **dedicated IT QA URL** (e.g. `itqa.yoursite.com`):

1. Create a **second** Vercel project from the same repo.
2. Set **Build Command** to: `npm run build:itqa`.
3. Add the same env vars.
4. Assign the custom domain (e.g. `itqa.yoursite.com`) to this project.

---

## Option 2: Netlify

### 1. Push code to GitHub (same as Vercel step 1)

### 2. Create a Netlify site

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**.
2. Connect GitHub and select your repo.
3. **Build settings:**
   - **Build command:** `npm run build` (or `npm run build:itqa` for IT QA only).
   - **Publish directory:** `dist`.
4. **Deploy site**.

### 3. Env vars

**Site settings → Environment variables** → add the same keys as in Vercel (e.g. `GROQ_API_KEY`, `OPENROUTER_API_KEY`).  
Note: Serverless/API routes need Netlify Functions; the app’s API is built for Vercel. For a **static-only** deploy (no server-side AI), use the build command above and add env vars only if your frontend uses them via Netlify Functions.

---

## Option 3: Static hosting (any host)

For **static only** (no server-side APIs: no cloud AI summarization, no Redis cache):

1. **Build:**
   ```bash
   npm install
   npm run build          # all variants (users switch in UI)
   # OR
   npm run build:itqa     # IT QA variant only
   ```
2. **Upload** the contents of the `dist/` folder to:
   - **GitHub Pages** (enable in repo Settings → Pages; set source to deploy from `dist` or a branch that contains `dist`).
   - **Cloudflare Pages** (connect repo, build command `npm run build`, output `dist`).
   - **AWS S3 + CloudFront**, **Firebase Hosting**, or any static host.

3. **Note:** Without the API layer, features that depend on server-side APIs (e.g. AI World Brief via Groq/OpenRouter, Redis cache) will not work; the app will fall back to browser-only behavior where implemented.

---

## Quick reference

| Goal | Command / action |
|------|------------------|
| Build all variants | `npm run build` |
| Build IT QA only | `npm run build:itqa` |
| Vercel deploy | Connect repo → set build to `npm run build` or `npm run build:itqa` → add env vars → deploy |
| Custom domain | Configure in Vercel/Netlify **Domains** and DNS |
