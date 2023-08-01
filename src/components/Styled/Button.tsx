import { BuildClass } from "@/libs/Function";
import { PropsWithChildren, createElement } from "react";

interface BoxProps {
    style?: { [key: string]: string; };
    radius?: "round" | "square",
    borderless?: boolean;
    className?: string;
    type?: "submit" | "button";
    width?: number;
    disabled?: boolean;
}

export const Button = ({
    children,
    radius = "round",
    borderless,
    style,
    className,
    type = "button",
    width,
    disabled
}: PropsWithChildren<BoxProps>) => createElement("button", {
    className: BuildClass("button", `button-${radius}`, borderless && "button-borderless", className),
    style: !!width ? { ...style, width } : style,
    type: type,
    disabled
}, children);