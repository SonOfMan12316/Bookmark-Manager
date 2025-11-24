# Vercel Deployment Guide

This guide explains how to deploy your Bookmark Manager application to Vercel.

## Project Structure

- **Frontend**: React + Vite app in `frontend/` directory
- **Backend API**: Serverless functions in `api/` directory
- **Configuration**: `vercel.json` handles routing and build settings

## Deployment Steps

### 1. Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your repository pushed to GitHub, GitLab, or Bitbucket

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Vercel will automatically detect the project settings from `vercel.json`
4. Add environment variables (see below)
5. Click "Deploy"

#### Option B: Deploy via CLI

```bash
npm i -g vercel
vercel login
vercel
```

### 3. Environment Variables

No environment variables are required for basic deployment. Add any custom environment variables as needed in your Vercel project settings.

### 4. Build Settings

Vercel will automatically use the settings from `vercel.json`:

- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm install && cd frontend && npm install && cd ../api && npm install`

### 5. How It Works

#### Frontend Routing (SPA)
- All routes are rewritten to `/index.html` to support client-side routing
- This fixes the "404 Not Found" errors when refreshing or directly accessing routes like `/sign-in`, `/home`, etc.

#### API Routes
- `/api/health` → `api/health.mjs` (GET)
- Vercel automatically creates serverless functions from files in the `api/` directory

### 6. Testing the Deployment

After deployment, test:

1. **Frontend Routes**: 
   - Visit `https://your-app.vercel.app/sign-in`
   - Visit `https://your-app.vercel.app/home`
   - All routes should work without 404 errors

2. **API Endpoints**:
   - `https://your-app.vercel.app/api/health` (should return `{"status":"ok"}`)

### 7. Troubleshooting

#### Routing Issues
If you still get 404 errors on routes:
- Verify `vercel.json` has the rewrite rule: `"source": "/(.*)", "destination": "/index.html"`
- Check that `outputDirectory` is set to `frontend/dist`
- Ensure the build completed successfully

#### API Issues
If API calls fail:
- Verify the API function files are in the `api/` directory
- Check Vercel function logs in the dashboard

#### Build Issues
If the build fails:
- Check that all dependencies are listed in `package.json` files
- Verify Node.js version compatibility (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard for specific errors

### 8. Custom Domain

To add a custom domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

## Local Development

For local development with the same setup:

```bash
# Install dependencies
npm run install:all

# Run frontend and backend dev servers
npm run dev:all

# Or run them separately:
npm run dev          # Frontend only
npm run dev:backend # Backend only
```

The Vite dev server will proxy `/api` requests to `http://localhost:3001` during development.

## Notes

- The backend NestJS application in `backend/` is not deployed to Vercel. Only the Express serverless functions in `api/` are used.
- If you need to deploy the NestJS backend, consider using a different platform (Railway, Render, etc.) or converting it to Vercel serverless functions.

