import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Join from "./routes/Join";
import Baselayout from "./components/Layout";
import "./themes/css/index.css";
import { useUserAuth } from "./libs/store/useAuthStore";
import Navigator from "./components/Layout/Navigator";

function App() {
  const { accessToken } = useUserAuth();


  return (
    <div id="container">
      <Router>
        <section id="main_container">
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/join" Component={Join} />
          </Routes>
          {!!accessToken && <Baselayout />}
        </section>
        {window.location.pathname !== "/" && <Navigator />}
      </Router>
    </div>
  );
}

export default App;
