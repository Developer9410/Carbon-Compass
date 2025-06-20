import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Thermometer, Globe, AlertTriangle, BarChart3, Zap } from 'lucide-react';

const ClimateSciencePage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Climate Science</h1>
        <p className="text-gray-600">
          Understanding the science behind climate change and carbon emissions.
        </p>
      </motion.div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <Thermometer className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-600">+1.1°C</h3>
          <p className="text-sm text-gray-600">Global temperature increase since 1880</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-orange-600">421 ppm</h3>
          <p className="text-sm text-gray-600">Current atmospheric CO₂ levels</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-blue-600">36.8 Gt</h3>
          <p className="text-sm text-gray-600">Annual global CO₂ emissions (2023)</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Greenhouse Effect */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Zap className="w-6 h-6 text-primary mr-3" />
            The Greenhouse Effect
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                The greenhouse effect is a natural process that warms Earth's surface. When the Sun's energy 
                reaches Earth, some of it is reflected back to space and the rest is absorbed and re-radiated 
                by greenhouse gases.
              </p>
              
              <h4 className="font-semibold mb-3">Key Greenhouse Gases:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span><strong>Carbon Dioxide (CO₂)</strong> - 76% of emissions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span><strong>Methane (CH₄)</strong> - 16% of emissions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span><strong>Nitrous Oxide (N₂O)</strong> - 6% of emissions</span>
                </li>
                <li className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span><strong>Fluorinated Gases</strong> - 2% of emissions</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-b from-blue-100 to-green-100 rounded-lg p-6">
              <img 
                src="https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Earth from space"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-sm text-gray-600 text-center">
                Earth's atmosphere traps heat from the sun, creating the greenhouse effect
              </p>
            </div>
          </div>
        </section>

        {/* Carbon Cycle */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 text-primary mr-3" />
            The Carbon Cycle
          </h2>
          
          <p className="text-gray-700 mb-6">
            Carbon moves through Earth's atmosphere, oceans, land, and living organisms in a complex cycle. 
            Human activities have disrupted this natural balance, leading to increased atmospheric CO₂ levels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-3">Natural Carbon Sources</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Ocean-atmosphere exchange</li>
                <li>• Plant and animal respiration</li>
                <li>• Volcanic emissions</li>
                <li>• Natural decomposition</li>
              </ul>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6">
              <h4 className="font-semibold text-red-800 mb-3">Human Carbon Sources</h4>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Fossil fuel combustion</li>
                <li>• Deforestation</li>
                <li>• Industrial processes</li>
                <li>• Agriculture and livestock</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Climate Impacts */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 text-primary mr-3" />
            Climate Change Impacts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Rising Temperatures</h4>
              <p className="text-sm text-gray-600">
                Global average temperatures have risen by 1.1°C since the late 1800s, 
                with the most warming occurring in the past 40 years.
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Sea Level Rise</h4>
              <p className="text-sm text-gray-600">
                Global sea levels have risen about 8-9 inches since 1880, 
                with the rate of rise accelerating in recent decades.
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Extreme Weather</h4>
              <p className="text-sm text-gray-600">
                Increased frequency and intensity of heatwaves, droughts, 
                hurricanes, and other extreme weather events.
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Ocean Acidification</h4>
              <p className="text-sm text-gray-600">
                Oceans have absorbed about 30% of human-produced CO₂, 
                making them more acidic and threatening marine life.
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Ice Loss</h4>
              <p className="text-sm text-gray-600">
                Arctic sea ice is declining at a rate of 13% per decade, 
                and glaciers worldwide are retreating.
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Ecosystem Changes</h4>
              <p className="text-sm text-gray-600">
                Shifts in plant and animal ranges, timing of biological events, 
                and species extinctions due to changing climate conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Scientific Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Mitigation Strategies</h4>
              <ul className="space-y-2 text-sm">
                <li>• Transition to renewable energy sources</li>
                <li>• Improve energy efficiency in buildings and transportation</li>
                <li>• Protect and restore forests and wetlands</li>
                <li>• Develop carbon capture and storage technologies</li>
                <li>• Shift to sustainable agriculture practices</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Adaptation Measures</h4>
              <ul className="space-y-2 text-sm">
                <li>• Build resilient infrastructure</li>
                <li>• Develop drought-resistant crops</li>
                <li>• Implement coastal protection measures</li>
                <li>• Create early warning systems</li>
                <li>• Plan for climate migration</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Take Action Based on Science</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            The science is clear: we need immediate action to reduce greenhouse gas emissions. 
            Start tracking your carbon footprint today and join the global effort to combat climate change.
          </p>
          <button className="btn bg-white text-primary hover:bg-gray-100">
            Calculate Your Footprint
          </button>
        </section>
      </div>
    </div>
  );
};

export default ClimateSciencePage;