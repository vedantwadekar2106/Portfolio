
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
            // Set the animation
            typingText.style.animation = 'typing 3.5s steps(33) forwards, blink 0.6s step-end infinite alternate';
        }

        // Start initially
        startTyping();

        // Restart after animation ends with a pause
        typingText.addEventListener('animationend', (e) => {
            // Only restart if the typing animation ended (not the blink which is infinite)
            if (e.animationName === 'typing') {
                setTimeout(() => {
                    // Reset the animation by removing and re-adding
                    typingText.style.animation = 'none';
                    // Force reflow
                    void typingText.offsetWidth;
                    startTyping();
                }, 2000); // 2-second pause before restart
            }
        });