import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BoltBadge from '../ui/BoltBadge';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useApp();
  const location = useLocation();

  // Set sidebar open by default on desktop screens (md and above)
  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768); // 768px is Tailwind's 'md' breakpoint
    };
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Page transition animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
        <main className="flex-1 px-4 py-6 md:px-8 lg:px-12 relative overflow-auto">
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      <Footer />
      {/* Bolt.new Badge - Adjusted to avoid overlapping with buttons */}
      <BoltBadge className="fixed top-4 right-4 z-50 md:top-6 md:right-6 lg:top-8 lg:right-8" />
    </div>
  );
};

export default Layout;