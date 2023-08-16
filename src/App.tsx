import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Join from "./routes/Join";
import Baselayout from "./components/Layout";
import "./themes/css/index.css";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  return (
    <div id="container">
      <Router>
        {isLogin ? <Baselayout /> :
          <section id="main_container">
            <Routes>
              <Route path="/" Component={Login} />
              <Route path="/join" Component={Join} />
            </Routes>
          </section>
        }
      </Router>
    </div>
  );
}

export default App;
