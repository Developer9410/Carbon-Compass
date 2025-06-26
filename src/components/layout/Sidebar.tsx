import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Calculator, BarChart2, Leaf, Users, BookOpen, Award, Settings, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { user } = useApp();
  
  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };
  
  const backdropVariants = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
      
      <motion.aside
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 md:static md:h-screen md:w-64"
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="md:hidden flex items-center justify-between p-4 border-b">
            <span className="font-semibold">Menu</span>
            <button onClick={closeSidebar} className="p-1 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>
          
          {user && (
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-primary-light/20 text-primary px-2 py-0.5 rounded-full">
                      Level {user.level}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {user.greenPoints} points
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Daily streak</span>
                  <span className="font-medium">{user.streak} days</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(user.streak / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          
          <nav className="p-4 flex-1">
            <ul className="space-y-1">
              <NavItem 
                to="/" 
                icon={<Home size={18} />} 
                label="Home" 
                active={location.pathname === '/'} 
                onClick={closeSidebar}
              />
              <NavItem 
                to="/calculator" 
                icon={<Calculator size={18} />} 
                label="Calculator" 
                active={location.pathname === '/calculator'} 
                onClick={closeSidebar}
              />
              <NavItem 
                to="/dashboard" 
                icon={<BarChart2 size={18} />} 
                label="Dashboard" 
                active={location.pathname === '/dashboard'} 
                onClick={closeSidebar}
              />
              <NavItem 
                to="/offset" 
                icon={<Leaf size={18} />} 
                label="Offset" 
                active={location.pathname === '/offset'} 
                onClick={closeSidebar}
              />
              <NavItem 
                to="/community" 
                icon={<Users size={18} />} 
                label="Community" 
                active={location.pathname === '/community'} 
                onClick={closeSidebar}
              />
              <NavItem 
                to="/resources" 
                icon={<BookOpen size={18} />} 
                label="Resources" 
                active={location.pathname === '/resources'} 
                onClick={closeSidebar}
              />
              <NavItem 
                to="/challenges" 
                icon={<Award size={18} />} 
                label="Challenges" 
                active={location.pathname === '/challenges'} 
                onClick={closeSidebar}
              />
              <NavItem 
                to="/rewards" 
                icon={<Gift size={18} />} 
                label="Rewards" 
                active={location.pathname === '/rewards'} 
                onClick={closeSidebar}
              />
              
              <div className="border-t my-4"></div>
              
              <NavItem 
                to="/profile" 
                icon={<Settings size={18} />} 
                label="Settings" 
                active={location.pathname === '/profile'} 
                onClick={closeSidebar}
              />
            </ul>
          </nav>
          
          <div className="p-4 text-xs text-gray-500 border-t">
            <p>Carbon Compass v0.1.0</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active, onClick }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
          active 
            ? 'bg-primary text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        onClick={onClick}
      >
        <span className={active ? 'text-white' : 'text-gray-500'}>
          {icon}
        </span>
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default Sidebar;