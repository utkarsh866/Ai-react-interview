// Production build script
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
};

// Helper function to log with colors
const log = {
  info: (msg) => console.log(`${colors.fg.blue}${colors.bright}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.fg.green}${colors.bright}[SUCCESS]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.fg.yellow}${colors.bright}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.fg.red}${colors.bright}[ERROR]${colors.reset} ${msg}`),
  step: (step, msg) => console.log(`${colors.fg.cyan}${colors.bright}[STEP ${step}]${colors.reset} ${msg}`)
};

// Main build function
async function build() {
  try {
    log.info('Starting production build process...');
    
    // Step 1: Clean the dist directory
    log.step(1, 'Cleaning dist directory...');
    try {
      execSync('npm run clean', { stdio: 'inherit' });
    } catch (error) {
      log.warning('Clean command failed, but continuing build process.');
    }
    
    // Step 2: Check if .env.production exists
    log.step(2, 'Checking for .env.production file...');
    if (!fs.existsSync('.env.production')) {
      log.warning('.env.production file not found. Creating from .env.example...');
      
      // If .env.example exists, copy it to .env.production
      if (fs.existsSync('.env.example')) {
        fs.copyFileSync('.env.example', '.env.production');
        log.info('Created .env.production from .env.example');
      } else {
        // Create a basic .env.production file
        log.warning('.env.example not found. Creating a basic .env.production file...');
        const basicEnvContent = `# Production environment variables
# Replace these with your actual API keys before deployment

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_actual_clerk_key

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Google Gemini API
VITE_GEMINI_API_KEY=your_actual_gemini_api_key`;
        
        fs.writeFileSync('.env.production', basicEnvContent);
        log.info('Created basic .env.production file');
      }
      
      log.warning('Please update .env.production with your actual API keys before deploying!');
    } else {
      log.info('.env.production file found');
    }
    
    // Step 3: Run linting
    log.step(3, 'Running linting...');
    try {
      execSync('npm run lint', { stdio: 'inherit' });
      log.success('Linting passed');
    } catch (error) {
      log.warning('Linting failed, but continuing build process.');
    }
    
    // Step 4: Build the production version
    log.step(4, 'Building production version...');
    execSync('npm run build:prod', { stdio: 'inherit' });
    log.success('Production build completed successfully');
    
    // Step 5: Create a _redirects file for Netlify (if deploying to Netlify)
    log.step(5, 'Creating _redirects file for Netlify...');
    fs.writeFileSync('dist/_redirects', '/* /index.html 200');
    log.success('Created _redirects file for Netlify');
    
    // Step 6: Copy robots.txt if it exists
    log.step(6, 'Checking for robots.txt...');
    if (fs.existsSync('robots.txt')) {
      fs.copyFileSync('robots.txt', 'dist/robots.txt');
      log.success('Copied robots.txt to dist folder');
    } else {
      // Create a basic robots.txt file
      fs.writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /');
      log.success('Created basic robots.txt in dist folder');
    }
    
    log.success('Build process completed successfully!');
    log.info('To preview the production build, run: npm run serve');
    log.info('The build output is in the dist/ directory');
    
  } catch (error) {
    log.error(`Build process failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the build process
build();
