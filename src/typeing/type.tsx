import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface StButtonProps {
  borderColor: string;
  width: string;
  height: string;
  onClick?: () => void;
  children: React.ReactNode;
  borderRadius?: string;
}

export interface ITodo {
  id?: string | number;
  title: string;
  body: string;
  day?: number | string;
  isDone?: boolean;
}

export type ITodoStatus = Omit<ITodo, "title" | "body" | "day">;

export interface ListOfListProps {
  borderColor: string;
  todo: ITodo;
}
