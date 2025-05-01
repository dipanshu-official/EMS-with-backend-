import React from 'react';
import { Users, CheckSquare, UserCheck, AlertTriangle } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import TaskCompletionChart from '../components/dashboard/TaskCompletionChart';
import PriorityDistributionChart from '../components/dashboard/PriorityDistributionChart';
import { useEmployees } from '../context/EmployeeContext';
import { useTasks } from '../context/TaskContext';

const Dashboard = () => {
  const { employees } = useEmployees();
  const { 
    tasks, 
    getCompletedTasksCount,
    getIncompleteTasksCount,
    getTasksByPriority
  } = useTasks();

  const completedTasks = getCompletedTasksCount();
  const incompleteTasks = getIncompleteTasksCount();
  const highPriorityTasks = getTasksByPriority('high').length;
  
  // Calculate employees with no tasks
  const employeesWithNoTasks = employees.filter(
    employee => !tasks.some(task => task.employeeId === employee.id)
  ).length;
  
  // Calculate completion rate
  const completionRate = tasks.length > 0
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700 sm:mt-0">
          A overview of your employee and task management
        </p>
      </div>

      {/* Stats Overview */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={employees.length}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Tasks"
          value={tasks.length}
          icon={CheckSquare}
          color="teal"
        />
        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="High Priority Tasks"
          value={highPriorityTasks}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TaskCompletionChart />
        <PriorityDistributionChart />
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-2 bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {tasks
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)
              .map((task) => (
                <li key={task.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckSquare 
                          className={`h-5 w-5 ${task.completed ? 'text-green-500' : 'text-gray-400'}`} 
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <div className="flex text-xs text-gray-500">
                          <span>
                            {task.employeeId 
                              ? `Assigned to ${employees.find(e => e.id === task.employeeId)?.name || 'Unknown'}`
                              : 'Unassigned'
                            }
                          </span>
                          <span className="mx-1">•</span>
                          <span>{task.priority} priority</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          task.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;