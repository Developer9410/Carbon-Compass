import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Video, BarChart, ArrowRight, Clock, BookOpen, ExternalLink, Filter } from 'lucide-react';
import { mockResources } from '../data/mockData';
import { Resource } from '../types';

const ResourcesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'article' | 'video' | 'infographic' | 'tool'>('all');
  
  // Filter resources based on search query and active filter
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || resource.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
        <p className="text-gray-600">
          Discover articles, videos, and tools to help you learn more about sustainability and reducing your environmental impact.
        </p>
      </motion.div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center">
            <Filter size={16} className="mr-2 text-gray-500 hidden md:block" />
            <span className="text-sm text-gray-600 mr-3 hidden md:block">Filter:</span>
            <div className="flex space-x-2">
              <FilterButton 
                active={activeFilter === 'all'} 
                onClick={() => setActiveFilter('all')}
                label="All"
              />
              <FilterButton 
                active={activeFilter === 'article'} 
                onClick={() => setActiveFilter('article')}
                label="Articles"
              />
              <FilterButton 
                active={activeFilter === 'video'} 
                onClick={() => setActiveFilter('video')}
                label="Videos"
              />
              <FilterButton 
                active={activeFilter === 'infographic'} 
                onClick={() => setActiveFilter('infographic')}
                label="Infographics"
              />
              <FilterButton 
                active={activeFilter === 'tool'} 
                onClick={() => setActiveFilter('tool')}
                label="Tools"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Resource */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Resource</h2>
        
        <motion.div 
          className="relative rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Complete Guide to Sustainable Living" 
            className="w-full h-72 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
            <span className="text-white bg-primary px-3 py-1 rounded-full text-sm inline-block mb-3 w-max">Guide</span>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Complete Guide to Sustainable Living</h3>
            <p className="text-white/90 mb-4 max-w-2xl">
              A comprehensive resource covering everything from energy efficiency to zero waste living, with practical tips you can implement today.
            </p>
            <a 
              href="#complete-guide" 
              className="btn btn-primary w-max flex items-center"
            >
              Read Guide <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Resource Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">All Resources</h2>
          <p className="text-sm text-gray-500">
            {filteredResources.length} resources found
          </p>
        </div>
        
        {filteredResources.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredResources.map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource} 
                variants={itemVariants}
              />
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any resources matching your search criteria.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="btn btn-outline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 rounded-full ${
        active 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

interface ResourceCardProps {
  resource: Resource;
  variants: any;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, variants }) => {
  // Get the appropriate icon based on resource category
  const getCategoryIcon = () => {
    switch (resource.category) {
      case 'article':
        return <Book size={16} />;
      case 'video':
        return <Video size={16} />;
      case 'infographic':
        return <BarChart size={16} />;
      default:
        return <Book size={16} />;
    }
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      variants={variants}
    >
      <img 
        src={resource.imageUrl} 
        alt={resource.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="flex items-center text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
            {getCategoryIcon()}
            <span className="ml-1 capitalize">{resource.category}</span>
          </span>
          
          {resource.readTime && (
            <span className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" /> {resource.readTime} min read
            </span>
          )}
        </div>
        
        <h3 className="font-semibold mb-2 line-clamp-2 h-12">{resource.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 h-18">{resource.description}</p>
        
        {resource.tags && (
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="text-xs bg-primary-light/10 text-primary px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <a 
          href={resource.url} 
          className="text-primary font-medium flex items-center hover:underline"
        >
          {resource.category === 'article' ? 'Read Article' : 
           resource.category === 'video' ? 'Watch Video' : 
           resource.category === 'infographic' ? 'View Infographic' : 
           'View Resource'} <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default ResourcesPage;