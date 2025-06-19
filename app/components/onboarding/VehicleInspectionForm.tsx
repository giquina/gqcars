'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Camera, 
  CheckCircle, 
  AlertTriangle,
  Upload,
  X,
  Eye,
  Shield,
  Fuel,
  Settings,
  FileText
} from 'lucide-react';

interface VehicleInspectionFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

interface VehicleDetails {
  make: string;
  model: string;
  year: string;
  registration: string;
  color: string;
  engineSize: string;
  fuelType: string;
  transmission: string;
  mileage: string;
  motExpiry: string;
  insuranceExpiry: string;
  roadTaxExpiry: string;
}

interface InspectionItem {
  id: string;
  category: string;
  name: string;
  description: string;
  required: boolean;
  checked: boolean;
  notes?: string;
}

interface VehiclePhoto {
  id: string;
  type: string;
  name: string;
  file: File;
  preview: string;
}

export default function VehicleInspectionForm({ onComplete, initialData }: VehicleInspectionFormProps) {
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>(
    initialData?.vehicleDetails || {
      make: '',
      model: '',
      year: '',
      registration: '',
      color: '',
      engineSize: '',
      fuelType: '',
      transmission: '',
      mileage: '',
      motExpiry: '',
      insuranceExpiry: '',
      roadTaxExpiry: ''
    }
  );

  const [inspectionItems, setInspectionItems] = useState<InspectionItem[]>([
    // Exterior Inspection
    {
      id: 'ext_bodywork',
      category: 'Exterior',
      name: 'Bodywork Condition',
      description: 'Check for dents, scratches, rust, or damage',
      required: true,
      checked: false
    },
    {
      id: 'ext_lights',
      category: 'Exterior',
      name: 'All Lights Working',
      description: 'Headlights, taillights, indicators, brake lights',
      required: true,
      checked: false
    },
    {
      id: 'ext_windows',
      category: 'Exterior',
      name: 'Windows & Mirrors',
      description: 'Clean, crack-free windows and functioning mirrors',
      required: true,
      checked: false
    },
    {
      id: 'ext_tyres',
      category: 'Exterior',
      name: 'Tyre Condition',
      description: 'Legal tread depth (minimum 1.6mm), no damage',
      required: true,
      checked: false
    },
    {
      id: 'ext_plates',
      category: 'Exterior',
      name: 'Number Plates',
      description: 'Clean, readable, and securely attached',
      required: true,
      checked: false
    },

    // Interior Inspection
    {
      id: 'int_seats',
      category: 'Interior',
      name: 'Seat Condition',
      description: 'Clean, undamaged seats with working seatbelts',
      required: true,
      checked: false
    },
    {
      id: 'int_controls',
      category: 'Interior',
      name: 'Controls & Dashboard',
      description: 'All controls functioning, dashboard warning lights',
      required: true,
      checked: false
    },
    {
      id: 'int_cleanliness',
      category: 'Interior',
      name: 'Overall Cleanliness',
      description: 'Interior is clean and well-maintained',
      required: true,
      checked: false
    },
    {
      id: 'int_aircon',
      category: 'Interior',
      name: 'Air Conditioning',
      description: 'Heating and cooling systems working',
      required: false,
      checked: false
    },

    // Safety & Documents
    {
      id: 'safe_seatbelts',
      category: 'Safety',
      name: 'Seatbelts',
      description: 'All seatbelts present and functioning',
      required: true,
      checked: false
    },
    {
      id: 'safe_handbrake',
      category: 'Safety',
      name: 'Handbrake',
      description: 'Handbrake holds vehicle securely',
      required: true,
      checked: false
    },
    {
      id: 'safe_brakes',
      category: 'Safety',
      name: 'Brake Performance',
      description: 'Brakes respond properly without pulling',
      required: true,
      checked: false
    },
    {
      id: 'safe_steering',
      category: 'Safety',
      name: 'Steering',
      description: 'Steering wheel turns smoothly without play',
      required: true,
      checked: false
    }
  ]);

  const [vehiclePhotos, setVehiclePhotos] = useState<VehiclePhoto[]>([]);
  const [errors, setErrors] = useState<any>({});

  const requiredPhotos = [
    { type: 'front', name: 'Front View', required: true },
    { type: 'rear', name: 'Rear View', required: true },
    { type: 'left', name: 'Left Side', required: true },
    { type: 'right', name: 'Right Side', required: true },
    { type: 'interior', name: 'Interior', required: true },
    { type: 'dashboard', name: 'Dashboard', required: true },
    { type: 'mileage', name: 'Mileage Display', required: true }
  ];

  const handleVehicleDetailsChange = (field: keyof VehicleDetails, value: string) => {
    setVehicleDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleInspectionItemChange = (itemId: string, checked: boolean, notes?: string) => {
    setInspectionItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, checked, notes } : item
    ));
  };

  const handlePhotoUpload = (photoType: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      const newPhoto: VehiclePhoto = {
        id: `${photoType}_${Date.now()}`,
        type: photoType,
        name: file.name,
        file,
        preview
      };

      setVehiclePhotos(prev => [
        ...prev.filter(photo => photo.type !== photoType),
        newPhoto
      ]);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (photoId: string) => {
    setVehiclePhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    // Validate vehicle details
    if (!vehicleDetails.make) newErrors.make = 'Vehicle make is required';
    if (!vehicleDetails.model) newErrors.model = 'Vehicle model is required';
    if (!vehicleDetails.year) newErrors.year = 'Year is required';
    if (!vehicleDetails.registration) newErrors.registration = 'Registration is required';
    if (!vehicleDetails.motExpiry) newErrors.motExpiry = 'MOT expiry date is required';
    if (!vehicleDetails.insuranceExpiry) newErrors.insuranceExpiry = 'Insurance expiry date is required';

    // Validate inspection items
    const requiredItems = inspectionItems.filter(item => item.required);
    const uncheckedRequired = requiredItems.filter(item => !item.checked);
    if (uncheckedRequired.length > 0) {
      newErrors.inspection = `${uncheckedRequired.length} required inspection items not completed`;
    }

    // Validate photos
    const requiredPhotoTypes = requiredPhotos.filter(photo => photo.required).map(photo => photo.type);
    const uploadedPhotoTypes = vehiclePhotos.map(photo => photo.type);
    const missingPhotos = requiredPhotoTypes.filter(type => !uploadedPhotoTypes.includes(type));
    if (missingPhotos.length > 0) {
      newErrors.photos = `Missing required photos: ${missingPhotos.join(', ')}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete({
        vehicleDetails,
        inspectionItems,
        vehiclePhotos: vehiclePhotos.map(photo => ({
          ...photo,
          file: null // Don't pass the actual file object
        })),
        completedAt: new Date().toISOString()
      });
    }
  };

  const getInspectionProgress = () => {
    const total = inspectionItems.length;
    const completed = inspectionItems.filter(item => item.checked).length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  const getPhotoProgress = () => {
    const total = requiredPhotos.filter(photo => photo.required).length;
    const completed = vehiclePhotos.length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  const inspectionProgress = getInspectionProgress();
  const photoProgress = getPhotoProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-yellow-500" />
            Inspection Progress
          </h3>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Checklist Items</span>
              <span className="text-white">{inspectionProgress.completed}/{inspectionProgress.total}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${inspectionProgress.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <Camera className="w-5 h-5 mr-2 text-yellow-500" />
            Photo Progress
          </h3>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Required Photos</span>
              <span className="text-white">{photoProgress.completed}/{photoProgress.total}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${photoProgress.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <Car className="w-5 h-5 mr-2 text-yellow-500" />
          Vehicle Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Make *</label>
            <input
              type="text"
              value={vehicleDetails.make}
              onChange={(e) => handleVehicleDetailsChange('make', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.make ? 'border-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="BMW, Mercedes, etc."
            />
            {errors.make && <p className="text-red-400 text-xs mt-1">{errors.make}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Model *</label>
            <input
              type="text"
              value={vehicleDetails.model}
              onChange={(e) => handleVehicleDetailsChange('model', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.model ? 'border-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="5 Series, E-Class, etc."
            />
            {errors.model && <p className="text-red-400 text-xs mt-1">{errors.model}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Year *</label>
            <input
              type="number"
              value={vehicleDetails.year}
              onChange={(e) => handleVehicleDetailsChange('year', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.year ? 'border-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="2020"
              min="2010"
              max={new Date().getFullYear()}
            />
            {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Registration *</label>
            <input
              type="text"
              value={vehicleDetails.registration}
              onChange={(e) => handleVehicleDetailsChange('registration', e.target.value.toUpperCase())}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.registration ? 'border-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="AB12 CDE"
            />
            {errors.registration && <p className="text-red-400 text-xs mt-1">{errors.registration}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Color</label>
            <input
              type="text"
              value={vehicleDetails.color}
              onChange={(e) => handleVehicleDetailsChange('color', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Black, Silver, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Fuel Type</label>
            <select
              value={vehicleDetails.fuelType}
              onChange={(e) => handleVehicleDetailsChange('fuelType', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select fuel type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">MOT Expiry *</label>
            <input
              type="date"
              value={vehicleDetails.motExpiry}
              onChange={(e) => handleVehicleDetailsChange('motExpiry', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.motExpiry ? 'border-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.motExpiry && <p className="text-red-400 text-xs mt-1">{errors.motExpiry}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Insurance Expiry *</label>
            <input
              type="date"
              value={vehicleDetails.insuranceExpiry}
              onChange={(e) => handleVehicleDetailsChange('insuranceExpiry', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.insuranceExpiry ? 'border-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.insuranceExpiry && <p className="text-red-400 text-xs mt-1">{errors.insuranceExpiry}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Current Mileage</label>
            <input
              type="number"
              value={vehicleDetails.mileage}
              onChange={(e) => handleVehicleDetailsChange('mileage', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="50000"
            />
          </div>
        </div>
      </div>

      {/* Vehicle Inspection Checklist */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-yellow-500" />
          Vehicle Inspection Checklist
        </h3>

        {['Exterior', 'Interior', 'Safety'].map(category => (
          <div key={category} className="mb-8">
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wide">
              {category}
            </h4>
            <div className="space-y-4">
              {inspectionItems
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.checked}
                      onChange={(e) => handleInspectionItemChange(item.id, e.target.checked)}
                      className="mt-1 w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-500"
                    />
                    <div className="flex-1">
                      <label htmlFor={item.id} className="text-white font-medium cursor-pointer">
                        {item.name}
                        {item.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                      <textarea
                        placeholder="Add notes (optional)"
                        value={item.notes || ''}
                        onChange={(e) => handleInspectionItemChange(item.id, item.checked, e.target.value)}
                        className="mt-2 w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {errors.inspection && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">{errors.inspection}</span>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Photos */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <Camera className="w-5 h-5 mr-2 text-yellow-500" />
          Vehicle Photos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requiredPhotos.map(photoReq => {
            const uploadedPhoto = vehiclePhotos.find(photo => photo.type === photoReq.type);
            
            return (
              <div key={photoReq.type} className="border border-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">
                  {photoReq.name}
                  {photoReq.required && <span className="text-red-400 ml-1">*</span>}
                </h4>
                
                {!uploadedPhoto ? (
                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handlePhotoUpload(photoReq.type, file);
                      }}
                    />
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">Click to upload photo</p>
                    </div>
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={uploadedPhoto.preview}
                      alt={photoReq.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(uploadedPhoto.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {errors.photos && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">{errors.photos}</span>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
      >
        Continue to Background Check
      </button>
    </motion.div>
  );
}