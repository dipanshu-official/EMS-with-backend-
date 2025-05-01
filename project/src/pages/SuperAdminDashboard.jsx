import React from 'react'
import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Bell,
    Search,
    ChevronDown,
    BarChart3,
    Package,
    MessageSquare,
    Menu,
    LogOut,
    User,
    MoveLeft,
    Settings2,
} from 'lucide-react';
import Dashboard from '../admin/adminPage/Dashboard';
import Customers from '../admin/adminPage/Customers';
import Orders from '../admin/adminPage/Orders';
import Products from '../admin/adminPage/Products';
import Analytics from '../admin/adminPage/Analytics';
import Messages from '../admin/adminPage/Messages';
import Settings from '../admin/adminPage/Settings';
import { setCurrentPath } from '../../features/navigationSlice';
import { toggleSidebar } from '../../features/navigationSlice';
import Admin from '../admin/adminPage/Admin';




const navigationItems = [
    { icon: LayoutDashboard, name: 'Dashboard', path: '/' },
    { icon: Users, name: 'Admin', path: '/admin' },

    { icon: Users, name: 'Employees', path: '/employees' },
    { icon: ShoppingCart, name: 'Orders', path: '/orders' },
    { icon: Package, name: 'Products', path: '/products' },
    { icon: BarChart3, name: 'Analytics', path: '/analytics' },
    { icon: MessageSquare, name: 'Messages', path: '/messages' },
    { icon: Settings2, name: 'Settings', path: '/settings' },

];

const SuperAdminDashboard = ({ data, newUserData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { sidebarOpen } = useSelector((state) => state.navigation);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Alex Morrison',
        email: 'alex.morrison@example.com',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    });

    const handleNavigation = (path) => {
        dispatch(setCurrentPath(path));
        navigate(path);
    };
    const logOut = () => {
        //   localStorage.setItem("loggedInUserData",'')
        localStorage.setItem("loggedInUser", '')
        newUserData('')

        //window.location.reload() ,   {/*page reload*/}

    }

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setProfileData({
            ...profileData,
            name: formData.get('name'),
            email: formData.get('email'),
        });
        setEditProfileOpen(false);
    }
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className={`bg-[#1E293B] text-white w-64 flex-shrink-0 transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
                <div className="p-6 flex justify-between items-center border-b border-white/10">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                    <button onClick={() => dispatch(toggleSidebar())} className="lg:hidden text-white hover:text-gray-200">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
                <nav className="mt-6">
                    {navigationItems.map((item) => (
                        <div
                            key={item.name}
                            href={item.path}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(item.path);
                            }}
                            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-[#2D3B4E] hover:text-white transition-colors ${location.pathname === item.path ? 'bg-[#2D3B4E] text-white' : ''
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="ml-3">{item.name}</span>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <button onClick={() => dispatch(toggleSidebar())} className="mr-4 text-gray-600 hover:text-gray-900">
                                <Menu className="h-6 w-6" />
                            </button>
                            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
                                <Search className="h-5 w-5 text-gray-400" />
                                <input type="text" placeholder="Search..." className="ml-2 bg-transparent border-none focus:outline-none w-full" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full relative">
                                <Bell className="h-5 w-5 text-gray-600" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="relative">
                                <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)} className="flex items-center space-x-3 focus:outline-none">
                                    <img src={profileData.image} alt="Profile" className="h-10 w-10 rounded-full border-2 border-[#1E293B]" />
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-semibold text-gray-700">{profileData.name}</p>
                                        <p className="text-xs text-gray-500">{profileData.email}</p>
                                    </div>
                                    <ChevronDown className="h-4 w-4 text-gray-500" />
                                </button>

                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                                        <button
                                            onClick={() => {
                                                setEditProfileOpen(true);
                                                setProfileDropdownOpen(false);
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <User className="h-4 w-4 mr-2" />
                                            Edit Profile
                                        </button>
                                        <button onClick={logOut} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <LogOut className="h-4 w-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Edit Profile Modal */}
                {editProfileOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                                    <div className="flex items-center space-x-4">
                                        <img src={profileData.image} alt="Profile" className="h-16 w-16 rounded-full" />
                                        <button type="button" className="px-3 py-1 text-sm text-[#1E293B] border border-[#1E293B] rounded hover:bg-[#1E293B] hover:text-white transition-colors">
                                            Change
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" id="name" name="name" defaultValue={profileData.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E293B]" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" id="email" name="email" defaultValue={profileData.email} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E293B]" />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button type="button" onClick={() => setEditProfileOpen(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-[#1E293B] text-white rounded-lg hover:bg-[#2D3B4E] transition-colors">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/employees" element={<Customers />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default SuperAdminDashboard