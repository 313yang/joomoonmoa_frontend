import { BrowserRouter as Router } from "react-router-dom";
import BaseLayout from "./components/Layout";
import "./themes/css/index.css";
import { useUserAuth } from "./libs/store/useAuthStore";
import Navigator from "./components/Layout/Navigator";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <div id="container">
      <Router>
        <section id="main_container">
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
