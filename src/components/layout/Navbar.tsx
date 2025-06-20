import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, User, Bell, Compass, X } from 'lucide-react';
=======
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Bell, Sun, Moon, Compass } from 'lucide-react';
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
import { useApp } from '../../context/AppContext';
import CarbonNeutralBadge from '../ui/CarbonNeutralBadge';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, totalFootprint, isLoggedIn, logout, setIsLoggedIn } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Challenge Completed!',
      message: 'You completed the "Walk 10,000 steps" challenge.',
      time: 'Just now',
      read: false
    },
    {
      id: '2',
      title: 'New Suggestion',
      message: 'We have new ways for you to reduce your footprint.',
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      title: 'Community Update',
      message: 'Someone replied to your comment.',
      time: 'Yesterday',
      read: true
    }
  ]);
=======
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, totalFootprint } = useApp();
  const location = useLocation();
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd

  // Mock offset data - in a real app this would come from the database
  const totalOffsetAmount = user?.offsetHistory?.reduce((sum, offset) => sum + offset.amount, 0) || 0;
  const isNeutral = totalOffsetAmount >= totalFootprint;
  const offsetPercentage = totalFootprint > 0 ? (totalOffsetAmount / totalFootprint) * 100 : 0;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

<<<<<<< HEAD
 const handleLogout = async () => {
  try {
    await logout();               // Calls supabase.auth.signOut() and clears user in context
    setNotificationsOpen(false);
    setIsLoggedIn(false);         // <-- Explicitly mark as logged out
    navigate('/');
  } catch (error) {
    console.error('Logout error:', error);
    setIsLoggedIn(false);         // <-- Ensure flag is false even on error
    navigate('/');
  }
};


  const handleViewAllNotifications = () => {
    setNotificationsOpen(false);
    navigate('/notifications');
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleCloseNotifications = () => {
    setNotificationsOpen(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

=======
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would apply dark mode
  };

>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <button 
              className="md:hidden mr-2 p-2 rounded-lg hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <Menu size={22} />
            </button>
            
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="w-8 h-8 text-primary" />
<<<<<<< HEAD
              <span className="text-xl font-bold text-gray-900">Carbon Compass</span>
=======
              <span className="text-xl font-bold text-foreground">Carbon Compass</span>
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
            </Link>
          </div>

          {/* Desktop Navigation */}
<<<<<<< HEAD
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/calculator" current={location.pathname === '/calculator'}>
                Calculator
              </NavLink>
              <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>
                Dashboard
              </NavLink>
              <NavLink to="/offset" current={location.pathname === '/offset'}>
                Offset
              </NavLink>
              <NavLink to="/community" current={location.pathname === '/community'}>
                Community
              </NavLink>
            </div>
          )}
=======
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/calculator" current={location.pathname === '/calculator'}>
              Calculator
            </NavLink>
            <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>
              Dashboard
            </NavLink>
            <NavLink to="/offset" current={location.pathname === '/offset'}>
              Offset
            </NavLink>
            <NavLink to="/community" current={location.pathname === '/community'}>
              Community
            </NavLink>
          </div>
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Carbon Neutral Badge */}
            {user && (
              <div className="hidden sm:block">
                <CarbonNeutralBadge 
                  isNeutral={isNeutral}
                  offsetPercentage={offsetPercentage}
                  size="sm"
                  showText={false}
                />
              </div>
            )}
            
<<<<<<< HEAD
            {/* Notifications */}
            {isLoggedIn && (
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border">
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Notifications</h3>
                      <button 
                        onClick={handleCloseNotifications}
                        className="p-1 hover:bg-gray-100 rounded-full text-gray-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="px-4 py-2 border-b border-gray-100 flex gap-2">
                      <button 
                        onClick={handleMarkAllRead}
                        className="text-xs text-primary hover:underline"
                      >
                        Mark all read
                      </button>
                      <span className="text-gray-300">•</span>
                      <button 
                        onClick={handleClearAll}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <NotificationItem 
                            key={notification.id}
                            title={notification.title}
                            message={notification.message}
                            time={notification.time}
                            read={notification.read}
                          />
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                    
                    {notifications.length > 0 && (
                      <div className="px-4 py-2 border-t border-gray-100 text-center">
                        <button 
                          onClick={handleViewAllNotifications}
                          className="text-primary text-sm font-medium hover:underline"
                        >
                          View all notifications
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* User Menu / Auth */}
            <div className="relative ml-2">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="flex items-center space-x-2">
                    <img 
                      src={user?.avatarUrl} 
                      alt={user?.name} 
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                    <span className="hidden md:block text-sm font-medium text-gray-900">
                      {user?.name}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-800 hover:text-primary px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/login" 
                    className="text-sm font-medium text-gray-800 hover:text-primary px-3 py-2 rounded-md"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-primary text-sm px-4 py-2"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
=======
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <NotificationItem 
                      title="Challenge Completed!"
                      message="You completed the 'Walk 10,000 steps' challenge."
                      time="Just now"
                    />
                    <NotificationItem 
                      title="New Suggestion"
                      message="We have new ways for you to reduce your footprint."
                      time="2 hours ago"
                    />
                    <NotificationItem 
                      title="Community Update"
                      message="Someone replied to your comment."
                      time="Yesterday"
                    />
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 text-center">
                    <a href="#" className="text-primary text-sm font-medium">View all notifications</a>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Menu */}
            <div className="relative ml-2">
              <Link to="/profile" className="flex items-center space-x-2">
                {user ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={18} className="text-gray-500" />
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium">
                  {user ? user.name : 'Sign In'}
                </span>
              </Link>
            </div>
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        current 
          ? 'text-primary bg-primary-light/20' 
<<<<<<< HEAD
          : 'text-gray-800 hover:text-primary hover:bg-gray-50'
=======
          : 'text-gray-700 hover:text-primary hover:bg-gray-50'
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
      }`}
    >
      {children}
    </Link>
  );
};

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
<<<<<<< HEAD
  read: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, time, read }) => {
  return (
    <div className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!read ? 'bg-blue-50' : ''}`}>
      <div className="flex justify-between items-start">
        <h4 className={`text-sm font-medium ${read ? 'text-gray-800' : 'text-gray-900'}`}>
          {title}
          {!read && <span className="ml-1 w-2 h-2 bg-primary rounded-full inline-block"></span>}
        </h4>
        <span className="text-xs text-gray-600">{time}</span>
      </div>
      <p className="text-xs text-gray-700 mt-1">{message}</p>
=======
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, time }) => {
  return (
    <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-xs text-gray-600 mt-1">{message}</p>
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
    </div>
  );
};

export default Navbar;