import Greeting from "./components/Greeting";
import PromptExperience from "./components/PromptExperience";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <Greeting />
        <PromptExperience />
      </div>
    </div>
  );
}

export default App;
