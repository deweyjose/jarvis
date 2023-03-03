import { useState, useRef, useEffect } from "react";
import "./PromptExperience.css";


function PromptForm({ prompt, handleSubmit, speachRate, speachEnabled }) {
  return (
    <div className="PromptForm">
      <textarea name="prompt" ref={prompt} rows="5" />
      <div className="PromptFormControls">
        <div className="PromptFormAudioControls">
          <div className="PromptFormAudioControl">
            <label for="rate" className="PromptFormLabel">Speach Rate: </label>
            <input type="range" ref={speachRate} min="0" max="2" step="0.1" defaultValue="1.5" name="rate" />
          </div>
          <div className="PromptFormAudioControl">
            <label className="PromptFormLabel">Speach Enabled:</label>
            <input type="checkbox" ref={speachEnabled} defaultChecked="true" />
          </div>
        </div>
        <div className="PromptFormButton">
          <button type="submit" onClick={handleSubmit}>
            Go!
          </button>
        </div>
      </div>
    </div>
  );
}

function PromptResponse({ loading, speak, response, speachRate, speachEnabled }) {
  useEffect(() => {
    if (!loading && speachEnabled.current.checked) {
      speak(response, speachRate.current.value);
    }
  });

  return (
    <div className="PromptResponse">
      {loading && <i>loading...</i>}
      {!loading && response}
    </div>
  );
}

export default function PromptExperience() {
  const prompt = useRef(null);
  const speachRate = useRef(null);
  const speachEnabled = useRef(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const speak = (text, speed) => {

    const msg = new SpeechSynthesisUtterance(text);
    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
    }

    const voices = synth.getVoices();
    msg.voice = voices[7];
    msg.rate = speed;
    synth.speak(msg);
  };

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
      <PromptForm prompt={prompt} handleSubmit={handleSubmit} speachRate={speachRate} speachEnabled={speachEnabled} />
      <PromptResponse loading={loading} speak={speak} response={response} speachRate={speachRate} speachEnabled={speachEnabled} />
    </>
  );
}
