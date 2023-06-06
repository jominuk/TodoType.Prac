import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface StButtonProps {
  borderColor?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  borderRadius?: string;
}

export interface ITodo {
  id?: string | number;
  title: string;
  body: string;
  day?: number | string;
  isDone?: boolean;
}

export interface ITodoid {
  id: string | number | undefined;
}

export type ITodoStatus = Pick<ITodo, "id" | "isDone">;

export interface ITodoEdit {
  id?: string | number;
  title?: string;
  body?: string;
}

export interface ListOfListProps {
  borderColor: string;
  todo: ITodo;
}

export interface IComments {
  id?: number | string;
  comment?: string;
  todoId?: number | string;
}

export interface TodoComment {
  todoId?: number | string;
  id?: number;
}
