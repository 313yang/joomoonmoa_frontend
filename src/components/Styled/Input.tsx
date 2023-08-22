import { BuildClass } from "@/libs/Function";
import { ReactNode, useLayoutEffect, useState } from "react";

/**
 * `Input` 컴포넌트 공통 `Props` 입니다.
 */
interface CommonInputProps<T extends string> {
    style?: { [key: string]: string; };
    className?: string;
    /** 초기입력값 */
    defaultValue?: T;
    /** 입력값 */
    value?: T;

    /** 입력박스 이름. FormData 전달시 사용 */
    name?: string;
    /** 입력박스 타입값. 기본값은 `text` */
    type?: string;
    /** 읽기전용여부 */
    readonly?: boolean;
    /** 비활성화여부 */
    disabled?: boolean;
    /** 최대입력가능자릿수 */
    maxLength?: number;
    /** 미리보기 */
    placeholder?: string | Promise<string | null>;
    /** 캡션 */
    caption?: JSX.Element;
    /** 라벨 */
    label?: string;
    /** 입력값 뒤에 컴포넌트 추가 */
    prefix?: ReactNode | any;

    formatCallback?: (value: T) => string;
    /** 입력값검증 */
    validateCallback?: (value?: T) => void;

    /**
     * 타겟 input에서 `input` 이벤트가 감지되면 발생하는 이벤트입니다.
     * @param value 현재 `input`의 `value` 값
     * @param target 받은 `EventTarget` 초점
     * @returns 
     */
    onInput?: (value: string, target?: HTMLElement) => void;

    /**
     * 타겟 input에서 `enter` 키가 눌릴 경우 발생하는 이벤트입니다.
     * @param value 현재 `input`의 `value` 값
     * @param target 받은 `EventTarget` 초점
     * @returns 
     */
    onEnter?: (value: string, target?: HTMLElement) => void;

    /**
     * 타겟 input 이 포커싱될 경우 발생하는 이벤트입니다.
     * @param value 현재 `input`의 `value` 값
     * @param target 받은 `EventTarget` 초점
     * @param relatedTarget 읽어버린 `EventTarget` 초점
     * @returns 
     */
    onFocus?: (value: string, target?: HTMLElement, relatedTarget?: HTMLElement | null) => void;

    /**
     * 타켓 input 이 포커싱을 잃어버릴 경우 발생하는 이벤트입니다.
     * @param value 현재 `input`의 `value` 값
     * @param target 잃어버린 `EventTarget` 초점
     * @param relatedTarget 수신 `EventTarget` 포커스
     * @returns 
     */
    onBlur?: (value: string, target?: HTMLElement, relatedTarget?: HTMLElement | null) => void;
}


export type InputProps<T extends string> = CommonInputProps<T>;

export function Input<T extends string>({
    defaultValue,
    value: PropValue,

    className,
    style,

    name,
    placeholder,
    disabled,
    readonly,
    caption,
    maxLength,
    type,
    label,

    prefix: Prefix,

    formatCallback = (value: T) => value.toString(),
    validateCallback = () => false,

    onInput = () => void (0),
    onEnter = () => void (0),
    onBlur = () => void (0),
    onFocus = () => void (0)
}: InputProps<T>) {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isFirstInput, setIsFirstInput] = useState<boolean>(false); // 최초입력

    const [innerPlaceholder, setInnerPlaceholder] = useState<string>("");
    const [innerValue, setInnerValue] = useState<T>((defaultValue || "") as T);

    const isDefaultValue = typeof defaultValue !== "undefined";

    const value: T = (() => {
        if (typeof PropValue !== "undefined") return PropValue;
        return innerValue;
    })();

    const errorCaption = isFirstInput && validateCallback(value);

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocus(true);
        onFocus(value, e.target as HTMLElement, e.relatedTarget as HTMLElement | null);
    };

    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocus(false);
        onBlur(value, e.target as HTMLElement, e.relatedTarget as HTMLElement | null);
    };

    /** 내부 `keyup` 핸들러 입니다. */
    const keyboardHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value.slice(0, maxLength) as T;

        if (!isFirstInput) setIsFirstInput(true);
        if (document.activeElement === target) {
            if (e.key === "Enter" || e.keyCode === 13) onEnter(value);
        }
    };

    /** 내부 `input` 핸들러 입니다. */
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.value.slice(0, maxLength) as T;

        if (isDefaultValue) setInnerValue(value); // `defaultValue` 사용시만 업데이트

        onInput(value);
    };

    useLayoutEffect(() => {
        if (typeof placeholder === "string") setInnerPlaceholder(placeholder);
        else if (placeholder instanceof Promise) {
            placeholder
                .then((value) => value && setInnerPlaceholder(value));
        }
    }, [placeholder]);

    return <div
        className={BuildClass(
            "input",
            isFocus && "input-focus",
            disabled && "input-disabled",
            readonly && "input-readonly",
            isFirstInput && !!errorCaption && "input-error",
            className,
        )}
        style={style}
    >
        {!!label && <span className="input_with-label">{label}</span>}
        <div className="input-container">

            <input
                name={name}
                type={type}
                value={formatCallback(value)}
                placeholder={innerPlaceholder}
                disabled={disabled}
                readOnly={readonly}
                maxLength={maxLength}
                onFocus={focusHandler}
                onBlur={blurHandler}
                onKeyUp={keyboardHandler}
                onInput={inputHandler}
            />
            {Prefix && <Prefix />}
        </div>
        {(errorCaption || caption) && <span className="input-caption">
            {errorCaption || caption}
        </span>}
    </div>;
}

Input.defaultProps = {
    type: "text",
};

export default Input;