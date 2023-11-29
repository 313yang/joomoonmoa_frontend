import { BrowserRouter as Router } from "react-router-dom";
import BaseLayout from "./components/Layout";
import "./themes/css/index.css";
import { useUserAuth } from "./libs/store/useAuthStore";
import Navigator from "./components/Layout/Navigator";
import { Toaster } from "react-hot-toast";
import { Button } from "./components/Styled";

function App() {

  return (
    <div id="container">
      <Router>
        <section id="main_container">
          <div className="logo_container">
            <img className="logo" src="/logo.svg" />
            <Button width="70px" onClick={()=>window.location.reload()}>새로고침</Button>
          </div>
          <BaseLayout />
        </section>
        <Navigator />
      </Router>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
