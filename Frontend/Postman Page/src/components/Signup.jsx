import { useState } from "react";
import axios from "axios";
import "./signup.css";

const API_URL = "/api";

function Signup({ onSignupSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post(`${API_URL}/create`, {
        name,
        email,
        password,
      });

      alert("Signup successful");

      setName("");
      setEmail("");
      setPassword("");

      onSignupSuccess();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.error ||
          "Unable to connect to backend server"
      );
    }
  }

  return (
    <main className="signup-page">
      <section className="signup-card">
        <h1>Create your account</h1>
        <p>FSD Workshop - React Signup</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 6 characters"
            minLength="6"
            required
          />

          <button type="submit">Sign Up</button>
        </form>
      </section>
    </main>
  );
}

export default Signup;