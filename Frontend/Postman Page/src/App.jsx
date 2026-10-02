import { useState } from "react";
import Signup from "./components/Signup.jsx";
import User from "./components/user.jsx";

function App() {
  const [page, setPage] = useState("signup");

  if (page === "dashboard") {
    return (
      <User
        onSignOut={() => setPage("signup")}
      />
    );
  }

  return (
    <Signup
      onSignupSuccess={() => setPage("dashboard")}
    />
  );
}

export default App;