import { useState, useRef } from "react";
import "./PromptExperience.css";

function PromptForm({ prompt, handleSubmit }) {
  return (
    <form className="PromptForm">
      <textarea name="prompt" ref={prompt} rows="5" />
      <button type="submit" onClick={handleSubmit}>
        Go!
      </button>
    </form>
  );
}

function PromptResponse({ loading, response }) {
  return (
    <div className="PromptResponse">
      {loading && <i>loading...</i>}
      {!loading && response}
    </div>
  );
}

export default function PromptExperience() {
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
      .then((res) => {
        setResponse(res[0].text.trim());
      })
      .catch((error) => {
        console.log("error", error);
        setResponse(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <PromptForm prompt={prompt} handleSubmit={handleSubmit} />
      <PromptResponse loading={loading} response={response} />
    </>
  );
}
