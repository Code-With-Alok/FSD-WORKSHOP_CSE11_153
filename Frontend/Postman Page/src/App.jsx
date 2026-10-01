import { useState } from "react";
import "./App.css";

function App() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000/users");
  const [requestBody, setRequestBody] = useState(`{
  "name": "Alok",
  "age": 19
}`);
  const [response, setResponse] = useState(
    "Response will appear here..."
  );

  return (
    <div className="app">
      <div className="container">

        <h1>API Tester</h1>
        <p className="subtitle">
          Test GET, POST, PUT and DELETE API requests
        </p>

        <div className="request-bar">

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URL"
          />

          <button
            onClick={() =>
              setResponse(
                `${method} request ready for ${url}`
              )
            }
          >
            Send
          </button>

        </div>

        <div className="section">

          <h2>Request Body</h2>

          <textarea
            value={requestBody}
            onChange={(e) =>
              setRequestBody(e.target.value)
            }
          />

        </div>

        <div className="section">

          <h2>Response</h2>

          <pre className="response">
            {response}
          </pre>

        </div>

      </div>
    </div>
  );
}

export default App;