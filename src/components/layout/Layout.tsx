import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BoltBadge from '../ui/BoltBadge';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
      <div className="relative">
        <BoltBadge className="absolute top-4 left-4 sm:left-6 md:left-8 z-50" />
      </div>
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
    </div>
  );
};

export default Layout;