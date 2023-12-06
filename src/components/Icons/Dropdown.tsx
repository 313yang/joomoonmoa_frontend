import { FunctionComponent } from "react";

export const DropdownOn: FunctionComponent = (props: { color?: string; }) => <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path d="M0 5.14307L8 5.14307L4 0.000210158L0 5.14307Z" fill="#BCC4CC" />
</svg>;
DropdownOn.defaultProps = {
    color: "gray40"
};

export const DropdownOff: FunctionComponent = (props: { color?: string; }) => <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none">
    <path d="M8 0.428711H0L4 5.57157L8 0.428711Z" fill="#BCC4CC" />
</svg>;
DropdownOff.defaultProps = {
    color: "gray40"
};