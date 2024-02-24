import { Chevron } from "@/components/Icons";
import { ReactNode } from "react";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
interface HeaderProps {
  prev?: ReactNode;
  title: ReactNode;
  goBackBtn?(): void;
}
const Header = ({ prev, title, goBackBtn }: HeaderProps) => {
  const route = useNavigate();
  return <header className={style.Header}>
    {!!prev ? <div onClick={() => goBackBtn ? goBackBtn() : route(-1)}>
      <Chevron />
      {prev}
    </div> : <div />}
    <div>
      <h3>{title}</h3>
    </div>
  </header>;
};
export default Header;