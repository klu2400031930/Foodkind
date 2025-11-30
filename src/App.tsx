import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { RoleSelection } from './components/RoleSelection';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { DonorDashboard } from './components/donor/DonorDashboard';
import { ReceiverDashboard } from './components/receiver/ReceiverDashboard';
import { VolunteerDashboard } from './components/volunteer/VolunteerDashboard';
import { NGODashboard } from './components/ngo/NGODashboard';

export type UserRole = 'donor' | 'receiver' | 'volunteer' | 'ngo' | null;
export type Screen = 'landing' | 'roleSelection' | 'login' | 'signup' | 'dashboard';

interface User {
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  profilePhoto?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [user, setUser] = useState<User | null>(null);

  // Check for saved session on mount
  useState(() => {
    const savedUser = localStorage.getItem('foodKindUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setCurrentScreen('dashboard');
    }
  });

  const handleGetStarted = () => {
    setCurrentScreen('roleSelection');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('foodKindUser', JSON.stringify(userData));
    setCurrentScreen('dashboard');
  };

  const handleSignupClick = () => {
    setCurrentScreen('signup');
  };

  const handleSignupSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('foodKindUser', JSON.stringify(userData));
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('foodKindUser');
    setSelectedRole(null);
    setCurrentScreen('landing');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;

      case 'roleSelection':
        return <RoleSelection onRoleSelect={handleRoleSelect} onBack={() => setCurrentScreen('landing')} />;

      case 'login':
        return (
          <Login
            role={selectedRole}
            onLoginSuccess={handleLoginSuccess}
            onSignupClick={handleSignupClick}
            onBack={() => setCurrentScreen('roleSelection')}
          />
        );

      case 'signup':
        return (
          <Signup
            role={selectedRole}
            onSignupSuccess={handleSignupSuccess}
            onBackToLogin={handleBackToLogin}
          />
        );

      case 'dashboard':
        if (!user) return null;

        switch (user.role) {
          case 'donor':
            return <DonorDashboard user={user} onLogout={handleLogout} />;
          case 'receiver':
            return <ReceiverDashboard user={user} onLogout={handleLogout} />;
          case 'volunteer':
            return <VolunteerDashboard user={user} onLogout={handleLogout} />;
          case 'ngo':
            return <NGODashboard user={user} onLogout={handleLogout} />;
          default:
            return null;
        }

      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
}
