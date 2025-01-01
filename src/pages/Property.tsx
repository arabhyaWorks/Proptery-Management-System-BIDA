import React from 'react';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from "../components/layout/DashboardLayout";
import TableV3 from "../components/tables/TableV3";
import AddPropertyForm from '../components/forms/AddPropertyForm';

export function Property() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-full">
        <div className="mb-8 flex justify-between items-center">
          <div>
          <h1 className="text-2xl font-bold">Hariyanv Property Details</h1>
          <p className="text-gray-600">
            Manage and view all properties in Hariyanv scheme
          </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Property</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <TableV3 />
        </div>
        
        {showAddForm && <AddPropertyForm onClose={() => setShowAddForm(false)} />}
      </div>
    </DashboardLayout>
  );
}