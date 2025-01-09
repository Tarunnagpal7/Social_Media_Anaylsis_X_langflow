import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MessageSquare, TrendingUp, Share2, ThumbsUp, Play } from 'lucide-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import ChatBox from './Chatbot.jsx';


// example data
const monthlyData = [
  { month: 'Jan', reels: 4500, images: 2300, comments: 1200, likes: 8500,region:"Africa", engagement: 75 },
  { month: 'Feb', reels: 5200, images: 2100, comments: 1400, likes: 9200,region:"Europe", engagement: 82 },
  { month: 'Mar', reels: 4800, images: 2400, comments: 1100, likes: 8900,region:"Asia", engagement: 79 },
  { month: 'Apr', reels: 5500, images: 2600, comments: 1500, likes: 9500,region:"Africa", engagement: 85 },
  { month: 'May', reels: 6000, images: 2800, comments: 1600, likes: 10200,region:"Asia", engagement: 88 },
  { month: 'Jun', reels: 5800, images: 2500, comments: 1450, likes: 9800,region:"Europe", engagement: 86 }
];

export default function Dashboard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              SocialSphere
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Advanced Social Media Analytics Platform
            </p>
            <div 
              className={`transform transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
                <Link to="/chatbot">
                
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow">
                        Launch Chatbot
                    </button>
                
                </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Play className="text-blue-500 mr-3" />
              <div>
                <p className="text-gray-500">Total Reels</p>
                <p className="text-2xl font-bold">5,842</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <MessageSquare className="text-green-500 mr-3" />
              <div>
                <p className="text-gray-500">Comments</p>
                <p className="text-2xl font-bold">8,421</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <ThumbsUp className="text-yellow-500 mr-3" />
              <div>
                <p className="text-gray-500">Likes</p>
                <p className="text-2xl font-bold">56,129</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <TrendingUp className="text-purple-500 mr-3" />
              <div>
                <p className="text-gray-500">Engagement</p>
                <p className="text-2xl font-bold">82%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      {/* Charts */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Content Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Content Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reels" fill="#3B82F6" />
                <Bar dataKey="images" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

            {/* Regional Performance */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-[#1e3a8a]">Regional Performance</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="region" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="shares" fill="#1e3a8a" />
                                <Bar dataKey="comments" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>


        {/* Engagement Trends */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Engagement Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interaction Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Interaction Metrics</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="comments" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="likes" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Monthly Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#F59E0B" />
                <Bar dataKey="comments" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-6">Connect with Us</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-10">
          {/* Profile Card 1 */}
          <div className="bg-gray-800 hover:shadow-lg transition-transform transform hover:-translate-y-2 rounded-lg p-6 text-center">
            <img
              src="./t.png"
              alt="Profile 1"
              className="w-40 h-40 mx-auto rounded border-4 border-gray-600"
            />
            <h3 className="mt-4 text-xl font-semibold">Tarun Nagpal</h3>
            <p className="text-gray-400">Full Stack Developer</p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/tarun-nagpal-b0b792254/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              
            </div>
          </div>

          {/* Profile Card 2 */}
          <div className="bg-gray-800 hover:shadow-lg transition-transform transform hover:-translate-y-2 rounded-lg p-6 text-center">
            <img
              src="./g.png"
              alt="Profile 2"
              className="w-40 h-40 mx-auto rounded border-4 border-gray-600"
            />
            <h3 className="mt-4 text-xl font-semibold">Gaurav Daware</h3>
            <p className="text-gray-400">Full Stack Developer</p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/gaurav-daware-68476826b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
          {/* Profile Card 3 */}
          <div className="bg-gray-800 hover:shadow-lg transition-transform transform hover:-translate-y-2 rounded-lg p-6 text-center">
            <img
              src="./n.png"
              alt="Profile 2"
              className="w-40 h-40 mx-auto rounded border-4 border-gray-600"
            />
            <h3 className="mt-4 text-xl font-semibold">Nidhish Tomar</h3>
            <p className="text-gray-400">Frontend Developer</p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/nidhish-tomar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
          {/* Profile Card 4 */}
          <div className="bg-gray-800 hover:shadow-lg transition-transform transform hover:-translate-y-2 rounded-lg p-6 text-center">
            <img
              src="./y.png"
              alt="Profile 2"
              className="w-40 h-40 mx-auto rounded border-4 border-gray-600"
            />
            <h3 className="mt-4 text-xl font-semibold">Yashraj Solanki</h3>
            <p className="text-gray-400">Frontend Developer</p>
            <div className="flex justify-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/yashraj-solanki-7b7363256/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 mt-6">© 2025 Your Website. All rights reserved.</p>
    </footer>
    </div>
   
  );
};

