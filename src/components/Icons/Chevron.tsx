interface ChevronProps {
  direction?: "right" | "left";
  width?: string | number;
}

export const Chevron = ({ direction = "left", width }: ChevronProps) => {
  return <svg className={`chevron-${direction}`} style={{ width: width ? width : "" }} width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 1L2 7.5L9 14" stroke="#656D75" strokeWidth="2" />
  </svg>;
};