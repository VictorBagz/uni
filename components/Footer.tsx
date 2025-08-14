
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface FooterProps {
    onNavigateToRoommateFinder: () => void;
    onNavigateToBlog: () => void;
    onNavigateToAuth: () => void;
    user: User | null;
}

const Footer = ({ onNavigateToRoommateFinder, onNavigateToBlog, onNavigateToAuth, user }: FooterProps) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleCampusGuideClick = () => {
        document.getElementById('campus-guide')?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const handleStudentDealsClick = () => {
        alert('The Student Deals feature is coming soon!');
    };

    const links = {
        'UniStay': [
            { text: 'Hostels', action: scrollToTop },
            { text: 'About Us', href: '#' },
            { text: 'Contact', href: '#' },
            { text: 'Blog', action: onNavigateToBlog }
        ],
        'For Students': [
            { text: 'Find a Roommate', action: user ? onNavigateToRoommateFinder : onNavigateToAuth },
            { text: 'Student Deals', action: user ? handleStudentDealsClick : onNavigateToAuth },
            { text: 'Campus Guides', action: user ? handleCampusGuideClick : onNavigateToAuth },
            !user && { text: 'Login / Sign Up', action: onNavigateToAuth }
        ].filter(Boolean),
        'Support': [
            { text: 'Help Center', href: '#' },
            { text: 'FAQs', href: '#' },
            { text: 'Terms of Service', href: '#' },
            { text: 'Privacy Policy', href: '#' }
        ]
    };

    const socialIcons = [
        { icon: 'fab fa-facebook-f', href: '#', name: 'Facebook' },
        { icon: 'fab fa-twitter', href: '#', name: 'Twitter' },
        { icon: 'fab fa-instagram', href: '#', name: 'Instagram' },
        { icon: 'fab fa-linkedin-in', href: '#', name: 'LinkedIn' }
    ];

    return (
        <footer className="bg-unistay-navy text-white relative">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 md:col-span-4 lg:col-span-1">
                        <div className="flex items-center text-3xl font-extrabold tracking-tighter select-none">
                            <span>Un</span>
                            <span className="text-unistay-yellow -mx-1">
                                <svg aria-hidden="true" className="inline-block" width="0.8em" height="0.8em" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateY(-0.05em)'}}>
                                    <path d="M12 7.5l-7 6h2v7.5h10v-7.5h2l-7-6z" />
                                    <circle cx="12" cy="4" r="2" />
                                </svg>
                            </span>
                            <span>Stay</span>
                        </div>
                        <p className="mt-4 text-gray-300 text-sm">Your partner in finding the perfect student accommodation.</p>
                    </div>

                    {Object.entries(links).map(([title, items]) => (
                        <div key={title}>
                            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{title}</h3>
                            <ul className="mt-4 space-y-3">
                                {items.map(item => (
                                    <li key={item.text}>
                                        {item.action ? (
                                            <button onClick={item.action} className="text-base text-left text-gray-300 hover:text-unistay-yellow transition-colors duration-200">{item.text}</button>
                                        ) : (
                                            <a href={item.href} className="text-base text-gray-300 hover:text-unistay-yellow transition-colors duration-200">{item.text}</a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Get the App</h3>
                        <div className="mt-4 space-y-3">
                            <a href="#" aria-label="Download on the App Store"><img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-10" /></a>
                             <a href="#" aria-label="Get it on Google Play"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-base text-gray-400 order-2 sm:order-1 mt-4 sm:mt-0">&copy; {new Date().getFullYear()} UniStay. All rights reserved.</p>
                    <div className="flex space-x-6 order-1 sm:order-2">
                        {socialIcons.map(social => (
                            <a key={social.name} href={social.href} className="text-gray-400 hover:text-unistay-yellow transition-colors duration-200">
                                <span className="sr-only">{social.name}</span>
                                <i className={`${social.icon} text-xl`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-unistay-yellow text-unistay-navy h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300 animate-fade-in"
                    aria-label="Go to top"
                >
                    <i className="fas fa-arrow-up text-2xl"></i>
                </button>
            )}
        </footer>
    );
};

export default Footer;
