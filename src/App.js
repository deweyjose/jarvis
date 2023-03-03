import { useState, useRef } from "react";
import "./App.css";

function Prompt() {
  const prompt = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(
      "https://sm6bgqavpagpz4i5c4nl5ty2c40dnudl.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        body: JSON.stringify({ prompt: prompt.current.value }),
      }
    )
      .then((res) => res.json())
      .then(
        (res) => {
          setLoading(false);
          setResponse(res[0].text.trim());
        },
        (error) => {
          console.log("error", error);
          setResponse(error.message);
        }
      );
  };

  return (
    <div className="App-container">
      <div className="App-greeting">
        My name is Jarvis. <br /> What's on your mind?
      </div>
      <div className="App-form">
        <textarea name="prompt" ref={prompt} className="App-text-area" />
        <button type="submit" onClick={handleSubmit}>
          Go!
        </button>
      </div>
      <div className="App-response-area">
        {loading && <i>loading...</i>}
        {!loading && response}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Prompt />
    </div>
  );
}

export default App;
