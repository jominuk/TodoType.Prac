import { instance } from "./instance";
import { ITodo, ITodoStatus } from "src/typeing/type";

export const TodoApi = {
  post: async (todo: ITodo): Promise<ITodo> => {
    const response = await instance.post("/todos", todo);
    return response.data;
  },

  get: async (): Promise<ITodo> => {
    const response = await instance.get("/todos");
    return response.data;
  },

  delete: async (id: ITodo): Promise<ITodo> => {
    const response = await instance.delete(`/todos/${id}`);
    return response.data;
  },

  status: async (payload: ITodoStatus): Promise<ITodo> => {
    const response = await instance.patch(`/todos/${payload.id}`, {
      isDone: !payload.isDone,
    });
    return response.data;
  },

  detail: async (id: string | number): Promise<ITodo> => {
    const response = await instance.get(`/todos/${id}`);
    return response.data;
  },
};
