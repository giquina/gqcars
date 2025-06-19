'use client'

import { useEffect, useState } from 'react'
import { 
  Car, 
  Shield, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  FileText,
  Wrench,
  MapPin,
  Users
} from 'lucide-react'
import { AdminStore, Driver } from '@/lib/stores/adminStore'

interface Vehicle {
  id: string
  registration: string
  make: string
  model: string
  year: number
  status: 'active' | 'maintenance' | 'offline'
  mileage: number
  lastService: Date
  nextService: Date
  insurance: {
    provider: string
    policyNumber: string
    expiry: Date
    status: 'valid' | 'expiring' | 'expired'
  }
  mot: {
    expiry: Date
    status: 'valid' | 'expiring' | 'expired'
  }
  assignedDriver?: string
  location: { lat: number; lng: number }
}

interface ComplianceItem {
  id: string
  type: 'SIA' | 'TFL' | 'Insurance' | 'MOT' | 'Service'
  entity: string
  description: string
  expiry: Date
  status: 'valid' | 'expiring' | 'expired'
  daysUntilExpiry: number
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600'
      case 'expiring': return 'text-yellow-600'
      case 'expired': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Car className="h-6 w-6 text-gray-600" />
          <div>
            <h3 className="font-medium text-gray-900">{vehicle.registration}</h3>
            <p className="text-sm text-gray-600">{vehicle.make} {vehicle.model} ({vehicle.year})</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(vehicle.status)}`}>
          {vehicle.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-600">Mileage</div>
          <div className="font-medium">{vehicle.mileage.toLocaleString()} miles</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Next Service</div>
          <div className="font-medium">{vehicle.nextService.toLocaleDateString()}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Insurance</span>
          <span className={`text-sm font-medium ${getComplianceColor(vehicle.insurance.status)}`}>
            {vehicle.insurance.status}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">MOT</span>
          <span className={`text-sm font-medium ${getComplianceColor(vehicle.mot.status)}`}>
            {vehicle.mot.status}
          </span>
        </div>
      </div>

      {vehicle.assignedDriver && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Assigned: {vehicle.assignedDriver}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function ComplianceAlert({ item }: { item: ComplianceItem }) {
  const getAlertColor = () => {
    if (item.status === 'expired') return 'bg-red-50 border-red-200'
    if (item.status === 'expiring') return 'bg-yellow-50 border-yellow-200'
    return 'bg-green-50 border-green-200'
  }

  const getIconColor = () => {
    if (item.status === 'expired') return 'text-red-500'
    if (item.status === 'expiring') return 'text-yellow-500'
    return 'text-green-500'
  }

  const getIcon = () => {
    if (item.status === 'expired') return <AlertTriangle className={`h-4 w-4 ${getIconColor()}`} />
    if (item.status === 'expiring') return <Clock className={`h-4 w-4 ${getIconColor()}`} />
    return <CheckCircle className={`h-4 w-4 ${getIconColor()}`} />
  }

  return (
    <div className={`p-4 rounded-lg border ${getAlertColor()}`}>
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{item.description}</h4>
          <p className="text-sm text-gray-600">{item.entity}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              Expires: {item.expiry.toLocaleDateString()}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${
              item.status === 'expired' ? 'bg-red-100 text-red-800' :
              item.status === 'expiring' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {item.daysUntilExpiry > 0 ? `${item.daysUntilExpiry} days` : 'Expired'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FleetManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [vehicles] = useState<Vehicle[]>([
    {
      id: 'VEH-001',
      registration: 'GQ24 ABC',
      make: 'Mercedes-Benz',
      model: 'E-Class',
      year: 2024,
      status: 'active',
      mileage: 12547,
      lastService: new Date('2024-08-15'),
      nextService: new Date('2024-12-15'),
      insurance: {
        provider: 'Zurich Insurance',
        policyNumber: 'ZUR123456',
        expiry: new Date('2025-03-15'),
        status: 'valid'
      },
      mot: {
        expiry: new Date('2025-09-20'),
        status: 'valid'
      },
      assignedDriver: 'Michael Johnson',
      location: { lat: 51.6624, lng: -0.3966 }
    },
    {
      id: 'VEH-002',
      registration: 'GQ24 DEF',
      make: 'BMW',
      model: '5 Series',
      year: 2023,
      status: 'maintenance',
      mileage: 24891,
      lastService: new Date('2024-10-01'),
      nextService: new Date('2024-11-25'),
      insurance: {
        provider: 'AXA Insurance',
        policyNumber: 'AXA789012',
        expiry: new Date('2024-12-01'),
        status: 'expiring'
      },
      mot: {
        expiry: new Date('2025-07-14'),
        status: 'valid'
      },
      location: { lat: 51.5074, lng: -0.1278 }
    }
  ])

  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: 'COMP-001',
      type: 'SIA',
      entity: 'David Smith',
      description: 'SIA License Renewal Required',
      expiry: new Date('2024-12-30'),
      status: 'expiring',
      daysUntilExpiry: 30
    },
    {
      id: 'COMP-002',
      type: 'Insurance',
      entity: 'GQ24 DEF',
      description: 'Vehicle Insurance Renewal',
      expiry: new Date('2024-12-01'),
      status: 'expiring',
      daysUntilExpiry: 15
    },
    {
      id: 'COMP-003',
      type: 'TFL',
      entity: 'Fleet TFL License',
      description: 'TFL Operator License Review',
      expiry: new Date('2025-06-15'),
      status: 'valid',
      daysUntilExpiry: 180
    }
  ])

  useEffect(() => {
    const unsubscribe = AdminStore.subscribe(
      state => state.drivers,
      (newDrivers) => setDrivers(newDrivers)
    )

    setDrivers(AdminStore.getState().drivers)
    return unsubscribe
  }, [])

  const activeVehicles = vehicles.filter(v => v.status === 'active')
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance')
  const criticalCompliance = complianceItems.filter(c => c.status === 'expired' || c.daysUntilExpiry <= 30)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Fleet & Compliance Management</h1>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <Calendar className="h-4 w-4 inline mr-2" />
            Schedule Maintenance
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            <FileText className="h-4 w-4 inline mr-2" />
            Compliance Report
          </button>
        </div>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
            <Car className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Fleet</p>
              <p className="text-2xl font-bold text-green-600">{activeVehicles.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Maintenance</p>
              <p className="text-2xl font-bold text-yellow-600">{maintenanceVehicles.length}</p>
            </div>
            <Wrench className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Issues</p>
              <p className="text-2xl font-bold text-red-600">{criticalCompliance.length}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Critical Compliance Alerts */}
      {criticalCompliance.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            Critical Compliance Alerts
          </h3>
          <div className="space-y-3">
            {criticalCompliance.map((item) => (
              <ComplianceAlert key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {/* SIA License Monitoring */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Shield className="h-5 w-5 text-blue-500 mr-2" />
          SIA License Monitoring
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {drivers.filter(d => d.siaLicense?.status === 'valid').length}
            </div>
            <div className="text-sm text-green-800">Valid Licenses</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {drivers.filter(d => d.siaLicense?.status === 'expiring').length}
            </div>
            <div className="text-sm text-yellow-800">Expiring Soon</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {drivers.filter(d => d.siaLicense?.status === 'expired').length}
            </div>
            <div className="text-sm text-red-800">Expired</div>
          </div>
        </div>

        <div className="space-y-3">
          {drivers.filter(d => d.siaLicense?.status !== 'valid').map((driver) => (
            <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">{driver.name}</div>
                  <div className="text-sm text-gray-600">
                    License: {driver.siaLicense?.number}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  driver.siaLicense?.status === 'expired' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {driver.siaLicense?.status}
                </div>
                <div className="text-xs text-gray-600">
                  {driver.siaLicense?.expiry.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Audit Trail</h3>
        
        <div className="space-y-3">
          {[
            { action: 'Vehicle GQ24 ABC service completed', user: 'System', time: new Date() },
            { action: 'SIA license updated for David Smith', user: 'Admin', time: new Date(Date.now() - 3600000) },
            { action: 'Insurance renewal processed for GQ24 DEF', user: 'System', time: new Date(Date.now() - 7200000) },
            { action: 'TFL compliance report generated', user: 'Admin', time: new Date(Date.now() - 10800000) }
          ].map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">{log.action}</div>
                  <div className="text-sm text-gray-600">by {log.user}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {log.time.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}