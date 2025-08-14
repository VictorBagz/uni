// services/firebase.ts
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service and auth service
export const db = getFirestore(app);
export const auth = getAuth(app);