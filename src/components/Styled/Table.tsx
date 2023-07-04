import { ReactNode } from "react";

interface TableProps {
  thead: Array<string>;
  children?: ReactNode;
  style?: { [key: string]: string; };
}

export const Table = ({ children, style, thead }: TableProps) => {
  return <table className="table" style={style}>
    <thead>
      <tr>
        {thead.map((x, idx) =>
          <th key={`${x}-${idx}`}>{x}</th>
        )}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>;
};