import Header from "@/components/Layout/Header";
import CertificationContainer from "./Certification";
import { CertType } from "./defines";
;
const Password = () => {
  return <div>
    <Header prev={" "} title="비밀번호 변경" />
    <CertificationContainer type={CertType.Password} />
  </div>;
};

export default Password;