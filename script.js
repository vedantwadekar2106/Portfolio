
        // ─── HAMBURGER TOGGLE ───
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });

        // ─── TYPING ANIMATION LOOP ───
        const typingText = document.getElementById('typingText');

        function startTyping() {
            typingText.style.animation = 'typing 3.5s steps(33) forwards, blink 0.6s step-end infinite alternate';
        }

        startTyping();

        typingText.addEventListener('animationend', (e) => {
            if (e.animationName === 'typing') {
                setTimeout(() => {
                    typingText.style.animation = 'none';
                    void typingText.offsetWidth;
                    startTyping();
                }, 2000);
            }
        });

        // ─── CONTACT FORM HANDLING ───
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const statusDiv = document.getElementById('formStatus');

        // Helper to show status
        function showStatus(message, type) {
            statusDiv.textContent = message;
            statusDiv.className = 'form-status ' + type;
            // Auto-hide after 6 seconds
            clearTimeout(statusDiv._hideTimer);
            statusDiv._hideTimer = setTimeout(() => {
                statusDiv.className = 'form-status';
                statusDiv.textContent = '';
            }, 6000);
        }

        // Real-time validation feedback on blur
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = '#ff6b6b';
                } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = 'rgba(255,255,255,.08)';
                }
            });
            input.addEventListener('input', () => {
                if (input.style.borderColor === '#ff6b6b') {
                    if (input.hasAttribute('required') && !input.value.trim()) return;
                    if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) return;
                    input.style.borderColor = 'rgba(255,255,255,.08)';
                }
            });
        });

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            // ── Gather data ──
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // ── Validate ──
            if (!name) {
                showStatus('Please enter your full name.', 'error');
                document.getElementById('fullName').focus();
                return;
            }
            if (!email) {
                showStatus('Please enter your email address.', 'error');
                document.getElementById('email').focus();
                return;
            }
            if (!isValidEmail(email)) {
                showStatus('Please enter a valid email address.', 'error');
                document.getElementById('email').focus();
                return;
            }
            if (!message) {
                showStatus('Please write your message.', 'error');
                document.getElementById('message').focus();
                return;
            }

            // ── Disable button & show sending state ──
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                Sending...
            `;

try {

    const response = await fetch("https://portfolio-x1q6.onrender.com/api/contact", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            fullName: name,
            email: email,
            phone: phone,
            message: message
        })
    });

    const result = await response.json();

    if (response.ok) {

        showStatus(
            "✅ Thank you, " +
            name +
            "! Your message has been sent successfully. I'll get back to you soon.",
            "success"
        );

        form.reset();

        inputs.forEach(inp => {
            inp.style.borderColor = "rgba(255,255,255,.08)";
        });

    } else {

        if (result.errors) {

            showStatus(result.errors[0].msg, "error");

        } else {

            showStatus(result.message || "Something went wrong.", "error");

        }

    }

} catch (error) {

    console.error(error);

    showStatus(
        "Unable to connect to the server. Please try again later.",
        "error"
    );

} finally {

    submitBtn.disabled = false;

    submitBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
        Send Message
    `;

}
        });

        // ─── Add spin animation keyframes via style ───
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styleSheet);
