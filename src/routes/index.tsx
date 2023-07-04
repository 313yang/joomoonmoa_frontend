import { useNavigate } from "react-router-dom";

const Login = () => {
  const route = useNavigate();
  return <div>
    <input />
    <input />
    <button onClick={() => route("/dashbord")}>Login</button>

  </div>;
};

export default Login;