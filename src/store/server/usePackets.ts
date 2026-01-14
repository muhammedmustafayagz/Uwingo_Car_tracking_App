import { PacketsService } from "@/api/services/packetsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// useQueryClient is a custom hook that returns the current QueryClient instance.


export const useGetPackets = () => {
  return useQuery({
    queryKey: ["packets"], // This is the "ID" of this data in the cache
    queryFn: PacketsService.getAll,
  });
};

export const useDeletePacket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => PacketsService.delete(id),
    onSuccess: () => {
      // This tells React Query to refetch the list automatically!
      queryClient.invalidateQueries({ queryKey: ["packets"] });
    },
  });
};
export const useUpdatePacket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn only takes ONE argument, so we destructure an object
    mutationFn: (data: any) =>
      PacketsService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packets"] });
    },
  });
};

export const useCreatePacket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => PacketsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packets"] });
    },
  });
};