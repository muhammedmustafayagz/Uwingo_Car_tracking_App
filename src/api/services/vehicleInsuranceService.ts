import callApi from "@/api/config/apiCall";
import { ENDPOINTS } from "@/api/endpoints";
import { VehicleInsuranceApplicationT } from "@/types/comingData/vehicleInsurance";
import z from "zod";

export const vehilceInsuranceService = {
  // GET
  getAll: () => callApi('get', ENDPOINTS.VehicleInsurance.get, z.array(z.any())),

  // create 

  create: (data: Partial<VehicleInsuranceApplicationT>) => callApi('post', ENDPOINTS.VehicleInsurance.create, z.any(), data),

  // // PUT (Update)
  update: (data: Partial<VehicleInsuranceApplicationT>) =>
    callApi('put', `${ENDPOINTS.VehicleInsurance.update}`, z.any(), data),

  // // DELETE
  delete: (id: string | number) =>
    callApi('delete', `${ENDPOINTS.VehicleInsurance.delete}/${id}`, z.any()),
};