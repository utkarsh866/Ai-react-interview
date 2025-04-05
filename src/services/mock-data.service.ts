import { Interview, User, UserAnswer } from "@/types";
import { Timestamp } from "firebase/firestore";

// Mock user data
export const mockUser: User = {
  id: 'dev-mock-user-id',
  name: 'Development User',
  email: 'dev@example.com',
  imageUrl: 'https://via.placeholder.com/150',
  createdAt: Timestamp.now(),
  updateAt: Timestamp.now(),
};

// Mock interview questions
const mockQuestions = [
  {
    question: "What is React and how does it differ from other JavaScript frameworks?",
    answer: "React is a JavaScript library for building user interfaces, particularly single-page applications. Unlike frameworks like Angular, React focuses only on the view layer and uses a virtual DOM for efficient rendering. It uses a component-based architecture and a unidirectional data flow, making applications more predictable and easier to debug."
  },
  {
    question: "Explain the concept of state in React.",
    answer: "State in React is an object that determines how a component renders and behaves. It's similar to props but is private and fully controlled by the component. State can be changed using setState() method, which triggers a re-render of the component. With the introduction of hooks, state can also be managed using the useState hook in functional components."
  },
  {
    question: "What are React hooks and how do they improve React development?",
    answer: "React hooks are functions that let you 'hook into' React state and lifecycle features from function components. They were introduced in React 16.8 to allow developers to use state and other React features without writing a class. Hooks like useState, useEffect, useContext, and useReducer make code more reusable, help organize logic in components, and reduce the complexity of components."
  },
  {
    question: "Describe the virtual DOM and its benefits.",
    answer: "The virtual DOM is a lightweight copy of the actual DOM in memory. When state changes in a React component, React creates a new virtual DOM tree, compares it with the previous one (a process called 'diffing'), and then updates only the changed parts in the real DOM. This approach is more efficient than directly manipulating the DOM, as DOM operations are expensive in terms of performance."
  },
  {
    question: "What is the significance of keys in React lists?",
    answer: "Keys help React identify which items have changed, been added, or been removed in lists. They should be given to elements inside an array to give them a stable identity. Keys should be unique among siblings, but they don't need to be globally unique. Using index as keys is not recommended if the order of items may change, as it can negatively impact performance and may cause issues with component state."
  }
];

// Mock interviews
export const mockInterviews: Interview[] = [
  {
    id: 'mock-interview-1',
    position: 'Frontend Developer',
    description: 'We are looking for a skilled Frontend Developer with experience in React, TypeScript, and modern web technologies.',
    experience: 2,
    userId: 'dev-mock-user-id',
    techStack: 'React, TypeScript, CSS, HTML',
    questions: mockQuestions,
    createdAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  },
  {
    id: 'mock-interview-2',
    position: 'Full Stack Developer',
    description: 'Seeking a Full Stack Developer with experience in React, Node.js, and database technologies.',
    experience: 3,
    userId: 'dev-mock-user-id',
    techStack: 'React, Node.js, MongoDB, Express',
    questions: mockQuestions,
    createdAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  }
];

// Mock user answers
export const mockUserAnswers: UserAnswer[] = [
  {
    id: 'mock-answer-1',
    mockIdRef: 'mock-interview-1',
    question: mockQuestions[0].question,
    correct_ans: mockQuestions[0].answer,
    user_ans: "React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of developers. React allows developers to create large web applications that can change data without reloading the page.",
    feedback: "Good explanation of what React is, but could have elaborated more on how it differs from other frameworks.",
    rating: 7,
    userId: 'dev-mock-user-id',
    createdAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  }
];

// Mock data service
export const mockDataService = {
  // Get user by ID
  getUser: (userId: string): Promise<User | null> => {
    return Promise.resolve(userId === mockUser.id ? mockUser : null);
  },
  
  // Create or update user
  setUser: (userId: string, userData: User): Promise<void> => {
    console.log('Mock: Setting user data for', userId, userData);
    return Promise.resolve();
  },
  
  // Get interviews for a user
  getUserInterviews: (userId: string): Promise<Interview[]> => {
    return Promise.resolve(
      userId === mockUser.id ? mockInterviews : []
    );
  },
  
  // Get interview by ID
  getInterview: (interviewId: string): Promise<Interview | null> => {
    const interview = mockInterviews.find(i => i.id === interviewId);
    return Promise.resolve(interview || null);
  },
  
  // Create a new interview
  createInterview: (interview: Omit<Interview, 'id' | 'createdAt' | 'updateAt'>): Promise<string> => {
    const newId = `mock-interview-${Date.now()}`;
    console.log('Mock: Creating interview', newId, interview);
    return Promise.resolve(newId);
  },
  
  // Update an interview
  updateInterview: (interviewId: string, data: Partial<Interview>): Promise<void> => {
    console.log('Mock: Updating interview', interviewId, data);
    return Promise.resolve();
  },
  
  // Get user answers for an interview
  getUserAnswers: (interviewId: string): Promise<UserAnswer[]> => {
    return Promise.resolve(
      mockUserAnswers.filter(a => a.mockIdRef === interviewId)
    );
  },
  
  // Save a user answer
  saveUserAnswer: (answer: Omit<UserAnswer, 'id' | 'createdAt' | 'updateAt'>): Promise<string> => {
    const newId = `mock-answer-${Date.now()}`;
    console.log('Mock: Saving user answer', newId, answer);
    return Promise.resolve(newId);
  }
};
