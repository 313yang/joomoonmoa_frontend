import { FocusEventHandler, FunctionComponent, MouseEventHandler, createElement, memo, useLayoutEffect, useRef, useState } from "react";
import { PropBase } from "./defines";
import { BuildClass } from "@/libs/Function";

interface FrameAnimationProps extends PropBase {
    display: boolean;

    id?: string;
    tag?: string;
    animationIn?: "fadeIn" | "fadeInUp" | "fadeInDown";
    animationOut?: "fadeOut" | "fadeOutUp" | "fadeOutDown";
    duration?: "fast" | "faster" | "fastest" | "slow" | "slower";

    onAnimationStart?: VoidFunction;
    onAnimationEnd?: VoidFunction;

    onBlur?: FocusEventHandler<EventTarget>;
    onClick?: MouseEventHandler<EventTarget>;
    children?: any;
}

export const FrameAnimation: FunctionComponent<FrameAnimationProps> = memo(({
    display,

    id: keyId,
    tag,
    className,
    style,

    animationIn,
    animationOut,
    duration,
    children,

    onAnimationStart = () => void (0),
    onAnimationEnd = () => void (0),
    onBlur,
    onClick,
}) => {
    const id = useRef<string>(`${keyId || "FrameAnimation"}-${Date.now()}`);
    const [mounted, setMounted] = useState<boolean>(display);

    const innerMounted = typeof animationOut !== "undefined" ? mounted : display;

    useLayoutEffect(() => {
        if (typeof animationOut !== "undefined" && display) setMounted(true);
    }, [animationOut, display]);

    if (innerMounted) {
        return createElement(
            tag!,
            {
                id: id.current,
                className: BuildClass(
                    "animated",
                    display && animationIn,
                    !display && animationOut,
                    duration,
                    className,
                ),
                style,
                onAnimationStart: (e: any) => {
                    const target = e.target as HTMLElement;
                    if (target.id === id.current) onAnimationStart();
                },
                onAnimationEnd: (e: any) => {
                    const target = e.target as HTMLElement;
                    if (target.id === id.current) onAnimationEnd();
                    if (typeof animationOut !== "undefined" && !display) setMounted(false);
                },
                onBlur,
                onClick,
            },
            children,
        );
    }

    return null;
});

FrameAnimation.defaultProps = {
    tag: "div",
    animationIn: "fadeIn",
};

export default FrameAnimation;