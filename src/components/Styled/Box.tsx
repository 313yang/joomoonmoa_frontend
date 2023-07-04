import { ReactNode, createElement } from "react";

interface BoxProps {
  thead: Array<string>;
  children?: ReactNode;
  style?: { [key: string]: string; };
  size?: string,
  radius?: string,
  borderless?: boolean;
}

export const Box = ({ children, size, radius, borderless, style }: BoxProps) => createElement("div", {
  className: `box box-${size || "md"}  box-${radius || "round"}  ${borderless && "box-borderless"}`,
  style,
}, children);