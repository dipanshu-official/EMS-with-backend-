import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckSquare, AlertCircle } from 'lucide-react';
import { useEmployees } from '../../context/EmployeeContext';
import { useTasks } from '../../context/TaskContext';



const TaskCard = ({ task }) => {
  const { getEmployeeById } = useEmployees();
  const { completeTask } = useTasks();
  const assignedTo = task.employeeId ? getEmployeeById(task.employeeId) : null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleComplete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    completeTask(task.id);
  };

  const isOverdue = () => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm overflow-hidden transform transition duration-200 hover:shadow-md hover:translate-y-[-2px] ${
        task.completed ? 'border-l-4 border-green-400' : isOverdue() ? 'border-l-4 border-red-400' : ''
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
              <Link to={`/tasks/${task.id}`} className="hover:text-blue-600">
                {task.title}
              </Link>
            </h3>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                task.priority
              )} mt-1`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
          <button
            onClick={handleToggleComplete}
            className={`flex-shrink-0 p-1 rounded-full ${
              task.completed
                ? 'text-green-600 bg-green-100 hover:bg-green-200'
                : 'text-gray-400 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <CheckSquare size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>

        <div className="flex flex-wrap gap-y-2">
          {task.dueDate && (
            <div className="flex items-center mr-4 text-sm text-gray-600">
              <Calendar size={16} className="mr-1 text-gray-400" />
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              {isOverdue() && <AlertCircle size={16} className="ml-1 text-red-500" />}
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-1 text-gray-400" />
            <span>Created {formatDistanceToNow(new Date(task.createdAt))} ago</span>
          </div>
        </div>

        {assignedTo && (
          <div className="mt-4 flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                {assignedTo.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{assignedTo.name}</p>
              <p className="text-xs text-gray-500">{assignedTo.position}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-5 py-3 text-right">
        <Link
          to={`/tasks/${task.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;