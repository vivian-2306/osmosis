document.addEventListener("DOMContentLoaded", function () {
    const loginBox = document.getElementById("login-box");
    const registerBox = document.getElementById("register-box");
    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");
    const registerForm = document.getElementById("register-form");
    const password = document.getElementById("reg-password");
    const confirmPassword = document.getElementById("confirm-password");
    const passwordError = document.getElementById("password-error");

    showRegister.addEventListener("click", function (event) {
        event.preventDefault();
        loginBox.classList.add("hidden");
        registerBox.classList.remove("hidden");
    });

    showLogin.addEventListener("click", function (event) {
        event.preventDefault();
        registerBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    });

    registerForm.addEventListener("submit", function (event) {
        if (password.value !== confirmPassword.value) {
            event.preventDefault(); 
            passwordError.textContent = "Passwords do not match!";
            passwordError.style.display = "block";
        } else {
            passwordError.style.display = "none";
        }
    });
});
