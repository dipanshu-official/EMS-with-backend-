import React, { useMemo } from 'react';
import { useTasks } from '../../context/TaskContext';

const TaskCompletionChart = () => {
  const { tasks } = useTasks();

  // Calculate the completion percentages and totals
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const incomplete = total - completed;
    
    const completedPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const incompletePercent = total > 0 ? 100 - completedPercent : 0;
    
    return {
      total,
      completed,
      incomplete,
      completedPercent,
      incompletePercent
    };
  }, [tasks]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Task Completion</h3>
        <div className="mt-5 flex flex-col">
          <div className="overflow-hidden h-2 mb-4 text-xs flex bg-gray-100 rounded">
            <div 
              style={{ width: `${stats.completedPercent}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-in-out"
            />
            <div 
              style={{ width: `${stats.incompletePercent}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-300"
            />
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-center">
              <span className="text-sm font-medium text-gray-500">Completed</span>
              <p className="mt-1 text-xl font-semibold text-green-600">{stats.completedPercent}%</p>
              <p className="text-sm text-gray-500">{stats.completed} tasks</p>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-gray-500">Total</span>
              <p className="mt-1 text-xl font-semibold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-500">tasks</p>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-gray-500">Incomplete</span>
              <p className="mt-1 text-xl font-semibold text-gray-600">{stats.incompletePercent}%</p>
              <p className="text-sm text-gray-500">{stats.incomplete} tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionChart;