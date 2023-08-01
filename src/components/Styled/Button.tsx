import { BuildClass } from "@/libs/Function";
import { PropsWithChildren, createElement } from "react";

interface BoxProps {
    style?: { [key: string]: string; };
    size?: "none" | "md",
    radius?: "round" | "square",
    borderless?: boolean;
    className?: string;
    type?: "submit" | "button";
}

export const Button = ({
    children,
    size = "md",
    radius = "round",
    borderless,
    style,
    className,
    type = "button"
}: PropsWithChildren<BoxProps>) => createElement("button", {
    className: BuildClass("button", `button-${size}`, `button-${radius}`, borderless && "button-borderless", className),
    style,
    type: type
}, children);