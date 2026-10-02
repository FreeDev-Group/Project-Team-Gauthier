"use strict";

/* ==========================================================================
   Contact Page
   Handles reveal animations, smooth scrolling, process animation,
   FAQ behavior, form validation, and centered notifications.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initContactReveal();
    initContactSmoothScroll();
    initContactProcess();
    initContactFaq();
    initContactForm();
});


/* ==========================================================================
   Scroll Reveal
   ========================================================================== */

/**
 * Reveals Contact page elements when they enter the viewport.
 */
function initContactReveal() {
    const elements = document.querySelectorAll("[data-contact-reveal]");

    if (!elements.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        elements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    elements.forEach((element) => {
        const delay =
            Number(element.dataset.contactRevealDelay) || 0;

        element.style.setProperty(
            "--contact-reveal-delay",
            `${delay}ms`
        );
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -6% 0px",
        }
    );

    elements.forEach((element) => {
        revealObserver.observe(element);
    });
}


/* ==========================================================================
   Smooth Scroll
   ========================================================================== */

/**
 * Provides smooth scrolling for Contact page anchor links.
 */
function initContactSmoothScroll() {
    const links = document.querySelectorAll("[data-contact-scroll]");

    if (!links.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetSelector = link.getAttribute("href");

            if (
                !targetSelector ||
                !targetSelector.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetSelector);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "start",
            });
        });
    });
}


/* ==========================================================================
   Process Animation
   ========================================================================== */

/**
 * Activates the four process steps sequentially when the section
 * enters the viewport.
 */
function initContactProcess() {
    const process =
        document.querySelector("[data-contact-process]");

    if (!process) {
        return;
    }

    const steps =
        process.querySelectorAll("[data-process-step]");

    if (!steps.length) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const activateProcess = () => {
        process.classList.add("is-active");

        steps.forEach((step, index) => {
            if (prefersReducedMotion) {
                step.classList.add("is-active");
                return;
            }

            window.setTimeout(() => {
                step.classList.add("is-active");
            }, index *350);
        });
    };

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        activateProcess();
        return;
    }

    const processObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                activateProcess();
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.25,
        }
    );

    processObserver.observe(process);
}


/* ==========================================================================
   FAQ
   ========================================================================== */

/**
 * Keeps only one FAQ item open at a time.
 */
function initContactFaq() {
    const faq =
        document.querySelector("[data-contact-faq]");

    if (!faq) {
        return;
    }

    const items =
        faq.querySelectorAll(".contact-faq__item");

    items.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) {
                return;
            }

            items.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });
}


/* ==========================================================================
   Contact Form
   ========================================================================== */

/**
 * Initializes Contact form validation, character counter,
 * button state, and centered notification.
 */
