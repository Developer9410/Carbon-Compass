import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Award, Globe, Leaf } from 'lucide-react';

const AboutPage: React.FC = () => {
  const team = [
    {
<<<<<<< HEAD
      name: 'Akhila Ohmkumar',
      role: 'Computer Engineer',
      bio: 'Passionate about using technology to solve environmental challenges and create sustainable solutions.',
    },
    {
      name: 'Anjali Barge',
      role: 'Computer Engineer',
      bio: 'Dedicated to developing innovative software solutions that promote environmental awareness and action.',
    },
    {
      name: 'Neha Durgude',
      role: 'Computer Engineer',
      bio: 'Focused on creating user-friendly applications that make sustainability accessible to everyone.',
    },
    {
      name: 'Dhanashree Jadhav',
      role: 'Computer Engineer',
      bio: 'Committed to leveraging data and analytics to drive meaningful climate action and awareness.',
    },
    {
      name: 'Tanvi Powar',
      role: 'Computer Engineer',
      bio: 'Enthusiastic about building platforms that connect communities around shared environmental goals.',
=======
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Environmental scientist with 10+ years in climate research and sustainable technology.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Michael Torres',
      role: 'CTO & Co-founder',
      bio: 'Former Google engineer passionate about using technology to solve climate challenges.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Sustainability',
      bio: 'Carbon accounting expert with experience at leading environmental consulting firms.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'James Wilson',
      role: 'Head of Product',
      bio: 'Product designer focused on creating intuitive experiences for environmental action.',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300'
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
    }
  ];

  const values = [
    {
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: 'Global Impact',
      description: 'We believe individual actions, when multiplied across millions of people, can create meaningful climate impact.'
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: 'Science-Based',
      description: 'All our calculations and recommendations are based on peer-reviewed climate science and verified methodologies.'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: 'Community-Driven',
      description: 'We foster a supportive community where people can learn, share, and motivate each other toward sustainability.'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Accessible',
      description: 'Climate action should be accessible to everyone, regardless of income, location, or technical expertise.'
    }
  ];

  const milestones = [
<<<<<<< HEAD
    { year: '2025', event: 'Carbon Compass founded with a mission to democratize climate action' },
    { year: '2025', event: 'Launched beta version with initial user testing and feedback' },
    { year: '2025', event: 'Developed comprehensive carbon tracking and offset features' },
    { year: '2025', event: 'Integrated AI-powered personalized recommendations' },
    { year: '2025', event: 'Launched community features and group challenges' },
    { year: '2025', event: 'Expanding to include educational resources and partnerships' }
=======
    { year: '2023', event: 'Carbon Compass founded with a mission to democratize climate action' },
    { year: '2023', event: 'Launched beta version with 1,000 early adopters' },
    { year: '2024', event: 'Reached 50,000 registered users tracking their carbon footprints' },
    { year: '2024', event: 'Facilitated 100,000 tons of CO₂ offsets through verified projects' },
    { year: '2024', event: 'Launched AI-powered personalized recommendations' },
    { year: '2024', event: 'Expanded to include group challenges and community features' }
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">About Carbon Compass</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to make climate action accessible, engaging, and impactful for everyone. 
          Join us in building a more sustainable future, one carbon footprint at a time.
        </p>
      </motion.div>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Target className="w-8 h-8 text-primary mr-3" />
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              Climate change is the defining challenge of our time, but individual action can feel overwhelming 
              and ineffective. We created Carbon Compass to bridge this gap by making carbon tracking simple, 
              actionable, and socially engaging.
            </p>
            <p className="text-gray-700 mb-6">
              Our platform combines accurate carbon footprint calculations with AI-powered recommendations, 
              verified offset projects, and a supportive community to help millions of people reduce their 
              environmental impact.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
<<<<<<< HEAD
                <h3 className="text-2xl font-bold text-green-600">Growing</h3>
                <p className="text-sm text-green-700">User community</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600">2025</h3>
                <p className="text-sm text-blue-700">Founded this year</p>
=======
                <h3 className="text-2xl font-bold text-green-600">250K+</h3>
                <p className="text-sm text-green-700">Users tracking footprints</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600">500K</h3>
                <p className="text-sm text-blue-700">Tons CO₂ offset</p>
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do, from product development to community building.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 4) }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
              <p className="text-sm text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
<<<<<<< HEAD
            We're a team of Computer Engineers united by our passion for environmental action and sustainable technology solutions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
=======
            We're a diverse team of climate scientists, engineers, and designers united by our passion for environmental action.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 8) }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
<<<<<<< HEAD
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
=======
              <img 
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
              />
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
              <p className="text-xs text-gray-600">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
<<<<<<< HEAD
            From concept to reality, here are the key milestones in our journey to create Carbon Compass.
=======
            From a small idea to a growing movement, here are the key milestones in our journey.
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
          </p>
        </motion.div>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 12) }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-6">
                  {milestone.year}
                </div>
                <div className="flex-1 pt-3">
                  <p className="text-gray-700">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl p-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
<<<<<<< HEAD
          Ready to make a difference? Start tracking your carbon footprint today and join others 
          working toward a more sustainable future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/calculator'}
            className="btn bg-white text-primary hover:bg-gray-100"
          >
            Get Started
          </button>
          <button 
            onClick={() => window.location.href = '/resources'}
            className="btn border-white text-white hover:bg-white hover:text-primary"
          >
=======
          Ready to make a difference? Start tracking your carbon footprint today and join thousands 
          of others working toward a more sustainable future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn bg-white text-primary hover:bg-gray-100">
            Get Started
          </button>
          <button className="btn border-white text-white hover:bg-white hover:text-primary">
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
            Learn More
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;