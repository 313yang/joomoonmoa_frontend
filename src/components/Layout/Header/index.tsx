import { Arrow } from "@/components/Icons";
import { ReactNode } from "react";
import style from "./style.module.scss";
interface HeaderProps {
  prev?: ReactNode;
  title: ReactNode;
}
const Header = ({ prev, title }: HeaderProps) => {
  return <header className={style.Header}>
    {!!prev ? <div><Arrow />{prev}</div> : <div />}
    <div>{title}</div>
  </header>;
};
export default Header;