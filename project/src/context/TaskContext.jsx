import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tasks as initialTasks } from '../data/mockData';
import { useNotifications } from './NotificationContext';



const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};



export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Load initial data
    setTasks(initialTasks);
  }, []);

  const addTask = (task ) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    addNotification({
      type: 'success',
      message: `New task "${task.title}" created`,
    });
  };

  const updateTask = (id , updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    
    if (updatedTask.employeeId) {
      addNotification({
        type: 'info',
        message: `Task reassigned to another employee`,
      });
    }
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    if (taskToDelete) {
      addNotification({
        type: 'warning',
        message: `Task "${taskToDelete.title}" deleted`,
      });
    }
  };

  const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const getTasksByEmployeeId = (employeeId) => {
    return tasks.filter((task) => task.employeeId === employeeId);
  };

  const completeTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setTasks(
        tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
      
      addNotification({
        type: 'success',
        message: task.completed 
          ? `Task "${task.title}" marked as incomplete` 
          : `Task "${task.title}" completed`,
      });
    }
  };

  const getCompletedTasksCount = () => {
    return tasks.filter((task) => task.completed).length;
  };

  const getIncompleteTasksCount = () => {
    return tasks.filter((task) => !task.completed).length;
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.completed === status);
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
        getTasksByEmployeeId,
        completeTask,
        getCompletedTasksCount,
        getIncompleteTasksCount,
        getTasksByStatus,
        getTasksByPriority,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};