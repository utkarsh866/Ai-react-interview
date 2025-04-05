import { Interview, User, UserAnswer } from "@/types";
import { db, useMockFirebase } from "@/config/firebase.config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import { mockDataService } from "./mock-data.service";

// Data service that uses either real Firestore or mock data
const dataService = {
  // Get user by ID
  getUser: async (userId: string): Promise<User | null> => {
    if (useMockFirebase) {
      return mockDataService.getUser(userId);
    }

    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } as User : null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  // Create or update user
  setUser: async (userId: string, userData: Omit<User, 'id' | 'createdAt' | 'updateAt'>): Promise<void> => {
    if (useMockFirebase) {
      return mockDataService.setUser(userId, {
        id: userId,
        ...userData,
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp()
      } as User);
    }

    try {
      await setDoc(doc(db, "users", userId), {
        ...userData,
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error setting user data:", error);
      throw error;
    }
  },

  // Get interviews for a user
  getUserInterviews: async (userId: string): Promise<Interview[]> => {
    if (useMockFirebase) {
      return mockDataService.getUserInterviews(userId);
    }

    try {
      const interviewQuery = query(
        collection(db, "interviews"),
        where("userId", "==", userId)
      );

      const snapshot = await getDocs(interviewQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Interview[];
    } catch (error) {
      console.error("Error getting user interviews:", error);
      return [];
    }
  },

  // Get interview by ID
  getInterview: async (interviewId: string): Promise<Interview | null> => {
    if (useMockFirebase) {
      return mockDataService.getInterview(interviewId);
    }

    try {
      const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
      return interviewDoc.exists() ? { id: interviewDoc.id, ...interviewDoc.data() } as Interview : null;
    } catch (error) {
      console.error("Error getting interview:", error);
      return null;
    }
  },

  // Create a new interview
  createInterview: async (interview: Omit<Interview, 'id' | 'createdAt' | 'updateAt'>): Promise<string> => {
    if (useMockFirebase) {
      return mockDataService.createInterview(interview);
    }

    try {
      const docRef = await addDoc(collection(db, "interviews"), {
        ...interview,
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating interview:", error);
      throw error;
    }
  },

  // Update an interview
  updateInterview: async (interviewId: string, data: Partial<Interview>): Promise<void> => {
    if (useMockFirebase) {
      return mockDataService.updateInterview(interviewId, data);
    }

    try {
      await updateDoc(doc(db, "interviews", interviewId), {
        ...data,
        updateAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating interview:", error);
      throw error;
    }
  },

  // Get user answers for an interview
  getUserAnswers: async (interviewId: string): Promise<UserAnswer[]> => {
    if (useMockFirebase) {
      return mockDataService.getUserAnswers(interviewId);
    }

    try {
      const answersQuery = query(
        collection(db, "userAnswers"),
        where("mockIdRef", "==", interviewId)
      );

      const snapshot = await getDocs(answersQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserAnswer[];
    } catch (error) {
      console.error("Error getting user answers:", error);
      return [];
    }
  },

  // Save a user answer
  saveUserAnswer: async (answer: Omit<UserAnswer, 'id' | 'createdAt' | 'updateAt'>): Promise<string> => {
    if (useMockFirebase) {
      return mockDataService.saveUserAnswer(answer);
    }

    try {
      const docRef = await addDoc(collection(db, "userAnswers"), {
        ...answer,
        createdAt: serverTimestamp(),
        updateAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving user answer:", error);
      throw error;
    }
  }
};

export default dataService;
