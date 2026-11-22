import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Slow scroll speed in pixels per second. Lower = slower.
const SPEED = 40;

// Short pause after the intro has fully disappeared, before scrolling starts
const START_DELAY = 800;

// Pause at the bottom before rewinding, and at the top before scrolling again (ms)
const BOTTOM_PAUSE = 1500;
const TOP_PAUSE = 1500;

// How long the fast scroll back to the top takes (ms)
const REWIND_DURATION = 1500;

// Language for each pass, in order. After the last one it loops back to the first.
const LANGUAGE_ORDER = ["mr", "hi", "en"];

const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const getMaxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

const AutoScroll = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        let rafId = null;
        let startTimer = null;
        let running = false;
        let langIndex = 0;
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

            // First pass always starts in Marathi
            langIndex = 0;
            i18n.changeLanguage(LANGUAGE_ORDER[langIndex]);

            let last = performance.now();
            let pos = window.scrollY;
            let lastMax = getMaxScroll();

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

                const maxScroll = getMaxScroll();

                // If the page height changed (language switch, images/map loading),
                // the browser may have nudged scrollY. That is NOT the visitor, so re-sync.
                if (Math.abs(maxScroll - lastMax) > 1) {
                    lastMax = maxScroll;
                    pos = Math.min(window.scrollY, maxScroll);
                }

                // Only treat a position mismatch as "visitor scrolled" while actively moving
                const moving = phase === "down" || phase === "up";
                if (moving && Math.abs(window.scrollY - pos) > 20) {
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
                    // Keep our position in sync while waiting
                    pos = window.scrollY;
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
                        window.scrollTo({ top: 0, behavior: "instant" });

                        // One full pass is done: switch to the next language while at the top
                        langIndex = (langIndex + 1) % LANGUAGE_ORDER.length;
                        i18n.changeLanguage(LANGUAGE_ORDER[langIndex]);

                        goTo("topPause", now);
                    }
                } else if (phase === "topPause") {
                    if (now - phaseStart >= TOP_PAUSE) {
                        // Force a clean start for the next pass after the re-render settled
                        window.scrollTo({ top: 0, behavior: "instant" });
                        pos = 0;
                        lastMax = getMaxScroll();
                        goTo("down", now);
                    }
                }

                rafId = requestAnimationFrame(tick);
            };

            // Any user interaction stops auto-scroll for good
            const events = ["wheel", "touchstart", "mousedown", "keydown"];
            events.forEach((ev) => window.addEventListener(ev, stop, { passive: true }));
            cleanupInteraction = () => events.forEach((ev) => window.removeEventListener(ev, stop));

            rafId = requestAnimationFrame(tick);
        };

        // Fired by IntroAnimation only after the intro has fully faded out and been removed
        const onIntroComplete = () => {
            clearTimeout(startTimer);
            startTimer = setTimeout(start, START_DELAY);
        };

        window.addEventListener("wedding-intro-complete", onIntroComplete);

        return () => {
            window.removeEventListener("wedding-intro-complete", onIntroComplete);
            clearTimeout(startTimer);
            stop();
        };
    }, [i18n]);

    return null; // no UI at all
};

export default AutoScroll;
