const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");

loginForm.addEventListener("submit", (event) => {

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

    message.textContent =
        "Login details are ready to be submitted.";

    message.style.color = "green";
});