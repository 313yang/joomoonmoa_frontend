import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./routes";
import Baselayout from "./components/Layout";
import "./themes/css/index.css";
import Dashboard from "./routes/Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div id="container">
      <Router>
        {isLogin ? <Baselayout /> :
          <Routes>
            <Route path="/login" Component={Login} />
          </Routes>
        }
        {isLogin ? <Dashboard /> : <Login />}
      </Router>
    </div>
  );
}

export default App;
