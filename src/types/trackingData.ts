export interface TrackingData {
  serialNumber: string;
  speed: number;
  workingstatus: boolean;
  outputStatus: boolean;
  latitude: number;
  longitude: number;
  dateTime: string;
  odometer: number;
  suffix?: string;
}


export interface InstantDataDTO extends TrackingData {
  vehicleId: number;
  make: string;
  model: string;
  year: number;
  vin: string;
  plate: string;
  isThereDriver: boolean;
  isItForRent: boolean;
  companyApplicationId: number;
  dailyKM?: number;
  speedLimit?: number;
  isBlocked?: boolean;
}