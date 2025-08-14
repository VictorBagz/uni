import React from 'react';
import { User, RoommateProfile, University } from '../types';
import Spinner from './Spinner';

type AppView = 'main' | 'roommateFinder' | 'blog' | 'events' | 'jobs' | 'auth' | 'admin' | 'profile';

interface ProfilePageProps {
  user: User;
  profile: RoommateProfile | null;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
  universities: University[];
}

const ProfileStatCard = ({ icon, label, value }) => (
    <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
        <div className="bg-unistay-yellow/20 text-unistay-navy rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
            <i className={`fas ${icon} text-xl`}></i>
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-lg font-bold text-unistay-navy truncate">{value}</p>
        </div>
    </div>
);


const ProfilePage = ({ user, profile, onNavigate, onLogout, universities }: ProfilePageProps) => {

    const getUniversityName = (uniId: string | undefined): string => {
        if (!uniId) return 'Not Set';
        const university = universities.find(u => u.id === uniId);
        return university ? university.name : 'Unknown University';
    };
    
    return (
        <div className="bg-gray-100 min-h-screen">
             <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                    <h1 className="text-3xl font-bold text-unistay-navy">My Profile</h1>
                    <button onClick={() => onNavigate('main')} className="font-semibold text-unistay-navy hover:text-unistay-yellow transition-colors flex items-center gap-2">
                        <i className="fas fa-arrow-left"></i>
                        Back to Home
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                            <div className="w-32 h-32 rounded-full bg-unistay-yellow flex items-center justify-center font-bold text-unistay-navy text-5xl mx-auto mb-4">
                                {profile?.imageUrl ? (
                                    <img src={profile.imageUrl} alt={user.name || ''} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    user.name?.charAt(0).toUpperCase()
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-unistay-navy">{user.name}</h2>
                            <p className="text-gray-500">{user.email}</p>
                            <button 
                                onClick={() => onNavigate('roommateFinder')}
                                className="mt-6 w-full bg-unistay-navy text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors"
                            >
                                {profile ? 'Edit Roommate Profile' : 'Create Roommate Profile'}
                            </button>
                        </div>

                         <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-xl font-bold text-unistay-navy mb-4">Account</h3>
                             <button 
                                onClick={onLogout}
                                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3"
                            >
                                <i className="fas fa-sign-out-alt w-5"></i>
                                Logout
                            </button>
                         </div>
                    </div>

                    {/* Right Column: Details & Activity */}
                    <div className="lg:col-span-2 space-y-8">
                         <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-xl font-bold text-unistay-navy mb-4">My Student Details</h3>
                            {profile ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ProfileStatCard icon="fa-university" label="University" value={getUniversityName(profile?.universityId)} />
                                    <ProfileStatCard icon="fa-book" label="Course" value={profile.course || 'Not Set'} />
                                    <ProfileStatCard icon="fa-calendar-day" label="Year of Study" value={profile.yearOfStudy?.toString() || 'Not Set'} />
                                    <ProfileStatCard icon="fa-wallet" label="Budget" value={`UGX ${profile.budget?.toLocaleString() || '0'}`} />
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <i className="fas fa-user-graduate text-4xl text-gray-300 mb-4"></i>
                                    <p className="text-gray-600">You haven't created a roommate profile yet.</p>
                                    <button onClick={() => onNavigate('roommateFinder')} className="mt-4 font-bold text-unistay-navy hover:text-unistay-yellow">
                                        Create one now to find matches!
                                    </button>
                                </div>
                            )}
                         </div>

                         <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h3 className="text-xl font-bold text-unistay-navy mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                <button onClick={() => onNavigate('roommateFinder')} className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <i className="fas fa-users text-unistay-navy"></i>
                                        <span className="font-semibold">My Roommate Matches</span>
                                    </div>
                                    <i className="fas fa-chevron-right text-gray-400"></i>
                                </button>
                                <button className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-not-allowed opacity-60">
                                    <div className="flex items-center gap-4">
                                        <i className="fas fa-heart text-unistay-navy"></i>
                                        <span className="font-semibold">Saved Hostels</span>
                                    </div>
                                    <i className="fas fa-chevron-right text-gray-400"></i>
                                </button>
                                 <button className="flex items-center justify-between w-full p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-not-allowed opacity-60">
                                    <div className="flex items-center gap-4">
                                        <i className="fas fa-file-alt text-unistay-navy"></i>
                                        <span className="font-semibold">My Job Applications</span>
                                    </div>
                                    <i className="fas fa-chevron-right text-gray-400"></i>
                                </button>
                            </div>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
