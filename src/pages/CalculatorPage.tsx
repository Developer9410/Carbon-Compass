import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { 

  ArrowDown, ArrowUp, BarChart2, LineChart, PieChart, Calendar, 

  TrendingDown, AlertCircle, User, ThumbsUp, Leaf, Award, Star, Gift, Zap

} from 'lucide-react';

import { useApp } from '../context/AppContext';

import { generateChartData, mockAISuggestions } from '../data/mockData';

import CarbonNeutralBadge from '../components/ui/CarbonNeutralBadge';

import { 

  BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, 

  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 

} from 'recharts';



const DashboardPage: React.FC = () => {

  const { carbonData, totalFootprint, user } = useApp();

  const [chartTimeframe, setChartTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const { dailyData, weeklyData, monthlyData } = generateChartData();

  

  // Mock offset data - in a real app this would come from the database

  const totalOffsetAmount = user?.offsetHistory?.reduce((sum, offset) => sum + offset.amount, 0) || 0;

  const isNeutral = totalOffsetAmount >= totalFootprint;

  const offsetPercentage = totalFootprint > 0 ? (totalOffsetAmount / totalFootprint) * 100 : 0;

  

  // Mock points data - in a real app this would come from the database

  const recentPointsEarned = 275; // Points earned this week

  const pointsFromReduction = 150; // Points from footprint reduction

  const nextLevelPoints = 2000; // Points needed for next level

  

  // Choose the correct data based on the timeframe

  const getChartData = () => {

    switch (chartTimeframe) {

      case 'daily':

        return dailyData;

      case 'weekly':

        return weeklyData;

      case 'monthly':

        return monthlyData;

      default:

        return weeklyData;

    }

  };

  

  // Calculate the total for the current timeframe

  const timeframeTotal = getChartData().reduce(

    (sum, item) => sum + item.transport + item.energy + item.diet + item.other, 

    0

  );

  

  // Calculate percentage change (dummy values for demo)

  const percentChange = -12.5;

  

  // Category colors

  const COLORS = ['#3B82F6', '#F97316', '#10B981', '#A3A3A3'];



  // Handle implement suggestion

  const handleImplementSuggestion = (suggestion: any) => {

    alert(`Great choice! You've decided to implement: "${suggestion.title}". This could save you approximately ${suggestion.estimatedReduction} kg CO₂e per month. We'll track your progress and award you Green Points for taking action!`);

    

    // In a real app, you would:

    // 1. Save the user's commitment to implement this suggestion

    // 2. Set up tracking for this specific action

    // 3. Award points when the user completes the action

    // 4. Update the user's profile with this commitment

  };



  return (

    <div className="container mx-auto max-w-6xl px-4">

      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className="mb-8"

      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

          <div>

            <h1 className="text-3xl font-bold mb-2">Carbon Dashboard</h1>

            <p className="text-gray-600">

              Track your carbon footprint and view personalized insights to reduce your environmental impact.

            </p>

          </div>

          

          {/* Carbon Neutral Status */}

          <div className="mt-4 md:mt-0">

            <CarbonNeutralBadge 

              isNeutral={isNeutral}

              offsetPercentage={offsetPercentage}

              size="lg"

            />

          </div>

        </div>

      </motion.div>

      

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <SummaryCard 

          title="Total Footprint"

          value={`${totalFootprint.toFixed(1)} kg`}

          description="CO₂e this month"

          icon={<BarChart2 className="w-6 h-6 text-blue-500" />}

          color="blue"

        />

        

        <SummaryCard 

          title="Change"

          value={`${Math.abs(percentChange)}%`}

          description={`${percentChange < 0 ? 'Decrease' : 'Increase'} from last month`}

          icon={percentChange < 0 

            ? <TrendingDown className="w-6 h-6 text-green-500" /> 

            : <ArrowUp className="w-6 h-6 text-red-500" />}

          color={percentChange < 0 ? "green" : "red"}

          badge={percentChange < 0 ? <Star className="w-4 h-4 text-yellow-500" /> : undefined}

        />

        

        <SummaryCard 

          title="Green Points"

          value={user?.greenPoints.toString() || "0"}

          description={`+${recentPointsEarned} this week`}

          icon={<Award className="w-6 h-6 text-primary" />}

          color="green"

          badge={<Gift className="w-4 h-4 text-purple-500" />}

        />

        

        <SummaryCard 

          title="Carbon Offset"

          value={`${totalOffsetAmount.toFixed(1)} kg`}

          description="CO₂e offset to date"

          icon={<Leaf className="w-6 h-6 text-green-500" />}

          color="green"

          badge={isNeutral ? <Award className="w-4 h-4 text-yellow-500" /> : undefined}

        />

      </div>

      

      {/* Points Progress Banner */}

      <motion.div

        initial={{ opacity: 0, y: -20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.5 }}

        className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 mb-8"

      >

        <div className="flex items-center justify-between">

          <div className="flex items-center">

            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">

              <Zap className="w-6 h-6 text-white" />

            </div>

            <div>

              <h3 className="text-lg font-semibold text-purple-800">Level {user?.level || 1} • {user?.greenPoints || 0} Green Points</h3>

              <p className="text-purple-700">

                You earned {pointsFromReduction} points from reducing your footprint this month!

              </p>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-purple-600 mb-1">Next level: {nextLevelPoints - (user?.greenPoints || 0)} points to go</p>

            <div className="w-48 bg-purple-200 rounded-full h-2">

              <div 

                className="bg-purple-500 h-2 rounded-full" 

                style={{ width: `${Math.min(100, ((user?.greenPoints || 0) / nextLevelPoints) * 100)}%` }}

              ></div>

            </div>

          </div>

        </div>

      </motion.div>

      

      {/* Carbon Neutral Achievement Banner */}

      {isNeutral && (

        <motion.div

          initial={{ opacity: 0, y: -20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.5 }}

          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8"

        >

          <div className="flex items-center justify-between">

            <div className="flex items-center">

              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">

                <Award className="w-6 h-6 text-white" />

              </div>

              <div>

                <h3 className="text-lg font-semibold text-green-800">🎉 Congratulations! You're Carbon Neutral!</h3>

                <p className="text-green-700">

                  You've successfully offset your entire carbon footprint. You earned 500 bonus Green Points!

                </p>

              </div>

            </div>

            <button className="btn btn-sm bg-green-600 hover:bg-green-700 text-white">

              Share Achievement

            </button>

          </div>

        </motion.div>

      )}

      

      {/* Main Content Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Carbon Emissions Chart */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-xl shadow-sm p-6 h-full">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold">Carbon Emissions</h2>

              

              <div className="flex space-x-2">

                {/* Chart type toggle */}

                <div className="flex rounded-lg overflow-hidden border">

                  <button 

                    onClick={() => setChartType('bar')}

                    className={`p-2 text-xs ${chartType === 'bar' 

                      ? 'bg-primary text-white' 

                      : 'bg-white text-gray-700'}`}

                  >

                    <BarChart2 size={16} />

                  </button>

                  <button 

                    onClick={() => setChartType('line')}

                    className={`p-2 text-xs ${chartType === 'line' 

                      ? 'bg-primary text-white' 

                      : 'bg-white text-gray-700'}`}

                  >

                    <LineChart size={16} />

                  </button>

                  <button 

                    onClick={() => setChartType('pie')}

                    className={`p-2 text-xs ${chartType === 'pie' 

                      ? 'bg-primary text-white' 

                      : 'bg-white text-gray-700'}`}

                  >

                    <PieChart size={16} />

                  </button>

                </div>

                

                {/* Timeframe toggle */}

                <div className="flex rounded-lg overflow-hidden border">

                  <button 

                    onClick={() => setChartTimeframe('daily')}

                    className={`px-3 py-1 text-xs ${chartTimeframe === 'daily' 

                      ? 'bg-primary text-white' 

                      : 'bg-white text-gray-700'}`}

                  >

                    Daily

                  </button>

                  <button 

                    onClick={() => setChartTimeframe('weekly')}

                    className={`px-3 py-1 text-xs ${chartTimeframe === 'weekly' 

                      ? 'bg-primary text-white' 

                      : 'bg-white text-gray-700'}`}

                  >

                    Weekly

                  </button>

                  <button 

                    onClick={() => setChartTimeframe('monthly')}

                    className={`px-3 py-1 text-xs ${chartTimeframe === 'monthly' 

                      ? 'bg-primary text-white' 

                      : 'bg-white text-gray-700'}`}

                  >

                    Monthly

                  </button>

                </div>

              </div>

            </div>

            

            <div className="h-80">

              <ResponsiveContainer width="100%" height="100%">

                {chartType === 'bar' && (

                  <BarChart data={getChartData()}>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />

                    <YAxis tick={{ fontSize: 12 }} />

                    <Tooltip 

                      formatter={(value) => [`${value} kg CO₂e`, '']}

                      labelFormatter={(label) => `Date: ${label}`}

                    />

                    <Legend />

                    <Bar dataKey="transport" name="Transport" stackId="a" fill={COLORS[0]} />

                    <Bar dataKey="energy" name="Energy" stackId="a" fill={COLORS[1]} />

                    <Bar dataKey="diet" name="Diet" stackId="a" fill={COLORS[2]} />

                    <Bar dataKey="other" name="Other" stackId="a" fill={COLORS[3]} />

                  </BarChart>

                )}

                

                {chartType === 'line' && (

                  <RechartsLineChart data={getChartData()}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />

                    <YAxis tick={{ fontSize: 12 }} />

                    <Tooltip 

                      formatter={(value) => [`${value} kg CO₂e`, '']}

                      labelFormatter={(label) => `Date: ${label}`}

                    />

                    <Legend />

                    <Line type="monotone" dataKey="transport" name="Transport" stroke={COLORS[0]} activeDot={{ r: 8 }} />

                    <Line type="monotone" dataKey="energy" name="Energy" stroke={COLORS[1]} />

                    <Line type="monotone" dataKey="diet" name="Diet" stroke={COLORS[2]} />

                    <Line type="monotone" dataKey="other" name="Other" stroke={COLORS[3]} />

                  </RechartsLineChart>

                )}

                

                {chartType === 'pie' && (

                  <RechartsPieChart>

                    <Pie

                      data={[

                        { name: 'Transport', value: getChartData().reduce((sum, item) => sum + item.transport, 0) },

                        { name: 'Energy', value: getChartData().reduce((sum, item) => sum + item.energy, 0) },

                        { name: 'Diet', value: getChartData().reduce((sum, item) => sum + item.diet, 0) },

                        { name: 'Other', value: getChartData().reduce((sum, item) => sum + item.other, 0) },

                      ]}

                      cx="50%"

                      cy="50%"

                      labelLine={false}

                      outerRadius={90}

                      fill="#8884d8"

                      dataKey="value"

                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}

                    >

                      {getChartData().map((entry, index) => (

                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                      ))}

                    </Pie>

                    <Tooltip formatter={(value) => [`${value.toFixed(1)} kg CO₂e`, '']} />

                    <Legend />

                  </RechartsPieChart>

                )}

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        

        {/* AI Recommendations */}

        <div className="lg:col-span-1">

          <div className="bg-white rounded-xl shadow-sm p-6 h-full">

            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>

            <p className="text-sm text-gray-600 mb-6">

              Personalized suggestions to help you reduce your carbon footprint:

            </p>

            

            <div className="space-y-4">

              {mockAISuggestions.map((suggestion) => (

                <div 

                  key={suggestion.id}

                  className="p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"

                >

                  <div className="flex justify-between items-start">

                    <h3 className="font-medium text-gray-900">{suggestion.title}</h3>

                    <span className={`badge ${

                      suggestion.impact === 'high' ? 'badge-green' : 

                      suggestion.impact === 'medium' ? 'badge-blue' : 

                      'badge-orange'

                    }`}>

                      {suggestion.impact} impact

                    </span>

                  </div>

                  <p className="mt-2 text-sm text-gray-600">{suggestion.description}</p>

                  <div className="mt-3 flex justify-between items-center text-xs text-gray-500">

                    <span>Potential savings: ~{suggestion.estimatedReduction} kg CO₂e/month</span>

                    <span className="font-medium">{suggestion.difficulty} to implement</span>

                  </div>

                  <div className="mt-3 flex justify-between items-center">

                    <span className="text-xs text-green-600 font-medium">+{Math.floor(suggestion.estimatedReduction * 2)} Green Points</span>

                    <button 

                      onClick={() => handleImplementSuggestion(suggestion)}

                      className="btn btn-sm btn-outline hover:btn-primary transition-colors"

                    >

                      Implement

                    </button>

                  </div>

                </div>

              ))}

            </div>

            

            <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-start">

              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />

              <p className="text-sm text-blue-700">

                These suggestions are based on your usage patterns and similar households. 

                Implementing all suggestions could reduce your footprint by up to 30% and earn you 500+ Green Points!

              </p>

            </div>

          </div>

        </div>

      </div>

      

      {/* Recent Activity */}

      <div className="mt-8">

        <div className="bg-white rounded-xl shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          

          {carbonData.length > 0 ? (

            <div className="overflow-x-auto">

              <table className="min-w-full divide-y divide-gray-200">

                <thead>

                  <tr>

                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>

                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>

                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>

                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Carbon Footprint</th>

                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Points Earned</th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-200">

                  {carbonData.slice(0, 5).map((item) => (

                    <tr key={item.id} className="hover:bg-gray-50">

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.date}</td>

                      <td className="px-4 py-3 whitespace-nowrap">

                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${

                          item.category === 'transport' ? 'bg-blue-100 text-blue-800' :

                          item.category === 'energy' ? 'bg-orange-100 text-orange-800' :

                          item.category === 'diet' ? 'bg-green-100 text-green-800' :

                          'bg-gray-100 text-gray-800'

                        }`}>

                          {item.category}

                        </span>

                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.activity}</td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">

                        {item.amount.toFixed(1)} kg CO₂e

                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-green-600">

                        +{Math.floor(item.amount * 5)} pts

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <p className="text-gray-500 text-center py-8">No activity recorded yet.</p>

          )}

        </div>

      </div>

    </div>

  );

};



interface SummaryCardProps {

  title: string;

  value: string;

  description: string;

  icon: React.ReactNode;

  color: 'blue' | 'green' | 'red' | 'purple';

  badge?: React.ReactNode;

}



const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, description, icon, color, badge }) => {

  const colorClasses = {

    blue: 'bg-blue-50',

    green: 'bg-green-50',

    red: 'bg-red-50',

    purple: 'bg-purple-50'

  };



  return (

    <div className="bg-white rounded-xl shadow-sm p-6">

      <div className="flex items-start">

        <div className={`p-3 rounded-full ${colorClasses[color]} mr-4`}>

          {icon}

        </div>

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <p className="text-sm font-medium text-gray-600">{title}</p>

            {badge}

          </div>

          <p className="text-2xl font-bold">{value}</p>

          <p className="text-xs text-gray-500">{description}</p>

        </div>

      </div>

    </div>

  );

};

