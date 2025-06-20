import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Shield, CreditCard, Users, Gavel } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-600">
          Last updated: January 1, 2024
        </p>
      
      </motion.div>

      <div className="bg-yellow-50 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">Important Legal Agreement</h3>
            <p className="text-yellow-700 text-sm">
              These Terms of Service constitute a legally binding agreement between you and Carbon Compass. 
              By using our service, you agree to be bound by these terms. Please read them carefully.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Acceptance of Terms */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FileText className="w-6 h-6 text-primary mr-3" />
            Acceptance of Terms
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              By accessing or using Carbon Compass ("the Service"), you agree to be bound by these Terms of Service 
              ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
            
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service. 
              We reserve the right to update these Terms at any time, and your continued use of the Service 
              constitutes acceptance of any changes.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Age Requirements</h4>
              <p className="text-blue-700 text-sm">
                You must be at least 13 years old to use Carbon Compass. If you are between 13 and 18, 
                you must have parental consent to use our Service.
              </p>
            </div>
          </div>
        </section>

        {/* Description of Service */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Description of Service</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Carbon Compass is a platform that helps individuals and organizations track, reduce, and offset 
              their carbon footprint. Our Service includes:
            </p>
            
            <ul className="space-y-2 ml-6">
              <li>• Carbon footprint calculation tools</li>
              <li>• Personalized reduction recommendations</li>
              <li>• Carbon offset marketplace</li>
              <li>• Community features and challenges</li>
              <li>• Educational resources and content</li>
              <li>• Progress tracking and analytics</li>
            </ul>
            
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time 
              with or without notice. We are not liable for any modification, suspension, or discontinuation 
              of the Service.
            </p>
          </div>
        </section>

        {/* User Accounts */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Users className="w-6 h-6 text-primary mr-3" />
            User Accounts and Responsibilities
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Account Creation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• You must provide accurate and complete information when creating an account</li>
                <li>• You are responsible for maintaining the security of your account credentials</li>
                <li>• You must notify us immediately of any unauthorized use of your account</li>
                <li>• One person may not maintain more than one account</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Acceptable Use</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">You May:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Use the Service for personal or business purposes</li>
                    <li>• Share your progress and achievements</li>
                    <li>• Participate in community discussions</li>
                    <li>• Provide feedback and suggestions</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-800 mb-2">You May Not:</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Violate any laws or regulations</li>
                    <li>• Harass, abuse, or harm other users</li>
                    <li>• Post false or misleading information</li>
                    <li>• Attempt to hack or disrupt the Service</li>
                    <li>• Use the Service for commercial spam</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carbon Calculations and Offsets */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="w-6 h-6 text-primary mr-3" />
            Carbon Calculations and Offsets
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Calculation Accuracy</h3>
              <p className="text-gray-700 mb-4">
                Our carbon footprint calculations are based on established methodologies and industry standards. 
                However, these are estimates and may not reflect your exact emissions. We continuously work to 
                improve accuracy but cannot guarantee precision.
              </p>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h4>
                <p className="text-yellow-700 text-sm">
                  Carbon calculations are estimates based on the information you provide. Actual emissions may vary. 
                  We recommend using our calculations as a guide rather than absolute measurements.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Carbon Offsets</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• All offset projects are verified by recognized standards (VCS, Gold Standard, etc.)</li>
                <li>• Offset purchases are final and non-refundable unless the project fails verification</li>
                <li>• We act as an intermediary between you and offset project developers</li>
                <li>• Offset certificates will be provided within 30 days of purchase</li>
                <li>• We reserve the right to substitute equivalent offsets if a project becomes unavailable</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Payment Terms */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <CreditCard className="w-6 h-6 text-primary mr-3" />
            Payment Terms
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-3">Pricing and Fees</h3>
              <ul className="space-y-2">
                <li>• Basic carbon tracking features are free</li>
                <li>• Premium features may require a subscription</li>
                <li>• Carbon offset purchases are charged at market rates plus a small service fee</li>
                <li>• All prices are displayed in USD unless otherwise specified</li>
                <li>• Prices may change with 30 days notice to existing subscribers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Billing and Refunds</h3>
              <ul className="space-y-2">
                <li>• Subscription fees are billed monthly or annually in advance</li>
                <li>• You can cancel your subscription at any time</li>
                <li>• Refunds are provided on a case-by-case basis</li>
                <li>• Failed payments may result in service suspension</li>
                <li>• You are responsible for any applicable taxes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Intellectual Property</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-3">Our Content</h3>
              <p>
                The Service and its original content, features, and functionality are owned by Carbon Compass 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Your Content</h3>
              <p>
                You retain ownership of any content you submit to the Service. However, by submitting content, 
                you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, 
                and distribute your content in connection with the Service.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Prohibited Uses</h3>
              <ul className="space-y-2">
                <li>• Copying or reproducing our content without permission</li>
                <li>• Reverse engineering our algorithms or software</li>
                <li>• Using our trademarks without authorization</li>
                <li>• Creating derivative works based on our Service</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Gavel className="w-6 h-6 text-primary mr-3" />
            Limitation of Liability
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Important Legal Notice</h4>
              <p className="text-red-700 text-sm">
                The Service is provided "as is" without warranties of any kind. We disclaim all warranties, 
                express or implied, including but not limited to merchantability, fitness for a particular purpose, 
                and non-infringement.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Limitation of Damages</h3>
              <p>
                In no event shall Carbon Compass be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including but not limited to loss of profits, data, or use, arising out of 
                or in connection with your use of the Service.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Maximum Liability</h3>
              <p>
                Our total liability to you for all claims arising out of or relating to the Service shall not 
                exceed the amount you paid us in the twelve months preceding the claim, or $100, whichever is greater.
              </p>
            </div>
          </div>
        </section>

        {/* Termination */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Termination</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-3">Termination by You</h3>
              <p>
                You may terminate your account at any time by contacting us or using the account deletion 
                feature in your settings. Upon termination, your right to use the Service will cease immediately.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Termination by Us</h3>
              <p>
                We may terminate or suspend your account immediately, without prior notice, if you breach 
                these Terms or engage in conduct that we determine to be harmful to the Service or other users.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Effect of Termination</h3>
              <ul className="space-y-2">
                <li>• Your access to the Service will be immediately revoked</li>
                <li>• Your data may be deleted after a reasonable retention period</li>
                <li>• Provisions regarding intellectual property and limitation of liability survive termination</li>
                <li>• You remain liable for any outstanding fees or obligations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Governing Law */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Governing Law and Disputes</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-3">Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, 
                without regard to its conflict of law provisions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Dispute Resolution</h3>
              <p>
                Any disputes arising out of or relating to these Terms or the Service shall be resolved through 
                binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Class Action Waiver</h3>
              <p>
                You agree that any arbitration or legal proceeding shall be limited to the dispute between you 
                and Carbon Compass individually. You waive any right to participate in class action lawsuits 
                or class-wide arbitrations.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gradient-to-r from-primary/10 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          
          <div className="space-y-4">
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Legal Department</h4>
                <p className="text-sm text-gray-700 mb-1">Email: legal@carboncompass.com</p>
                <p className="text-sm text-gray-700">Response time: Within 5 business days</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Mailing Address</h4>
                <p className="text-sm text-gray-700">
                  Carbon Compass Legal Team<br />
                  123 Green Street, Suite 400<br />
                  San Francisco, CA 94111
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Terms Updates:</strong> We may update these Terms from time to time. 
                We'll notify you of significant changes via email or through our platform. 
                Your continued use of the Service after changes become effective constitutes acceptance of the new Terms.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;