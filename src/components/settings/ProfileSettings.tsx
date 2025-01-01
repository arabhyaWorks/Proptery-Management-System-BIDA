import React from 'react';
import { Camera, Mail, Phone, Building2, LogOut, LifeBuoy, CalendarDays } from 'lucide-react';

const userProfile = {
  name: "Rajesh Kumar",
  designation: "Senior Administrator",
  role: "Admin",
  email: "rajesh.kumar@bida.gov.in",
  phone: "+91 9876543210",
  department: "Property Management",
  joinDate: "March 2020"
};

export function ProfileSettings() {
  return (
    <div className="p-6 space-y-8">
      {/* Profile Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-gray-800"
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 shadow-lg transition-transform hover:scale-110">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{userProfile.designation}</p>
            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {userProfile.role}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
            <p className="font-medium text-gray-900 dark:text-white">{userProfile.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
            <p className="font-medium text-gray-900 dark:text-white">{userProfile.phone}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Building2 className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
            <p className="font-medium text-gray-900 dark:text-white">{userProfile.department}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <CalendarDays className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Joined Date</p>
            <p className="font-medium text-gray-900 dark:text-white">{userProfile.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Support and Logout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <LifeBuoy className="h-5 w-5 text-gray-400" />
          <span>Contact Support</span>
        </button>
        <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}