import { BuildClass } from "@/libs/Function";
import { PropsWithChildren } from "react";

export interface InputLabelProps {
    align?: "flex-start" | "center" | "flex-end";
    style?: { [key: string]: string; };
    className?: string;
}
export const InputLabel = ({ children, className, style, align }: PropsWithChildren<InputLabelProps>) => {
    return <label
        className={BuildClass(
            "input-label",
            `input-label-${align}`,
            className
        )}
        style={style}
    >
        {children}
    </label>;
};
InputLabel.defaultProps = {
    align: "flex-start",
};

export interface InputLineProps {
    position?: "top" | "left";
    style?: { [key: string]: string; };
    className?: string;
}

export const InputLine = ({ children, className, style, position }: PropsWithChildren<InputLineProps>) => {
    return <div
        className={BuildClass(
            "input-line",
            `label-position-${position}`,
            className,
        )}
        style={style}
    >
        {children}
    </div>;
};
InputLine.defaultProps = {
    position: "left"
};

