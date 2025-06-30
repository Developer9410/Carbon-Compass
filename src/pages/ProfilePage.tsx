import React, { useState, useEffect } from 'react';
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
  Camera,
  Save,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type ProfileTab = 'overview' | 'badges' | 'settings';

const ProfilePage: React.FC = () => {
  const { user, setUser, logout } = useApp();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    location: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const navigate = useNavigate();

  // Sync form state with user data on mount and user changes
  useEffect(() => {
    if (user) {
      setFormState({
        name: user.name || '',
        email: user.email || '',
        location: user.location || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/HomePage');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if logout fails
      navigate('/HomePage');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    setSaveMessage('');

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: formState.name,
          location: formState.location,
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Profile update error:', error);
        setSaveMessage('Failed to save profile. Please try again.');
        return;
      }

      // Update user in context
      setUser(prev => prev ? {
        ...prev,
        name: formState.name,
        location: formState.location,
      } : null);

      setIsEditing(false);
      setSaveMessage('Profile saved successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original user data
    if (user) {
      setFormState({
        name: user.name || '',
        email: user.email || '',
        location: user.location || '',
        bio: user.bio || '',
      });
    }
    setIsEditing(false);
    setSaveMessage('');
  };

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Not Logged In</h2>
        <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
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
        <p className="text-gray-600">Manage your account, view your achievements, and track your progress.</p>
      </motion.div>

      {/* Save Message */}
      {saveMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg flex items-center ${
            saveMessage.includes('success') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {saveMessage.includes('success') ? (
            <Check className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          {saveMessage}
        </motion.div>
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
              <Camera size={16} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 text-gray-600">
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
                Level {user.level || 1}
              </span>
              <span className="text-sm bg-primary-light/20 text-primary px-3 py-1 rounded-full font-medium">
                {user.greenPoints || 0} Green Points
              </span>
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {user.streak || 0} Day Streak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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

            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between text-gray-700 hover:text-red-600 transition-colors py-2"
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
            <AccountSettings
              user={formState}
              isEditing={isEditing}
              isSaving={isSaving}
              setIsEditing={setIsEditing}
              handleChange={handleChange}
              handleSave={handleSaveProfile}
              handleCancel={handleCancelEdit}
            />
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
          : 'text-gray-700 hover:bg-gray-50'
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

interface AccountSettingsProps {
  user: any;
  isEditing: boolean;
  isSaving: boolean;
  setIsEditing: (e: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  user,
  isEditing,
  isSaving,
  setIsEditing,
  handleChange,
  handleSave,
  handleCancel,
}) => {
  return (
    <div className="space-y-6 bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Account Settings</h3>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)} 
            className="btn btn-outline flex items-center"
          >
            <Edit size={16} className="mr-2" /> Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={handleCancel} 
              className="btn btn-outline flex items-center"
              disabled={isSaving}
            >
              <X size={16} className="mr-2" /> Cancel
            </button>
            <button 
              onClick={handleSave} 
              className="btn btn-primary flex items-center"
              disabled={isSaving}
            >
              <Save size={16} className="mr-2" /> 
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`input w-full ${!isEditing ? 'bg-gray-50' : ''}`}
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={true} // Email should not be editable
            className="input w-full bg-gray-50"
            placeholder="Email cannot be changed"
          />
          <p className="text-xs text-gray-500 mt-1">Email address cannot be modified</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={user.location}
            onChange={handleChange}
            disabled={!isEditing}
            className={`input w-full ${!isEditing ? 'bg-gray-50' : ''}`}
            placeholder="Enter your location"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={user.bio || ''}
            onChange={handleChange}
            disabled={!isEditing}
            className={`input w-full h-24 resize-none ${!isEditing ? 'bg-gray-50' : ''}`}
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
    </div>
  );
};

const ProfileOverview = ({ user }: { user: any }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Profile Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Personal Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {user.name}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Location:</span> {user.location}</p>
            <p><span className="font-medium">Member since:</span> {user.joinDate}</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3">Activity Stats</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Green Points:</span> {user.greenPoints || 0}</p>
            <p><span className="font-medium">Level:</span> {user.level || 1}</p>
            <p><span className="font-medium">Current Streak:</span> {user.streak || 0} days</p>
            <p><span className="font-medium">Badges Earned:</span> {user.badges?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BadgesAchievements = ({ user }: { user: any }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Badges & Achievements</h3>
      {user.badges && user.badges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.badges.map((badge: any) => (
            <div key={badge.id} className="border rounded-lg p-4">
              <h4 className="font-medium">{badge.name}</h4>
              <p className="text-sm text-gray-600">{badge.description}</p>
              <p className="text-xs text-gray-500 mt-2">Earned: {badge.earnedDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium mb-2">No badges yet</h4>
          <p className="text-gray-600">
            Start tracking your carbon footprint and completing challenges to earn badges!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;