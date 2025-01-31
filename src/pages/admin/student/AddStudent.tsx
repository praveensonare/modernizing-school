import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface StudentForm {
  personalInfo: {
    name: string;
    photo: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    address: string;
  };
  academicInfo: {
    grade: string;
    section: string;
    rollNumber: string;
    previousSchool: string;
  };
  parentInfo: {
    father: {
      name: string;
      occupation: string;
      phone: string;
      email: string;
    };
    mother: {
      name: string;
      occupation: string;
      phone: string;
      email: string;
    };
  };
  medicalInfo: {
    conditions: string[];
    allergies: string[];
    medications: string[];
  };
}

const initialFormState: StudentForm = {
  personalInfo: {
    name: '',
    photo: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
  },
  academicInfo: {
    grade: '',
    section: '',
    rollNumber: '',
    previousSchool: '',
  },
  parentInfo: {
    father: {
      name: '',
      occupation: '',
      phone: '',
      email: '',
    },
    mother: {
      name: '',
      occupation: '',
      phone: '',
      email: '',
    },
  },
  medicalInfo: {
    conditions: [],
    allergies: [],
    medications: [],
  },
};

export function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StudentForm>(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);
  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newMedication, setNewMedication] = useState('');

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAcademicInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      academicInfo: {
        ...formData.academicInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleParentInfoChange = (
    parent: 'father' | 'mother',
    field: string,
    value: string
  ) => {
    setFormData({
      ...formData,
      parentInfo: {
        ...formData.parentInfo,
        [parent]: {
          ...formData.parentInfo[parent],
          [field]: value,
        },
      },
    });
  };

  const handleAddMedicalItem = (
    type: 'conditions' | 'allergies' | 'medications',
    value: string
  ) => {
    if (value && !formData.medicalInfo[type].includes(value)) {
      setFormData({
        ...formData,
        medicalInfo: {
          ...formData.medicalInfo,
          [type]: [...formData.medicalInfo[type], value],
        },
      });
    }
  };

  const handleRemoveMedicalItem = (
    type: 'conditions' | 'allergies' | 'medications',
    item: string
  ) => {
    setFormData({
      ...formData,
      medicalInfo: {
        ...formData.medicalInfo,
        [type]: formData.medicalInfo[type].filter((i) => i !== item),
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the student
    navigate('/admin/student');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Add New Student</h1>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-24 h-2 rounded-full ${
                  step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => navigate('/admin/student')}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={formData.personalInfo.photo}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.personalInfo.gender}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.personalInfo.bloodGroup}
                  onChange={handlePersonalInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option> <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Academic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <select
                  name="grade"
                  value={formData.academicInfo.grade}
                  onChange={handleAcademicInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Grade</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Section
                </label>
                <select
                  name="section"
                  value={formData.academicInfo.section}
                  onChange={handleAcademicInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.academicInfo.rollNumber}
                  onChange={handleAcademicInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Previous School
                </label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.academicInfo.previousSchool}
                  onChange={handleAcademicInfoChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Parent Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Father's Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.parentInfo.father.name}
                      onChange={(e) =>
                        handleParentInfoChange('father', 'name', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.parentInfo.father.occupation}
                      onChange={(e) =>
                        handleParentInfoChange(
                          'father',
                          'occupation',
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.parentInfo.father.phone}
                      onChange={(e) =>
                        handleParentInfoChange('father', 'phone', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.parentInfo.father.email}
                      onChange={(e) =>
                        handleParentInfoChange('father', 'email', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">Mother's Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.parentInfo.mother.name}
                      onChange={(e) =>
                        handleParentInfoChange('mother', 'name', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Occupation
                    </label>
                    <input
                      type="text"
                      value={formData.parentInfo.mother.occupation}
                      onChange={(e) =>
                        handleParentInfoChange(
                          'mother',
                          'occupation',
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.parentInfo.mother.phone}
                      onChange={(e) =>
                        handleParentInfoChange('mother', 'phone', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.parentInfo.mother.email}
                      onChange={(e) =>
                        handleParentInfoChange('mother', 'email', e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Medical Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Conditions
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Add condition"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAddMedicalItem('conditions', newCondition);
                      setNewCondition('');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.medicalInfo.conditions.map((condition) => (
                    <span
                      key={condition}
                      className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {condition}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveMedicalItem('conditions', condition)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add allergy"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAddMedicalItem('allergies', newAllergy);
                      setNewAllergy('');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.medicalInfo.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveMedicalItem('allergies', allergy)
                        }
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Medications
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Add medication"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAddMedicalItem('medications', newMedication);
                      setNewMedication('');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.medicalInfo.medications.map((medication) => (
                    <span
                      key={medication}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {medication}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveMedicalItem('medications', medication)
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Previous
          </button>
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}