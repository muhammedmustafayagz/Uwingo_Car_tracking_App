import callApi from "@/api/config/apiCall";
import { ENDPOINTS } from "@/api/endpoints";
import { VehicleCascoApplicationT } from "@/types/comingData/vehicleCasco";
import z from "zod";


export const vehicleCascoService = {
  // GET
  getAll: () => callApi('get', ENDPOINTS.VehicleCasco.get, z.array(z.any())),

  // create 

  create: (data: Partial<VehicleCascoApplicationT>) => callApi('post', ENDPOINTS.VehicleCasco.create, z.any(), data),

  // // PUT (Update)
  update: (data: Partial<VehicleCascoApplicationT>) =>
    callApi('put', `${ENDPOINTS.VehicleCasco.update}`, z.any(), data),

  // // DELETE
  delete: (id: string | number) =>
    callApi('delete', `${ENDPOINTS.VehicleCasco.delete}/${id}`, z.any()),
};