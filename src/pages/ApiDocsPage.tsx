import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Key, Database, Zap, Copy, Check } from 'lucide-react';

const ApiDocsPage: React.FC = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/functions/v1/estimateCarbon',
      description: 'Calculate carbon footprint based on user inputs',
      example: `{
  "transport": [
    {
      "mode": "car",
      "distanceKm": 50,
      "frequencyPerWeek": 5
    }
  ],
  "energy": [
    {
      "type": "electricity",
      "usageKWh": 300
    }
  ],
  "diet": [
    {
      "category": "meat",
      "servingsPerWeek": 7
    }
  ]
}`
    },
    {
      method: 'POST',
      path: '/functions/v1/offsetCarbon',
      description: 'Purchase carbon offsets for calculated emissions',
      example: `{
  "kgCO2e": 150.5
}`
    },
    {
      method: 'POST',
      path: '/functions/v1/awardPoints',
      description: 'Award green points for sustainable actions',
      example: `{
  "actionType": "carbon_entry",
  "description": "Calculated monthly footprint",
  "carbonEntryId": "uuid-here"
}`
    },
    {
      method: 'POST',
      path: '/functions/v1/suggestionAI',
      description: 'Get AI-powered carbon reduction suggestions',
      example: `{
  "carbonEntryId": "uuid-here"
}`
    }
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-gray-600">
          Integrate Carbon Compass functionality into your applications with our REST API.
        </p>
      </motion.div>

      {/* Getting Started */}
      <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Key className="w-6 h-6 text-primary mr-3" />
          Getting Started
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Base URL</h3>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              https://your-project.supabase.co
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Authentication</h3>
            <p className="text-gray-700 mb-3">
              All API requests require authentication using a Bearer token in the Authorization header:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              Authorization: Bearer YOUR_JWT_TOKEN
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Content Type</h3>
            <p className="text-gray-700 mb-3">
              All requests should include the following header:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              Content-Type: application/json
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Zap className="w-6 h-6 text-primary mr-3" />
          API Endpoints
        </h2>
        
        <div className="space-y-8">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${
                  endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-lg font-mono">{endpoint.path}</code>
              </div>
              
              <p className="text-gray-700 mb-4">{endpoint.description}</p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Request Body Example</h4>
                  <button
                    onClick={() => copyToClipboard(endpoint.example, endpoint.path)}
                    className="flex items-center text-sm text-gray-500 hover:text-primary"
                  >
                    {copiedEndpoint === endpoint.path ? (
                      <>
                        <Check size={16} className="mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
                  <code>{endpoint.example}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Response Format */}
      <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Database className="w-6 h-6 text-primary mr-3" />
          Response Format
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Success Response</h3>
            <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
              <code>{`{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation completed successfully"
}`}</code>
            </pre>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Error Response</h3>
            <pre className="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto">
              <code>{`{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">Rate Limits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">Standard Endpoints</h4>
            <p className="text-sm text-gray-600 mb-2">100 requests per minute</p>
            <p className="text-xs text-gray-500">For carbon calculations and basic operations</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-2">AI Suggestions</h4>
            <p className="text-sm text-gray-600 mb-2">10 requests per minute</p>
            <p className="text-xs text-gray-500">For AI-powered recommendation endpoints</p>
          </div>
        </div>
      </section>

      {/* SDKs and Libraries */}
      <section className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Code className="w-6 h-6 text-primary mr-3" />
          SDKs & Libraries
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 text-center">
            <h4 className="font-semibold mb-2">JavaScript/TypeScript</h4>
            <p className="text-sm text-gray-600 mb-4">Official SDK for web and Node.js applications</p>
            <button className="btn btn-outline btn-sm">Coming Soon</button>
          </div>
          
          <div className="border rounded-lg p-6 text-center">
            <h4 className="font-semibold mb-2">Python</h4>
            <p className="text-sm text-gray-600 mb-4">SDK for Python applications and data science</p>
            <button className="btn btn-outline btn-sm">Coming Soon</button>
          </div>
          
          <div className="border rounded-lg p-6 text-center">
            <h4 className="font-semibold mb-2">REST API</h4>
            <p className="text-sm text-gray-600 mb-4">Direct HTTP requests for any language</p>
            <button className="btn btn-primary btn-sm">Available Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiDocsPage;