<<<<<<< HEAD
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Challenge Completed!',
      message: 'You completed the "Walk 10,000 steps" challenge and earned 200 Green Points.',
      time: 'Just now',
      read: false,
      type: 'achievement'
    },
    {
      id: '2',
      title: 'New Suggestion Available',
      message: 'We have new personalized ways for you to reduce your carbon footprint.',
      time: '2 hours ago',
      read: false,
      type: 'suggestion'
    },
    {
      id: '3',
      title: 'Community Update',
      message: 'Someone replied to your comment in the community discussion.',
      time: 'Yesterday',
      read: true,
      type: 'community'
    },
    {
      id: '4',
      title: 'Monthly Report Ready',
      message: 'Your carbon footprint report for this month is now available.',
      time: '2 days ago',
      read: true,
      type: 'report'
    },
    {
      id: '5',
      title: 'Offset Purchase Confirmed',
      message: 'Your carbon offset purchase of 50kg CO₂e has been confirmed.',
      time: '3 days ago',
      read: true,
      type: 'offset'
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return '🏆';
      case 'suggestion':
        return '💡';
      case 'community':
        return '👥';
      case 'report':
        return '📊';
      case 'offset':
        return '🌱';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'suggestion':
        return 'border-l-blue-500 bg-blue-50';
      case 'community':
        return 'border-l-purple-500 bg-purple-50';
      case 'report':
        return 'border-l-green-500 bg-green-50';
      case 'offset':
        return 'border-l-emerald-500 bg-emerald-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center mb-4">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-primary hover:underline mr-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Notifications</h1>
            <p className="text-gray-800">
              Stay updated with your carbon tracking journey and community activities.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleMarkAllRead}
              className="btn btn-outline btn-sm"
            >
              <Check size={16} className="mr-2" />
              Mark All Read
            </button>
            <button 
              onClick={handleClearAll}
              className="btn btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50"
            >
              <X size={16} className="mr-2" />
              Clear All
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border-l-4 p-6 hover:shadow-md transition-shadow ${
                getNotificationColor(notification.type)
              } ${!notification.read ? 'ring-2 ring-primary/20' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>
                    
                    <p className="text-gray-800 mb-2">
                      {notification.message}
                    </p>
                    
                    <p className="text-sm text-gray-600">
                      {notification.time}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!notification.read && (
                    <button 
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-12 text-center"
          >
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">No notifications yet</h3>
            <p className="text-gray-700 mb-6">
              You're all caught up! Check back later for updates on your carbon tracking journey.
            </p>
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          </motion.div>
        )}
      </div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Notification Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Challenge Completions</h4>
              <p className="text-sm text-gray-700">Get notified when you complete challenges</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">AI Suggestions</h4>
              <p className="text-sm text-gray-700">Receive personalized carbon reduction tips</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Community Activity</h4>
              <p className="text-sm text-gray-700">Updates on comments and community interactions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Monthly Reports</h4>
              <p className="text-sm text-gray-700">Monthly carbon footprint summaries</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <button className="btn btn-primary">
            Save Preferences
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationsPage;
=======
import React from 'react';
import { useApp } from '../context/AppContext';

const NotificationsPage: React.FC = () => {
  const { user } = useApp();
  const notifications = user?.notifications ?? [];

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Your notifications</h1>
      {notifications.length === 0 && <p>No notifications yet 🎉</p>}
      <ul className="space-y-4">
        {notifications.map(n => (
          <li key={n.id} className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium">{n.title}</h3>
            <p className="text-gray-600">{n.message}</p>
            <span className="text-xs text-gray-400">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default NotificationsPage;
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
