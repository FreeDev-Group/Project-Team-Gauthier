"use strict";

/* ==========================================================================
   Contact Page
   Handles client-side validation for the contact form.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contact-project-form");

    if (!form) return;

    const nameInput = form.querySelector("#contact-name");
    const emailInput = form.querySelector("#contact-email");
    const messageInput = form.querySelector("#contact-message");
    const successMessage = form.querySelector(".contact-form__success");

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(input, message) {
        const errorElement = document.querySelector(
            `#${input.id}-error`
        );

        input.setAttribute("aria-invalid", "true");

        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearError(input) {
        const errorElement = document.querySelector(
            `#${input.id}-error`
        );

        input.removeAttribute("aria-invalid");

        if (errorElement) {
            errorElement.textContent = "";
        }
    }

    function validateName() {
        const value = nameInput.value.trim();

        if (!value) {
            showError(nameInput, "Please enter your full name.");
            return false;
        }

        if (value.length < 2) {
            showError(
                nameInput,
                "Please enter at least 2 characters."
            );
            return false;
        }

        clearError(nameInput);
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();

        if (!value) {
            showError(emailInput, "Please enter your email address.");
            return false;
        }

        if (!EMAIL_PATTERN.test(value)) {
            showError(
                emailInput,
                "Please enter a valid email address."
            );
            return false;
        }

        clearError(emailInput);
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();

        if (!value) {
            showError(
                messageInput,
                "Please tell us about your project."
            );
            return false;
        }

        if (value.length < 10) {
            showError(
                messageInput,
                "Please provide at least 10 characters."
            );
            return false;
        }

        clearError(messageInput);
        return true;
    }

    function hideSuccessMessage() {
        if (!successMessage) return;

        successMessage.hidden = true;
        successMessage.textContent = "";
    }

    nameInput.addEventListener("input", () => {
        if (nameInput.hasAttribute("aria-invalid")) {
            validateName();
        }

        hideSuccessMessage();
    });

    emailInput.addEventListener("input", () => {
        if (emailInput.hasAttribute("aria-invalid")) {
            validateEmail();
        }

        hideSuccessMessage();
    });

    messageInput.addEventListener("input", () => {
        if (messageInput.hasAttribute("aria-invalid")) {
            validateMessage();
        }

        hideSuccessMessage();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        hideSuccessMessage();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        const isFormValid =
            isNameValid &&
            isEmailValid &&
            isMessageValid;

        if (!isFormValid) {
            const firstInvalidField = form.querySelector(
                '[aria-invalid="true"]'
            );

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;
        }

        if (successMessage) {
            successMessage.textContent =
                "Thank you. Your information has been validated successfully.";

            successMessage.hidden = false;
        }
    });
});