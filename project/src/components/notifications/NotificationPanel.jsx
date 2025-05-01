import React from 'react';
import { X } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';

const NotificationItem = ({
  notification,
  onRemove,
}) => {
  // Determine background color based on notification type
  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-400';
      case 'error':
        return 'bg-red-50 border-red-400';
      case 'warning':
        return 'bg-yellow-50 border-yellow-400';
      case 'info':
        return 'bg-blue-50 border-blue-400';
      default:
        return 'bg-gray-50 border-gray-400';
    }
  };

  // Determine text color based on notification type
  const getTextColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className={`mb-2 p-3 rounded-md border ${getBgColor(notification.type)}`}>
      <div className="flex justify-between">
        <p className={`text-sm ${getTextColor(notification.type)}`}>{notification.message}</p>
        <button
          onClick={onRemove}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const NotificationPanel = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <div className="p-3 border-b">
        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto p-2">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500 text-sm py-4">No new notifications</p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRemove={() => removeNotification(notification.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;