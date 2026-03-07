import { ReshapedData } from "@/components/Map/MapView";
import { CreateInstantDataEndpoint_whatGet } from "@/types/forMap";

export type RootDrawerParamList = {
  Home: undefined;
  Vehicles: undefined;
  Devices: undefined;
  Drivers: undefined;
  "Vehicle Connected Devices": undefined;
  "Vehicle Connected Driver": undefined;
  Packets: undefined;
  "Packet Contents": { packetId: string } | undefined; // Example with params
  "Vehicle Maintenance": undefined;
  "Vehicle Casco": undefined;
  "Vehicle Inspection": undefined;
  "Vehicle Insurance": undefined;
  "Vehicle Repair": undefined;
  "Vehicle Speed Limit": undefined;
  "All Details With Street View": { item: Partial<VehicleData> | ReshapedData };
};


export interface VehicleData {
  vehicleId: number;
  plate: string;
  serialNumber: string;
  lat: number;
  lng: number;
  speed: number;
  speedLimit: number;
  isWorking: boolean;
  dailyKM: number;
  // Using 'string | null' as these often come as ISO date strings from APIs
  analysisStartDate: string | null;
  analysisEndDate: string | null;
  // 'coordinate' is usually a string (JSON) or an array of coordinate objects
  coordinate: string | any[] | null;
}


