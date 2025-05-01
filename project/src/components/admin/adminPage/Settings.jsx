import React, { useState } from 'react';

function Settings() {
  const [name, setName] = useState('Dipanshu Kumar');
  const [email, setEmail] = useState('dipanshu@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSave = () => {
    console.log('Saving changes...');
    console.table({ name, email, currentPassword, newPassword, theme });
    alert('Settings saved!');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Profile Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password Change */}
        <div className="border-t pt-6 space-y-4">
          <h2 className="text-lg font-semibold">Change Password</h2>
          <div>
            <label className="block text-sm font-medium">Current Password</label>
            <input
              type="password"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-2">Theme</h2>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-md font-medium ${theme === 'light'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-gray-800 text-white'
              }`}
          >
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
