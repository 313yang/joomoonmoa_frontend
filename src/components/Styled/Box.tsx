import { ReactNode, createElement } from "react";

interface BoxProps {
  children?: ReactNode;
  style?: { [key: string]: string; };
  size?: "none" | "md",
  radius?: "round" | "square",
  borderless?: boolean;
}

export const Box = ({ children, size, radius, borderless, style }: BoxProps) => createElement("div", {
  className: `box box-${size || "none"} box-${radius || "round"}  ${borderless ? "box-borderless" : ""}`,
  style,
}, children);