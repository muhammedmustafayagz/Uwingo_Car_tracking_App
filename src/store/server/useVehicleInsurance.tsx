import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vehilceInsuranceService } from "@/api/services/vehicleInsuranceService";
import { VehicleInsuranceApplicationT } from "@/types/comingData/vehicleInsurance";

export const useGetVehicleInsurance = () => {
  return useQuery({
    queryKey: ["vehicleInsurance"],
    queryFn: vehilceInsuranceService.getAll,
  });
};

export const useDeleteVehicleInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => vehilceInsuranceService.delete(id),
    onSuccess: () => {
      // Refetch the list to show the item was removed
      queryClient.invalidateQueries({ queryKey: ["vehicleInsurance"] });
    },
  });
};

export const useUpdateVehicleInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<VehicleInsuranceApplicationT>) =>
      vehilceInsuranceService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicleInsurance"] });
    },
  });
};

export const useCreateVehicleInsurance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<VehicleInsuranceApplicationT>) =>
      vehilceInsuranceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicleInsurance"] });
    },
  });
};