import { Button } from "@/components/Styled";
import Input from "@/components/Styled/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const route = useNavigate();
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return <div>
    <Input defaultValue={id} onInput={setId} />
    <Input defaultValue={password} onInput={setPassword} />
    <Button onClick={() => route("/dashbord")}>Join</Button>
  </div>;
};

export default Join;