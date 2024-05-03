import { ChangeEvent, useRef, useState } from "react";
import { PropBase } from "./defines";
import { BuildClass, uid } from "@/libs/Function";

export interface SwitchProps<T> extends PropBase {
    name: string;
    value?: T;

    block?: boolean;
    readonly?: boolean;
    disabled?: boolean;

    defaultChecked?: boolean;
    checked?: boolean;

    onChange?: (value?: T, checked?: boolean) => void;
}

export function Switch<T extends string | number | string[]>({
    name,

    value,

    block,
    readonly,
    disabled,
    defaultChecked,
    checked: PropChecked,

    className,

    onChange = () => void (0),
}: SwitchProps<T>) {
    const [innerChecked, setInnerChecked] = useState<boolean>(!!defaultChecked);
    const id = useRef<string>(`Switch-${uid()}`);

    const checked = (() => {
        if (typeof PropChecked !== "undefined") return PropChecked;
        return innerChecked;
    })();

    const ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === "undefined") return;

        const target = e.target as HTMLInputElement;
        setInnerChecked(prev => !prev);
        onChange(target.value as T | undefined, !checked);
    };

    return <div
        className={BuildClass(
            "switch",
            readonly && "switch-readonly",
            disabled && "switch-disabled",
            checked && "switch-checked",
            block && "switch-block",
            className,
        )}
    >
        <input
            type="checkbox"
            id={name}
            name={name}
            value={value}
            onChange={ChangeHandler}
            readOnly={readonly}
            disabled={disabled}
            checked={checked}
        />
        <label htmlFor={name} />
    </div>;
};

export default Switch;