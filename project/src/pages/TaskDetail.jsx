import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Edit, Trash2, ArrowLeft, Calendar, Clock, User, 
  CheckSquare, AlertCircle 
} from 'lucide-react';
import TaskForm from '../components/tasks/TaskForm';
import { useTasks } from '../context/TaskContext';
import { useEmployees } from '../context/EmployeeContext';
import { useNotifications } from '../context/NotificationContext';
import { formatDistanceToNow } from '../utils/dateUtils';

const TaskDetail= () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask, completeTask } = useTasks();
  const { getEmployeeById } = useEmployees();
  const { addNotification } = useNotifications();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const task = id ? getTaskById(id) : undefined;
  const assignedEmployee = task?.employeeId ? getEmployeeById(task.employeeId) : undefined;

  const handleUpdateTask = (taskData) => {
    if (id) {
      updateTask(id, taskData);
      setShowEditForm(false);
      addNotification({
        type: 'success',
        message: `Task "${taskData.title}" was updated successfully`,
      });
    }
  };

  const handleDeleteTask = () => {
    if (id) {
      deleteTask(id);
      addNotification({
        type: 'warning',
        message: `Task was deleted successfully`,
      });
      navigate('/tasks');
    }
  };

  const handleToggleComplete = () => {
    if (id) {
      completeTask(id);
    }
  };

  const getPriorityBadgeColor = (priority) => {
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

  const isOverdue = () => {
    if (!task?.dueDate || task?.completed) return false;
    return new Date(task.dueDate) < new Date();
  };

  if (!task) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500">Task not found</p>
        <button
          onClick={() => navigate('/tasks')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/tasks')}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Task Details</h1>
      </div>

      {showEditForm ? (
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <TaskForm 
            initialData={task} 
            onSubmit={handleUpdateTask} 
            onCancel={() => setShowEditForm(false)} 
          />
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
                  <span
                    className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 whitespace-pre-line">{task.description}</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="-ml-1 mr-2 h-5 w-5" />
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    Due Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    {task.dueDate ? (
                      <>
                        {new Date(task.dueDate).toLocaleDateString()}
                        {isOverdue() && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle size={12} className="mr-1" />
                            Overdue
                          </span>
                        )}
                      </>
                    ) : (
                      'Not set'
                    )}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    Created
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatDistanceToNow(new Date(task.createdAt))} ago
                    <br />
                    <span className="text-xs text-gray-500">
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <User size={16} className="mr-2 text-gray-400" />
                    Assigned To
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {assignedEmployee ? (
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-medium">
                          {assignedEmployee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="ml-2">{assignedEmployee.name}</span>
                      </div>
                    ) : (
                      'Unassigned'
                    )}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CheckSquare size={16} className="mr-2 text-gray-400" />
                    Status
                  </dt>
                  <dd className="mt-1 text-sm flex items-center">
                    <button
                      onClick={handleToggleComplete}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        task.completed
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                    >
                      <CheckSquare size={16} className="mr-2" />
                      {task.completed ? 'Completed' : 'In Progress'}
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;