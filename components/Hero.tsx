

import React, { useState } from 'react';
import { useScrollObserver } from '../hooks/useScrollObserver';
import Spinner from './Spinner';

const Hero = () => {
  const [heroRef, isVisible] = useScrollObserver<HTMLDivElement>();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
        setIsSearching(false);
        // In a real app, you'd handle search results here
    }, 1500);
  }

  return (
    <section 
      ref={heroRef}
      className="relative bg-cover bg-center h-[60vh] min-h-[400px] flex items-center justify-center" 
      style={{ backgroundImage: `url('https://picsum.photos/seed/hero-bg/1600/900')` }}
    >
      <div className="absolute inset-0 bg-unistay-navy bg-opacity-60"></div>
      <div className={`relative z-10 text-center text-white px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Find Your Perfect Student Home
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
          Discover the best hostels near your university with all the amenities you need for a great student life.
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by university, hostel name, or location..."
              className="w-full p-4 pl-12 rounded-full border-2 border-transparent focus:ring-4 focus:ring-unistay-yellow focus:border-unistay-yellow text-gray-800 text-lg shadow-2xl transition"
              disabled={isSearching}
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-unistay-navy hover:bg-opacity-90 text-white font-bold py-2.5 px-8 rounded-full transition-all duration-300 flex items-center justify-center w-[120px] disabled:bg-opacity-70"
            >
              {isSearching ? <Spinner color="white" size="sm" /> : 'Search'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
