import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    // Only close sidebar on mobile
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
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
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main className={`flex-1 px-4 py-6 md:px-8 lg:px-12 relative overflow-auto min-w-0 transition-all duration-300 ${
          sidebarOpen && window.innerWidth >= 768 ? 'md:ml-0' : ''
        }`}>
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
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