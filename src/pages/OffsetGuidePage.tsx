import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, CheckCircle, AlertCircle, Star, Shield, Globe } from 'lucide-react';

const OffsetGuidePage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Carbon Offset Guide</h1>
        <p className="text-gray-600">
          Everything you need to know about carbon offsetting and how to make informed choices.
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* What is Carbon Offsetting */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Leaf className="w-6 h-6 text-primary mr-3" />
            What is Carbon Offsetting?
          </h2>
          
          <p className="text-gray-700 mb-6">
            Carbon offsetting is a way to compensate for your carbon emissions by funding projects 
            that remove or reduce greenhouse gases from the atmosphere. When you can't eliminate 
            all your emissions, offsets help you achieve carbon neutrality.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-semibold text-blue-800 mb-3">The Offset Process</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <p className="text-sm text-blue-700">Calculate your emissions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <p className="text-sm text-blue-700">Reduce what you can</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <p className="text-sm text-blue-700">Offset the remainder</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <p className="text-sm text-blue-700">Achieve neutrality</p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Offset Projects */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Types of Offset Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Globe className="w-6 h-6 text-green-500 mr-3" />
                <h4 className="font-semibold">Nature-Based Solutions</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Reforestation and afforestation</li>
                <li>• Forest conservation (REDD+)</li>
                <li>• Wetland restoration</li>
                <li>• Regenerative agriculture</li>
                <li>• Mangrove protection</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-blue-500 mr-3" />
                <h4 className="font-semibold">Technology-Based Solutions</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Renewable energy projects</li>
                <li>• Methane capture from landfills</li>
                <li>• Direct air capture (DAC)</li>
                <li>• Carbon capture and storage</li>
                <li>• Energy efficiency improvements</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-purple-500 mr-3" />
                <h4 className="font-semibold">Community Projects</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Clean cookstove distribution</li>
                <li>• Water purification systems</li>
                <li>• Sustainable transportation</li>
                <li>• Waste management programs</li>
                <li>• Rural electrification</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-6 h-6 text-orange-500 mr-3" />
                <h4 className="font-semibold">Industrial Solutions</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Industrial process improvements</li>
                <li>• Fuel switching projects</li>
                <li>• Waste heat recovery</li>
                <li>• Chemical process optimization</li>
                <li>• Manufacturing efficiency</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Quality Standards & Verification</h2>
          
          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important: Not All Offsets Are Equal</h4>
                <p className="text-yellow-700 text-sm">
                  The quality of carbon offsets varies significantly. Look for projects that meet 
                  rigorous standards and have been independently verified.
                </p>
              </div>
            </div>
          </div>
          
          <h4 className="font-semibold mb-4">Key Quality Criteria</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="font-medium mb-2">Additionality</h5>
              <p className="text-sm text-gray-600 mb-4">
                The project wouldn't have happened without carbon finance
              </p>
              
              <h5 className="font-medium mb-2">Permanence</h5>
              <p className="text-sm text-gray-600 mb-4">
                Carbon reductions are long-lasting and won't be reversed
              </p>
              
              <h5 className="font-medium mb-2">Measurability</h5>
              <p className="text-sm text-gray-600">
                Emissions reductions can be accurately quantified
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Verification</h5>
              <p className="text-sm text-gray-600 mb-4">
                Independent third-party validation of project claims
              </p>
              
              <h5 className="font-medium mb-2">No Double Counting</h5>
              <p className="text-sm text-gray-600 mb-4">
                Credits are only sold once and properly retired
              </p>
              
              <h5 className="font-medium mb-2">Co-benefits</h5>
              <p className="text-sm text-gray-600">
                Additional environmental and social benefits
              </p>
            </div>
          </div>
          
          <h4 className="font-semibold mb-4">Recognized Standards</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h5 className="font-medium">VCS</h5>
              <p className="text-xs text-gray-600">Verified Carbon Standard</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h5 className="font-medium">Gold Standard</h5>
              <p className="text-xs text-gray-600">Premium quality offsets</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h5 className="font-medium">CAR</h5>
              <p className="text-xs text-gray-600">Climate Action Reserve</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h5 className="font-medium">CDM</h5>
              <p className="text-xs text-gray-600">Clean Development Mechanism</p>
            </div>
          </div>
        </section>

        {/* Pricing Guide */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Understanding Offset Pricing</h2>
          
          <p className="text-gray-700 mb-6">
            Carbon offset prices vary widely based on project type, quality, location, and market conditions. 
            Here's what you can expect to pay:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-3">Budget Options</h4>
              <p className="text-2xl font-bold text-green-600 mb-2">$3-8</p>
              <p className="text-sm text-green-700 mb-3">per ton CO₂e</p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>• Basic renewable energy</li>
                <li>• Some forestry projects</li>
                <li>• Industrial gas destruction</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3">Premium Options</h4>
              <p className="text-2xl font-bold text-blue-600 mb-2">$15-30</p>
              <p className="text-sm text-blue-700 mb-3">per ton CO₂e</p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• High-quality forestry</li>
                <li>• Community projects</li>
                <li>• Verified standards</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-purple-800 mb-3">Premium Plus</h4>
              <p className="text-2xl font-bold text-purple-600 mb-2">$50-150</p>
              <p className="text-sm text-purple-700 mb-3">per ton CO₂e</p>
              <ul className="text-xs text-purple-600 space-y-1">
                <li>• Direct air capture</li>
                <li>• Biochar projects</li>
                <li>• Enhanced weathering</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Best Practices for Offset Buyers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-green-800">Do's</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Reduce emissions first, then offset</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Choose verified, high-quality projects</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Look for additional co-benefits</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Diversify across project types</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Keep certificates for your records</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-red-800">Don'ts</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Don't use offsets as an excuse to avoid reducing emissions</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Don't buy the cheapest offsets without research</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Don't double-count offsets across multiple claims</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Don't ignore project location and context</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Don't forget to retire your credits</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Offset Your Emissions?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Start by calculating your carbon footprint, then explore our curated selection 
            of high-quality offset projects to achieve carbon neutrality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary hover:bg-gray-100">
              Calculate Footprint
            </button>
            <button className="btn border-white text-white hover:bg-white hover:text-primary">
              Browse Offset Projects
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OffsetGuidePage;