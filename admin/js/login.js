/**
 * ============================================================
 * Portfolio Admin Login
 * File: admin/js/login.js
 * ============================================================
 */

"use strict";

/* ============================================================
   CONFIGURATION
============================================================ */

const API_URL = "http://localhost:5000/api/auth/login";

/* ============================================================
   DOM ELEMENTS
============================================================ */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const messageBox = document.getElementById("messageBox");

const loginBtn = document.getElementById("loginBtn");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");

const rememberMe = document.getElementById("rememberMe");

const togglePassword = document.getElementById("togglePassword");

/* ============================================================
   INITIALIZE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    loadRememberedEmail();

    emailInput.focus();

});

/* ============================================================
   SHOW / HIDE PASSWORD
============================================================ */

togglePassword.addEventListener("click", () => {

    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    togglePassword.textContent = isPassword ? "🙈" : "👁";

    togglePassword.setAttribute(
        "aria-label",
        isPassword ? "Hide Password" : "Show Password"
    );

});

/* ============================================================
   FORM SUBMIT
============================================================ */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    clearErrors();

    if (!validateForm()) {
        return;
    }

    await login();

});

/* ============================================================
   VALIDATE FORM
============================================================ */

function validateForm() {

    let valid = true;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {

        showInputError(
            emailInput,
            emailError,
            "Email is required."
        );

        valid = false;

    } else if (!emailRegex.test(email)) {

        showInputError(
            emailInput,
            emailError,
            "Enter a valid email address."
        );

        valid = false;

    }

    if (!password) {

        showInputError(
            passwordInput,
            passwordError,
            "Password is required."
        );

        valid = false;

    } else if (password.length < 6) {

        showInputError(
            passwordInput,
            passwordError,
            "Password must be at least 6 characters."
        );

        valid = false;

    }

    return valid;

}

/* ============================================================
   LOGIN
============================================================ */

async function login() {

    try {

        setLoading(true);

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email: emailInput.value.trim(),

                password: passwordInput.value

            })

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message || "Login failed."
            );

        }

        if (!data.token) {

            throw new Error(
                "JWT token not received."
            );

        }

        /* -------------------------------
           Store Token
        -------------------------------- */

        localStorage.setItem(
            "token",
            data.token
        );

        /* -------------------------------
           Remember Email
        -------------------------------- */

        if (rememberMe.checked) {

            localStorage.setItem(
                "rememberEmail",
                emailInput.value.trim()
            );

        } else {

            localStorage.removeItem(
                "rememberEmail"
            );

        }

        showMessage(
            "Login successful! Redirecting...",
            "success"
        );

        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1200);

    }

    catch (error) {

        console.error(error);

        showMessage(
            error.message,
            "error"
        );

    }

    finally {

        setLoading(false);

    }

}

/* ============================================================
   LOADING BUTTON
============================================================ */

function setLoading(state) {

    loginBtn.disabled = state;

    spinner.classList.toggle(
        "hidden",
        !state
    );

    btnText.textContent = state
        ? "Signing In..."
        : "Login";

}

/* ============================================================
   SHOW INPUT ERROR
============================================================ */

function showInputError(
    input,
    errorElement,
    message
) {

    input.classList.add(
        "input-error"
    );

    errorElement.textContent = message;

}

/* ============================================================
   CLEAR ERRORS
============================================================ */

function clearErrors() {

    emailError.textContent = "";

    passwordError.textContent = "";

    emailInput.classList.remove(
        "input-error"
    );

    passwordInput.classList.remove(
        "input-error"
    );

    messageBox.className = "message-box";

    messageBox.style.display = "none";

    messageBox.textContent = "";

}

/* ============================================================
   SUCCESS / ERROR MESSAGE
============================================================ */

function showMessage(
    message,
    type
) {

    messageBox.style.display = "block";

    messageBox.textContent = message;

    if (type === "success") {

        messageBox.classList.add(
            "message-success"
        );

    } else {

        messageBox.classList.add(
            "message-error"
        );

    }

}

/* ============================================================
   REMEMBER ME
============================================================ */

function loadRememberedEmail() {

    const savedEmail =
        localStorage.getItem(
            "rememberEmail"
        );

    if (savedEmail) {

        emailInput.value = savedEmail;

        rememberMe.checked = true;

    }

}

/* ============================================================
   ENTER KEY SUPPORT
============================================================ */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        document.activeElement.tagName !== "BUTTON"
    ) {

        loginForm.requestSubmit();

    }

});