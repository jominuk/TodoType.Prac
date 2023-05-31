import { instance } from "./instance";
import { ITodo } from "src/typeing/type";

export const TodoApi = {
  post: async (todo: ITodo): Promise<void> => {
    const response = await instance.post("/todos", todo);
    return response.data;
  },

  get: async (payload: ITodo): Promise<void> => {
    const response = await instance.get(`/todos/${payload}`);
    return response.data;
  },
};
