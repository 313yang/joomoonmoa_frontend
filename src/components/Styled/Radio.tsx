import { BuildClass, uid } from "@/libs/Function";
import { ReactNode, useRef } from "react";

export interface RadioProps<T> {
  name: string;
  value?: T;

  block?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  className?: string;
  children?: ReactNode;

  onChange?: (value?: T) => void;
}

export function Radio<T extends string | number | string[]>({
  name,

  value,
  children,

  block,
  readonly,
  disabled,
  checked,

  className,
  defaultChecked,

  onChange,
}: RadioProps<T>) {
  const id = useRef<string>(`Radio-${uid()}`);
  const ChangeHandler = (e: any) => {
    if (typeof onChange === "undefined") return;

    const target = e.target as HTMLInputElement;
    onChange(target.value as T | undefined);
  };

  return <label
    className={BuildClass(
      "radio",
      readonly && "radio-readonly",
      disabled && "radio-disabled",
      checked && "radio-checked",
      block && "radio-block",
      className,
    )}
    htmlFor={id.current}
  >
    <input
      type="radio"
      id={id.current}
      name={name}
      value={value}
      onChange={ChangeHandler}
      readOnly={readonly}
      disabled={disabled}
      checked={checked}
      defaultChecked={defaultChecked}
    />
    <span />
    {children}
  </label>;
};

export default Radio;