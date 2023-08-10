import { Arrow } from "@/components/Icons";
import { ReactNode } from "react";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  prev?: ReactNode;
  title: ReactNode;
}
const Header = ({ prev, title }: HeaderProps) => {
  const route = useNavigate();
  return <header className={style.Header}>
    {!!prev ? <div>
      <button onClick={() => route(-1)}><Arrow /></button>
      {prev}
    </div> : <div />}
    <div>
      <h3>{title}</h3>
    </div>
  </header>;
};
export default Header;