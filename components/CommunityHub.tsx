
import React, { useState, useCallback } from 'react';
import { NewsItem, Event, Job, University, User } from '../types';
import { fetchCampusGuide } from '../services/geminiService';
import { useScrollObserver } from '../hooks/useScrollObserver';
import Spinner from './Spinner';

type AppView = 'main' | 'roommateFinder' | 'blog' | 'events' | 'jobs' | 'auth' | 'admin' | 'profile';

const NewsPanel = ({ items }: { items: NewsItem[] }) => (
  <div className="space-y-4">
    {items.map(item => (
      <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <img src={item.imageUrl} alt={item.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
        <div className="flex-1">
          <p className="font-bold text-unistay-navy">{item.title}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-xs text-gray-400 mt-1">Source: {item.source}</p>
        </div>
      </div>
    ))}
  </div>
);

const EventsPanel = ({ items }: { items: Event[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {items.map(event => (
      <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300">
        <div className="relative">
          <img src={event.imageUrl} alt={event.title} className="h-40 w-full object-cover" />
          <div className="absolute top-3 left-3 bg-unistay-yellow text-unistay-navy text-center rounded-lg px-3 py-1 shadow-md">
            <p className="font-extrabold text-xl">{event.day}</p>
            <p className="font-semibold text-xs leading-tight">{event.month}</p>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-unistay-navy">{event.title}</h3>
          <p className="text-sm text-gray-500 mt-1"><i className="fas fa-map-marker-alt text-unistay-yellow mr-2"></i>{event.location}</p>
        </div>
      </div>
    ))}
  </div>
);

const JobsPanel = ({ items }: { items: Job[] }) => (
    <div className="space-y-4">
    {items.map(job => (
      <div key={job.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <img src={job.imageUrl} alt={job.company} className="w-12 h-12 object-contain"/>
        </div>
        <div className="flex-1">
          <p className="font-bold text-unistay-navy">{job.title}</p>
          <p className="text-sm text-gray-600">{job.company}</p>
        </div>
        <div className="text-right">
            <p className="text-sm text-gray-500">Apply by</p>
            <p className="font-semibold text-unistay-navy">{job.deadline}</p>
        </div>
      </div>
    ))}
  </div>
);

const CampusGuide = ({ universities, user, onNavigate }: { universities: University[], user: User | null, onNavigate: (view: AppView) => void }) => {
  const [guide, setGuide] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUni, setSelectedUni] = useState<string>(universities[0].id);

  const isLoggedIn = !!user;

  const handleGenerateGuide = useCallback(async () => {
    if (!isLoggedIn) {
      onNavigate('auth');
      return;
    }

    const university = universities.find(u => u.id === selectedUni);
    if (!university) {
        setError("Could not find the selected university.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setGuide(null);
    try {
        const result = await fetchCampusGuide(university.name);
        setGuide(result);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
        setGuide(
            `<h2 class="text-2xl font-bold text-red-600 mb-3">Oops! Something went wrong.</h2><p>We couldn't generate the campus guide at the moment. Please try again later.</p>`
        );
    } finally {
        setIsLoading(false);
    }
  }, [selectedUni, universities, isLoggedIn, onNavigate]);

  return (
    <div id="campus-guide" className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative mt-12 animate-fade-in-up">
        <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto bg-unistay-yellow/20 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-robot text-5xl text-unistay-navy"></i>
            </div>
            <h2 className="text-3xl font-extrabold text-unistay-navy">AI-Powered Campus Guide</h2>
            <p className="text-gray-600 mt-1">Get instant insights about any campus area with Gemini.</p>
        </div>
        
        <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <select 
                    value={selectedUni}
                    onChange={(e) => setSelectedUni(e.target.value)}
                    disabled={isLoading || !isLoggedIn}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-unistay-yellow focus:border-unistay-yellow disabled:bg-gray-200 disabled:cursor-not-allowed"
                    aria-label="Select a university for the campus guide"
                >
                    {universities.map(uni => <option key={uni.id} value={uni.id}>{uni.name}</option>)}
                </select>
                <button 
                    onClick={handleGenerateGuide} 
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-unistay-navy hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[170px]"
                >
                    {isLoading ? <Spinner color="white" size="sm" /> : (isLoggedIn ? 'Generate' : 'Login to Generate')}
                </button>
            </div>
        </div>

        <div className="mt-6 p-5 bg-unistay-bg rounded-lg border border-gray-200 min-h-[250px] gemini-guide">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-unistay-navy p-4">
                    <Spinner color="navy" size="lg" className="mb-4" />
                    <p className="font-semibold">Generating your personalized guide...</p>
                    <p className="text-sm text-gray-500 mt-1">This might take a moment.</p>
                </div>
            ) : guide ? (
                 <div dangerouslySetInnerHTML={{ __html: guide }} />
            ) : !isLoggedIn ? (
                 <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
                    <i className="fas fa-lock text-3xl mb-4" aria-hidden="true"></i>
                    <h3 className="font-semibold text-unistay-navy">This is a members-only feature.</h3>
                    <p>Please log in or create an account to use the AI Campus Guide.</p>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
                    <i className="fas fa-lightbulb text-3xl mb-4" aria-hidden="true"></i>
                    <p>Select a university and click 'Generate' to get a helpful guide.</p>
                </div>
            )}
        </div>
    </div>
  );
};


interface CommunityHubProps {
  news: NewsItem[];
  events: Event[];
  jobs: Job[];
  universities: University[];
  onNavigateToBlog: () => void;
  onNavigateToEvents: () => void;
  onNavigateToJobs: () => void;
  user: User | null;
  onNavigate: (view: AppView) => void;
}

const CommunityHub = ({ news, events, jobs, universities, onNavigateToBlog, onNavigateToEvents, onNavigateToJobs, user, onNavigate }: CommunityHubProps) => {
  const [activeTab, setActiveTab] = useState('News');
  const [sectionRef, isVisible] = useScrollObserver<HTMLElement>();

  const tabs = [
    { name: 'News', icon: 'fas fa-newspaper', action: onNavigateToBlog },
    { name: 'Events', icon: 'fas fa-calendar-alt', action: onNavigateToEvents },
    { name: 'Jobs', icon: 'fas fa-briefcase', action: onNavigateToJobs },
  ];

  const panels = {
    News: <NewsPanel items={news} />,
    Events: <EventsPanel items={events} />,
    Jobs: <JobsPanel items={jobs} />,
  };
  
  return (
    <section ref={sectionRef} className="py-16 bg-unistay-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-3xl font-bold text-unistay-navy sm:text-4xl">Campus Community Hub</h2>
          <p className="mt-4 text-lg text-gray-600">Stay connected with the latest news, events, and job opportunities from your university.</p>
        </div>

        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-8 flex justify-center border-b-2 border-gray-200" role="tablist" aria-label="Community Hub Tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`px-4 sm:px-8 py-4 font-semibold text-lg border-b-4 transition-all duration-300 -mb-0.5 ${
                            activeTab === tab.name
                            ? 'text-unistay-navy border-unistay-yellow'
                            : 'text-gray-500 border-transparent hover:text-unistay-navy hover:border-gray-300'
                        }`}
                        role="tab"
                        aria-selected={activeTab === tab.name}
                        aria-controls={`panel-${tab.name}`}
                    >
                       <i className={`${tab.icon} mr-2 hidden sm:inline-block`} aria-hidden="true"></i> {tab.name}
                    </button>
                ))}
            </div>

            <div className="relative min-h-[400px]">
              {Object.entries(panels).map(([name, panel]) => (
                  <div key={name} id={`panel-${name}`} role="tabpanel" aria-labelledby={`tab-${name}`} className={`transition-opacity duration-500 ${activeTab === name ? 'opacity-100' : 'opacity-0 absolute w-full pointer-events-none'}`}>
                      {panel}
                  </div>
              ))}
            </div>

            <div className="text-center mt-8">
                <button onClick={tabs.find(t => t.name === activeTab)?.action} className="font-bold text-unistay-navy hover:text-unistay-yellow transition-colors flex items-center gap-2 mx-auto">
                    <span>View All {activeTab}</span>
                    <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        
        <CampusGuide universities={universities} user={user} onNavigate={onNavigate} />
      </div>
    </section>
  );
};

export default CommunityHub;
