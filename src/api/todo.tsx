import { instance } from "./instance";
import { ITodo } from "src/typeing/type";

export const addTodoApi = {
  post: async (todo: ITodo): Promise<void> => {
    await instance.post("/todos", todo);
  },
};

export const getTodo = async (payload: ITodo): Promise<void> => {
  const response = await instance.post(`/todos${payload}`);
  return response.data;
};
