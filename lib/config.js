import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js";
import Groq from "groq-sdk";

// ==========================================
// 1. FIREBASE CONFIGURATION (Auth & Database)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyDBdIkHNsQb6WCF074NYryMi3MPXrj5RUo",
  authDomain: "noor-8825.firebaseapp.com",
  projectId: "noor-8825",
  storageBucket: "noor-8825.firebasestorage.app",
  messagingSenderId: "423756584907",
  appId: "1:423756584907:web:bb8c79f50a41c8229a084e",
  measurementId: "G-NPS021YL1K"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// ==========================================
// 2. SUPABASE CONFIGURATION (ePub Storage)
// ==========================================
const supabaseUrl = "https://jeivyphkofdoivasbvrn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplaXZ5cGhrb2Zkb2l2YXNidnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Nzk0MDQsImV4cCI6MjA5MjI1NTQwNH0.bGjf_lu7gs4Yp7nvoJhLMrT583gqK5SF9e2yTA879uQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// 3. CLOUDINARY CONFIGURATION (Image Storage)
// ==========================================
export const cloudinaryConfig = {
  cloudName: "dzv2voy79",
  uploadPreset: "Polarith" // Unsigned preset for direct frontend uploads
};

// ==========================================
// 4. GROQ AI CONFIGURATION (NOOR AI)
// ==========================================
export const groq = new Groq({
  apiKey: "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",
  // Dangerously allow browser is required to make direct calls from the client side 
  // without routing through a Next.js API route first.
  dangerouslyAllowBrowser: true 
});
