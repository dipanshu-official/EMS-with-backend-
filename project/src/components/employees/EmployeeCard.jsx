import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Briefcase } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';



const EmployeeCard = ({ employee }) => {
  const { getTasksByEmployeeId } = useTasks();
  const employeeTasks = getTasksByEmployeeId(employee.id);
  const completedTasks = employeeTasks.filter(task => task.completed).length;
  const totalTasks = employeeTasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transform transition duration-200 hover:shadow-md hover:translate-y-[-2px]">
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="ml-4">
            <Link to={`/employees/${employee.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {employee.name}
            </Link>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Mail size={16} className="mr-2 text-gray-400" />
            <span>{employee.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone size={16} className="mr-2 text-gray-400" />
            <span>{employee.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase size={16} className="mr-2 text-gray-400" />
            <span>Department: {employee.department}</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Task Completion</span>
            <span className="font-medium text-gray-700">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                completionRate >= 75
                  ? 'bg-green-500'
                  : completionRate >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-5 py-3 text-right">
        <Link
          to={`/employees/${employee.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default EmployeeCard;