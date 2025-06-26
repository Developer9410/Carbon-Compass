import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TrendData {
  period: string;
  emissions: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  percentageChange: number;
}

const CarbonTrendsChart: React.FC = () => {
  const { user } = useApp();
  const [trendsData, setTrendsData] = useState<TrendData[]>([]);
  const [timeframe, setTimeframe] = useState<'3months' | '6months' | '1year'>('6months');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTrendsData();
    }
  }, [user, timeframe]);

  const fetchTrendsData = async () => {
    setLoading(true);
    try {
      // Mock data - in real app, fetch from Supabase
      const mockData: TrendData[] = [
        { period: 'Jan 2024', emissions: 450, trend: 'stable', percentageChange: 2 },
        { period: 'Feb 2024', emissions: 420, trend: 'decreasing', percentageChange: -6.7 },
        { period: 'Mar 2024', emissions: 380, trend: 'decreasing', percentageChange: -9.5 },
        { period: 'Apr 2024', emissions: 360, trend: 'decreasing', percentageChange: -5.3 },
        { period: 'May 2024', emissions: 340, trend: 'decreasing', percentageChange: -5.6 },
        { period: 'Jun 2024', emissions: 320, trend: 'decreasing', percentageChange: -5.9 },
      ];
      
      setTrendsData(mockData);
    } catch (error) {
      console.error('Error fetching trends data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-red-600 bg-red-50';
      case 'decreasing':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const latestTrend = trendsData[trendsData.length - 1];
  const totalReduction = trendsData.length > 1 
    ? ((trendsData[0].emissions - latestTrend?.emissions) / trendsData[0].emissions) * 100 
    : 0;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Carbon Footprint Trends</h3>
          <p className="text-sm text-gray-600">Track your progress over time</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1"
          >
            <option value="3months">Last 3 months</option>
            <option value="6months">Last 6 months</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800">Current Month</h4>
          <p className="text-2xl font-bold text-blue-600">
            {latestTrend?.emissions || 0} kg
          </p>
          <p className="text-xs text-blue-700">CO₂e emissions</p>
        </div>
        
        <div className={`rounded-lg p-4 ${getTrendColor(latestTrend?.trend || 'stable')}`}>
          <h4 className="text-sm font-medium">Monthly Change</h4>
          <div className="flex items-center">
            <p className="text-2xl font-bold mr-2">
              {latestTrend?.percentageChange > 0 ? '+' : ''}{latestTrend?.percentageChange?.toFixed(1) || 0}%
            </p>
            {getTrendIcon(latestTrend?.trend || 'stable')}
          </div>
          <p className="text-xs">vs last month</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800">Total Reduction</h4>
          <p className="text-2xl font-bold text-green-600">
            {totalReduction.toFixed(1)}%
          </p>
          <p className="text-xs text-green-700">since tracking started</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="period" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} kg CO₂e`, 'Emissions']}
              labelFormatter={(label) => `Period: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="emissions" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">💡 Insights</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          {totalReduction > 10 && (
            <li>• Great progress! You've reduced your footprint by {totalReduction.toFixed(1)}%</li>
          )}
          {latestTrend?.trend === 'decreasing' && (
            <li>• You're on a positive trend - keep up the good work!</li>
          )}
          {latestTrend?.trend === 'increasing' && (
            <li>• Consider reviewing your recent activities to identify areas for improvement</li>
          )}
          <li>• Consistent tracking helps identify patterns and opportunities for reduction</li>
        </ul>
      </div>
    </div>
  );
};

export default CarbonTrendsChart;