import { BuildClass } from "@/libs/Function";
import { ReactNode, createElement } from "react";

interface BoxProps {
  children?: ReactNode;
  style?: { [key: string]: string; };
  size?: "none" | "md",
  radius?: "round" | "square",
  borderless?: boolean;
  className?: string;
}

export const Box = ({
  children,
  size = "md",
  radius = "round",
  borderless,
  style,
  className }: BoxProps) => createElement("div", {
    className: BuildClass("box", `box-${size}`, `box-${radius}`, borderless && "box-borderless", className),
    style,
  }, children);