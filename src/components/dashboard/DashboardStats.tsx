import React from 'react';
import { Building2, Users, IndianRupee, AlertCircle, TrendingUp, Clock } from 'lucide-react';

const stats = [
  {
    label: 'Total Schemes',
    value: '15',
    subStats: [
      { label: 'New Schemes', value: '8' },
      { label: 'Old Schemes', value: '7' }
    ],
    icon: Building2,
    color: 'bg-blue-500'
  },
  {
    label: 'Total Plots',
    value: '1,234',
    subStats: [
      { label: 'Rental Plots', value: '456' },
      { label: 'Freehold Plots', value: '778' }
    ],
    icon: Building2,
    color: 'bg-green-500'
  },
  {
    label: 'Pending Payments',
    value: '₹24.5L',
    subStats: [
      { label: 'This Month', value: '₹8.2L' },
      { label: 'Late Payments', value: '₹16.3L' }
    ],
    icon: IndianRupee,
    color: 'bg-yellow-500'
  },
  {
    label: 'Occupancy Rate',
    value: '85%',
    subStats: [
      { label: 'Occupied', value: '1,048' },
      { label: 'Available', value: '186' }
    ],
    icon: Users,
    color: 'bg-purple-500'
  },
  {
    label: 'Revenue Growth',
    value: '+12.5%',
    subStats: [
      { label: 'This Year', value: '₹2.8Cr' },
      { label: 'Last Year', value: '₹2.5Cr' }
    ],
    icon: TrendingUp,
    color: 'bg-indigo-500'
  },
  {
    label: 'Collection Efficiency',
    value: '92%',
    subStats: [
      { label: 'On-time', value: '85%' },
      { label: 'Delayed', value: '15%' }
    ],
    icon: Clock,
    color: 'bg-teal-500'
  }
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-2 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">{stat.label}</h3>
            <div className="space-y-2">
              {stat.subStats.map((subStat, subIndex) => (
                <div key={subIndex} className="flex justify-between text-sm">
                  <span className="text-gray-500">{subStat.label}</span>
                  <span className="font-medium text-gray-700">{subStat.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Details →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}