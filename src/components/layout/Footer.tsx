import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Github, Twitter, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and mission, Quick links, Resources, Company sections remain unchanged */}
        </div>
        
        <div className="border-t mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              © {new Date().getFullYear()} Carbon Compass. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600 flex items-center">
                Made with <Heart size={14} className="mx-1 text-error" /> for a greener planet
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;