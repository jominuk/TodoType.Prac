import { instance } from "./instance";
import { ITodo } from "src/typeing/type";

export const TodoApi = {
  post: async (todo: ITodo): Promise<void> => {
    const response = await instance.post("/todos", todo);
    return response.data;
  },

  get: async (): Promise<void> => {
    const response = await instance.get("/todos");
    return response.data;
  },

  delete: async (todoId: ITodo): Promise<void> => {
    const response = await instance.delete(`/todos/${todoId}`);
  },
};
