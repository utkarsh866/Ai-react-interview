# AI Mock Interview - Deployment Guide

This guide provides instructions for deploying the AI Mock Interview application to various hosting platforms.

## Prerequisites

Before deploying, make sure you have:

1. A Clerk account with a publishable key for authentication
2. A Firebase project with Firestore enabled
3. A Google Cloud account with Gemini API access
4. Node.js 18+ and npm installed

## Build Configuration

The application has been built with the following optimizations:

- Code splitting for better performance
- Minification and compression
- Environment variable configuration
- Client-side routing support

## Deployment Options

### Option 1: Netlify

Netlify is recommended for its simplicity and free tier.

1. **Create a Netlify account** if you don't have one at [netlify.com](https://www.netlify.com/)

2. **Deploy using the Netlify CLI**:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy the site
   netlify deploy
   ```

3. **Configure environment variables** in the Netlify dashboard:
   - Go to Site settings > Build & deploy > Environment
   - Add the following variables:
     - `VITE_CLERK_PUBLISHABLE_KEY`
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_GEMINI_API_KEY`

### Option 2: Vercel

Vercel is another excellent option for React applications.

1. **Create a Vercel account** if you don't have one at [vercel.com](https://vercel.com/)

2. **Deploy using the Vercel CLI**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy the site
   vercel
   ```

3. **Configure environment variables** in the Vercel dashboard:
   - Go to Project settings > Environment Variables
   - Add the same variables as listed for Netlify

### Option 3: Firebase Hosting

Since the application already uses Firebase for the backend, Firebase Hosting is a natural choice.

1. **Install the Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**:
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Specify `dist` as your public directory
   - Configure as a single-page app
   - Don't overwrite `index.html`

4. **Deploy to Firebase Hosting**:
   ```bash
   firebase deploy --only hosting
   ```

## Post-Deployment Steps

After deploying, make sure to:

1. **Test the authentication flow** by signing up and signing in
2. **Verify Firebase connectivity** by creating and retrieving interviews
3. **Test the Gemini API integration** by generating interview questions
4. **Check responsive design** on different devices

## Troubleshooting

If you encounter issues after deployment:

1. **Authentication issues**:
   - Verify that the Clerk publishable key is correct
   - Check that the domain is allowed in your Clerk settings

2. **Firebase connectivity issues**:
   - Ensure Firebase security rules allow the necessary operations
   - Verify that the Firebase configuration variables are correct

3. **Gemini API issues**:
   - Check that the API key is valid and has the necessary permissions
   - Verify that the API is enabled in your Google Cloud console

4. **Routing issues**:
   - Ensure that the hosting platform is configured for client-side routing
   - For Netlify, the `_redirects` file should be in the `dist` directory

## Maintenance

To update the application in the future:

1. Make your changes to the codebase
2. Run `npm run build:prod` to create a new production build
3. Deploy the updated build using the same method as the initial deployment

## Support

If you need help with deployment or encounter any issues, please:

1. Check the documentation for your hosting platform
2. Review the Firebase and Clerk documentation for authentication and database issues
3. Contact the development team for application-specific questions

---

Happy deploying! Your AI Mock Interview application should now be accessible to users worldwide.
