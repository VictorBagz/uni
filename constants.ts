


import { University, Service, Hostel, NewsItem, Event, Job, RoommateProfile } from './types';

export const UNIVERSITIES: University[] = [
  { id: 'makerere', name: 'Makerere', logoUrl: 'https://picsum.photos/seed/makerere/40/40' },
  { id: 'kyambogo', name: 'Kyambogo', logoUrl: 'https://picsum.photos/seed/kyambogo/40/40' },
  { id: 'mubs', name: 'MUBS', logoUrl: 'https://picsum.photos/seed/mubs/40/40' },
  { id: 'must', name: 'MUST', logoUrl: 'https://picsum.photos/seed/must/40/40' },
  { id: 'ucu', name: 'UCU', logoUrl: 'https://picsum.photos/seed/ucu/40/40' },
  { id: 'kiu', name: 'KIU', logoUrl: 'https://picsum.photos/seed/kiu/40/40' },
  { id: 'ndejje', name: 'Ndejje', logoUrl: 'https://picsum.photos/seed/ndejje/40/40' },
  { id: 'umu', name: 'UMU Nkozi', logoUrl: 'https://picsum.photos/seed/umu/40/40' },
  { id: 'gulu', name: 'Gulu', logoUrl: 'https://picsum.photos/seed/gulu/40/40' },
  { id: 'lira', name: 'Lira', logoUrl: 'https://picsum.photos/seed/lira/40/40' },
];

export const SERVICES: Service[] = [
  { id: 'food', name: 'Food', icon: 'fas fa-utensils', description: 'Best & affordable food spots.' },
  { id: 'transport', name: 'Transport', icon: 'fas fa-motorcycle', description: 'Easy ways to get around campus.' },
  { id: 'shopping', name: 'Shopping', icon: 'fas fa-shopping-bag', description: 'Your essentials and retail therapy.' },
  { id: 'stationery', name: 'Stationery', icon: 'fas fa-book-open', description: 'All your academic supplies.' },
  { id: 'laundry', name: 'Laundry', icon: 'fas fa-tshirt', description: 'Quick & convenient laundry services.' },
  { id: 'entertainment', name: 'Entertainment', icon: 'fas fa-ticket-alt', description: 'Fun activities and hangout joints.' },
  { id: 'internet', name: 'Internet', icon: 'fas fa-wifi', description: 'Reliable internet for study & fun.' },
  { id: 'health', name: 'Health', icon: 'fas fa-heartbeat', description: 'Clinics, pharmacies & wellness.' },
];

export const GENDERS: RoommateProfile['gender'][] = ['Male', 'Female'];
export const SEEKING_GENDERS: RoommateProfile['seekingGender'][] = ['Male', 'Female', 'Any'];
export const LEASE_DURATIONS: RoommateProfile['leaseDuration'][] = ['Semester', 'Full Year', 'Flexible'];
export const STUDY_SCHEDULES: RoommateProfile['studySchedule'][] = ['Early Bird', 'Night Owl', 'Flexible'];
export const CLEANLINESS_LEVELS: RoommateProfile['cleanliness'][] = ['Tidy', 'Average', 'Relaxed'];
export const GUEST_FREQUENCIES: RoommateProfile['guestFrequency'][] = ['Rarely', 'Sometimes', 'Often'];
export const DRINKING_HABITS: RoommateProfile['drinksAlcohol'][] = ['Socially', 'Rarely', 'No'];


