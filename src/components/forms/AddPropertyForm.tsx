import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FormStep {
  title: string;
  fields: FormField[];
}

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: string[];
}

const formSteps: FormStep[] = [
  {
    title: 'Basic Information',
    fields: [
      // { id: 'serialNumber', label: 'क्रम संख्या', type: 'number' },
      { id: 'schemeName', label: 'योजना का नाम', type: 'text' },
      { id: 'propertyId', label: 'Property Unique ID', type: 'text' },
      { id: 'ownerName', label: 'आवंटी का नाम', type: 'text' },
      { id: 'fatherName', label: 'पिता/पति का नाम', type: 'text' },
      { id: 'permanentAddress', label: 'आवंटी का स्थायी पता', type: 'text' },
      { id: 'currentAddress', label: 'आवंटी का वर्तमान पता', type: 'text' },
      { id: 'mobileNumber', label: 'मोबाइल नंबर', type: 'text' },
    ]
  },
  {
    title: 'Property Details',
    fields: [
      { id: 'category', label: 'आवंटित संपत्ति की श्रेणी', type: 'select', options: ['MIG', 'LIG', 'EWS'] },
      { id: 'propertyNumber', label: 'आवंटित संपत्ति की संख्या', type: 'text' },
      { id: 'registrationAmount', label: 'पंजीकरण धनराशि', type: 'number' },
      { id: 'registrationDate', label: 'पंजीकरण दिनांक', type: 'date' },
      { id: 'allotmentAmount', label: 'आवंटन धनराशि', type: 'number' },
      { id: 'allotmentDate', label: 'आवंटन दिनांक', type: 'date' },
      { id: 'salePrice', label: 'विक्रय मूल्य', type: 'number' },
      { id: 'freeholdAmount', label: 'फ्री होल्ड धनराशि', type: 'number' },
    ]
  },
  {
    title: 'Charges & Payments',
    fields: [
      { id: 'leaseRent', label: 'लीज रेंट की धनराशि', type: 'number' },
      { id: 'parkCharge', label: 'पार्क चार्ज', type: 'number' },
      { id: 'cornerCharge', label: 'कार्नर चार्ज', type: 'number' },
      { id: 'remainingSalePrice', label: 'अवशेष विक्रय मूल्य एकमुश्त जमा धनराशि', type: 'number' },
      { id: 'remainingInstallment', label: 'अवशेष विक्रय मूल किस्त धनराशि', type: 'number' },
      { id: 'interestAmount', label: 'ब्याज धनराशि', type: 'number' },
      { id: 'installmentAmount', label: 'किस्त जमा धनराशि', type: 'number' },
      { id: 'installmentInterest', label: 'किस्त जमा ब्याज धनराशि', type: 'number' },
    ]
  },
  {
    title: 'Additional Details',
    fields: [
      { id: 'area', label: 'क्षेत्रफल (वर्ग मीटर)', type: 'number' },
      { id: 'possessionDate', label: 'कब्जा दिनांक', type: 'date' },
      { id: 'additionalLandAmount', label: 'अतिरिक्त भूमि की धनराशि', type: 'number' },
      { id: 'restorationCharges', label: 'पुनर्जीवित शुल्क', type: 'number' },
      { id: 'certificateCharges', label: 'प्रमाण पत्र शुल्क', type: 'number' },
      { id: 'serviceChargeYear', label: 'सर्विस चार्ज वित्तीय वर्ष', type: 'text' },
      { id: 'serviceChargeAmount', label: 'सर्विस चार्ज धनराशि', type: 'number' },
      { id: 'serviceChargeLateAmount', label: 'सर्विस चार्ज विलंब शुल्क', type: 'number' },
    ]
  }
];

interface AddPropertyFormProps {
  onClose: () => void;
}

export default function AddPropertyForm({ onClose }: AddPropertyFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(formSteps.length - 1, prev + 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    // Add your submission logic here
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Property Record</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Steps indicator */}
          <div className="flex justify-center mb-8">
            {formSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center relative mx-4"
                onClick={() => setCurrentStep(index)}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-200 border-2",
                  currentStep === index 
                    ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500" 
                    : index < currentStep
                    ? "bg-blue-50 text-blue-600 border-blue-600 dark:bg-blue-900/50 dark:text-blue-400 dark:border-blue-400"
                    : "bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-600"
                )}>
                  {index + 1}
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {step.title}
                </div>
                {index < formSteps.length - 1 && (
                  <div className={cn(
                    "w-20 h-0.5 mx-2 mt-4",
                    index < currentStep ? "bg-blue-600 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-700",
                    "transition-all duration-200"
                  )} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="max-h-[60vh] overflow-y-auto px-2 mt-8 custom-scrollbar">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {formSteps[currentStep].fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {field.label}
                      <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                    </label>
                    {field.type === 'select' ? (
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 transition-colors text-sm"
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        value={formData[field.id] || ''}
                      >
                        <option value="" className="dark:bg-gray-800">Select option...</option>
                        {field.options?.map(option => (
                          <option key={option} value={option} className="dark:bg-gray-800">{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 transition-colors text-sm"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
                disabled={currentStep === 0}
              >
                Previous
              </button>
              {currentStep === formSteps.length - 1 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 font-medium transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 font-medium transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}