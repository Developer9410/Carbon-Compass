import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  Award,
  User,
  Settings,
  LogOut,
  Edit,
  ChevronRight,
  Mail,
  MapPin,
  Calendar,
  Check,
  AlertCircle,
  Key,
  ShieldAlert,
  Globe,
  Camera,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

type ProfileTab = 'overview' | 'badges' | 'settings';

const ProfilePage: React.FC = () => {
  const { user, setUser, logout } = useApp();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Not Logged In</h2>
        <p className="text-gray-600 mb-6">
          Please log in to view your profile.
        </p>
        <button className="btn btn-primary">Log In</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-gray-600">
          Manage your account, view your achievements, and track your progress.
        </p>
      </motion.div>

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold dark:text-white">{user.name}</h2>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 text-gray-600 dark:text-gray-300">
              <div className="flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <MapPin size={16} className="mr-2" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Calendar size={16} className="mr-2" />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                Level {user.level}
              </span>
              <span className="text-sm bg-primary-light/20 text-primary px-3 py-1 rounded-full font-medium">
                {user.greenPoints} Green Points
              </span>
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {user.streak} Day Streak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <ProfileTabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              icon={<BarChart2 size={18} />}
              label="Overview"
            />

            <ProfileTabButton
              active={activeTab === 'badges'}
              onClick={() => setActiveTab('badges')}
              icon={<Award size={18} />}
              label="Badges & Achievements"
            />

            <ProfileTabButton
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
              icon={<Settings size={18} />}
              label="Account Settings"
            />

            <div className="p-4 border-t dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary transition-colors py-2"
              >
                <div className="flex items-center">
                  <LogOut size={18} className="mr-3" />
                  <span>Log Out</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'overview' && <ProfileOverview user={user} />}
          {activeTab === 'badges' && <BadgesAchievements user={user} />}
          {activeTab === 'settings' && (
            <AccountSettings user={user} setUser={setUser} />
          )}
        </div>
      </div>
    </div>
  );
};

interface ProfileTabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ProfileTabButton: React.FC<ProfileTabButtonProps> = ({
  active,
  onClick,
  icon,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
        active
          ? 'bg-primary-light/10 text-primary border-l-4 border-primary'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center">
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </div>
      <ChevronRight size={16} className={active ? 'text-primary' : 'text-gray-400'} />
    </button>
  );
};

const AccountSettings: React.FC<{ user: any; setUser: (u: any) => void }> = ({
  user,
  setUser,
}) => {
  const [formState, setFormState] = useState({
    name: user.name,
    email: user.email,
    location: user.location,
    bio: user.bio || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser((prev: any) => (prev ? { ...prev, ...formState } : prev));
    alert('Profile saved successfully!');
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Profile Information</h3>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Full Name</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          className="input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          className="input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Location</label>
        <input
          type="text"
          name="location"
          value={formState.location}
          onChange={handleChange}
          className="input w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">Bio</label>
        <textarea
          name="bio"
          value={formState.bio}
          onChange={handleChange}
          className="input w-full h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const ProfileOverview = ({ user }: { user: any }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Profile Overview</h3>
      <p className="text-gray-600 dark:text-gray-300">Your carbon tracking journey and achievements.</p>
    </div>
  );
};

const BadgesAchievements = ({ user }: { user: any }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Badges & Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.badges?.map((badge: any) => (
          <div key={badge.id} className="border dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-medium dark:text-white">{badge.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{badge.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Earned: {badge.earnedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;