import { z } from "zod";


export interface VehicleInsuranceApplicationT {
  vehicleInsuranceId: number;
  vehicleId: number;
  policyNumber: string;
  insuranceCompany: string;
  startDate: string; // ISO String format
  endDate: string;   // ISO String format
  companyApplicationId: string; // UUID string
}


export const vehicleInsuranceApplicationSchema = z.object({
  vehicleInsuranceId: z.number().int(),
  vehicleId: z.number().int(),
  policyNumber: z.string().min(1),
  insuranceCompany: z.string().min(1),
  // Validates that the string is a valid ISO date format
  startDate: z.string(),
  endDate: z.string(),
  // Validates that the string is a properly formatted UUID
  companyApplicationId: z.string(),

});

export type vehicleInsuranceApplicationSchemaT = z.infer<typeof vehicleInsuranceApplicationSchema>;