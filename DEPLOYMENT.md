# Deployment Guide

This document provides instructions for deploying the AI Mock Interview application to production.

## Prerequisites

Before deploying, make sure you have:

1. A Clerk account with a publishable key
2. A Firebase project with Firestore enabled
3. A Google Cloud account with Gemini API access
4. Node.js 18+ and npm installed

## Environment Setup

1. Create a `.env.production` file in the root directory with the following variables:

```
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_actual_clerk_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Google Gemini API
VITE_GEMINI_API_KEY=your_actual_gemini_api_key
```

Replace the placeholder values with your actual API keys and configuration.

## Building for Production

### Option 1: Using the automated build script

Run the following command to build the application for production:

```bash
npm run build:full
```

This script will:
1. Clean the dist directory
2. Check for the .env.production file
3. Run linting
4. Build the production version
5. Create necessary files for deployment

### Option 2: Manual build

If you prefer to build manually, follow these steps:

1. Clean the dist directory:
   ```bash
   npm run clean
   ```

2. Build the production version:
   ```bash
   npm run build:prod
   ```

3. Create a _redirects file for Netlify (if deploying to Netlify):
   ```bash
   echo "/* /index.html 200" > dist/_redirects
   ```

## Testing the Production Build Locally

To preview the production build locally, run:

```bash
npm run serve
```

This will start a local server at http://localhost:4173 serving the production build.

## Deployment Options

### Netlify

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

3. Follow the prompts to complete the deployment.

### Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment.

### Firebase Hosting

1. Install the Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase Hosting:
   ```bash
   firebase init hosting
   ```

3. Deploy to Firebase Hosting:
   ```bash
   firebase deploy --only hosting
   ```

## Post-Deployment Verification

After deploying, verify that:

1. The application loads correctly
2. Authentication works properly
3. Firebase operations (creating and retrieving interviews) work
4. The Gemini API integration works for generating interview questions

## Troubleshooting

If you encounter issues after deployment:

1. Check the browser console for errors
2. Verify that all environment variables are correctly set
3. Ensure that Firebase security rules allow the necessary operations
4. Check that the Clerk authentication is properly configured

## Security Considerations

1. Ensure Firebase security rules are properly configured to protect user data
2. Use environment variables for all sensitive information
3. Set up proper authentication and authorization in your Firebase project
4. Consider implementing rate limiting for the Gemini API calls

## Performance Optimization

1. Enable caching for static assets
2. Consider implementing a CDN for global distribution
3. Monitor application performance using tools like Lighthouse
4. Optimize images and other assets for faster loading
