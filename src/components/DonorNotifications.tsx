import { Bell, CheckCircle, Clock, Package, Users } from 'lucide-react';

export function DonorNotifications() {
  const notifications = [
    {
      type: 'receiver',
      icon: '🏠',
      title: 'Sunshine Orphanage accepted your donation',
      message: 'Your food donation for 35 people has been accepted',
      time: '5 mins ago',
      color: '#21A179',
    },
    {
      type: 'volunteer',
      icon: '🚚',
      title: 'Volunteer is on the way',
      message: 'Rajesh Kumar is coming to pick up your food donation',
      time: '10 mins ago',
      color: '#FFCF4A',
    },
    {
      type: 'volunteer',
      icon: '✅',
      title: 'Food delivered successfully',
      message: 'Your donation has been delivered to Sunshine Orphanage',
      time: '2 hours ago',
      color: '#22C55E',
    },
    {
      type: 'ngo',
      icon: '🆘',
      title: 'Urgent need nearby',
      message: 'Elderly Care Home needs food for 40 people urgently',
      time: '3 hours ago',
      color: '#FF4A4A',
    },
    {
      type: 'system',
      icon: '🏆',
      title: 'New badge unlocked!',
      message: "You've earned the 'First Donation' badge",
      time: '1 day ago',
      color: '#3A6EA5',
    },
    {
      type: 'system',
      icon: '👥',
      title: 'New follower',
      message: 'Hope Foundation started following you',
      time: '2 days ago',
      color: '#555555',
    },
    {
      type: 'receiver',
      icon: '📝',
      title: 'Receiver updated people count',
      message: 'Sunshine Orphanage updated their daily requirement to 50 people',
      time: '2 days ago',
      color: '#3A6EA5',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-[#1A1A1A] mb-6" style={{ fontSize: '32px', fontWeight: '700' }}>
        Notifications
      </h2>

      <div className="space-y-3">
        {notifications.map((notification, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ backgroundColor: `${notification.color}20` }}
              >
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                    {notification.title}
                  </h3>
                  {idx < 2 && (
                    <span className="w-2 h-2 bg-[#FF4A4A] rounded-full flex-shrink-0 mt-2"></span>
                  )}
                </div>
                <p className="text-[#555555] mb-2" style={{ fontSize: '14px' }}>
                  {notification.message}
                </p>
                <p className="text-[#7A7A7A]" style={{ fontSize: '12px' }}>
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
