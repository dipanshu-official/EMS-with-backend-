import React, { useMemo } from 'react';
import { useTasks } from '../../context/TaskContext';

const PriorityDistributionChart= () => {
  const { tasks } = useTasks();

  // Calculate priority distribution
  const priorityStats = useMemo(() => {
    const total = tasks.length;
    const high = tasks.filter(task => task.priority === 'high').length;
    const medium = tasks.filter(task => task.priority === 'medium').length;
    const low = tasks.filter(task => task.priority === 'low').length;
    
    return {
      total,
      high,
      medium,
      low,
      highPercent: total > 0 ? Math.round((high / total) * 100) : 0,
      mediumPercent: total > 0 ? Math.round((medium / total) * 100) : 0,
      lowPercent: total > 0 ? Math.round((low / total) * 100) : 0,
    };
  }, [tasks]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Task Priority Distribution</h3>
        <div className="mt-5">
          <div className="mb-4 flex h-4 overflow-hidden rounded-full bg-gray-100">
            <div 
              style={{ width: `${priorityStats.highPercent}%` }} 
              className="bg-red-500 transition-all duration-500 ease-in-out" 
            />
            <div 
              style={{ width: `${priorityStats.mediumPercent}%` }} 
              className="bg-yellow-500 transition-all duration-500 ease-in-out" 
            />
            <div 
              style={{ width: `${priorityStats.lowPercent}%` }} 
              className="bg-green-500 transition-all duration-500 ease-in-out" 
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></span>
              <span className="text-sm font-medium text-gray-700">High</span>
              <span className="text-lg font-semibold text-gray-900">{priorityStats.high}</span>
            </div>
            <div className="flex flex-col">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></span>
              <span className="text-sm font-medium text-gray-700">Medium</span>
              <span className="text-lg font-semibold text-gray-900">{priorityStats.medium}</span>
            </div>
            <div className="flex flex-col">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></span>
              <span className="text-sm font-medium text-gray-700">Low</span>
              <span className="text-lg font-semibold text-gray-900">{priorityStats.low}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityDistributionChart;