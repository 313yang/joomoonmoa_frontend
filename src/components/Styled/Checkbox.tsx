import { BuildClass } from "@/libs/Function";
import { PropsWithChildren, useRef } from "react";

export interface CheckboxProps<T> {
    name: string;
    value?: T;
    block?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (value?: T) => void;
    style?: { [key: string]: string; };
    className?: string;
}

export function Checkbox<T extends string | number | string[]>({
    name,
    value,
    children,
    block,
    readonly,
    disabled,
    checked,
    defaultChecked,
    className,
    style,
    onChange,
}: PropsWithChildren<CheckboxProps<T>>) {
    const id = useRef<string>(`Checkbox-${new Date().getTime()}`);

    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === "undefined") return;
        const target = e.target;

        onChange(target.value as T);
    };

    return <div
        className={BuildClass(
            "checkbox",
            readonly && "checkbox-readonly",
            disabled && "checkbox-disabled",
            checked && "checkbox-checked",
            block && "checkbox-block",
            className)}
        style={style}
    >
        <input
            type="checkbox"
            id={id.current}
            name={name}
            value={value}
            onChange={ChangeHandler}
            readOnly={readonly}
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
        />
        <label htmlFor={id.current}>
            <span />
            {children}
        </label>
    </div>;
};

