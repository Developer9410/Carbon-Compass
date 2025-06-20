import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { mockOffsetProjects } from '../data/mockData';
import { Star, ArrowRight, Info, Check, Filter, ExternalLink, Award, Leaf, Shield, TrendingUp } from 'lucide-react';

const OffsetPage: React.FC = () => {
  const { totalFootprint, user } = useApp();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [offsetAmount, setOffsetAmount] = useState<number>(0);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'reforestation' | 'renewable' | 'methane'>('all');
  const [offsetHistory, setOffsetHistory] = useState<any[]>([]);
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? mockOffsetProjects 
    : mockOffsetProjects.filter(project => project.type === activeFilter);
  
  // Get selected project details
  const selectedProjectDetails = mockOffsetProjects.find(p => p.id === selectedProject);
  
  // Calculate offset cost
  const calculateOffsetCost = () => {
    if (!selectedProjectDetails) return 0;
    return parseFloat((offsetAmount * selectedProjectDetails.pricePerTon / 1000).toFixed(2));
  };
  
  // Calculate total offset from history
  const totalOffsetAmount = offsetHistory.reduce((sum, offset) => sum + offset.amount, 0);
  
  const handleAmountChange = (amount: number) => {
    setOffsetAmount(amount);
  };
  
  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    // Default to offsetting 50% of the user's footprint
    setOffsetAmount(Math.round(totalFootprint * 0.5));
  };
  
  const handlePurchaseOffset = () => {
    // Simulate the offset transaction
    const newOffset = {
      id: Date.now().toString(),
      amount: offsetAmount,
      cost: calculateOffsetCost(),
      project: selectedProjectDetails,
      date: new Date().toISOString().split('T')[0],
      certificateId: `CC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    
    setOffsetHistory(prev => [newOffset, ...prev]);
    setShowConfirmation(true);
  };
  
  const handleStartOver = () => {
    setSelectedProject(null);
    setOffsetAmount(0);
    setShowConfirmation(false);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Carbon Offset</h1>
        <p className="text-gray-600">
          Neutralize your unavoidable carbon emissions by supporting verified climate projects.
        </p>
      </motion.div>
      
      {/* Offset Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-700">Current Footprint</h3>
            <TrendingUp className="text-orange-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-orange-600">{totalFootprint.toFixed(1)} kg</p>
          <p className="text-sm text-gray-500">CO₂e this month</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-700">Total Offset</h3>
            <Leaf className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-green-600">{totalOffsetAmount.toFixed(1)} kg</p>
          <p className="text-sm text-gray-500">CO₂e offset to date</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-700">Net Impact</h3>
            <Shield className="text-primary" size={20} />
          </div>
          <p className={`text-2xl font-bold ${totalOffsetAmount >= totalFootprint ? 'text-green-600' : 'text-orange-600'}`}>
            {(totalFootprint - totalOffsetAmount).toFixed(1)} kg
          </p>
          <p className="text-sm text-gray-500">
            {totalOffsetAmount >= totalFootprint ? 'Carbon neutral!' : 'Remaining to offset'}
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-700">Offset Status</h3>
            <Award className={totalOffsetAmount >= totalFootprint ? "text-green-500" : "text-gray-400"} size={20} />
          </div>
          <div className="flex items-center">
            {totalOffsetAmount >= totalFootprint ? (
              <>
                <Check className="text-green-500 mr-2" size={16} />
                <span className="text-green-600 font-medium">Carbon Neutral</span>
              </>
            ) : (
              <>
                <div className="w-4 h-4 border-2 border-orange-300 rounded-full mr-2"></div>
                <span className="text-orange-600 font-medium">In Progress</span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {totalOffsetAmount >= totalFootprint 
              ? 'You\'ve offset your footprint!' 
              : `${((totalOffsetAmount / totalFootprint) * 100).toFixed(0)}% complete`}
          </p>
        </div>
      </div>
      
      {!showConfirmation ? (
        <>
          {!selectedProject ? (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Available Offset Projects</h2>
                  <p className="text-gray-600">Choose a verified project to offset your carbon footprint.</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center">
                  <Filter size={16} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600 mr-3">Filter:</span>
                  <div className="flex space-x-2">
                    <FilterButton 
                      active={activeFilter === 'all'} 
                      onClick={() => setActiveFilter('all')}
                      label="All"
                    />
                    <FilterButton 
                      active={activeFilter === 'reforestation'} 
                      onClick={() => setActiveFilter('reforestation')}
                      label="Reforestation"
                    />
                    <FilterButton 
                      active={activeFilter === 'renewable'} 
                      onClick={() => setActiveFilter('renewable')}
                      label="Renewable Energy"
                    />
                    <FilterButton 
                      active={activeFilter === 'methane'} 
                      onClick={() => setActiveFilter('methane')}
                      label="Methane Capture"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    onSelect={() => handleProjectSelect(project.id)}
                  />
                ))}
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-lg p-4 flex items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Why offset your carbon footprint?</p>
                  <p className="text-sm text-blue-700 mt-1">
                    While reducing emissions is the primary goal, carbon offsets help neutralize unavoidable emissions 
                    by funding projects that reduce or remove greenhouse gases from the atmosphere. All our projects 
                    are verified by international standards like VCS and Gold Standard.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <img 
                    src={selectedProjectDetails?.imageUrl} 
                    alt={selectedProjectDetails?.name} 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  
                  <h2 className="text-2xl font-semibold mb-2">{selectedProjectDetails?.name}</h2>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full mr-2">
                      {selectedProjectDetails?.location}
                    </span>
                    <span className="text-sm bg-primary-light/20 text-primary px-2 py-0.5 rounded-full mr-2">
                      {selectedProjectDetails?.type}
                    </span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(selectedProjectDetails?.rating || 0) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"}
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">{selectedProjectDetails?.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{selectedProjectDetails?.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Project Scale</p>
                      <p className="font-medium">{selectedProjectDetails?.totalArea || selectedProjectDetails?.capacity}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Carbon Impact</p>
                      <p className="font-medium">
                        {selectedProjectDetails?.carbonSequestered || selectedProjectDetails?.carbonDisplaced || selectedProjectDetails?.carbonPrevented} tons/year
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Verification</p>
                      <p className="font-medium">VCS + Gold Standard</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Cost Per Ton</p>
                      <p className="font-medium">${selectedProjectDetails?.pricePerTon}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleStartOver}
                    className="text-primary font-medium text-sm hover:underline flex items-center"
                  >
                    <ArrowRight size={14} className="mr-1 rotate-180" /> Back to all projects
                  </button>
                </div>
                
                <div className="md:w-1/2">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Offset Your Footprint</h3>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount to offset (kg CO₂e)
                      </label>
                      <input
                        type="number"
                        value={offsetAmount}
                        onChange={(e) => handleAmountChange(parseInt(e.target.value))}
                        min="1"
                        max={totalFootprint * 2}
                        className="input w-full"
                      />
                      
                      <div className="flex justify-between mt-2">
                        <button 
                          onClick={() => handleAmountChange(Math.round(totalFootprint * 0.25))}
                          className="text-xs bg-white px-2 py-1 rounded border hover:bg-gray-50"
                        >
                          25%
                        </button>
                        <button 
                          onClick={() => handleAmountChange(Math.round(totalFootprint * 0.5))}
                          className="text-xs bg-white px-2 py-1 rounded border hover:bg-gray-50"
                        >
                          50%
                        </button>
                        <button 
                          onClick={() => handleAmountChange(Math.round(totalFootprint * 0.75))}
                          className="text-xs bg-white px-2 py-1 rounded border hover:bg-gray-50"
                        >
                          75%
                        </button>
                        <button 
                          onClick={() => handleAmountChange(Math.round(totalFootprint))}
                          className="text-xs bg-primary text-white px-2 py-1 rounded border border-primary hover:bg-primary/90"
                        >
                          100%
                        </button>
                        <button 
                          onClick={() => handleAmountChange(Math.round(totalFootprint * 2))}
                          className="text-xs bg-white px-2 py-1 rounded border hover:bg-gray-50"
                        >
                          200%
                        </button>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Your current monthly footprint: {totalFootprint.toFixed(1)} kg CO₂e
                      </p>
                    </div>
                    
                    <div className="border-t border-b py-4 my-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Offset amount:</span>
                        <span className="font-medium">{offsetAmount} kg CO₂e</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Price per ton:</span>
                        <span className="font-medium">${selectedProjectDetails?.pricePerTon}.00</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total cost:</span>
                        <span>${calculateOffsetCost()}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={handlePurchaseOffset}
                      disabled={offsetAmount <= 0}
                      className={`w-full btn ${
                        offsetAmount > 0 ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Purchase Offset
                    </button>
                    
                    <p className="text-xs text-gray-500 text-center mt-2">
                      * Secure payment powered by ClimateTrade
                    </p>
                  </div>
                  
                  <div className="mt-6 bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <Leaf className="mr-2" size={16} />
                      Environmental Impact
                    </h4>
                    <p className="text-sm text-green-700 mb-3">
                      Offsetting {offsetAmount} kg CO₂e is equivalent to:
                    </p>
                    <ul className="space-y-2">
                      <li className="text-sm text-green-700 flex items-start">
                        <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        {(offsetAmount / 10).toFixed(1)} trees planted and grown for 10 years
                      </li>
                      <li className="text-sm text-green-700 flex items-start">
                        <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        {(offsetAmount * 2.2).toFixed(0)} miles not driven in an average car
                      </li>
                      <li className="text-sm text-green-700 flex items-start">
                        <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        {(offsetAmount / 30).toFixed(1)} months of average household electricity
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Offset History Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Your Offset History</h2>
            {offsetHistory.length > 0 ? (
              <div className="space-y-4">
                {offsetHistory.map((offset) => (
                  <div key={offset.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Check className="text-green-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">{offset.project.name}</h3>
                        <p className="text-sm text-gray-600">
                          {offset.amount} kg CO₂e • ${offset.cost} • {offset.date}
                        </p>
                        <p className="text-xs text-gray-500">Certificate: {offset.certificateId}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2">
                        Verified
                      </span>
                      <ExternalLink size={16} className="text-gray-400 hover:text-primary cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6">
                You haven't purchased any carbon offsets yet. Start by selecting a project above!
              </p>
            )}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">🎉 Offset Purchase Successful!</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Congratulations! You've successfully offset {offsetAmount} kg of CO₂e through {selectedProjectDetails?.name}. 
            Your contribution is making a real difference for our planet!
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
            <div className="flex justify-between py-2 border-b border-green-200">
              <span className="text-gray-600">Project:</span>
              <span className="font-medium">{selectedProjectDetails?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-green-200">
              <span className="text-gray-600">Amount offset:</span>
              <span className="font-medium">{offsetAmount} kg CO₂e</span>
            </div>
            <div className="flex justify-between py-2 border-b border-green-200">
              <span className="text-gray-600">Total cost:</span>
              <span className="font-medium">${calculateOffsetCost()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-green-200">
              <span className="text-gray-600">Certificate ID:</span>
              <span className="font-medium text-xs">CC-{Date.now()}-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Achievement Badge */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-2">
              <Award className="text-yellow-600 mr-2" size={20} />
              <span className="font-medium text-yellow-800">Achievement Unlocked!</span>
            </div>
            <p className="text-sm text-yellow-700">
              {totalOffsetAmount + offsetAmount >= totalFootprint 
                ? "🌟 Carbon Neutral Champion - You've offset your entire footprint!"
                : "🌱 Climate Action Hero - You're making a positive impact!"}
            </p>
          </div>
          
          <div className="space-y-4 flex flex-col items-center">
            <a 
              href="#certificate" 
              className="text-primary font-medium flex items-center hover:underline"
            >
              <ExternalLink size={16} className="mr-1" /> Download your offset certificate
            </a>
            
            <div className="flex space-x-4">
              <button
                onClick={handleStartOver}
                className="btn btn-outline"
              >
                Offset More Carbon
              </button>
              
              <button
                onClick={() => {
                  // Share functionality would go here
                  navigator.share?.({
                    title: 'I just offset my carbon footprint!',
                    text: `I just offset ${offsetAmount} kg of CO₂e through ${selectedProjectDetails?.name} on Carbon Compass!`,
                    url: window.location.href
                  });
                }}
                className="btn btn-primary"
              >
                Share Achievement
              </button>
            </div>
          </div>
        </motion.div>
      )}
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
      className={`text-xs px-3 py-1 rounded-full transition-colors ${
        active 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

interface ProjectCardProps {
  project: typeof mockOffsetProjects[0];
  onSelect: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-105">
      <img 
        src={project.imageUrl} 
        alt={project.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{project.name}</h3>
          <span className="text-sm bg-primary-light/20 text-primary px-2 py-0.5 rounded-full">
            {project.type}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 flex items-center">
            <Shield size={12} className="mr-1" />
            {project.location}
          </span>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < Math.floor(project.rating) 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-gray-300"}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">{project.rating}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-primary">${project.pricePerTon}/ton</span>
          <button
            onClick={onSelect}
            className="btn btn-sm btn-primary hover:shadow-md transition-shadow"
          >
            Select Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffsetPage;