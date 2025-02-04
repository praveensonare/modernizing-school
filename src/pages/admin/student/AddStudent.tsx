import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface StudentForm {
  personalInfo: {
    fullName: string;
    photo: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    address: string;
  };
  schoolInfo: {
    grade: string;
    schoolId: string;
  };
  transportInfo: {
    pickupAddress: string;
    pickupRouteNumber: string;
    dropoffAddress: string;
    dropoffRouteNumber: string;
  };
  parentInfo: {
    father: {
      fullName: string;
      email: string;
      phone: string;
    };
    mother: {
      fullName: string;
      email: string;
      phone: string;
    };
  };
}

const initialFormState: StudentForm = {
  personalInfo: {
    fullName: '',
    photo: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
  },
  schoolInfo: {
    grade: '',
    schoolId: '',
  },
  transportInfo: {
    pickupAddress: '',
    pickupRouteNumber: '',
    dropoffAddress: '',
    dropoffRouteNumber: '',
  },
  parentInfo: {
    father: {
      fullName: '',
      email: '',
      phone: '',
    },
    mother: {
      fullName: '',
      email: '',
      phone: '',
    },
  },
};

export function AddStudent() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<StudentForm>(initialFormState);
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const cropperRef = useRef<any>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        setShowImageCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          photo: croppedImage,
        },
      });
      setShowImageCropper(false);
      setUploadedImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the student data
    navigate('/admin');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        fullName: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Display Picture
                </label>
                <div className="mt-1">
                  {formData.personalInfo.photo ? (
                    <div className="relative inline-block">
                      <img
                        src={formData.personalInfo.photo}
                        alt="Student"
                        className="w-32 h-32 rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            personalInfo: {
                              ...formData.personalInfo,
                              photo: '',
                            },
                          })
                        }
                        className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-blue-500">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="text-xs text-gray-500">Upload</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        dateOfBirth: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  value={formData.personalInfo.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        gender: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
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
                  value={formData.personalInfo.bloodGroup}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        bloodGroup: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  value={formData.personalInfo.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        address: e.target.value,
                      },
                    })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">School Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <select
                  value={formData.schoolInfo.grade}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schoolInfo: {
                        ...formData.schoolInfo,
                        grade: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
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
                  School ID
                </label>
                <input
                  type="text"
                  value={formData.schoolInfo.schoolId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      schoolInfo: {
                        ...formData.schoolInfo,
                        schoolId: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Transport Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Address
                </label>
                <textarea
                  value={formData.transportInfo.pickupAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transportInfo: {
                        ...formData.transportInfo,
                        pickupAddress: e.target.value,
                      },
                    })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pickup Route Number
                </label>
                <select
                  value={formData.transportInfo.pickupRouteNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transportInfo: {
                        ...formData.transportInfo,
                        pickupRouteNumber: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Route</option>
                  <option value="R101">R101</option>
                  <option value="R102">R102</option>
                  <option value="R103">R103</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Drop-off Address
                </label>
                <textarea
                  value={formData.transportInfo.dropoffAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transportInfo: {
                        ...formData.transportInfo,
                        dropoffAddress: e.target.value,
                      },
                    })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Drop-off Route Number
                </label>
                <select
                  value={formData.transportInfo.dropoffRouteNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transportInfo: {
                        ...formData.transportInfo,
                        dropoffRouteNumber: e.target.value,
                      },
                    })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Route</option>
                  <option value="R101">R101</option>
                  <option value="R102">R102</option>
                  <option value="R103">R103</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Parent Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Father's Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.parentInfo.father.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          parentInfo: {
                            ...formData.parentInfo,
                            father: {
                              ...formData.parentInfo.father,
                              fullName: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
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
                        setFormData({
                          ...formData,
                          parentInfo: {
                            ...formData.parentInfo,
                            father: {
                              ...formData.parentInfo.father,
                              email: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.parentInfo.father.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          parentInfo: {
                            ...formData.parentInfo,
                            father: {
                              ...formData.parentInfo.father,
                              phone: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">Mother's Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.parentInfo.mother.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          parentInfo: {
                            ...formData.parentInfo,
                            mother: {
                              ...formData.parentInfo.mother,
                              fullName: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
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
                        setFormData({
                          ...formData,
                          parentInfo: {
                            ...formData.parentInfo,
                            mother: {
                              ...formData.parentInfo.mother,
                              email: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.parentInfo.mother.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          parentInfo: {
                            ...formData.parentInfo,
                            mother: {
                              ...formData.parentInfo.mother,
                              phone: e.target.value,
                            },
                          },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
                className={`w-20 h-2 rounded-full ${
                  step <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => navigate('/admin')}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStepContent()}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            Back
          </button>
          {currentStep === 4 ? (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>
      </form>

      {showImageCropper && uploadedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Crop Image</h3>
            </div>
            <div className="mb-4">
              <Cropper
                ref={cropperRef}
                src={uploadedImage}
                style={{ height: 400, width: '100%' }}
                aspectRatio={1}
                guides={true}
                viewMode={1}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowImageCropper(false);
                  setUploadedImage(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCropComplete}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}