export const HOSTELS: Hostel[] = [
    {
        id: 'hostel-1',
        name: 'Olympia Hostel',
        location: 'Kikoni, Makerere',
        priceRange: '1.2M - 1.8M',
        imageUrl: 'https://picsum.photos/seed/olympia/400/300',
        rating: 4.5,
        universityId: 'makerere',
        description: 'A premium hostel with modern facilities, including a swimming pool and gym. Known for its vibrant community and excellent security.',
        amenities: [
            { name: 'WiFi', icon: 'fas fa-wifi' },
            { name: 'Shuttle', icon: 'fas fa-bus' },
            { name: 'DSTV', icon: 'fas fa-tv' },
            { name: 'Security', icon: 'fas fa-shield-alt' },
            { name: 'Pool', icon: 'fas fa-swimmer' },
            { name: 'Gym', icon: 'fas fa-dumbbell' },
        ],
        isRecommended: true,
    },
    {
        id: 'hostel-2',
        name: 'Nana Hostel',
        location: 'Kikoni, Makerere',
        priceRange: '800K - 1.4M',
        imageUrl: 'https://picsum.photos/seed/nana/400/300',
        rating: 4.2,
        universityId: 'makerere',
        description: 'A popular choice for students seeking a balance of comfort and affordability. Close to the western gate.',
        amenities: [
            { name: 'WiFi', icon: 'fas fa-wifi' },
            { name: 'Shuttle', icon: 'fas fa-bus' },
            { name: 'DSTV', icon: 'fas fa-tv' },
            { name: 'Security', icon: 'fas fa-shield-alt' },
        ],
        isRecommended: false,
    },
    {
        id: 'hostel-3',
        name: 'Bavos Hostel',
        location: 'Banda, Kyambogo',
        priceRange: '600K - 1M',
        imageUrl: 'https://picsum.photos/seed/bavos/400/300',
        rating: 3.9,
        universityId: 'kyambogo',
        description: 'Offers spacious rooms and a quiet environment conducive for studying. Located along the main road for easy access.',
        amenities: [
            { name: 'WiFi', icon: 'fas fa-wifi' },
            { name: 'Security', icon: 'fas fa-shield-alt' },
            { name: 'Water', icon: 'fas fa-shower' },
        ],
        isRecommended: true,
    },
     {
        id: 'hostel-4',
        name: 'Akamwesi Hostel',
        location: 'Wandegeya, Makerere',
        priceRange: '900K - 1.5M',
        imageUrl: 'https://picsum.photos/seed/akamwesi/400/300',
        rating: 4.3,
        universityId: 'mubs',
        description: 'Famous for its social life and proximity to campus. Features a restaurant and a rooftop terrace.',
        amenities: [
            { name: 'WiFi', icon: 'fas fa-wifi' },
            { name: 'Shuttle', icon: 'fas fa-bus' },
            { name: 'DSTV', icon: 'fas fa-tv' },
            { name: 'Security', icon: 'fas fa-shield-alt' },
            { name: 'Restaurant', icon: 'fas fa-utensils' },
        ],
        isRecommended: true,
    },
];

export const NEWS_ITEMS: NewsItem[] = [
    { id: 'news-1', title: 'Makerere University Guild Elections Conclude', description: 'New student leaders elected in a peaceful process.', imageUrl: 'https://picsum.photos/seed/makenews/100/100', source: 'Campus Bee' },
    { id: 'news-2', 'title': 'Kyambogo University Releases Exam Timetable', description: 'Students advised to check the university portal for their schedules.', imageUrl: 'https://picsum.photos/seed/kyambogonews/100/100', source: 'University Portal' },
    { id: 'news-3', title: 'MUBS Hosts Annual Entrepreneurship Gala', description: 'Students showcase innovative business ideas to a panel of investors.', imageUrl: 'https://picsum.photos/seed/mubsnews/100/100', source: 'New Vision' },
];

export const EVENTS: Event[] = [
    { id: 'event-1', title: 'Tech Fest 2024', date: 'August 15, 2024', day: '15', month: 'AUG', location: 'Makerere University, CTF Auditorium', imageUrl: 'https://picsum.photos/seed/event1/400/300' },
    { id: 'event-2', title: 'Kyambogo Cultural Day', date: 'September 5, 2024', day: '05', month: 'SEP', location: 'Kyambogo Cricket Oval', imageUrl: 'https://picsum.photos/seed/event2/400/300' },
    { id: 'event-3', title: 'Inter-Hostel Football Finals', date: 'August 28, 2024', day: '28', month: 'AUG', location: 'Makerere University Sports Grounds', imageUrl: 'https://picsum.photos/seed/event3/400/300' },
];

