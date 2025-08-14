


export interface University {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Hostel {
  id: string; // Changed from number to string for Firestore document IDs
  name: string;
  location: string;
  priceRange: string;
  imageUrl: string;
  rating: number;
  universityId: string;
  description: string;
  amenities: {
    name:string;
    icon: string; // font-awesome icon class
  }[];
  isRecommended: boolean;
}

export interface NewsItem {
  id: string; // Changed from number to string
  title: string;
  description: string;
  imageUrl: string;
  source: string;
}

export interface Event {
  id: string; // Changed from number to string
  title: string;
  date: string;
  day: string;
  month: string;
  location: string;
  imageUrl: string;
}

export interface Job {
  id: string;
  title: string;
  deadline: string;
  company: string;
  imageUrl: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  howToApply: string; // URL to the application page
}

export interface Service {
  id: string;
  name: string;
  icon: string; // Font Awesome class string
  description: string;
}

export interface RoommateProfile {
    id: string; // User ID (string for UID)
    name: string; // First name
    imageUrl: string;
    age: number;
    gender: 'Male' | 'Female';
    universityId: string;
    course: string;
    yearOfStudy: number;
    budget: number; // UGX per month
    moveInDate: string; // YYYY-MM-DD
    leaseDuration: 'Semester' | 'Full Year' | 'Flexible';
    bio: string;

    // Lifestyle & Habits
    isSmoker: boolean;
    drinksAlcohol: 'Socially' | 'Rarely' | 'No';
    studySchedule: 'Early Bird' | 'Night Owl' | 'Flexible';
    cleanliness: 'Tidy' | 'Average' | 'Relaxed';
    guestFrequency: 'Rarely' | 'Sometimes' | 'Often';
    hobbies: string; // comma separated string

    // What they are looking for
    seekingGender: 'Male' | 'Female' | 'Any';
}


export interface User {
  id: string; // Firebase UID
  name: string | null;
  email: string | null;
}

export interface Notification {
  id: string;
  type: 'news' | 'job' | 'hostel' | 'roommate';
  message: string;
  timestamp: Date;
  read: boolean;
}