function initContactForm() {
    const form =
        document.querySelector("#contact-project-form");

    if (!form) {
        return;
    }

    const nameInput =
        form.querySelector("#contact-name");

    const emailInput =
        form.querySelector("#contact-email");

    const messageInput =
        form.querySelector("#contact-message");

    const submitButton =
        form.querySelector("[data-contact-submit]");

    const submitLabel =
        form.querySelector("[data-submit-label]");

    const messageCounter =
        form.querySelector("[data-message-counter]");

    const legacySuccessMessage =
        form.querySelector(".contact-form__success");

    const toast =
        document.querySelector("[data-contact-toast]");

    const toastTitle =
        toast?.querySelector("[data-toast-title]");

    const toastMessage =
        toast?.querySelector("[data-toast-message]");

    const toastClose =
        toast?.querySelector("[data-toast-close]");

    /*
     * Required fields must exist before form logic is attached.
     */
    if (
        !nameInput ||
        !emailInput ||
        !messageInput
    ) {
        return;
    }

    const EMAIL_PATTERN =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const MESSAGE_MAX_LENGTH =
        Number(messageInput.getAttribute("maxlength")) ||
        1200;

    let toastTimer = null;


    /* ----------------------------------------------------------------------
       Error helpers
       ---------------------------------------------------------------------- */

    function getErrorElement(input) {
        return document.querySelector(
            `#${input.id}-error`
        );
    }


    function showError(input, message) {
        const errorElement =
            getErrorElement(input);

        input.setAttribute(
            "aria-invalid",
            "true"
        );

        if (errorElement) {
            errorElement.textContent = message;
        }
    }


    function clearError(input) {
        const errorElement =
            getErrorElement(input);

        input.removeAttribute("aria-invalid");

        if (errorElement) {
            errorElement.textContent = "";
        }
    }


    /* ----------------------------------------------------------------------
       Validation
       ---------------------------------------------------------------------- */

    function validateName() {
        const value = nameInput.value.trim();

        if (!value) {
            showError(
                nameInput,
                "Please enter your full name."
            );

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
            showError(
                emailInput,
                "Please enter your email address."
            );

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
        const value =
            messageInput.value.trim();

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

        if (value.length > MESSAGE_MAX_LENGTH) {
            showError(
                messageInput,
                `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`
            );

            return false;
        }

        clearError(messageInput);
        return true;
    }


    /* ----------------------------------------------------------------------
       Character Counter
       ---------------------------------------------------------------------- */

    function updateMessageCounter() {
        if (!messageCounter) {
            return;
        }

        const length =
            messageInput.value.length;

        messageCounter.textContent =
            `${length} / ${MESSAGE_MAX_LENGTH}`;

        messageCounter.classList.toggle(
            "is-near-limit",
            length >= MESSAGE_MAX_LENGTH * 0.9
        );
    }


    /* ----------------------------------------------------------------------
       Toast Notification
       ---------------------------------------------------------------------- */

    function clearToastTimer() {
        if (!toastTimer) {
            return;
        }

        window.clearTimeout(toastTimer);
        toastTimer = null;
    }


    function hideToast() {
        if (!toast) {
            return;
        }

        clearToastTimer();

        toast.classList.remove("is-visible");

        window.setTimeout(() => {
            if (
                !toast.classList.contains(
                    "is-visible"
                )
            ) {
                toast.hidden = true;
            }
        }, 220);
    }


    function showToast(title, message) {
        if (!toast) {
            return;
        }

        clearToastTimer();

        if (toastTitle) {
            toastTitle.textContent = title;
        }

        if (toastMessage) {
            toastMessage.textContent = message;
        }

        toast.hidden = false;

        /*
         * Two animation frames ensure the browser renders the
         * hidden-state removal before applying the visible class.
         */
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                toast.classList.add(
                    "is-visible"
                );
            });
        });

        toastTimer =
            window.setTimeout(
                hideToast,
                4500
            );
    }


    /* ----------------------------------------------------------------------
       Submit Button
       ---------------------------------------------------------------------- */

    function setSubmitState(isSubmitting) {
        if (!submitButton) {
            return;
        }

        submitButton.disabled =
            isSubmitting;

        submitButton.setAttribute(
            "aria-busy",
            String(isSubmitting)
        );

        if (submitLabel) {
            submitLabel.textContent =
                isSubmitting
                    ? "Checking..."
                    : "Send Message";
        }
    }


    /* ----------------------------------------------------------------------
       Input Events
       ---------------------------------------------------------------------- */

    nameInput.addEventListener(
        "input",
        () => {
            if (
                nameInput.hasAttribute(
                    "aria-invalid"
                )
            ) {
                validateName();
            }
        }
    );


    emailInput.addEventListener(
        "input",
        () => {
            if (
                emailInput.hasAttribute(
                    "aria-invalid"
                )
            ) {
                validateEmail();
            }
        }
    );


    messageInput.addEventListener(
        "input",
        () => {
            updateMessageCounter();

            if (
                messageInput.hasAttribute(
                    "aria-invalid"
                )
            ) {
                validateMessage();
            }
        }
    );


    nameInput.addEventListener(
        "blur",
        () => {
            if (nameInput.value.trim()) {
                validateName();
            }
        }
    );


    emailInput.addEventListener(
        "blur",
        () => {
            if (emailInput.value.trim()) {
                validateEmail();
            }
        }
    );


    messageInput.addEventListener(
        "blur",
        () => {
            if (messageInput.value.trim()) {
                validateMessage();
            }
        }
    );


    /* ----------------------------------------------------------------------
       Toast Events
       ---------------------------------------------------------------------- */

    if (toastClose) {
        toastClose.addEventListener(
            "click",
            hideToast
        );
    }

    document.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape" &&
                toast &&
                !toast.hidden
            ) {
                hideToast();
            }
        }
    );


    /* ----------------------------------------------------------------------
       Form Submission
       ---------------------------------------------------------------------- */

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            if (legacySuccessMessage) {
                legacySuccessMessage.hidden = true;
                legacySuccessMessage.textContent = "";
            }

            const isNameValid =
                validateName();

            const isEmailValid =
                validateEmail();

            const isMessageValid =
                validateMessage();

            const isFormValid =
                isNameValid &&
                isEmailValid &&
                isMessageValid;

            if (!isFormValid) {
                const firstInvalidField =
                    form.querySelector(
                        '[aria-invalid="true"]'
                    );

                if (firstInvalidField) {
                    firstInvalidField.focus();
                }

                return;
            }

            /*
             * No backend or external form service is connected yet.
             * Confirm validation only; do not claim message delivery.
             */
            setSubmitState(true);

            window.setTimeout(() => {
                setSubmitState(false);

                showToast(
                    "Information validated",
                    "Your information is ready. Message delivery will be enabled once the contact service is connected."
                );

                form.reset();

                clearError(nameInput);
                clearError(emailInput);
                clearError(messageInput);

                updateMessageCounter();
            }, 450);
        }
    );


    /* ----------------------------------------------------------------------
       Initial State
       ---------------------------------------------------------------------- */

    if (toast) {
        toast.classList.remove("is-visible");
        toast.hidden = true;
    }

    updateMessageCounter();
}
