import { BuildClass } from "@/libs/Function";
import { ReactNode, createElement } from "react";

interface BoxProps {
  children?: ReactNode;
  style?: { [key: string]: string; };
  size?: "none" | "md",
  radius?: "round" | "square",
  borderless?: boolean;
  className?: string;
  color?: "white" | "gray50";
  onClick?: () => void;
}

export const Box = ({
  children,
  size = "md",
  radius = "round",
  borderless,
  style,
  color,
  onClick,
  className }: BoxProps) => createElement("div", {
    className: BuildClass("box", `box-${size}`, `box-${radius}`, color && `box-${color}`, borderless && "box-borderless", className),
    style,
    onClick
  }, children);