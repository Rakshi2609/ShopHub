import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVlNjnQNITLwVYVjKQ1jQDqs4W9uUhVDk",
  authDomain: "pixelpal-ai.firebaseapp.com",
  projectId: "pixelpal-ai",
  storageBucket: "pixelpal-ai.firebasestorage.app",
  messagingSenderId: "275484421406",
  appId: "1:275484421406:web:21236801d7bfa4816e2d0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
