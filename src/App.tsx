import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectionPage } from './components/SelectionPage';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { AuthForm } from './components/AuthForm';
import { ProfilePage } from './components/ProfilePage';
import { useLocation } from './hooks/useLocation';

export default function App() {
  const { pathname } = useLocation();

  const renderContent = () => {
    switch (pathname) {
      case '/':
        return <Hero />;
      case '/select':
        return <SelectionPage />;
      case '/questionnaire':
        return <QuestionnaireForm />;
      case '/signin':
        return <AuthForm type="signin" />;
      case '/signup':
        return <AuthForm type="signup" />;
      case '/profile':
        return <ProfilePage />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {renderContent()}
    </div>
  );
}