export const JOBS: Job[] = [
    {
        id: 'job-1',
        title: 'Graduate Trainee - Audit',
        deadline: 'Aug 25th',
        company: 'Deloitte',
        imageUrl: 'https://picsum.photos/seed/deloitte/80/80',
        location: 'Kampala, Uganda',
        type: 'Full-time',
        description: 'Join our dynamic audit team as a Graduate Trainee. This is an excellent opportunity for recent graduates to kickstart their career in a leading professional services firm. You will gain hands-on experience in financial auditing across various industries.',
        responsibilities: [
            'Assisting in the planning and execution of audit engagements.',
            'Evaluating internal controls and identifying areas of risk.',
            'Preparing audit work papers and documenting findings.',
            'Communicating audit results to senior team members.',
        ],
        qualifications: [
            'Bachelors degree in Accounting, Finance, or a related field.',
            'Strong analytical and problem-solving skills.',
            'Excellent communication and interpersonal skills.',
            'A high level of integrity and professionalism.',
        ],
        howToApply: '#',
    },
    {
        id: 'job-2',
        title: 'Marketing Intern',
        deadline: 'Sep 1st',
        company: 'MTN',
        imageUrl: 'https://picsum.photos/seed/mtn/80/80',
        location: 'Kampala, Uganda',
        type: 'Internship',
        description: 'We are looking for an enthusiastic marketing intern to join our marketing department and provide creative ideas to help achieve our goals. You will have administrative duties in developing and implementing marketing strategies.',
        responsibilities: [
            'Support the marketing team in daily administrative tasks.',
            'Assist in marketing and advertising promotional activities (e.g. social media, direct mail, and web).',
            'Help distribute marketing materials.',
            'Help organize marketing events.',
        ],
        qualifications: [
            'Current enrollment in a related BS or Masters degree.',
            'Strong desire to learn along with professional drive.',
            'Solid understanding of different marketing techniques.',
            'Excellent verbal and written communication skills.',
        ],
        howToApply: '#',
    },
    {
        id: 'job-3',
        title: 'Research Assistant (Part-Time)',
        deadline: 'Aug 20th',
        company: 'Makerere School of Public Health',
        imageUrl: 'https://picsum.photos/seed/makerere/80/80',
        location: 'Kampala, Uganda (Remote option available)',
        type: 'Part-time',
        description: 'The School of Public Health is seeking a part-time Research Assistant to support an ongoing project. The ideal candidate will be meticulous, organized, and have a passion for public health research.',
        responsibilities: [
            'Conducting literature reviews.',
            'Collecting and analyzing data.',
            'Preparing materials for submission to granting agencies and foundations.',
            'Assisting with the preparation of manuscripts for publication.',
        ],
        qualifications: [
            'Currently pursuing a degree in Public Health, Social Sciences, or a related field.',
            'Strong organizational skills and attention to detail.',
            'Experience with data collection and analysis is a plus.',
            'Ability to work independently and as part of a team.',
        ],
        howToApply: '#',
    },
];

export const ROOMMATE_PROFILES: RoommateProfile[] = [
    {
        id: 'profile-1',
        name: 'Sarah',
        imageUrl: 'https://picsum.photos/seed/sarah/400/400',
        age: 21,
        gender: 'Female',
        universityId: 'makerere',
        course: 'Law',
        yearOfStudy: 3,
        budget: 900000,
        moveInDate: '2024-08-01',
        leaseDuration: 'Full Year',
        bio: 'I am a quiet and focused law student. I enjoy reading, debating, and keeping my space clean. Looking for a respectful and tidy roommate.',
        isSmoker: false,
        drinksAlcohol: 'Rarely',
        studySchedule: 'Night Owl',
        cleanliness: 'Tidy',
        guestFrequency: 'Rarely',
        hobbies: 'Reading, Chess, Volunteering',
        seekingGender: 'Female',
    },
    {
        id: 'profile-2',
        name: 'John',
        imageUrl: 'https://picsum.photos/seed/john/400/400',
        age: 20,
        gender: 'Male',
        universityId: 'kyambogo',
        course: 'Civil Engineering',
        yearOfStudy: 2,
        budget: 700000,
        moveInDate: '2024-08-15',
        leaseDuration: 'Semester',
        bio: 'Easy-going and friendly engineering student. I love football, video games, and hanging out with friends on weekends. I am reasonably clean and respect personal space.',
        isSmoker: false,
        drinksAlcohol: 'Socially',
        studySchedule: 'Early Bird',
        cleanliness: 'Average',
        guestFrequency: 'Sometimes',
        hobbies: 'Football, FIFA, Movies',
        seekingGender: 'Any',
    },
    {
        id: 'profile-3',
        name: 'Brenda',
        imageUrl: 'https://picsum.photos/seed/brenda/400/400',
        age: 22,
        gender: 'Female',
        universityId: 'mubs',
        course: 'Business Administration',
        yearOfStudy: 4,
        budget: 1200000,
        moveInDate: '2024-09-01',
        leaseDuration: 'Flexible',
        bio: 'Final year BBA student. I\'m social, love exploring new cafes, and enjoy cooking. Looking for a fun and mature roommate to share a nice place with.',
        isSmoker: false,
        drinksAlcohol: 'Socially',
        studySchedule: 'Flexible',
        cleanliness: 'Average',
        guestFrequency: 'Sometimes',
        hobbies: 'Cooking, Fashion, Travel',
        seekingGender: 'Female',
    },
];