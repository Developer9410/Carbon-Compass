import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CalculatorPage from './pages/CalculatorPage';
import DashboardPage from './pages/DashboardPage';
import OffsetPage from './pages/OffsetPage';
import CommunityPage from './pages/CommunityPage';
import ResourcesPage from './pages/ResourcesPage';
import ChallengesPage from './pages/ChallengesPage';
import ProfilePage from './pages/ProfilePage';
import RewardsPage from './pages/RewardsPage';
import BlogPage from './pages/BlogPage';
import ClimateSciencePage from './pages/ClimateSciencePage';
import OffsetGuidePage from './pages/OffsetGuidePage';
import SustainabilityTipsPage from './pages/SustainabilityTipsPage';
import ApiDocsPage from './pages/ApiDocsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotificationsPage from './pages/NotificationsPage';
import PrivateRoute from './components/auth/PrivateRoute'; 

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="calculator" element={<PrivateRoute><CalculatorPage /><PrivateRoute>} />
          <Route path="dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="rewards" element={<PrivateRoute><RewardsPage /></PrivateRoute> } />
          <Route path="offset" element={<PrivateRoute><OffsetPage /></PrivateRoute> } />
          <Route path="community" element={<PrivateRoute><CommunityPage /></PrivateRoute> } />
          <Route path="challenges" element={<PrivateRoute><ChallengesPage /></PrivateRoute>} />
          <Route path="notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="resources/:id" element={<ResourceDetailPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="climate-science" element={<ClimateSciencePage />} />
          <Route path="offset-guide" element={<OffsetGuidePage />} />
          <Route path="sustainability-tips" element={<SustainabilityTipsPage />} />
          <Route path="api-docs" element={<ApiDocsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;