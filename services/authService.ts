import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from '@firebase/auth';
import { User } from '../types';

// NOTE: We do not store user data in Firestore in this version,
// but in a real app you might create a 'users' collection
// to store additional non-auth-related user info.

const formatUser = (firebaseUser: FirebaseUser | null): User | null => {
    if (!firebaseUser) return null;
    return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
    };
};

export const authService = {
  async signUp(name: string, email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile to include the name
    if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        // The onAuthStateChanged listener in App.tsx will handle the state update
        return formatUser(userCredential.user);
    }
    throw new Error('User could not be created.');
  },

  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // The onAuthStateChanged listener in App.tsx will handle the state update
    return formatUser(userCredential.user);
  },

  async socialLogin(providerName: 'Google'): Promise<User> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener in App.tsx will handle the state update
      return formatUser(result.user);
    } catch (error) {
       console.error("Social login error:", error);
       // Handle specific errors like account-exists-with-different-credential
       throw new Error("Could not complete social sign-in. Please try again.");
    }
  },

  logout(): Promise<void> {
    return signOut(auth);
  },
};