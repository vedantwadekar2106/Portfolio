/**
 * ============================================================
 * Portfolio Admin Authentication
 * File: admin/js/auth.js
 * ============================================================
 */

"use strict";

/* ============================================================
   CONFIGURATION
============================================================ */

const API_BASE_URL = "http://localhost:5000/api";

/* ============================================================
   GLOBAL ADMIN OBJECT
============================================================ */

window.currentAdmin = null;

/* ============================================================
   GET TOKEN
============================================================ */

function getToken() {
    return localStorage.getItem("token");
}

/* ============================================================
   CHECK LOGIN
============================================================ */

function isLoggedIn() {
    return !!getToken();
}

/* ============================================================
   REDIRECT TO LOGIN
============================================================ */

function redirectToLogin() {

    localStorage.removeItem("token");

    window.location.replace("login.html");

}

/* ============================================================
   VERIFY TOKEN
============================================================ */

async function verifyToken() {

    const token = getToken();

    if (!token) {

        redirectToLogin();
        return false;

    }

    try {

        const response = await fetch(`${API_BASE_URL}/auth/profile`, {

            method: "GET",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.message || "Unauthorized");

        }

        window.currentAdmin = data.admin;

        return true;

    }

    catch (error) {

        console.error("Authentication Error:", error.message);

        redirectToLogin();

        return false;

    }

}

/* ============================================================
   LOAD ADMIN DETAILS
============================================================ */

function loadAdminInfo() {

    if (!window.currentAdmin) return;

    const adminName = document.querySelectorAll("[data-admin-name]");

    adminName.forEach(element => {

        element.textContent = window.currentAdmin.name;

    });

    const adminEmail = document.querySelectorAll("[data-admin-email]");

    adminEmail.forEach(element => {

        element.textContent = window.currentAdmin.email;

    });

    const adminRole = document.querySelectorAll("[data-admin-role]");

    adminRole.forEach(element => {

        element.textContent = window.currentAdmin.role;

    });

}

/* ============================================================
   INITIALIZE AUTH
============================================================ */

async function initializeAuth() {

    const authenticated = await verifyToken();

    if (!authenticated) return;

    loadAdminInfo();

}

/* ============================================================
   LOGOUT
============================================================ */

function logout() {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");

    window.location.href = "login.html";

}

/* ============================================================
   AUTO INITIALIZE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initializeAuth();

});