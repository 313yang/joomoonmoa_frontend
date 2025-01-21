import { BrowserRouter as Router } from "react-router-dom";
import BaseLayout from "./components/Layout";
import "./themes/css/index.css";
import Navigator from "./components/Layout/Navigator";
import { Toaster } from "react-hot-toast";
import LogoContainer from "./components/Layout/LogoContainer";
import { TutorialContainer } from "./components/Layout/Tutorial";
import { useTutorialStep } from "./libs/store/useTutorialStore";
import { TutorialStepType } from "./libs/Defines";

function App() {
  const { tutorialStep } = useTutorialStep();

  return (
    <div id="container">
      <Router>
        <section id="main_container">
          <LogoContainer />
          {tutorialStep !== TutorialStepType.NONE && <TutorialContainer />}
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
