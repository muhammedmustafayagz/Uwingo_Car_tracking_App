import { z } from "zod";

export interface VehicleSpeedLimitApplicationT {
  vehicleSpeedLimitId: number;
  vehicleId: number;
  speedLimit: number;
  startDate: string; // ISO 8601 format
  endDate: string;   // ISO 8601 format
  description: string;
  companyApplicationId: string; // UUID
}

export const vehicleSpeedLimitApplicationSchema = z.object({
  vehicleSpeedLimitId: z.number().int(),
  vehicleId: z.number().int(),
  // Hız limiti 0 veya daha yüksek olmalı
  speedLimit: z.number().min(0, "Hız limiti negatif olamaz"),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().min(1, "Açıklama boş bırakılamaz"),
  companyApplicationId: z.string()
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "Bitiş tarihi başlangıç tarihinden önce olamaz",
  path: ["endDate"],
});

export type vehicleSpeedLimitApplicationSchemaT = z.infer<typeof vehicleSpeedLimitApplicationSchema>;