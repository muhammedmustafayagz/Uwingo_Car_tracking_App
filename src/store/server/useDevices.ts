import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// useQueryClient is a custom hook that returns the current QueryClient instance.

import { DevicesService } from "@/api/services/devicesService";





export const useGetDevices = () => {
  return useQuery({
    queryKey: ["devicess"], // This is the "ID" of this data in the cache
    queryFn: DevicesService.getAll,
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => DevicesService.delete(id),
    onSuccess: () => {
      // This tells React Query to refetch the list automatically!
      queryClient.invalidateQueries({ queryKey: ["devicess"] });
    },
  });
};
export const useUpdateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn only takes ONE argument, so we destructure an object
    mutationFn: (data: any) =>
      DevicesService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devicess"] });
    },
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => DevicesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devicess"] });
    },
  });
};