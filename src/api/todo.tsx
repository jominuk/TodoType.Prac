import { instance } from "./instance";
import { ITodo, ITodoStatus, ITodoEdit, IComments } from "src/typeing/type";

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

  edit: async (payload: ITodoEdit): Promise<ITodoEdit> => {
    const response = await instance.patch(`/todos/${payload.id}`, {
      title: payload.title,
      body: payload.body,
    });
    return response.data;
  },
};

export const CommentApi = {
  post: async (comment: IComments): Promise<void> => {
    const res = await instance.post("/comments", comment);
    return res.data;
  },
};
