import { useEffect } from "react";

// Slow scroll speed in pixels per second. Lower = slower.
const SPEED = 40;

// Wait for the intro fade-out (1s) plus a short pause before scrolling starts
const START_DELAY = 1800;

// Pause at the bottom before rewinding, and at the top before scrolling again (ms)
const BOTTOM_PAUSE = 1500;
const TOP_PAUSE = 1500;

// How long the fast scroll back to the top takes (ms)
const REWIND_DURATION = 1500;

const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const AutoScroll = () => {
    useEffect(() => {
        let rafId = null;
        let startTimer = null;
        let running = false;
        let cleanupInteraction = () => {};

        const stop = () => {
            running = false;
            cancelAnimationFrame(rafId);
            cleanupInteraction();
            cleanupInteraction = () => {};
        };

        const start = () => {
            if (running) return;
            running = true;

            let last = performance.now();
            let pos = window.scrollY; // keep the fractional position ourselves

            // Phases: "down" -> "bottomPause" -> "up" -> "topPause" -> "down" ...
            let phase = "down";
            let phaseStart = last;
            let upFrom = 0;

            const goTo = (nextPhase, now) => {
                phase = nextPhase;
                phaseStart = now;
            };

            const tick = (now) => {
                if (!running) return;

                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

                // Visitor moved the page themselves (scrollbar drag, nav tab click, etc.)
                if (Math.abs(window.scrollY - pos) > 5) {
                    stop();
                    return;
                }

                const dt = Math.min((now - last) / 1000, 0.1); // clamp after tab switches
                last = now;

                if (phase === "down") {
                    pos = Math.min(pos + SPEED * dt, maxScroll);
                    // "instant" overrides the CSS scroll-behavior: smooth on <html>
                    window.scrollTo({ top: pos, behavior: "instant" });

                    if (pos >= maxScroll - 1) goTo("bottomPause", now);
                } else if (phase === "bottomPause") {
                    if (now - phaseStart >= BOTTOM_PAUSE) {
                        upFrom = pos;
                        goTo("up", now);
                    }
                } else if (phase === "up") {
                    const progress = Math.min((now - phaseStart) / REWIND_DURATION, 1);
                    pos = upFrom * (1 - easeInOutCubic(progress));
                    window.scrollTo({ top: pos, behavior: "instant" });

                    if (progress >= 1) {
                        pos = 0;
                        goTo("topPause", now);
                    }
                } else if (phase === "topPause") {
                    if (now - phaseStart >= TOP_PAUSE) goTo("down", now);
                }

                rafId = requestAnimationFrame(tick);
            };

            // Any user interaction stops auto-scroll for good
            const events = ["wheel", "touchstart", "mousedown", "keydown"];
            events.forEach((ev) => window.addEventListener(ev, stop, { passive: true }));
            cleanupInteraction = () => events.forEach((ev) => window.removeEventListener(ev, stop));

            rafId = requestAnimationFrame(tick);
        };

        // Fired by IntroAnimation when the visitor taps ENTER
        const onEnter = () => {
            clearTimeout(startTimer);
            startTimer = setTimeout(start, START_DELAY);
        };

        window.addEventListener("wedding-start", onEnter);

        return () => {
            window.removeEventListener("wedding-start", onEnter);
            clearTimeout(startTimer);
            stop();
        };
    }, []);

    return null; // no UI at all
};

export default AutoScroll;
