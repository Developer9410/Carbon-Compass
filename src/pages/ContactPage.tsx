import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, Briefcase } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'general',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'hello@carboncompass.com',
      action: 'mailto:hello@carboncompass.com'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM PST',
      action: '#'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Green Street, Suite 400\nSan Francisco, CA 94111',
      phone: '+1 (555) 123-4567',
      email: 'sf@carboncompass.com'
    },
    {
      city: 'New York',
      address: '456 Sustainability Ave, Floor 12\nNew York, NY 10001',
      phone: '+1 (555) 987-6543',
      email: 'ny@carboncompass.com'
    },
    {
      city: 'London',
      address: '789 Climate Lane\nLondon, EC1A 1BB, UK',
      phone: '+44 20 1234 5678',
      email: 'london@carboncompass.com'
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about Carbon Compass? We're here to help! Reach out to us through any of the channels below.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input w-full"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="press">Press & Media</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input w-full"
                    placeholder="Brief subject line"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input w-full resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center"
              >
                <Send size={16} className="mr-2" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* Contact Methods */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center text-primary mr-4 flex-shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{method.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                      <p className="text-sm font-medium text-primary">{method.contact}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* FAQ Link */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-blue-50 rounded-xl p-6"
          >
            <div className="flex items-center mb-3">
              <HelpCircle className="w-6 h-6 text-blue-500 mr-3" />
              <h4 className="font-semibold text-blue-800">Frequently Asked Questions</h4>
            </div>
            <p className="text-sm text-blue-700 mb-4">
              Find quick answers to common questions about Carbon Compass.
            </p>
            <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
              View FAQ
            </button>
          </motion.div>
        </div>
      </div>

      {/* Office Locations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Our Offices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{office.city}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="whitespace-pre-line">{office.address}</p>
                <p className="font-medium">{office.phone}</p>
                <p className="text-primary">{office.email}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Partnership CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <Briefcase className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Interested in Partnering?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're always looking for like-minded organizations to collaborate with. 
          Whether you're a business, NGO, or government agency, let's work together to accelerate climate action.
        </p>
        <button className="btn btn-primary">
          Explore Partnerships
        </button>
      </motion.section>
    </div>
  );
};

export default ContactPage;