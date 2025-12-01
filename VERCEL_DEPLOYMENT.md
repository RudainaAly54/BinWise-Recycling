# Vercel Deployment Guide

## What's Been Configured

1. **Root `vercel.json`** - Main configuration for Vercel deployment
2. **Root `package.json`** - Contains backend dependencies needed for API functions
3. **`/api/index.js`** - Serverless function entry point (Vercel automatically routes `/api/*` to this)

## Required Environment Variables

You need to set these in Vercel Dashboard → Settings → Environment Variables:

### Backend Environment Variables:
- `MONGODB_URL` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Set to `production` for production
- Any other environment variables used in your Backend (check Backend/.env if you have one locally)

### Frontend Environment Variables:
- `VITE_BACKEND_URL` - Your Vercel deployment URL (e.g., `https://your-project.vercel.app`)

## Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect the configuration

3. **Set Environment Variables:**
   - In project settings, add all required environment variables
   - Make sure to set them for Production, Preview, and Development

4. **Deploy:**
   - Vercel will automatically build and deploy
   - The frontend will be served from `Frontend/dist`
   - API routes will be available at `/api/*`

## Important Notes

- The API is accessible at: `https://your-project.vercel.app/api/*`
- Frontend should use `VITE_BACKEND_URL` environment variable pointing to your Vercel URL
- CORS is configured to allow your Vercel domain
- Make sure to update CORS origins in `api/index.js` if your domain changes

## Troubleshooting

- If API routes don't work, check that `/api/index.js` exists at root
- If build fails, check that all dependencies are in root `package.json`
- If MongoDB connection fails, verify `MONGODB_URL` is set correctly
- Check Vercel function logs in the dashboard for errors

