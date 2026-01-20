import { vehicleCascoService } from "@/api/services/vehicleCascoService";
import { VehicleCascoApplicationT } from "@/types/comingData/vehicleCasco";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetVehicleCasco = () => {
  return useQuery({
    queryKey: ["vehicleCasco"],
    queryFn: vehicleCascoService.getAll,
  });
};

export const useDeleteVehicleCasco = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => vehicleCascoService.delete(id),
    onSuccess: () => {
      // Refetch the list to show the item was removed
      queryClient.invalidateQueries({ queryKey: ["vehicleCasco"] });
    },
  });
};

export const useUpdateVehicleCasco = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Using the Interface instead of 'any' for better IntelliSense
    mutationFn: (data: Partial<VehicleCascoApplicationT>) =>
      vehicleCascoService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicleCasco"] });
    },
  });
};

export const useCreateVehicleCasco = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<VehicleCascoApplicationT>) =>
      vehicleCascoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicleCasco"] });
    },
  });
};