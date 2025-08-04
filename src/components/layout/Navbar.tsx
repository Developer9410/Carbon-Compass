import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, User, Bell, Compass, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import CarbonNeutralBadge from '../ui/CarbonNeutralBadge';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [scrolled, setScrolled] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, totalFootprint, isLoggedIn, logout, setIsLoggedIn } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const [notifications] = useState([
    { id: '1', title: 'Challenge Completed!', message: 'You completed the "Walk 10,000 steps" challenge.', time: 'Just now', read: false },
    { id: '2', title: 'New Suggestion', message: 'We have new ways for you to reduce your footprint.', time: '2 hours ago', read: false },
    { id: '3', title: 'Community Update', message: 'Someone replied to your comment.', time: 'Yesterday', read: true },
  ]);

  const totalOffsetAmount = user?.offsetHistory?.reduce((sum, offset) => sum + offset.amount, 0) || 0;
  const isNeutral = totalOffsetAmount >= totalFootprint;
  const offsetPercentage = totalFootprint > 0 ? (totalOffsetAmount / totalFootprint) * 100 : 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setNotificationsOpen(false);
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  const handleViewAllNotifications = () => {
    setNotificationsOpen(false);
    navigate('/notifications');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={toggleSidebar}>
              <Menu size={22} />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Carbon Compass</span>
            </Link>
          </div>
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/calculator" current={location.pathname === '/calculator'}>Calculator</NavLink>
              <NavLink to="/dashboard" current={location.pathname === '/dashboard'}>Dashboard</NavLink>
              <NavLink to="/offset" current={location.pathname === '/offset'}>Offset</NavLink>
              <NavLink to="/community" current={location.pathname === '/community'}>Community</NavLink>
            </div>
          )}
          <div className="flex items-center space-x-3">
            {user && (
              <div className="hidden sm:flex items-center">
                {(isNeutral || offsetPercentage >= 5) && (
                  <CarbonNeutralBadge isNeutral={isNeutral} offsetPercentage={offsetPercentage} size="sm" showText={false} />
                )}
              </div>
            )}
            {isLoggedIn && (
              <div className="relative">
                <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-2 rounded-full hover:bg-gray-100 text-gray-700 relative">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border">
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Notifications</h3>
                      <button onClick={() => setNotificationsOpen(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? notifications.map((notification) => (
                        <NotificationItem key={notification.id} title={notification.title} message={notification.message} time={notification.time} read={notification.read} />
                      )) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="px-4 py-2 border-t border-gray-100 text-center">
                        <button onClick={handleViewAllNotifications} className="text-primary text-sm font-medium hover:underline">
                          View all notifications
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="relative">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2">
                    <img src={user?.avatarUrl} alt={user?.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                    <span className="hidden md:block text-sm font-medium text-gray-900">{user?.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="text-sm text-gray-800 hover:text-red-600 px-2 py-1 rounded transition-colors">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="text-sm font-medium text-gray-800 hover:text-primary px-3 py-2 rounded-md transition-colors">Login</Link>
                  <Link to="/register" className="btn btn-primary text-sm px-4 py-2">Register</Link>
                </div>
              )}
            </div>
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

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => (
  <Link to={to} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${current ? 'text-primary bg-primary-light/20' : 'text-gray-800 hover:text-primary hover:bg-gray-50'}`}>
    {children}
  </Link>
);

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, time, read }) => (
  <div className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${!read ? 'bg-blue-50' : ''}`}>
    <div className="flex justify-between items-start">
      <h4 className={`text-sm font-medium ${read ? 'text-gray-800' : 'text-gray-900'}`}>
        {title}
        {!read && <span className="ml-1 w-2 h-2 bg-primary rounded-full inline-block"></span>}
      </h4>
      <span className="text-xs text-gray-600">{time}</span>
    </div>
    <p className="text-xs text-gray-700 mt-1">{message}</p>
  </div>
);

export default Navbar;