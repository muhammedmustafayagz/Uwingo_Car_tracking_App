import { VehicleSpeedLimitService } from "@/api/services/vehicleSpeedLimitService";
import { VehicleSpeedLimitApplicationT } from "@/types/comingData/vehicleSpeedLimit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export const useGetVehicleSpeedLimit = () => {
  return useQuery({
    queryKey: ["vehicleSpeedLimit"],
    queryFn: VehicleSpeedLimitService.getAll,
  });
};

export const useDeleteVehicleSpeedLimit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => VehicleSpeedLimitService.delete(id),
    onSuccess: () => {
      // Refetch the list to show the item was removed
      queryClient.invalidateQueries({ queryKey: ["vehicleSpeedLimit"] });
    },
  });
};

export const useUpdateVehicleSpeedLimit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Using the Interface instead of 'any' for better IntelliSense
    mutationFn: (data: Partial<VehicleSpeedLimitApplicationT>) =>
      VehicleSpeedLimitService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicleSpeedLimit"] });
    },
  });
};

export const useCreateVehicleSpeedLimit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<VehicleSpeedLimitApplicationT>) =>
      VehicleSpeedLimitService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicleSpeedLimit"] });
    },
  });
};