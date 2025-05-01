import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserCog, Trash2, Calendar, Mail, Phone, Briefcase, ArrowLeft, ClipboardList } from 'lucide-react';
import TaskCard from '../components/tasks/TaskCard';
import EmployeeForm from '../components/employees/EmployeeForm';
import { useEmployees } from '../context/EmployeeContext';
import { useTasks } from '../context/TaskContext';
import { useNotifications } from '../context/NotificationContext';

const EmployeeDetail= () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmployeeById, updateEmployee, deleteEmployee } = useEmployees();
  const { getTasksByEmployeeId, tasks } = useTasks();
  const { addNotification } = useNotifications();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const employee = id ? getEmployeeById(id) : undefined;
  const employeeTasks = id ? getTasksByEmployeeId(id) : [];

  const handleUpdateEmployee = (employeeData) => {
    if (id) {
      updateEmployee(id, employeeData);
      setShowEditForm(false);
      addNotification({
        type: 'success',
        message: `Employee ${employeeData.name} was updated successfully`,
      });
    }
  };

  const handleDeleteEmployee = () => {
    if (id) {
      deleteEmployee(id);
      addNotification({
        type: 'warning',
        message: `Employee was deleted successfully`,
      });
      navigate('/employees');
    }
  };

  if (!employee) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500">Employee not found</p>
        <button
          onClick={() => navigate('/employees')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employees
        </button>
      </div>
    );
  }

  // Calculate statistics
  const totalTasks = employeeTasks.length;
  const completedTasks = employeeTasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/employees')}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Employee Details</h1>
      </div>

      {showEditForm ? (
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <EmployeeForm 
            initialData={employee} 
            onSubmit={handleUpdateEmployee} 
            onCancel={() => setShowEditForm(false)} 
          />
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center">
                <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
                  <p className="text-sm text-gray-500">{employee.position}</p>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-0 flex space-x-3">
                <button
                  onClick={() => setShowEditForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <UserCog className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
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
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    Phone
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.phone}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Briefcase size={16} className="mr-2 text-gray-400" />
                    Department
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{employee.department}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    Hire Date
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <ClipboardList size={16} className="mr-2 text-gray-400" />
                    Tasks
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {completedTasks} completed of {totalTasks} total
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6">
              <div className="relative pt-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      Task Completion Rate
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {completionRate}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 mt-1">
                  <div
                    style={{ width: `${completionRate}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete {employee.name}? This action cannot be undone and will remove all associated data.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEmployee}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-lg font-medium text-gray-900 mt-8 mb-4">
        Assigned Tasks ({employeeTasks.length})
      </h2>

      {employeeTasks.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">No tasks assigned to this employee yet</p>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
          {employeeTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;