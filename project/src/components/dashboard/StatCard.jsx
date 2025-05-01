import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';



const StatCard = ({ title, value, icon: Icon, change, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600';
      case 'green':
        return 'bg-green-50 text-green-600';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-600';
      case 'red':
        return 'bg-red-50 text-red-600';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600';
      case 'purple':
        return 'bg-purple-50 text-purple-600';
      case 'teal':
        return 'bg-teal-50 text-teal-600';
      default:
        return 'bg-blue-50 text-blue-600';
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-200 hover:shadow-md">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${getColorClasses()}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-semibold text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {change !== undefined && (
        <div className="bg-gray-50 px-4 py-3">
          <div className="text-sm">
            <div
              className={`font-medium ${
                change >= 0 ? 'text-green-600' : 'text-red-600'
              } inline-flex items-center`}
            >
              {change >= 0 ? '+' : ''}
              {change}%
              <span className="ml-1 text-gray-500 text-xs">from last month</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;