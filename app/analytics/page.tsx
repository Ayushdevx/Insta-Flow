'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Users, MessageCircle, Heart, Brain, Sparkles, Clock, BarChart, Bot, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [aiInsights, setAiInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [automationStats, setAutomationStats] = useState({
    totalAutomations: 24,
    activeAutomations: 18,
    totalMessages: 1247,
    successRate: 96.5
  });

  // Simulated real-time automation data
  const automationData = [
    { time: '00:00', automatedDMs: 42, responses: 35, comments: 28, follows: 15 },
    { time: '04:00', automatedDMs: 18, responses: 15, comments: 12, follows: 8 },
    { time: '08:00', automatedDMs: 85, responses: 76, comments: 54, follows: 32 },
    { time: '12:00', automatedDMs: 126, responses: 108, comments: 87, follows: 45 },
    { time: '16:00', automatedDMs: 156, responses: 142, comments: 98, follows: 67 },
    { time: '20:00', automatedDMs: 92, responses: 84, comments: 65, follows: 38 },
    { time: 'Now', automatedDMs: 68, responses: 58, comments: 42, follows: 25 },
  ];

  // Automation tasks status
  const automationTasks = [
    { name: 'Welcome DM', status: 'active', successRate: 98, dailyActions: 145 },
    { name: 'Comment Reply', status: 'active', successRate: 95, dailyActions: 287 },
    { name: 'Follow Back', status: 'active', successRate: 97, dailyActions: 98 },
    { name: 'Story Mention Reply', status: 'paused', successRate: 94, dailyActions: 76 }
  ];

  // Simulated AI insights
  const getAiInsights = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setAiInsights([
      {
        title: "DM Optimization",
        content: "Your welcome DM automation has a 98% response rate. Consider expanding this strategy to product inquiries.",
        type: "success"
      },
      {
        title: "Engagement Pattern",
        content: "Peak automation performance occurs between 4-6 PM. Recommend adjusting schedules to maximize reach.",
        type: "info"
      },
      {
        title: "Performance Alert",
        content: "Story mention replies showing 5% lower engagement. Suggested: Update response templates.",
        type: "warning"
      },
      {
        title: "Growth Opportunity",
        content: "Follow-back automation successful. Expand to target users with similar interests for 32% more growth.",
        type: "success"
      }
    ]);
    setLoading(false);
  };

  useEffect(() => {
    getAiInsights();
  }, [timeRange]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="w-full space-y-6 p-6 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.h2 
          className="text-3xl font-bold text-gray-800"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          Automation Dashboard
        </motion.h2>
        <motion.div className="flex gap-4">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={getAiInsights}
          >
            <Brain className="w-4 h-4" />
            Refresh Analysis
          </Button>
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <Button
              variant={timeRange === '7d' ? 'default' : 'ghost'}
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === '30d' ? 'default' : 'ghost'}
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Active Automation Stats */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100">Active Automations</p>
                  <h3 className="text-3xl font-bold mt-2">{automationStats.activeAutomations}</h3>
                  <p className="text-blue-100 text-sm">of {automationStats.totalAutomations} total</p>
                </div>
                <Bot className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-green-100">Messages Sent</p>
                  <h3 className="text-3xl font-bold mt-2">{automationStats.totalMessages}</h3>
                  <p className="text-green-100 text-sm">Last 24 hours</p>
                </div>
                <Mail className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-purple-100">Success Rate</p>
                  <h3 className="text-3xl font-bold mt-2">{automationStats.successRate}%</h3>
                  <p className="text-purple-100 text-sm">Avg response rate</p>
                </div>
                <Activity className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-orange-100">Active Tasks</p>
                  <h3 className="text-3xl font-bold mt-2">847</h3>
                  <p className="text-orange-100 text-sm">Processing now</p>
                </div>
                <Clock className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* AI Insights Section */}
      {loading ? (
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-8 h-8 text-blue-500" />
              </motion.div>
              <span className="ml-2">Analyzing automation patterns...</span>
            </div>
          </CardContent>
        </Card>
      ) : aiInsights && (
        <motion.div variants={container} initial="hidden" animate="show">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                AI-Powered Optimization Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className={`p-4 rounded-lg border ${
                      insight.type === 'success' ? 'bg-green-50 border-green-200' :
                      insight.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <h3 className={`font-medium mb-2 ${
                      insight.type === 'success' ? 'text-green-700' :
                      insight.type === 'warning' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {insight.title}
                    </h3>
                    <p className={`text-sm ${
                      insight.type === 'success' ? 'text-green-600' :
                      insight.type === 'warning' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>
                      {insight.content}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Automation Performance Chart */}
      <motion.div variants={container} initial="hidden" animate="show">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Real-time Automation Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={automationData}>
                  <defs>
                    <linearGradient id="colorDMs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="automatedDMs" 
                    stroke="#3b82f6" 
                    fill="url(#colorDMs)" 
                    name="Automated DMs"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="responses" 
                    stroke="#10b981" 
                    fill="url(#colorResponses)" 
                    name="Responses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Automations Status */}
      <motion.div variants={container} initial="hidden" animate="show">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Active Automation Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {automationTasks.map((task, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="p-4 bg-white rounded-lg border shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{task.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Success Rate: {task.successRate}%</span>
                    <span>Daily Actions: {task.dailyActions}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${task.successRate}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                 </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Real-time Activity Feed */}
      <motion.div variants={container} initial="hidden" animate="show">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Live Automation Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Welcome DM sent to @user123</span>
                </div>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm">Comment reply automation triggered</span>
                </div>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-sm">Story mention processed</span>
                </div>
                <span className="text-xs text-gray-500">5m ago</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Response Templates Performance */}
      <motion.div variants={container} initial="hidden" animate="show">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Template Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Welcome Message', responses: 542, rate: 98, status: 'Excellent' },
                { name: 'Product Inquiry', responses: 367, rate: 87, status: 'Good' },
                { name: 'Support Request', responses: 289, rate: 92, status: 'Very Good' },
                { name: 'Follow-up', responses: 156, rate: 76, status: 'Needs Attention' }
              ].map((template, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{template.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      template.rate > 95 ? 'bg-green-100 text-green-700' :
                      template.rate > 85 ? 'bg-blue-100 text-blue-700' :
                      template.rate > 75 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {template.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{template.responses} responses</span>
                    <span>{template.rate}% success rate</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        template.rate > 95 ? 'bg-green-500' :
                        template.rate > 85 ? 'bg-blue-500' :
                        template.rate > 75 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${template.rate}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsDashboard;