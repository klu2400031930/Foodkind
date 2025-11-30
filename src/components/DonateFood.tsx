import { useState } from 'react';
import { Upload, MapPin, ArrowRight, Search, Check, X, Navigation } from 'lucide-react';

interface DonateFoodProps {
  onSuccess: (peopleCount: number) => void;
}

type Step = 'form' | 'matching' | 'search' | 'waiting' | 'accepted' | 'tracking' | 'success';

export function DonateFood({ onSuccess }: DonateFoodProps) {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState({
    quantity: '',
    description: '',
    ageGroup: 'Anyone',
    needVolunteer: true,
    image: null as any,
  });
  const [selectedReceiver, setSelectedReceiver] = useState<any>(null);

  const receivers = [
    {
      id: 1,
      name: 'Sunshine Orphanage',
      people: 35,
      distance: '2.3 km',
      urgency: 'High',
      type: 'Children',
    },
    {
      id: 2,
      name: 'Elderly Care Home',
      people: 28,
      distance: '3.1 km',
      urgency: 'Medium',
      type: 'Seniors',
    },
    {
      id: 3,
      name: 'Hope Foundation',
      people: 50,
      distance: '4.5 km',
      urgency: 'High',
      type: 'Mixed',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('matching');
  };

  const handleSelectReceiver = (receiver: any) => {
    setSelectedReceiver(receiver);
    setStep('waiting');
    setTimeout(() => {
      setStep('accepted');
    }, 2000);
  };

  const handleAccepted = () => {
    setStep('tracking');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess(parseInt(formData.quantity) || 35);
      }, 2000);
    }, 3000);
  };

  if (step === 'form') {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-[#1A1A1A] mb-6" style={{ fontSize: '32px', fontWeight: '700' }}>
          Donate Food
        </h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-[#555555] mb-3" style={{ fontSize: '16px', fontWeight: '600' }}>
              Upload Food Photo
            </label>
            <div className="border-2 border-dashed border-[#F2F2F2] rounded-2xl p-8 text-center hover:border-[#21A179] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-[#555555] mx-auto mb-3" />
              <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                Click to upload or drag and drop
              </p>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-[#555555] mb-3" style={{ fontSize: '16px', fontWeight: '600' }}>
              Number of People (Quantity)
            </label>
            <input
              type="number"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:border-[#21A179] outline-none"
              placeholder="e.g., 30 people"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#555555] mb-3" style={{ fontSize: '16px', fontWeight: '600' }}>
              Food Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:border-[#21A179] outline-none resize-none"
              rows={3}
              placeholder="Rice, curry, chapathi, dessert..."
            />
          </div>

          {/* Age Group */}
          <div>
            <label className="block text-[#555555] mb-3" style={{ fontSize: '16px', fontWeight: '600' }}>
              Suitable For
            </label>
            <select
              value={formData.ageGroup}
              onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
              className="w-full px-4 py-3 border-2 border-[#F2F2F2] rounded-xl focus:border-[#21A179] outline-none"
            >
              <option>Anyone</option>
              <option>Kids</option>
              <option>Adults</option>
              <option>Elders</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[#555555] mb-3" style={{ fontSize: '16px', fontWeight: '600' }}>
              Pickup Location
            </label>
            <div className="flex items-center gap-2 px-4 py-3 border-2 border-[#F2F2F2] rounded-xl">
              <MapPin className="w-5 h-5 text-[#21A179]" />
              <input
                type="text"
                className="flex-1 outline-none"
                placeholder="Auto-detected location"
                defaultValue="123 Main Street, Bangalore"
              />
            </div>
          </div>

          {/* Volunteer Option */}
          <div className="flex items-center justify-between p-4 bg-[#FFF8E7] rounded-xl">
            <div>
              <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                Need volunteer to deliver?
              </p>
              <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                We'll assign someone to pick up
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, needVolunteer: !formData.needVolunteer })}
              className={`w-14 h-8 rounded-full transition-colors ${
                formData.needVolunteer ? 'bg-[#21A179]' : 'bg-[#F2F2F2]'
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  formData.needVolunteer ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#21A179] to-[#3A6EA5] text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            style={{ fontSize: '18px', fontWeight: '700' }}
          >
            Find Receivers
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    );
  }

  if (step === 'matching') {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[#1A1A1A] mb-6" style={{ fontSize: '32px', fontWeight: '700' }}>
          Suggested Receivers
        </h2>

        <div className="space-y-4">
          {receivers.map((receiver) => (
            <div key={receiver.id} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[#1A1A1A] mb-1" style={{ fontSize: '20px', fontWeight: '700' }}>
                    {receiver.name}
                  </h3>
                  <div className="flex items-center gap-4 text-[#555555]">
                    <span className="flex items-center gap-1" style={{ fontSize: '14px' }}>
                      👥 {receiver.people} people
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: '14px' }}>
                      📍 {receiver.distance}
                    </span>
                    <span className="flex items-center gap-1" style={{ fontSize: '14px' }}>
                      👶 {receiver.type}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    receiver.urgency === 'High' ? 'bg-[#FF4A4A]' : 'bg-[#FFCF4A] text-[#1A1A1A]'
                  }`}
                  style={{ fontSize: '12px', fontWeight: '600' }}
                >
                  {receiver.urgency} Urgency
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleSelectReceiver(receiver)}
                  className="flex-1 bg-[#21A179] text-white py-3 rounded-xl hover:bg-[#1e8f6b] transition-colors"
                  style={{ fontSize: '16px', fontWeight: '600' }}
                >
                  Select This Orphanage
                </button>
                <button className="px-6 py-3 border-2 border-[#21A179] text-[#21A179] rounded-xl hover:bg-[#DFF5E6] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setStep('search')}
            className="w-full bg-white border-2 border-[#3A6EA5] text-[#3A6EA5] py-4 rounded-xl hover:bg-[#E6F2FF] transition-colors flex items-center justify-center gap-2"
            style={{ fontSize: '16px', fontWeight: '600' }}
          >
            <Search className="w-5 h-5" />
            Search Your Favourite Orphanage
          </button>
        </div>
      </div>
    );
  }

  if (step === 'waiting') {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="w-24 h-24 bg-[#FFF8E7] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <div className="w-16 h-16 border-4 border-[#FFCF4A] border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-[#1A1A1A] mb-4" style={{ fontSize: '28px', fontWeight: '700' }}>
            Waiting for Receiver
          </h2>
          <p className="text-[#555555] mb-6" style={{ fontSize: '18px' }}>
            {selectedReceiver?.name} is reviewing your donation request...
          </p>
          <button
            onClick={() => setStep('matching')}
            className="text-[#FF4A4A] hover:underline"
            style={{ fontSize: '16px', fontWeight: '600' }}
          >
            Cancel Request
          </button>
        </div>
      </div>
    );
  }

  if (step === 'accepted') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <div className="w-24 h-24 bg-[#DFF5E6] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-[#21A179]" />
          </div>
          <h2 className="text-[#1A1A1A] mb-4" style={{ fontSize: '32px', fontWeight: '700' }}>
            Request Accepted! 🎉
          </h2>
          <p className="text-[#555555] mb-8" style={{ fontSize: '18px' }}>
            {selectedReceiver?.name} has accepted your donation
          </p>

          <div className="bg-[#FFF8E7] rounded-2xl p-6 mb-6 text-left">
            <p className="text-[#1A1A1A] mb-4" style={{ fontSize: '18px', fontWeight: '600' }}>
              Choose delivery method:
            </p>
            <div className="space-y-3">
              <button
                onClick={handleAccepted}
                className="w-full bg-white border-2 border-[#21A179] text-[#21A179] py-4 rounded-xl hover:bg-[#DFF5E6] transition-colors"
                style={{ fontSize: '16px', fontWeight: '600' }}
              >
                ✓ Assign Volunteer
              </button>
              <button
                onClick={handleAccepted}
                className="w-full bg-white border-2 border-[#3A6EA5] text-[#3A6EA5] py-4 rounded-xl hover:bg-[#E6F2FF] transition-colors"
                style={{ fontSize: '16px', fontWeight: '600' }}
              >
                🚗 I'll Deliver Myself
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'tracking') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-[#1A1A1A] mb-6" style={{ fontSize: '28px', fontWeight: '700' }}>
            Live Tracking
          </h2>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className="text-center flex-1">
              <div className="w-12 h-12 bg-[#21A179] rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-white" />
              </div>
              <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                Confirmed
              </p>
            </div>
            <div className="flex-1 h-1 bg-[#21A179]" />
            <div className="text-center flex-1">
              <div className="w-12 h-12 bg-[#FFCF4A] rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                <Navigation className="w-6 h-6 text-[#1A1A1A]" />
              </div>
              <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                On the Way
              </p>
            </div>
            <div className="flex-1 h-1 bg-[#F2F2F2]" />
            <div className="text-center flex-1">
              <div className="w-12 h-12 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-[#555555]" />
              </div>
              <p className="text-[#555555]" style={{ fontSize: '12px' }}>
                Delivered
              </p>
            </div>
          </div>

          {/* Volunteer Info */}
          <div className="bg-[#DFF5E6] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#21A179] rounded-full flex items-center justify-center text-white text-2xl">
                🚚
              </div>
              <div>
                <p className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: '700' }}>
                  Rajesh Kumar
                </p>
                <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                  Volunteer • ⭐ 4.9
                </p>
              </div>
            </div>
            <p className="text-[#555555]" style={{ fontSize: '16px' }}>
              Volunteer is on the way to pick up your donation...
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-[#E6F2FF] rounded-2xl h-64 flex items-center justify-center mb-4">
            <MapPin className="w-12 h-12 text-[#3A6EA5]" />
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-3xl p-12 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#21A179] via-[#FFCF4A] to-[#3A6EA5]" />
          
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-[#1A1A1A] mb-4" style={{ fontSize: '36px', fontWeight: '700' }}>
            Donation Delivered!
          </h2>
          <p className="text-[#555555] mb-8" style={{ fontSize: '20px' }}>
            Your food has fed <span className="text-[#21A179]" style={{ fontWeight: '700' }}>
              {selectedReceiver?.people || 35} people
            </span> today ❤
          </p>

          <div className="bg-[#DFF5E6] rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-[#555555] mb-1" style={{ fontSize: '14px' }}>
                  Receiver
                </p>
                <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                  {selectedReceiver?.name}
                </p>
              </div>
              <div>
                <p className="text-[#555555] mb-1" style={{ fontSize: '14px' }}>
                  Volunteer
                </p>
                <p className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: '600' }}>
                  Rajesh Kumar
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-[#FFCF4A] mb-6">
            <span style={{ fontSize: '48px' }}>🏆</span>
            <div className="text-left">
              <p className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: '700' }}>
                Badge Unlocked!
              </p>
              <p className="text-[#555555]" style={{ fontSize: '14px' }}>
                First Donation
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
