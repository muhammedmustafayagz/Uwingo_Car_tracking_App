import callApi from "@/api/config/apiCall";
import { ENDPOINTS } from "@/api/endpoints";

import z from "zod";
import { DeviceApplicationT, DeviceApplicationSchema } from "@/types/comingData/devices";

export const DevicesService = {
  // GET
  getAll: () => callApi('get', ENDPOINTS.Devices.get, z.array(z.any())),

  // create 

  create: (data: any) => callApi('post', ENDPOINTS.Devices.create, z.any(), data),

  // // PUT (Update)
  update: (data: Partial<DeviceApplicationT>) =>
    callApi('put', `${ENDPOINTS.Devices.update}`, z.any(), data),

  // // DELETE
  delete: (id: string | number) =>
    callApi('delete', `${ENDPOINTS.Devices.delete}/${id}`, z.any()),
};