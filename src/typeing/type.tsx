import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface StButtonProps {
  borderColor: string;
  width: string;
  height: string;
  onClick?: () => void;
  children: ReactNode;
  borderRadius?: string;
}
