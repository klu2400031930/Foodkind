import { useState } from 'react';
import { Heart, MapPin, Users, Clock, CheckCircle, X, Truck, Navigation } from 'lucide-react';

interface AcceptRejectFlowProps {
  user: any;
}

type Status = 'pending' | 'accepted' | 'tracking' | 'delivered';

export function AcceptRejectFlow({ user }: AcceptRejectFlowProps) {
  const [requests, setRequests] = useState([
    {
      id: 1,
      donor: 'Rajesh Restaurant',
      food: 'Vegetable Biryani with Raita',
      quantity: 30,
      distance: '1.5 km',
      eta: '30 mins',
      image: null,
      status: 'pending' as Status,
      volunteer: 'Priya Sharma'
    },
    {
      id: 2,
      donor: 'Grand Function Hall',
      food: 'Mixed Rice, Curry, and Chapathi',
      quantity: 50,
      distance: '2.8 km',
      eta: '45 mins',
      image: null,
      status: 'pending' as Status,
      volunteer: 'Amit Kumar'
    }
  ]);

  const handleAccept = (requestId: number) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'accepted' as Status } : req
      )
    );

    // Simulate volunteer assignment and tracking
    setTimeout(() => {
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: 'tracking' as Status } : req
        )
      );
    }, 2000);

    // Simulate delivery completion
    setTimeout(() => {
      setRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: 'delivered' as Status } : req
        )
      );
    }, 7000);
  };

  const handleReject = (requestId: number) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const activeRequests = requests.filter(r => r.status === 'accepted' || r.status === 'tracking');
  const completedRequests = requests.filter(r => r.status === 'delivered');

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#3A6EA5] to-[#21A179] rounded-2xl p-8 text-white">
        <h2 className="mb-2" style={{ fontSize: '28px', fontWeight: '700' }}>
          Welcome, {user.name}! 👋
        </h2>
        <p className="mb-6" style={{ fontSize: '18px' }}>
          You have <span style={{ fontWeight: '700' }}>{pendingRequests.length} pending</span> donation requests
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>56</p>
            <p style={{ fontSize: '12px' }}>Meals Received Today</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>2</p>
            <p style={{ fontSize: '12px' }}>Pending Requests</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="mb-1" style={{ fontSize: '24px', fontWeight: '700' }}>24</p>
            <p style={{ fontSize: '12px' }}>Total Donors</p>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            <Clock className="w-6 h-6 text-[#FFCF4A]" />
            Pending Requests
          </h3>
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FFCF4A]">
                {/* Request Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#21A179] to-[#3A6EA5] rounded-full flex items-center justify-center text-white" style={{ fontSize: '18px', fontWeight: '700' }}>
                    {request.donor[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: '700' }}>
                      {request.donor}
                    </h4>
                    <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                      Wants to donate food
                    </p>
                  </div>
                  <span className="bg-[#FFCF4A] text-[#1A1A1A] px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '700' }}>
                    NEW
                  </span>
                </div>

                {/* Food Image Placeholder */}
                <div className="bg-[#F2F2F2] rounded-xl h-48 flex items-center justify-center mb-4">
                  <Heart className="w-12 h-12 text-[#B3B3B3]" />
                  <span className="text-[#B3B3B3] ml-3">Food Image</span>
                </div>

                {/* Food Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Heart className="w-5 h-5 text-[#21A179] mt-0.5" />
                    <div>
                      <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                        {request.food}
                      </p>
                      <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                        Enough for {request.quantity} people
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#555555]">
                    <MapPin className="w-5 h-5" />
                    <span style={{ fontSize: '14px' }}>{request.distance} away</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#555555]">
                    <Clock className="w-5 h-5" />
                    <span style={{ fontSize: '14px' }}>ETA: {request.eta}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#555555]">
                    <Truck className="w-5 h-5" />
                    <span style={{ fontSize: '14px' }}>Volunteer: {request.volunteer}</span>
                  </div>
                </div>

                {/* Accept/Reject Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 bg-[#21A179] text-white px-6 py-4 rounded-xl hover:bg-[#1e8f6b] transition-all flex items-center justify-center gap-2 shadow-lg"
                    style={{ fontWeight: '700', fontSize: '16px' }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Accept Donation
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex-1 bg-white border-2 border-[#FF4A4A] text-[#FF4A4A] px-6 py-4 rounded-xl hover:bg-[#FFF5F5] transition-all flex items-center justify-center gap-2"
                    style={{ fontWeight: '700', fontSize: '16px' }}
                  >
                    <X className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Tracking */}
      {activeRequests.length > 0 && (
        <div>
          <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            <Truck className="w-6 h-6 text-[#3A6EA5]" />
            Active Deliveries
          </h3>
          <div className="space-y-4">
            {activeRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#3A6EA5]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: '700' }}>
                      {request.food}
                    </h4>
                    <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                      From {request.donor}
                    </p>
                  </div>
                  <span className="bg-[#22C55E] text-white px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '700' }}>
                    {request.status === 'accepted' ? 'CONFIRMED' : 'ON THE WAY'}
                  </span>
                </div>

                {/* Live Tracking */}
                {request.status === 'tracking' && (
                  <>
                    <div className="bg-[#F2F2F2] rounded-xl h-48 flex items-center justify-center mb-4">
                      <Navigation className="w-12 h-12 text-[#3A6EA5]" />
                      <span className="text-[#3A6EA5] ml-3" style={{ fontWeight: '600' }}>
                        Live Tracking
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>
                            Donation Accepted
                          </p>
                          <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                            Completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FFCF4A] rounded-full flex items-center justify-center animate-pulse">
                          <Truck className="w-4 h-4 text-[#1A1A1A]" />
                        </div>
                        <div>
                          <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>
                            Volunteer on the way
                          </p>
                          <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                            ETA: {request.eta}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 opacity-50">
                        <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-[#B3B3B3]" />
                        </div>
                        <div>
                          <p className="text-[#555555]" style={{ fontSize: '14px', fontWeight: '600' }}>
                            Food Delivered
                          </p>
                          <p className="text-[#B3B3B3]" style={{ fontSize: '12px' }}>
                            Pending
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-[#E6F2FF] rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#3A6EA5] rounded-full flex items-center justify-center text-white" style={{ fontSize: '16px', fontWeight: '700' }}>
                          {request.volunteer[0]}
                        </div>
                        <div>
                          <p className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: '600' }}>
                            {request.volunteer}
                          </p>
                          <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                            ⭐ 4.9 • 200+ deliveries
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completedRequests.length > 0 && (
        <div>
          <h3 className="text-[#1A1A1A] mb-4 flex items-center gap-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            <CheckCircle className="w-6 h-6 text-[#22C55E]" />
            Delivered Today
          </h3>
          <div className="space-y-4">
            {completedRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '700' }}>
                      {request.food}
                    </h4>
                    <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                      {request.quantity} people • From {request.donor}
                    </p>
                  </div>
                  <span className="bg-[#DFF5E6] text-[#22C55E] px-3 py-1 rounded-full" style={{ fontSize: '12px', fontWeight: '700' }}>
                    DELIVERED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Requests */}
      {requests.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <div className="w-24 h-24 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-12 h-12 text-[#B3B3B3]" />
          </div>
          <h3 className="text-[#1A1A1A] mb-2" style={{ fontSize: '24px', fontWeight: '700' }}>
            No Pending Requests
          </h3>
          <p className="text-[#555555]">
            You're all caught up! New donation requests will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
