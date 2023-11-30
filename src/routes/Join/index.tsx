import Header from "@/components/Layout/Header";
import CertificationContainer from "./Certification";
import { CertType } from "./defines";

const Join = () => {

  return <div>
    <Header prev={" "} title="회원가입" />
    <CertificationContainer type={CertType.Join} />
  </div>;
};

export default Join;