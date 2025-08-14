
import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedContent from './components/FeaturedContent';
import CommunityHub from './components/CommunityHub';
import Services from './components/Services';
import Footer from './components/Footer';
import HostelDetailModal from './components/HostelDetailModal';
import RoommateFinder from './components/RoommateFinder';
import BlogPage from './components/BlogPage';
import EventsPage from './components/EventsPage';
import JobsPage from './components/JobsPage';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/AdminDashboard';
import ProfilePage from './components/ProfilePage';
import Spinner from './components/Spinner';

import { 
    UNIVERSITIES, 
    SERVICES
} from './constants';
import { University, Hostel, NewsItem, Job, Event, User, RoommateProfile, Notification } from './types';

import { mockAuthService } from './services/mockAuthService';
import { hostelService, newsService, eventService, jobService, roommateProfileService, hostelHandler, newsHandler, eventHandler, jobHandler, initDb } from './services/dbService';

type AppView = 'main' | 'roommateFinder' | 'blog' | 'events' | 'jobs' | 'auth' | 'admin' | 'profile';


const App = () => {
  // --- State Management ---
  const [currentView, setCurrentView] = useState<AppView>('main');
  const [selectedUniversity, setSelectedUniversity] = useState<University>(UNIVERSITIES[0]);
  const [viewingHostel, setViewingHostel] = useState<Hostel | null>(null);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [savedHostels, setSavedHostels] = useState<Set<string>>(new Set());
  const [notifications, setNotifications] = useState<Notification[]>([]);


  // Data state
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [roommateProfiles, setRoommateProfiles] = useState<RoommateProfile[]>([]);
  
  // --- Effects ---
  // Listen to auth state changes from the mock service
  useEffect(() => {
    const unsubscribe = mockAuthService.onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsAdmin(mockAuthService.isAdmin(user));
       if (!user) {
        // Clear saved hostels and notifications on logout
        setSavedHostels(new Set());
        setNotifications([]);
      }
    });
    return () => unsubscribe();
  }, []);
  
  // Fetch initial data from the SQLite service
  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        await initDb(); // Initialize and seed the database
        const [hostelsData, newsData, eventsData, jobsData, profilesData] = await Promise.all([
            hostelService.getAll(),
            newsService.getAll(),
            eventService.getAll(),
            jobService.getAll(),
            roommateProfileService.getAll()
        ]);
        setHostels(hostelsData);
        setNews(newsData);
        setEvents(eventsData);
        setJobs(jobsData);
        setRoommateProfiles(profilesData);
        setIsLoading(false);
    };
    loadData();
  }, []);

  // Generate mock notifications when user logs in and data is available
  useEffect(() => {
    if (currentUser && !isLoading && notifications.length === 0) {
      const currentUserProfile = roommateProfiles.find(p => p.id === currentUser?.id);
      const newNotifs: Notification[] = [];
      if (news.length > 0) {
          newNotifs.push({
              id: `notif-news-${news[0].id}`, type: 'news',
              message: `New article posted: "${news[0].title}"`,
              timestamp: new Date(new Date().getTime() - 1000 * 60 * 3), // 3 mins ago
              read: false,
          });
      }
      if (jobs.length > 0) {
          newNotifs.push({
              id: `notif-job-${jobs[0].id}`, type: 'job',
              message: `New opportunity: ${jobs[0].title} at ${jobs[0].company}`,
              timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 1), // 1 hour ago
              read: false,
          });
      }
      if (roommateProfiles.length > 1 && currentUserProfile) {
           newNotifs.push({
              id: `notif-roommate-${Date.now()}`, type: 'roommate',
              message: `You have new potential roommate matches!`,
              timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 5), // 5 hours ago
              read: false,
          });
      }
      setNotifications(newNotifs.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()));
    }
  }, [currentUser, isLoading, news, jobs, roommateProfiles]);


  const refreshAllData = async () => {
    // Re-fetch all data to reflect changes made in the admin panel
    const [hostelsData, newsData, eventsData, jobsData, profilesData] = await Promise.all([
        hostelService.getAll(),
        newsService.getAll(),
        eventService.getAll(),
        jobService.getAll(),
        roommateProfileService.getAll()
    ]);
    setHostels(hostelsData);
    setNews(newsData);
    setEvents(eventsData);
    setJobs(jobsData);
    setRoommateProfiles(profilesData);
  };

  // --- Modal Handlers ---
  const handleViewHostel = (hostel: Hostel) => setViewingHostel(hostel);
  const handleCloseModal = () => setViewingHostel(null);
  
  // --- Profile Update Handler ---
  const handleProfileUpdate = async (profileData: RoommateProfile): Promise<void> => {
    await roommateProfileService.set(profileData);
    const updatedProfiles = await roommateProfileService.getAll();
    setRoommateProfiles(updatedProfiles);
  };
  
  // --- Navigation ---
  const handleNavigation = (view: AppView) => {
    if (view === 'admin' && isAdmin) {
        setCurrentView('admin');
    } else if (view !== 'admin') {
        setCurrentView(view);
    }
    window.scrollTo(0, 0);
  };

  // --- Save Hostel Handler ---
  const handleToggleSaveHostel = (hostelId: string) => {
    if (!currentUser) {
        handleNavigation('auth');
        return;
    }
    setSavedHostels(prevSaved => {
        const newSaved = new Set(prevSaved);
        if (newSaved.has(hostelId)) {
            newSaved.delete(hostelId);
        } else {
            newSaved.add(hostelId);
        }
        return newSaved;
    });
  };
  
  const handleAuthSuccess = (user: User) => {
      setCurrentUser(user);
      handleNavigation('main');
  }
  
  const handleLogout = async () => {
      await mockAuthService.logout();
      setCurrentUser(null);
      setIsAdmin(false);
      handleNavigation('auth');
  }
  
  const handleMarkNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // --- Page Content ---
  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-unistay-bg">
            <Spinner size="lg" />
        </div>
    );
  }
  
  // Admin view takes precedence
  if (currentView === 'admin') {
    return (
        <AdminDashboard
            onExitAdminMode={() => handleNavigation('main')}
            content={{
                hostels: { items: hostels, handler: hostelHandler, universities: UNIVERSITIES },
                news: { items: news, handler: newsHandler },
                events: { items: events, handler: eventHandler },
                jobs: { items: jobs, handler: jobHandler },
            }}
            onDataChange={refreshAllData}
        />
    );
  }

  const currentUserProfile = roommateProfiles.find(p => p.id === currentUser?.id) || null;

  const PageComponent = {
    main: (
        <main className="flex-1 pt-20">
            <Hero />
            <FeaturedContent 
                universities={UNIVERSITIES}
                selectedUniversity={selectedUniversity}
                onSelectUniversity={setSelectedUniversity}
                hostels={hostels}
                onViewHostel={handleViewHostel}
                savedHostelIds={savedHostels}
                onToggleSave={handleToggleSaveHostel}
            />
            <CommunityHub 
                news={news}
                events={events}
                jobs={jobs}
                universities={UNIVERSITIES}
                onNavigateToBlog={() => handleNavigation('blog')}
                onNavigateToEvents={() => handleNavigation('events')}
                onNavigateToJobs={() => handleNavigation('jobs')}
                user={currentUser}
                onNavigate={handleNavigation}
            />
            <Services 
                services={SERVICES}
                selectedUniversity={selectedUniversity}
            />
        </main>
    ),
    roommateFinder: currentUser ? (
       <RoommateFinder
          currentUser={currentUser}
          currentUserProfile={currentUserProfile}
          onProfileUpdate={handleProfileUpdate}
          profiles={roommateProfiles}
          universities={UNIVERSITIES}
          onNavigateHome={() => handleNavigation('main')}
       />
    ) : <AuthPage onAuthSuccess={handleAuthSuccess} onNavigateHome={() => handleNavigation('main')} />,
    blog: <BlogPage news={news} onNavigateHome={() => handleNavigation('main')} />,
    events: <EventsPage events={events} onNavigateHome={() => handleNavigation('main')} />,
    jobs: <JobsPage jobs={jobs} onNavigateHome={() => handleNavigation('main')} />,
    auth: <AuthPage onAuthSuccess={handleAuthSuccess} onNavigateHome={() => handleNavigation('main')} />,
    profile: currentUser ? (
       <ProfilePage
          user={currentUser}
          profile={currentUserProfile}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
          universities={UNIVERSITIES}
       />
    ) : <AuthPage onAuthSuccess={handleAuthSuccess} onNavigateHome={() => handleNavigation('main')} />,
  }[currentView];


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Header
            currentView={currentView}
            onNavigate={handleNavigation}
            user={currentUser}
            isAdmin={isAdmin}
            onLogout={handleLogout}
            notifications={notifications}
            onMarkNotificationsAsRead={handleMarkNotificationsAsRead}
        />
        {PageComponent}
        {currentView === 'main' && (
             <Footer
                user={currentUser}
                onNavigateToAuth={() => handleNavigation('auth')}
                onNavigateToRoommateFinder={() => handleNavigation('roommateFinder')}
                onNavigateToBlog={() => handleNavigation('blog')}
            />
        )}
        {viewingHostel && (
            <HostelDetailModal hostel={viewingHostel} onClose={handleCloseModal} />
        )}
    </div>
  );
};

export default App;
