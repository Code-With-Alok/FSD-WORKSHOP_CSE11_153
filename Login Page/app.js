const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!email || !password) {
        message.textContent =
            "Please enter email and password.";

        message.style.color = "red";
        return;
    }

    try {
        message.textContent = "Checking credentials...";
        message.style.color = "#555";

        const response = await fetch(
            "http://localhost:4000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            message.textContent =
                `Login successful. Welcome ${data.user.name}!`;

            message.style.color = "green";
        } else {
            message.textContent =
                data.message || "Login failed.";

            message.style.color = "red";
        }

    } catch (error) {
        message.textContent =
            "Unable to connect to login server.";

        message.style.color = "red";

        console.error(error);
    }
});