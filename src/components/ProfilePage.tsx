import React, { useEffect } from 'react';
import { ChatSection } from './profile/ChatSection';
import { GoalsSection } from './profile/GoalsSection';
import { NewsSection } from './profile/news/NewsSection';
import { Sidebar } from './profile/Sidebar';
import { ReportView } from './profile/ReportView';
import { useProfile } from '../hooks/useProfile';

export function ProfilePage() {
  const { 
    activeProfile,
    setActiveProfile,
    chatHistory,
    sendMessage,
    goals,
    addGoal,
    removeGoal,
    toggleGoal,
    isLoading
  } = useProfile();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = '/signin';
    }
  }, []);

  const renderContent = () => {
    switch (activeProfile) {
      case 'report':
        return <ReportView />;
      case 'news':
        return <NewsSection fullWidth />;
      case 'simulation':
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-white/70">Simulation feature coming soon...</p>
          </div>
        );
      case 'upload':
        return (
          <div className="h-full flex items-center justify-center">
            <p className="text-white/70">Upload feature coming soon...</p>
          </div>
        );
      default:
        return (
          <ChatSection
            activeProfile={activeProfile}
            chatHistory={chatHistory}
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      <div className="h-full flex gap-8 px-4 lg:px-8">
        {/* Sidebar */}
        <div className="pt-4">
          <Sidebar 
            activeProfile={activeProfile}
            onSelect={setActiveProfile}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 py-4 pr-64 relative">
          <div className="absolute right-0 top-4 bottom-4 w-56">
            <GoalsSection
              goals={goals}
              onAddGoal={addGoal}
              onRemoveGoal={removeGoal}
              onToggleGoal={toggleGoal}
            />
          </div>
          <div className="h-full">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}