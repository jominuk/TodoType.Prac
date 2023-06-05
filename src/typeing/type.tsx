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

export type ITodoStatus = Pick<ITodo, "id" | "isDone">;

export interface ITodoEdit {
  id?: string | number;
  title?: string;
  body?: string;
}

export type ITodoEditGet = Pick<ITodoEdit, "id">;

export interface ListOfListProps {
  borderColor: string;
  todo: ITodo;
}
