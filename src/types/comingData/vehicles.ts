import { z } from "zod";



export interface VehicleApplicationT {
  year: number
  vin: string;
  vehicleId: number;
  plate: string;
  model: string;
  make: string;
  isThereDriver: boolean;
  isItForRent: boolean;
  firstKilometer: number;
  companyApplicationId: string;
}




export const VehicleApplicationSchema = z.object({

  // TODO : araba yilini sinrlamak lazim
  year: z.number({ message: "This Value Should be number" })
    .min(1, "Please enter a valid year"),

  // TODO: Required string with a minimum length (Standard VIN is 17)
  vin: z.string({ message: "VIN is required" })
    .min(1, "VIN must be at least 1 characters"),


  plate: z.string({ message: "Plate is required" }).min(1, "Plate cannot be empty"),
  model: z.string({ message: "Model is required" }).min(1, "Model cannot be empty"),
  make: z.string({ message: "Make is required" }).min(1, "Make cannot be empty"),


  isThereDriver: z.boolean({ message: "This field is required" }),
  isItForRent: z.boolean({ message: "This field is required" }),


  firstKilometer: z.number({ message: "This Value Should be number" })
    .nonnegative("Kilometers cannot be negative"),


  vehicleId: z.number().nonnegative().optional(),
  companyApplicationId: z.string().optional(),
});


export type VehicleApplicationSchemaT = z.infer<typeof VehicleApplicationSchema>;