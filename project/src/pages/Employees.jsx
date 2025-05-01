import React, { useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import EmployeeCard from '../components/employees/EmployeeCard';
import EmployeeForm from '../components/employees/EmployeeForm';
import { useEmployees } from '../context/EmployeeContext';
import { useNotifications } from '../context/NotificationContext';

const Employees= () => {
  const { employees, addEmployee } = useEmployees();
  const { addNotification } = useNotifications();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const handleAddEmployee = (employeeData) => {
    addEmployee(employeeData);
    setShowAddForm(false);
    addNotification({
      type: 'success',
      message: `Employee ${employeeData.name} was added successfully`,
    });
  };

  // Get unique departments for filter
  const departments = Array.from(new Set(employees.map(e => e.department)));

  // Filter employees based on search and department filter
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter ? employee.department === departmentFilter : true;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0"
        >
          <UserPlus className="-ml-1 mr-2 h-5 w-5" />
          Add Employee
        </button>
      </div>

      {showAddForm && (
        <div className="mt-6">
          <EmployeeForm onSubmit={handleAddEmployee} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="mt-6 bg-white shadow rounded-lg p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative mt-1 rounded-md shadow-sm max-w-xs w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          {/* Department Filter */}
          <div className="mt-3 sm:mt-0">
            <select
              id="departmentFilter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">All Departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="mt-6 text-center py-12 bg-white shadow rounded-lg">
          <p className="text-gray-500">No employees found matching your criteria</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Employees;