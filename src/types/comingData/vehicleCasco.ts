import { z } from "zod";
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/;


export interface VehicleCascoApplicationT {
  vehicleCascoId: number;
  vehicleId: number;
  policyNumber: string;
  insuranceCompany: string;
  startDate: string; // ISO String format
  endDate: string;   // ISO String format
  companyApplicationId: string; // UUID string
}


export const vehicleCascoApplicationSchema = z.object({
  vehicleCascoId: z.number().int(),
  vehicleId: z.number().int(),
  policyNumber: z.string().min(1),
  insuranceCompany: z.string().min(1),
  // Validates that the string is a valid ISO date format
  startDate: z.string()
    .regex(ISO_DATE_REGEX, "Invalid ISO 8601 date format")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date value"),
  endDate: z.string()
    .regex(ISO_DATE_REGEX, "Invalid ISO 8601 date format")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date value"),
  // Validates that the string is a properly formatted UUID
  companyApplicationId: z.string(),

}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "endDate,  cannot be before startDate",
  path: ["endDate"], // Hata mesajının hangi alanda görüneceğini belirler
})

export type VehicleCascoType = z.infer<typeof vehicleCascoApplicationSchema>;