import { BuildClass } from "@/libs/Function";
import { ReactNode, useLayoutEffect, useMemo, useRef, useState } from "react";
import FrameAnimation from "./FrameAnimation";
import { DropdownOff, DropdownOn } from "../Icons";


export interface DropdownItemChildren<T> {
    name: any;
    childrens: DropdownItemValue<T>[];
}

export interface DropdownItemValue<T> {
    name: any;
    value: T;
    disabled?: boolean;
}

export type DropdownItem<T> = DropdownItemChildren<T> | DropdownItemValue<T>;

export interface DropdownUlProps<T> {
    value: T;
    items: DropdownItem<T>[];
    childrens?: boolean;
    onClick?: (value: T) => void;
}

export interface DropdownPreviewProps<T> {
    value: T;
}

export interface DropdownProps<T> {
    name?: string;
    disabled?: boolean;
    readonly?: boolean;
    control?: boolean;
    defaultValue?: T;
    value?: T;
    items: DropdownItem<T>[];
    className?: string;
    /** 비활성화여부 */
    placeholder?: string | Promise<string>;
    /** 캡션 */
    caption?: ReactNode;

    /** 입력값 앞에 컴포넌트 추가 */
    postfix?: any;

    render?: any;
    /** 입력값검증 */
    validator?: (value: T) => any;

    onInput?: (value: T) => void;
    onClick?: (value: T) => void;
}

function DropdownWrapper<T>({
    value,
    items,
    childrens,
    onClick,
}: DropdownUlProps<T>) {
    const clickHandler = (e: any) => {
        e.stopPropagation();
        if (typeof onClick === "undefined") return;

        const target = e.target as HTMLElement;
        if (target.nodeName !== "UL") {
            let srcElement: HTMLElement | null = target;
            if (srcElement.nodeName !== "LI") {
                while (srcElement && !["LI", "UL", "BODY"].includes(srcElement.nodeName)) {
                    srcElement = srcElement.parentElement;
                }
            }

            if (srcElement) {
                const parantElement = srcElement.parentElement!;
                if (childrens && parantElement.className.includes("dropdown-childrens") ||
                    !childrens && !parantElement.className.includes("dropdown-childrens")) {
                    const result = items[(srcElement as HTMLLIElement).value];
                    if ("value" in result) {
                        onClick(result?.value);
                    }
                }
            }
        }
    };

    return <ul
        className={BuildClass(
            childrens && "dropdown-childrens"
        )}
        onClick={clickHandler}
    >
        {items.map((item, idx) => {
            if ("value" in item) {
                return <li className={BuildClass(
                    "dropdown-item",
                    item.disabled && "dropdown-disabled",
                    item.value === value && "dropdown-selected",
                )} value={idx}>
                    {item.name}
                </li>;
            }

            return <li className={BuildClass(
                "dropdown-children",
            )} value={idx}>
                <p>{item.name}</p>
                {item.childrens && <DropdownWrapper value={value} items={item.childrens} childrens onClick={onClick} />}
            </li>;
        })}
    </ul>;
}

export function Dropdown<T extends string | number | string[]>({
    name,
    defaultValue,
    value: PropValue,
    items,

    disabled,
    readonly,

    control,
    className,

    render: Renderer = ({ value }: any) => <>{value}</>,
    caption,
    postfix: Postfix,
    validator,
    placeholder,

    onInput = () => void (0),
    onClick = () => void (0),
}: DropdownProps<T>) {
    const [innerPlaceholder, setInnerPlaceholder] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [innerValue, setInnerValue] = useState<T>((defaultValue || (typeof defaultValue === "number" ? 0 : "")) as T);
    const [error, setError] = useState();
    const mainRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const value = (() => {
        if (typeof PropValue !== "undefined") return PropValue;
        return innerValue;
    })();

    const selectedName = useMemo(() => {
        const findSelector = (items: DropdownItem<T>[]): DropdownItemValue<T> | undefined => {
            for (const item of items) {
                if ("value" in item) {
                    if (item.value === value) return item;
                }
                else {
                    const result = findSelector(item.childrens);
                    if (result) {
                        if (result.value === value) return result;
                    }
                }
            }
        };

        const item = findSelector(items);
        return item ? item.name : innerPlaceholder;
    }, [value, items, innerPlaceholder]);

    useLayoutEffect(() => {
        if (typeof placeholder === "string") setInnerPlaceholder(placeholder);
        else if (placeholder instanceof Promise) {
            placeholder
                .then((value) => setInnerPlaceholder(value));
        }
    }, [placeholder]);

    useLayoutEffect(() => {
        const result = validator && validator(value);
        setError(result);
    }, [value]);

    useLayoutEffect(() => {
        if (isFocus && control) {
            if (inputRef.current) inputRef.current.focus();
        }
    }, [isFocus, control]);

    const isControl = control && isFocus;

    return <div
        ref={mainRef}
        className={BuildClass(
            "dropdown",
            isFocus && "dropdown-focus",
            disabled && "dropdown-disabled",
            readonly && "dropdown-readonly",
            !!error && "dropdown-error",
            className,
        )}
        tabIndex={-1}
        onClick={() => {
            if (disabled || readonly) return;
            setIsFocus(prev => !prev);
        }}
        onBlur={(e) => {
            if (!e.relatedTarget || !(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget))
                setIsFocus(false);
        }}
    >
        <div className="dropdown-container">
            <input type="hidden" name={name} value={value} disabled={disabled} readOnly={readonly} />
            <div className="dropdown-display">
                {Postfix && <Postfix value={value} />}
                {isControl ?
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onInput={(e) => {
                            const value = (e.target as HTMLInputElement).value as T;
                            setInnerValue(value);
                            onInput(value);
                        }}
                        onBlur={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (!e.relatedTarget) onClick(target.value as T);
                        }}
                    /> :
                    <a>{control ? <Renderer value={value} /> : selectedName}</a>}
                {isFocus ? <DropdownOn /> : <DropdownOff />}
            </div>
            <FrameAnimation
                display={isFocus}
                className="dropdown-wrapper"
                duration="fastest"
            >

                <DropdownWrapper
                    value={value}
                    items={items}
                    onClick={(value) => {
                        setInnerValue(value);
                        onClick(value);
                        setIsFocus(false);
                    }} />

            </FrameAnimation>
        </div>
        {(error || caption) && <span className="dropdown-caption">
            {error || caption}
        </span>}
    </div>;
}

export default Dropdown;