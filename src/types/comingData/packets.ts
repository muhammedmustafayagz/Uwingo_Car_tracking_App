

import { z } from "zod";



export interface PacketApplicationT {
  packetId: number,
  packetType: string,
  description: string,
  companyApplicationId: string
}


// TODO : ADD VALIDATION MESSAGES OF THE FORM HERE 
export const PacketApplicationSchema = z.object({
  packetId: z.number(),
  packetType: z.string().min(3, { error: 'the length should be 3 character at least' }),
  description: z.string().min(3, { error: 'the length should be 3 character at least' }),
  companyApplicationId: z.string(),
});


export type PacketApplicationSchemaT = z.infer<typeof PacketApplicationSchema>;