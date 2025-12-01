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

- **404 Error on Root URL**: This is normal! For backend-only deployment, access your API at `/api` (e.g., `https://your-project.vercel.app/api`)
- **404 Error on `/api`**: 
  - Check that `/api/index.js` exists at root
  - Verify environment variables are set in Vercel dashboard
  - Check Vercel function logs in the dashboard for errors
- If build fails, check that all dependencies are in root `package.json`
- If MongoDB connection fails, verify `MONGODB_URL` is set correctly
- **CORS Errors**: Update the `allowedOrigins` array in `api/index.js` with your actual Vercel deployment URL

## Testing Your API

After deployment, test these URLs:
- `https://your-project.vercel.app/api` - Should return: `{"message": "Backend server is running ✅", "status": "ok"}`
- `https://your-project.vercel.app/api/auth/login` - Your auth endpoints
- `https://your-project.vercel.app/api/users` - Your user endpoints
- etc.

