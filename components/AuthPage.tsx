
import React, { useState } from 'react';
import { mockAuthService } from '../services/mockAuthService';
import { User } from '../types';
import Spinner from './Spinner';

interface AuthPageProps {
  onAuthSuccess: (user: User) => void;
  onNavigateHome: () => void;
}

const SocialButton = ({ provider, icon, onClick, disabled, isLoading }: { provider: string; icon: string; onClick: () => void; disabled: boolean; isLoading: boolean }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-full shadow-sm text-md font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unistay-yellow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {isLoading ? (
            <Spinner color="navy" size="md" />
        ) : (
           <>
            <i className={`fab ${icon} text-xl`}></i>
            <span>Continue with {provider}</span>
           </>
        )}
    </button>
);


const AuthPage = ({ onAuthSuccess, onNavigateHome }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  
  const HouseIcon = () => (
    <svg aria-hidden="true" className="inline-block" width="0.8em" height="0.8em" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'translateY(-0.05em)'}}>
      <path d="M12 7.5l-7 6h2v7.5h10v-7.5h2l-7-6z" />
      <circle cx="12" cy="4" r="2" />
    </svg>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoadingProvider('email');

    if (!isLogin && !formData.name) {
        setError('Please enter your full name.');
        setLoadingProvider(null);
        return;
    }
    if (!formData.email || !formData.password) {
        setError('Please enter both email and password.');
        setLoadingProvider(null);
        return;
    }

    try {
      let user: User;
      if (isLogin) {
        user = await mockAuthService.login(formData.email, formData.password);
      } else {
        user = await mockAuthService.signUp(formData.name, formData.email, formData.password);
      }
      onAuthSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleSocialLogin = async (provider: 'Google') => {
      setError('');
      setLoadingProvider(provider);
      try {
          const user = await mockAuthService.socialLogin(provider);
          onAuthSuccess(user);
      } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred during social login.');
      } finally {
          setLoadingProvider(null);
      }
  };

  const isLoading = loadingProvider !== null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
            <button onClick={onNavigateHome} className="flex items-center justify-center text-unistay-navy text-4xl font-extrabold tracking-tighter select-none w-full" aria-label="Go to homepage">
              <span>Un</span>
              <span className="text-unistay-yellow -mx-1"><HouseIcon /></span>
              <span>Stay</span>
            </button>
            <p className="text-gray-600 mt-2">Your partner in finding the perfect student accommodation.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-unistay-navy mb-6">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>
            
            <div className="space-y-4">
                <SocialButton
                    provider="Google"
                    icon="fa-google"
                    onClick={() => handleSocialLogin('Google')}
                    disabled={isLoading}
                    isLoading={loadingProvider === 'Google'}
                />
            </div>

            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm font-semibold">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} disabled={isLoading} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-unistay-yellow focus:border-unistay-yellow disabled:bg-gray-50" />
                    </div>
                )}
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} disabled={isLoading} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-unistay-yellow focus:border-unistay-yellow disabled:bg-gray-50" />
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange} disabled={isLoading} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-unistay-yellow focus:border-unistay-yellow disabled:bg-gray-50" />
                </div>
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div>
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-unistay-navy bg-unistay-yellow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300 disabled:bg-yellow-400/70 disabled:cursor-not-allowed">
                        {loadingProvider === 'email' ? <Spinner color="navy" /> : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </div>
            </form>
             <p className="mt-6 text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => { if (!isLoading) { setIsLogin(!isLogin); setError(''); }}} className="font-medium text-unistay-navy hover:text-unistay-yellow disabled:text-gray-400" disabled={isLoading}>
                    {isLogin ? 'Sign up' : 'Sign in'}
                </button>
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;