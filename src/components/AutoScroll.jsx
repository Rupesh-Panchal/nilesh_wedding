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

// If the visitor scrolls manually, auto-scroll resumes after this much idle time (ms).
// Set to 0 to stay stopped after the visitor takes control.
const IDLE_RESUME = 8000;

// Language order for each pass. After the last one it loops back to the first.
const LANGUAGE_ORDER = ["mr", "hi", "en"];

// A page shorter than this (px of scrollable height) is treated as "still rendering"
const MIN_SCROLLABLE = 200;

// Set to false once everything works
const DEBUG = true;

const log = (...args) => DEBUG && console.log("[AutoScroll]", ...args);

const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

const getMaxScroll = () => {
    const html = document.documentElement;
    const body = document.body;
    const height = Math.max(html.scrollHeight, body ? body.scrollHeight : 0);
    return height - window.innerHeight;
};

const AutoScroll = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const html = document.documentElement;

        let rafId = null;
        let startTimer = null;
        let resumeTimer = null;
        let watchdog = null;
        let active = false; // becomes true once the intro is finished
        let looping = false;

        let phase = "down";
        let phaseStart = 0;
        let last = 0;
        let lastFrameAt = 0;
        let pos = 0;
        let upFrom = 0;

        const goTo = (nextPhase, now) => {
            log("phase ->", nextPhase, "| lang:", i18n.language);
            phase = nextPhase;
            phaseStart = now;
        };

        // Next language in the order, based on whatever is selected right now
        const nextLanguage = () => {
            const current = (i18n.resolvedLanguage || i18n.language || "mr").split("-")[0];
            const index = LANGUAGE_ORDER.indexOf(current);
            return LANGUAGE_ORDER[(index + 1) % LANGUAGE_ORDER.length];
        };

        const step = (now) => {
            const maxScroll = getMaxScroll();
            const dt = Math.min((now - last) / 1000, 0.1); // clamp after tab switches
            last = now;

            // Page is still re-rendering (e.g. right after a language switch): wait
            if (maxScroll < MIN_SCROLLABLE) return;

            if (phase === "down") {
                pos = Math.min(pos + SPEED * dt, maxScroll);
                window.scrollTo({ top: pos, behavior: "instant" });

                if (pos >= maxScroll - 1) goTo("bottomPause", now);
            } else if (phase === "bottomPause") {
                if (now - phaseStart >= BOTTOM_PAUSE) {
                    upFrom = window.scrollY;
                    goTo("up", now);
                }
            } else if (phase === "up") {
                const progress = Math.min((now - phaseStart) / REWIND_DURATION, 1);
                pos = upFrom * (1 - easeInOutCubic(progress));
                window.scrollTo({ top: pos, behavior: "instant" });

                if (progress >= 1) {
                    pos = 0;
                    window.scrollTo({ top: 0, behavior: "instant" });

                    // One full pass finished: switch language while at the top of the page
                    i18n.changeLanguage(nextLanguage());

                    goTo("topPause", now);
                }
            } else if (phase === "topPause") {
                if (now - phaseStart >= TOP_PAUSE) {
                    // Page has re-rendered in the new language: start the next pass cleanly
                    window.scrollTo({ top: 0, behavior: "instant" });
                    pos = 0;
                    goTo("down", now);
                }
            }
        };

        const frame = (now) => {
            if (!looping) return;
            lastFrameAt = now;

            try {
                step(now);
            } catch (error) {
                // Never let an error kill the loop
                console.error("[AutoScroll] error in frame:", error);
            }

            rafId = requestAnimationFrame(frame);
        };

        const beginLoop = () => {
            cancelAnimationFrame(rafId);
            looping = true;

            // Make sure CSS smooth scrolling can't fight our per-frame movement
            html.style.scrollBehavior = "auto";

            last = performance.now();
            lastFrameAt = last;
            pos = window.scrollY;
            goTo("down", last);

            rafId = requestAnimationFrame(frame);
        };

        const pauseLoop = () => {
            looping = false;
            cancelAnimationFrame(rafId);
            html.style.scrollBehavior = "";
        };

        // Real visitor scrolling only (wheel, finger drag, keyboard, scrollbar drag).
        // Taps on buttons, the language dropdown, etc. do NOT stop auto-scroll.
        const onUserScroll = () => {
            if (!active) return;

            log("visitor input -> paused");
            pauseLoop();
            clearTimeout(resumeTimer);

            if (IDLE_RESUME > 0) {
                resumeTimer = setTimeout(beginLoop, IDLE_RESUME);
            }
        };

        const onMouseDown = (e) => {
            // A mousedown directly on <html> is the page scrollbar
            if (e.target === html) onUserScroll();
        };

        // Fired by IntroAnimation only after the intro has fully faded out and been removed
        const onIntroComplete = () => {
            active = true;
            clearTimeout(startTimer);
            startTimer = setTimeout(beginLoop, START_DELAY);
        };

        // Watchdog: if the loop should be running but frames stopped, restart it
        watchdog = setInterval(() => {
            if (looping && performance.now() - lastFrameAt > 2000) {
                log("watchdog: frames stopped, restarting loop");
                beginLoop();
            }
        }, 1000);

        window.addEventListener("wedding-intro-complete", onIntroComplete);
        window.addEventListener("wheel", onUserScroll, { passive: true });
        window.addEventListener("touchmove", onUserScroll, { passive: true });
        window.addEventListener("keydown", onUserScroll);
        window.addEventListener("mousedown", onMouseDown);

        return () => {
            window.removeEventListener("wedding-intro-complete", onIntroComplete);
            window.removeEventListener("wheel", onUserScroll);
            window.removeEventListener("touchmove", onUserScroll);
            window.removeEventListener("keydown", onUserScroll);
            window.removeEventListener("mousedown", onMouseDown);
            clearTimeout(startTimer);
            clearTimeout(resumeTimer);
            clearInterval(watchdog);
            pauseLoop();
        };
    }, [i18n]);

    return null; // no UI at all
};

export default AutoScroll;
