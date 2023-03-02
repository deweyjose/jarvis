import { useState } from 'react';
import './App.css';

function Prompt() {

  const [inputs, setInputs] = useState({
    loading: false,
    prompt: '',
    response: ''
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputs(values => ({ ...values, loading: true }));
    fetch('https://sm6bgqavpagpz4i5c4nl5ty2c40dnudl.lambda-url.us-east-1.on.aws/', {
      method: "POST",
      body: JSON.stringify({ prompt: inputs.prompt })
    })
      .then(response => response.json())
      .then((response) => {
        setInputs(values => ({ ...values, loading: false, response: response[0].text.trim() }))
      }, (error) => {
        console.log('error', error);
        setInputs(values => ({ ...values, response: error.message }))
      })
  }

  return (
    (<div className="App-container">
      <div className='App-greeting'>
        My name is Jarvis. <br /> What's on your mind?
      </div>
      <div className="App-form">
        <textarea name="prompt" onChange={handleChange} value={inputs.prompt} className="App-text-area" />
        <button type="submit" onClick={handleSubmit}>Go!</button>
      </div>
      <div className="App-response-area">
        {inputs.loading && <i>loading...</i>}
        {!inputs.loading && inputs.response}
      </div>

    </div >)
  )
}

function App() {
  return (
    <div className="App">
      <Prompt />
    </div>
  );
}

export default App;
