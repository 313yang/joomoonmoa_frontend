import { CSSProperties } from "react";

export interface PropBase {
    /** DOM Element에 전달될 ClassName 문자열입니다. */
    className?: string;

    /** DOM Element에 전달될 style 객체입니다. */
    style?: string | CSSProperties;
}