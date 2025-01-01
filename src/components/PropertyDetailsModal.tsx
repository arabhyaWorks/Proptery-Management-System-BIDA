import React from 'react';
import { X } from 'lucide-react';

interface PropertyDetailsModalProps {
  property: any;
  onClose: () => void;
}

export function PropertyDetailsModal({ property, onClose }: PropertyDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Property Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Scheme Name</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.schemeName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Property ID</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.uniqueId}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Owner Name</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.ownerName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Father's Name</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.fatherName}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Category</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.category}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Plot Number</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.plotNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Registration Amount</label>
                <p className="text-gray-900 dark:text-white font-medium">₹{property.registrationAmount}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Registration Date</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.registrationDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Permanent Address</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.permanentAddress}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400">Current Address</label>
                <p className="text-gray-900 dark:text-white font-medium">{property.currentAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}