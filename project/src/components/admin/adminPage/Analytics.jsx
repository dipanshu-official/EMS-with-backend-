import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const data = [
  { name: 'Jan', users: 2400, sales: 2400 },
  { name: 'Feb', users: 1398, sales: 2210 },
  { name: 'Mar', users: 9800, sales: 2290 },
  { name: 'Apr', users: 3908, sales: 2000 },
  { name: 'May', users: 4800, sales: 2181 },
  { name: 'Jun', users: 3800, sales: 2500 },
];

function Analytics() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500 mb-1">Total Users</p>
          <h2 className="text-2xl font-semibold text-blue-600">12,345</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500 mb-1">Total Sales</p>
          <h2 className="text-2xl font-semibold text-green-600">$56,700</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
          <h2 className="text-2xl font-semibold text-purple-600">5.3%</h2>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Users & Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Analytics;
