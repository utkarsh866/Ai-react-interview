# AI Mock Interview

AI Mock Interview is a web application that helps users practice and improve their interview skills using artificial intelligence. The application generates realistic interview questions based on job positions and provides feedback on user responses.

## Features

- **AI-Generated Questions**: Create custom interview scenarios with questions tailored to specific job positions and experience levels
- **Practice Interviews**: Conduct mock interviews with AI-generated questions
- **Performance Feedback**: Receive feedback on your responses to improve your interview skills
- **User Authentication**: Secure user accounts with Clerk authentication
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Authentication**: Clerk
- **Database**: Firebase Firestore
- **AI Integration**: Google Gemini API
- **Routing**: React Router
- **Form Handling**: React Hook Form, Zod
- **UI Components**: Radix UI, Lucide Icons
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Clerk account for authentication
- A Firebase project with Firestore enabled
- A Google Cloud account with Gemini API access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-mock-interview.git
   cd ai-mock-interview
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Clerk Authentication
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id

   # Google Gemini API
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Development Mode

In development mode, the application uses mock authentication and data services to allow for development without real API keys. This is automatically enabled when:

- The `VITE_CLERK_PUBLISHABLE_KEY` is set to `pk_test_mock_clerk_key_12345` or is not provided
- The `VITE_FIREBASE_API_KEY` is set to `mock_firebase_api_key_12345` or is not provided

### Building for Production

To build the application for production:

```bash
npm run build:prod
```

This will create a production-ready build in the `dist` directory.

For more detailed deployment instructions, see the [Deployment Guide](DEPLOYMENT_GUIDE.md).

## Usage

1. **Sign Up/Sign In**: Create an account or sign in to access the application
2. **Create a Mock Interview**: Specify the job position, experience level, and other details
3. **Start the Interview**: Answer the AI-generated questions
4. **Review Feedback**: Get feedback on your responses to improve your interview skills

## License

This project is licensed under the MIT License - see the LICENSE file for details.
