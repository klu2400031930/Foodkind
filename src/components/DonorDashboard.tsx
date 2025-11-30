import { useState } from 'react';
import { Home, PlusCircle, Bell, User, LogOut, Upload, MapPin, CheckCircle, Clock, Package } from 'lucide-react';
import { DonateFood } from './DonateFood';
import { DonorProfile } from './DonorProfile';
import { DonorNotifications } from './DonorNotifications';

interface DonorDashboardProps {
  user: any;
  onLogout: () => void;
}

export function DonorDashboard({ user, onLogout }: DonorDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [peopleFedToday, setPeopleFedToday] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DonorHome user={user} peopleFedToday={peopleFedToday} onNavigate={setActiveTab} />;
      case 'donate':
        return <DonateFood onSuccess={(peopleCount) => {
          setPeopleFedToday(peopleFedToday + peopleCount);
          setActiveTab('home');
        }} />;
      case 'notifications':
        return <DonorNotifications />;
      case 'profile':
        return <DonorProfile user={user} />;
      default:
        return <DonorHome user={user} peopleFedToday={peopleFedToday} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-20">
      {/* Top Bar */}
      <div className="bg-white border-b border-[#F2F2F2] px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-[#1A1A1A]" style={{ fontSize: '24px', fontWeight: '700' }}>
            FOOD KIND
          </h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-[#555555] hover:text-[#FF4A4A] transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#F2F2F2] px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'home' ? 'text-[#21A179]' : 'text-[#555555]'
            }`}
          >
            <Home className="w-6 h-6" />
            <span style={{ fontSize: '12px', fontWeight: '600' }}>Home</span>
          </button>
          <button
            onClick={() => setActiveTab('donate')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'donate' ? 'text-[#21A179]' : 'text-[#555555]'
            }`}
          >
            <PlusCircle className="w-6 h-6" />
            <span style={{ fontSize: '12px', fontWeight: '600' }}>Donate</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center gap-1 relative ${
              activeTab === 'notifications' ? 'text-[#21A179]' : 'text-[#555555]'
            }`}
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-2 w-2 h-2 bg-[#FF4A4A] rounded-full"></span>
            <span style={{ fontSize: '12px', fontWeight: '600' }}>Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 ${
              activeTab === 'profile' ? 'text-[#21A179]' : 'text-[#555555]'
            }`}
          >
            <User className="w-6 h-6" />
            <span style={{ fontSize: '12px', fontWeight: '600' }}>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function DonorHome({ user, peopleFedToday, onNavigate }: any) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#21A179] to-[#3A6EA5] rounded-3xl p-8 text-white">
        <h2 className="mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
          Hi, {user.name} 👋
        </h2>
        <p style={{ fontSize: '20px' }}>
          You've fed <span style={{ fontWeight: '700' }}>{peopleFedToday}</span> people today
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('donate')}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left"
        >
          <div className="w-14 h-14 bg-[#DFF5E6] rounded-xl flex items-center justify-center mb-4">
            <Upload className="w-7 h-7 text-[#21A179]" />
          </div>
          <h3 className="text-[#1A1A1A] mb-2" style={{ fontSize: '20px', fontWeight: '700' }}>
            Donate Food
          </h3>
          <p className="text-[#555555]" style={{ fontSize: '14px' }}>
            Share your surplus food
          </p>
        </button>

        <button className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left">
          <div className="w-14 h-14 bg-[#FFF8E7] rounded-xl flex items-center justify-center mb-4">
            <Package className="w-7 h-7 text-[#FFCF4A]" />
          </div>
          <h3 className="text-[#1A1A1A] mb-2" style={{ fontSize: '20px', fontWeight: '700' }}>
            My Impact
          </h3>
          <p className="text-[#555555]" style={{ fontSize: '14px' }}>
            Track your donations
          </p>
        </button>

        <button className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-left">
          <div className="w-14 h-14 bg-[#E6F2FF] rounded-xl flex items-center justify-center mb-4">
            <CheckCircle className="w-7 h-7 text-[#3A6EA5]" />
          </div>
          <h3 className="text-[#1A1A1A] mb-2" style={{ fontSize: '20px', fontWeight: '700' }}>
            Badges
          </h3>
          <p className="text-[#555555]" style={{ fontSize: '14px' }}>
            View achievements
          </p>
        </button>
      </div>

      {/* Recent Activity Feed */}
      <div>
        <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: '24px', fontWeight: '700' }}>
          Community Feed
        </h3>
        <div className="space-y-4">
          {[
            {
              name: 'Sunshine Orphanage',
              action: 'received 50 meals',
              time: '2 hours ago',
              image: '🏠',
            },
            {
              name: 'Green Hope NGO',
              action: 'posted urgent need for 100 meals',
              time: '4 hours ago',
              image: '🆘',
            },
            {
              name: 'Rajesh Kumar',
              action: 'donated food for 30 people',
              time: '5 hours ago',
              image: '👤',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#DFF5E6] rounded-full flex items-center justify-center text-xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                    {item.name}
                  </p>
                  <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                    {item.action}
                  </p>
                </div>
                <p className="text-[#7A7A7A]" style={{ fontSize: '12px' }}>
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
