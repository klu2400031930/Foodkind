import { Settings, Users, Award, History, Heart } from 'lucide-react';
import { useState } from 'react';

interface DonorProfileProps {
  user: any;
}

export function DonorProfile({ user }: DonorProfileProps) {
  const [activeTab, setActiveTab] = useState('posts');

  const badges = [
    { name: 'First Donation', icon: '🌟', earned: true },
    { name: 'Fed 100+ People', icon: '💯', earned: true },
    { name: 'Top Donor', icon: '🏆', earned: false },
    { name: 'Monthly Star', icon: '⭐', earned: true },
  ];

  const history = [
    {
      date: 'Nov 28, 2025',
      receiver: 'Sunshine Orphanage',
      people: 35,
      volunteer: 'Rajesh Kumar',
      status: 'Delivered',
    },
    {
      date: 'Nov 27, 2025',
      receiver: 'Elderly Care Home',
      people: 28,
      volunteer: 'Priya Sharma',
      status: 'Delivered',
    },
    {
      date: 'Nov 25, 2025',
      receiver: 'Hope Foundation',
      people: 50,
      volunteer: 'Amit Singh',
      status: 'Delivered',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center text-white text-4xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-[#1A1A1A] mb-1" style={{ fontSize: '28px', fontWeight: '700' }}>
                {user.name}
              </h2>
              <p className="text-[#555555] mb-3" style={{ fontSize: '16px' }}>
                Making the world a kinder place
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-[#555555]">
                  <Users className="w-4 h-4" />
                  <span style={{ fontSize: '14px' }}>
                    <span style={{ fontWeight: '700' }}>245</span> Followers
                  </span>
                </button>
                <button className="flex items-center gap-1 text-[#555555]">
                  <span style={{ fontSize: '14px' }}>
                    <span style={{ fontWeight: '700' }}>32</span> Following
                  </span>
                </button>
              </div>
            </div>
          </div>
          <button className="p-3 hover:bg-[#F2F2F2] rounded-xl transition-colors">
            <Settings className="w-6 h-6 text-[#555555]" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#F2F2F2]">
          <div className="text-center">
            <p className="text-[#1A1A1A] mb-1" style={{ fontSize: '28px', fontWeight: '700' }}>
              174
            </p>
            <p className="text-[#555555]" style={{ fontSize: '14px' }}>
              Meals Donated
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#1A1A1A] mb-1" style={{ fontSize: '28px', fontWeight: '700' }}>
              12
            </p>
            <p className="text-[#555555]" style={{ fontSize: '14px' }}>
              Homes Helped
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#1A1A1A] mb-1" style={{ fontSize: '28px', fontWeight: '700' }}>
              4.9⭐
            </p>
            <p className="text-[#555555]" style={{ fontSize: '14px' }}>
              Rating
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 bg-white rounded-2xl shadow-md">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'posts' ? 'bg-[#21A179] text-white' : 'text-[#555555]'
          }`}
          style={{ fontSize: '16px', fontWeight: '600' }}
        >
          <Heart className="w-5 h-5" />
          Posts
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'badges' ? 'bg-[#21A179] text-white' : 'text-[#555555]'
          }`}
          style={{ fontSize: '16px', fontWeight: '600' }}
        >
          <Award className="w-5 h-5" />
          Badges
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'history' ? 'bg-[#21A179] text-white' : 'text-[#555555]'
          }`}
          style={{ fontSize: '16px', fontWeight: '600' }}
        >
          <History className="w-5 h-5" />
          History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'posts' && (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-[#DFF5E6] to-[#E6F2FF] flex items-center justify-center">
                <span style={{ fontSize: '64px' }}>🍛</span>
              </div>
              <div className="p-4">
                <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                  Fed 35 people at Sunshine Orphanage
                </p>
                <div className="flex items-center gap-4 mt-3 text-[#7A7A7A]" style={{ fontSize: '12px' }}>
                  <button className="flex items-center gap-1">
                    ❤ 24
                  </button>
                  <button className="flex items-center gap-1">
                    💬 5
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid md:grid-cols-2 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 shadow-md ${
                badge.earned ? 'bg-white' : 'bg-[#F2F2F2] opacity-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#FFF8E7] rounded-full flex items-center justify-center text-3xl">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="text-[#1A1A1A] mb-1" style={{ fontSize: '18px', fontWeight: '700' }}>
                    {badge.name}
                  </h3>
                  <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                    {badge.earned ? 'Earned' : 'Not yet earned'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[#1A1A1A] mb-2" style={{ fontSize: '18px', fontWeight: '700' }}>
                    {item.receiver}
                  </h3>
                  <div className="space-y-1 text-[#555555]" style={{ fontSize: '14px' }}>
                    <p>👥 Fed {item.people} people</p>
                    <p>🚚 Volunteer: {item.volunteer}</p>
                    <p>📅 {item.date}</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-[#DFF5E6] text-[#21A179] rounded-full" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
