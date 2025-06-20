import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark } from 'lucide-react';
import { mockResources } from '../data/mockData';

const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const resource = mockResources.find(r => r.id === id);

  if (!resource) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
        <p className="text-gray-600 mb-6">The resource you're looking for doesn't exist.</p>
        <Link to="/resources" className="btn btn-primary">
          Back to Resources
        </Link>
      </div>
    );
  }

  // Mock article content - in a real app, this would come from a CMS or database
  const articleContent = `
# ${resource.title}

${resource.description}

## Introduction

Understanding your carbon footprint is the first step toward making meaningful environmental changes. This comprehensive guide will walk you through the fundamentals of carbon emissions, how they're measured, and practical steps you can take to reduce your impact.

## What is a Carbon Footprint?

A carbon footprint is the total amount of greenhouse gases produced directly and indirectly by human activities, usually expressed in equivalent tons of carbon dioxide (CO₂e). It includes emissions from:

- **Direct emissions**: From sources you own or control (like your car or home heating)
- **Indirect emissions**: From the production of electricity you consume
- **Other indirect emissions**: From activities like business travel, waste disposal, and the products you buy

## Key Components of Your Carbon Footprint

### Transportation
Transportation typically accounts for the largest portion of an individual's carbon footprint. This includes:
- Personal vehicle use
- Air travel
- Public transportation
- Shipping and delivery services

### Energy Use
Your home and workplace energy consumption contributes significantly through:
- Electricity usage
- Heating and cooling
- Water heating
- Appliance operation

### Diet and Food
Food production, processing, and transportation create substantial emissions:
- Meat and dairy products have higher carbon footprints
- Local and seasonal foods typically have lower impacts
- Food waste contributes to methane emissions in landfills

### Consumer Goods
The products we buy and use daily all have embedded carbon:
- Manufacturing processes
- Raw material extraction
- Packaging and shipping
- End-of-life disposal

## How to Calculate Your Carbon Footprint

### Step 1: Gather Your Data
Collect information about your:
- Energy bills (electricity, gas, heating oil)
- Transportation habits (miles driven, flights taken)
- Dietary preferences and food consumption
- Shopping and consumption patterns

### Step 2: Use Reliable Calculators
Choose carbon calculators that:
- Use established emission factors
- Account for your specific location
- Include all major emission sources
- Provide detailed breakdowns

### Step 3: Track Over Time
Regular monitoring helps you:
- Identify trends and patterns
- Measure the impact of changes
- Set realistic reduction goals
- Stay motivated for long-term change

## Strategies for Reduction

### Quick Wins (0-6 months)
- Switch to LED light bulbs
- Unplug electronics when not in use
- Reduce meat consumption
- Use public transportation or bike more
- Adjust thermostat settings

### Medium-term Changes (6 months - 2 years)
- Improve home insulation
- Install a programmable thermostat
- Choose renewable energy options
- Buy more efficient appliances
- Reduce air travel

### Long-term Investments (2+ years)
- Install solar panels
- Purchase an electric vehicle
- Make major home efficiency upgrades
- Consider relocating closer to work
- Invest in carbon offset projects

## The Role of Carbon Offsets

While reducing emissions should be your primary focus, carbon offsets can help neutralize unavoidable emissions. Quality offsets should be:
- Additional (wouldn't happen without carbon finance)
- Permanent (long-lasting carbon storage)
- Verified (independently validated)
- Transparent (clear project details)

## Making It Sustainable

### Set Realistic Goals
- Start with easy changes
- Focus on high-impact areas
- Celebrate small victories
- Gradually increase ambition

### Track Your Progress
- Use apps or spreadsheets
- Take regular measurements
- Share progress with others
- Adjust strategies as needed

### Stay Motivated
- Connect with like-minded communities
- Learn about climate science
- Focus on co-benefits (health, savings)
- Remember your why

## Conclusion

Calculating and reducing your carbon footprint is a journey, not a destination. Every action matters, and collective individual efforts can drive significant change. Start where you are, use what you have, and do what you can.

Remember that perfection isn't the goal – progress is. By understanding your impact and taking consistent action, you're contributing to a more sustainable future for everyone.

## Additional Resources

- [Carbon Calculator Tools](#)
- [Renewable Energy Options](#)
- [Sustainable Transportation Guide](#)
- [Climate Action Communities](#)
`;

  return (
    <div className="container mx-auto max-w-4xl px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link 
          to="/resources" 
          className="inline-flex items-center text-primary hover:underline mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Resources
        </Link>
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <span className="inline-block bg-primary-light/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
              {resource.category}
            </span>
            <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>Carbon Compass Team</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>January 15, 2024</span>
              </div>
              {resource.readTime && (
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{resource.readTime} min read</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-6">
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <Bookmark size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <img 
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-96 object-cover rounded-xl"
        />
      </motion.div>

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="prose prose-lg max-w-none mb-12"
      >
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Simple markdown-like rendering */}
          <div className="space-y-6">
            {articleContent.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-3xl font-bold text-gray-900">
                    {paragraph.replace('# ', '')}
                  </h1>
                );
              } else if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 text-gray-700">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>
      </motion.div>

      {/* Related Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockResources
            .filter(r => r.id !== resource.id && r.category === resource.category)
            .slice(0, 2)
            .map((relatedResource) => (
              <Link
                key={relatedResource.id}
                to={`/resources/${relatedResource.id}`}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img 
                  src={relatedResource.imageUrl}
                  alt={relatedResource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-primary-light/20 text-primary px-2 py-1 rounded-full text-xs font-medium mb-2">
                    {relatedResource.category}
                  </span>
                  <h3 className="font-semibold mb-2">{relatedResource.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{relatedResource.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">Ready to Take Action?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Now that you understand the basics, start calculating your own carbon footprint 
          and discover personalized ways to reduce your environmental impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/calculator" className="btn btn-primary">
            Calculate Your Footprint
          </Link>
          <Link to="/resources" className="btn btn-outline">
            Explore More Resources
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourceDetailPage;