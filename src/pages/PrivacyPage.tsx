import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, AlertCircle } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-600">
          Last updated: January 1, 2024
        </p>
      </motion.div>

      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <Shield className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">Your Privacy Matters</h3>
            <p className="text-blue-700 text-sm">
              At Carbon Compass, we're committed to protecting your privacy and being transparent about how we collect, 
              use, and protect your personal information. This policy explains our practices in detail.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Information We Collect */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Database className="w-6 h-6 text-primary mr-3" />
            Information We Collect
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Information You Provide</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Account Information:</strong> Name, email address, password, and profile details</li>
                <li>• <strong>Carbon Footprint Data:</strong> Transportation habits, energy usage, dietary preferences, and lifestyle information</li>
                <li>• <strong>Community Content:</strong> Posts, comments, and interactions within our community features</li>
                <li>• <strong>Payment Information:</strong> Billing details for offset purchases (processed securely by third-party providers)</li>
                <li>• <strong>Communications:</strong> Messages you send to our support team or through our contact forms</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Information We Collect Automatically</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Usage Data:</strong> How you interact with our platform, features used, and time spent</li>
                <li>• <strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
                <li>• <strong>Location Data:</strong> General location information (city/country level) for carbon calculations</li>
                <li>• <strong>Cookies and Tracking:</strong> Essential cookies for functionality and optional analytics cookies</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Eye className="w-6 h-6 text-primary mr-3" />
            How We Use Your Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Core Services</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Calculate your carbon footprint accurately</li>
                <li>• Provide personalized reduction recommendations</li>
                <li>• Track your progress over time</li>
                <li>• Facilitate carbon offset purchases</li>
                <li>• Enable community features and challenges</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Platform Improvement</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Improve our algorithms and recommendations</li>
                <li>• Develop new features and services</li>
                <li>• Analyze usage patterns and trends</li>
                <li>• Ensure platform security and prevent fraud</li>
                <li>• Provide customer support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Communications</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Send important account and service updates</li>
                <li>• Share relevant sustainability tips and insights</li>
                <li>• Notify you about new features or challenges</li>
                <li>• Respond to your inquiries and support requests</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Legal Compliance</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Comply with applicable laws and regulations</li>
                <li>• Respond to legal requests and court orders</li>
                <li>• Protect our rights and prevent misuse</li>
                <li>• Ensure platform safety and security</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <UserCheck className="w-6 h-6 text-primary mr-3" />
            Information Sharing
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">We Never Sell Your Data</h4>
              <p className="text-green-700 text-sm">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">When We May Share Information</h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Service Providers:</strong> We work with trusted third-party providers for payment processing, 
                  email delivery, analytics, and hosting. These providers are contractually bound to protect your data.
                </li>
                <li>
                  <strong>Carbon Offset Partners:</strong> When you purchase offsets, we share necessary information 
                  with verified offset project providers to complete your transaction and provide certificates.
                </li>
                <li>
                  <strong>Aggregated Data:</strong> We may share anonymized, aggregated statistics about carbon 
                  footprint trends for research and advocacy purposes.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose information when required by law, court order, 
                  or to protect our rights and the safety of our users.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, 
                  your information may be transferred as part of that transaction.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Lock className="w-6 h-6 text-primary mr-3" />
            Data Security
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Technical Safeguards</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• End-to-end encryption for data transmission</li>
                <li>• Secure database storage with encryption at rest</li>
                <li>• Regular security audits and penetration testing</li>
                <li>• Multi-factor authentication for admin access</li>
                <li>• Automated backup and disaster recovery systems</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Operational Safeguards</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Limited access to personal data on a need-to-know basis</li>
                <li>• Employee training on data protection practices</li>
                <li>• Incident response procedures for security breaches</li>
                <li>• Regular updates and security patches</li>
                <li>• Compliance with industry security standards</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Security Breach Notification</h4>
                <p className="text-yellow-700 text-sm">
                  In the unlikely event of a data breach that affects your personal information, 
                  we will notify you within 72 hours and provide details about the incident and steps we're taking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Your Privacy Rights</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-1">Access and Portability</h4>
              <p className="text-sm text-gray-700">
                You can access, download, and export your personal data at any time through your account settings.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-1">Correction and Updates</h4>
              <p className="text-sm text-gray-700">
                You can update your personal information directly in your account or contact us for assistance.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-1">Deletion</h4>
              <p className="text-sm text-gray-700">
                You can delete your account and personal data at any time. Some information may be retained for legal compliance.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-1">Marketing Communications</h4>
              <p className="text-sm text-gray-700">
                You can opt out of marketing emails at any time using the unsubscribe link or account settings.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-semibold mb-1">Cookie Preferences</h4>
              <p className="text-sm text-gray-700">
                You can manage cookie preferences through your browser settings or our cookie preference center.
              </p>
            </div>
          </div>
        </section>

        {/* International Users */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">International Users</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
<<<<<<< HEAD
              Carbon Compass is operated from the India. If you're accessing our service from outside the India, 
              please be aware that your information may be transferred to, stored, and processed in the India.
=======
              Carbon Compass is operated from the United States. If you're accessing our service from outside the US, 
              please be aware that your information may be transferred to, stored, and processed in the United States.
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">European Users (GDPR)</h4>
                <p className="text-sm text-gray-700">
                  We comply with the General Data Protection Regulation (GDPR) for users in the European Economic Area. 
                  You have additional rights under GDPR, including the right to object to processing and data portability.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">California Users (CCPA)</h4>
                <p className="text-sm text-gray-700">
                  California residents have specific rights under the California Consumer Privacy Act (CCPA), 
                  including the right to know what personal information we collect and the right to delete personal information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Questions About Privacy?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Data Protection Officer</h4>
              <p className="text-sm text-gray-700 mb-1">Email: privacy@carboncompass.com</p>
              <p className="text-sm text-gray-700">Response time: Within 48 hours</p>
            </div>
            
<<<<<<< HEAD
=======
            <div>
              <h4 className="font-semibold mb-2">Mailing Address</h4>
              <p className="text-sm text-gray-700">
                Carbon Compass Privacy Team<br />
                123 Green Street, Suite 400<br />
                San Francisco, CA 94111
              </p>
            </div>
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Policy Updates:</strong> We may update this privacy policy from time to time. 
              We'll notify you of significant changes via email or through our platform. 
              The "Last updated\" date at the top of this page indicates when the policy was last revised.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;