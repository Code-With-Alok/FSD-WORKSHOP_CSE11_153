import { useState } from "react";
import "./apiTest.css";

function ApiTest() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000/users");
  const [requestBody, setRequestBody] = useState(`{
  "name": "Alok Sharan",
  "age": 20
}`);
  const [response, setResponse] = useState("Response will appear here...");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    try {
      setLoading(true);
      setResponse("Sending request...");

      let options = {
        method: method,
      };

      if (method === "POST" || method === "PUT") {
        let parsedBody;

        try {
          parsedBody = JSON.parse(requestBody);
        } catch {
          setResponse(
            JSON.stringify(
              {
                error: "Invalid JSON in request body",
              },
              null,
              2
            )
          );
          return;
        }

        options = {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedBody),
        };
      }

      const apiResponse = await fetch(url, options);

      const data = await apiResponse.json();

      setResponse(
        JSON.stringify(
          {
            status: apiResponse.status,
            statusText: apiResponse.statusText,
            data: data,
          },
          null,
          2
        )
      );
    } catch (error) {
      setResponse(
        JSON.stringify(
          {
            error: "Request failed",
            message: error.message,
          },
          null,
          2
        )
      );
    } finally {
      setLoading(false);
    }
  };

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
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
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

export default ApiTest;