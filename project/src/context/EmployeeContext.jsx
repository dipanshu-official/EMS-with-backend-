import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { employees as initialEmployees } from '../data/mockData';



const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};



export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState ([]);

  useEffect(() => {
    // Load initial data
    setEmployees(initialEmployees);
  }, []);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: crypto.randomUUID(),
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const getEmployeeById = (id) => {
    return employees.find((employee) => employee.id === id);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeById,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};