export interface VehicleDetails {
  // Vehicle Identification & Info
  make: string;
  modelVehicle: string;
  year: number;
  vehicleId: number;
  vin: string;
  plate: string;
  serialNumber: string;
  modelDevice: string;
  packetType: string;
  isConnectedVehicles: boolean;

  // Maintenance Schedule
  lastMaintenanceDate: string; // Consider using Date object if parsing
  nextMaintenanceDate: string;
  days: number;

  // Driver Info
  driverName: string;
  driverCode: string;

  // Insurance & Policy (Could be grouped into a nested interface)
  policyNumber: string;
  insuranceCompany: string;
  startDate: string;
  endDate: string;
  inspectionDate: string;
  expiryDate: string;
  notes: string;

  // Secondary Insurance Info
  policyNumberInsurance: string;
  insuranceCompanyInsurance: string;
  startDateInsurance: string;
  endDateInsurance: string;

  // Repair Details
  repairDate: string;
  faultType: string;
  faultDescription: string;
  repairAction: string;
  performedBy: string;
  repairCost: number;
  repairNotes: string;
}

