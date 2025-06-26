import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Github, Twitter, Instagram, Heart, Bolt } from 'lucide-react';
import BoltBadge from '../ui/BoltBadge';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Brand and Mission at the top with Logo */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
            <span className="text-base sm:text-lg font-bold">Carbon Compass</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
            Helping individuals and communities track, reduce, and offset their carbon footprint for a more sustainable future.
          </p>
          <div className="flex space-x-3 sm:space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <Github size={16} sm:size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <Twitter size={16} sm:size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <Instagram size={16} sm:size={18} />
            </a>
          </div>
        </div>

        {/* Features, Resources, and Company stacked below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick links */}
          <div>
            <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-4">Features</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/calculator" className="text-gray-600 hover:text-primary">Carbon Calculator</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-primary">Dashboard</Link></li>
              <li><Link to="/offset" className="text-gray-600 hover:text-primary">Offset Projects</Link></li>
              <li><Link to="/community" className="text-gray-600 hover:text-primary">Community</Link></li>
              <li><Link to="/challenges" className="text-gray-600 hover:text-primary">Challenges</Link></li>
              <li><Link to="/rewards" className="text-gray-600 hover:text-primary">Green Rewards</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-4">Resources</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
              <li><Link to="/climate-science" className="text-gray-600 hover:text-primary">Climate Science</Link></li>
              <li><Link to="/offset-guide" className="text-gray-600 hover:text-primary">Carbon Offset Guide</Link></li>
              <li><Link to="/sustainability-tips" className="text-gray-600 hover:text-primary">Sustainability Tips</Link></li>
              <li><Link to="/api-docs" className="text-gray-600 hover:text-primary">API Documentation</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-4">Company</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-0">
              © {new Date().getFullYear()} Carbon Compass. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                Made with <Heart size={12} sm:size={14} className="mx-1 text-error" /> for a greener planet
              </p>
              <div className="flex items-center space-x-1">
                <BoltBadge className="h-5 w-5" />
                <a href="https://bolt.new/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-primary font-bold hover:text-primary-dark">
                  Built on Bolt.new
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;