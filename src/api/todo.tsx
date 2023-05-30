import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "./instance";

const addComment = async (payload: any) => {
  const response = await instance.post("/todos", payload);
  return response.data;
};
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
