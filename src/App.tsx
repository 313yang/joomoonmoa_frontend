import { useState } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Login from "./routes";
import Baselayout from "./components/Layout";
import "./themes/css/index.css";
import Main from "./routes/Main";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <>
      <Router>
        {isLogin ? <Baselayout /> :
          <Routes>
            <Route path="/" Component={Login} />
          </Routes>
        }
      </Router>
      {isLogin ? <Login /> : <Main />}
    </>
  );
}

export default App;
