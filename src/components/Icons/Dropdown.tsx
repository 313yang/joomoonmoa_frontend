import { FunctionComponent } from "react";

export const DropdownOn: FunctionComponent = (props: { color?: string; }) => <svg style={{ width: 22, height: 22 }}>
    <path d="m12 15 5-6H7z" style={{ fill: `${props.color}` }} transform="rotate(180 12 12)" />
</svg>;
DropdownOn.defaultProps = {
    color: "gray900"
};

export const DropdownOff: FunctionComponent = (props: { color?: string; }) => <svg style={{ width: 22, height: 22 }}>
    <path d="m12 15 5-6H7z" style={{ fill: `${props.color}` }} />
</svg>;
DropdownOff.defaultProps = {
    color: "gray900"
};