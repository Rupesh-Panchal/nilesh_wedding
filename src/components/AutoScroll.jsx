import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Slow scroll speed in pixels per second. Lower = slower.
const SPEED = 25;

// Pause after the intro has fully disappeared, before scrolling starts (ms)
const START_DELAY = 800;

// Pause at the bottom before rewinding, and at the top before scrolling again (ms)
const BOTTOM_PAUSE = 1500;
const TOP_PAUSE = 1500;

// How long the fast scroll back to the top takes (ms)
const REWIND_DURATION = 1500;

// After any touch / wheel / key input, auto-scroll waits this long, then continues (ms)
const IDLE_RESUME = 500;

// Language order for each pass. After the last one it loops back to the first.
const LANGUAGE_ORDER = ["mr", "hi", "en"];

// A page with less scrollable height than this is treated as "still rendering"
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

    // Keep the latest i18n in a ref so the effect below never has to re-run
    const i18nRef = useRef(i18n);
    i18nRef.current = i18n;

    useEffect(() => {
        console.log("[AutoScroll] mounted");

        const html = document.documentElement;

        let rafId = null;
        let enabledAt = Infinity; // time when auto-scroll is allowed to begin
        let pausedUntil = 0; // visitor input pushes this forward
        let wasPaused = true; // true -> re-sync from the real scroll position

        let phase = "down";
        let phaseStart = 0;
        let last = performance.now();
        let pos = 0;
        let upFrom = 0;

        const goTo = (nextPhase, now) => {
            log("phase ->", nextPhase, "| lang:", i18nRef.current.language);
            phase = nextPhase;
            phaseStart = now;
        };

        const nextLanguage = () => {
            const current = (i18nRef.current.resolvedLanguage || i18nRef.current.language || "mr").split("-")[0];
            const index = LANGUAGE_ORDER.indexOf(current);
            return LANGUAGE_ORDER[(index + 1) % LANGUAGE_ORDER.length];
        };

        const step = (now) => {
            const maxScroll = getMaxScroll();
            const dt = Math.min((now - last) / 1000, 0.1);

            // Page is still re-rendering (for example right after a language switch): wait
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

                    // One full pass finished: switch language while at the top
                    i18nRef.current.changeLanguage(nextLanguage());

                    goTo("topPause", now);
                }
            } else if (phase === "topPause") {
                if (now - phaseStart >= TOP_PAUSE) {
                    window.scrollTo({ top: 0, behavior: "instant" });
                    pos = 0;
                    goTo("down", now);
                }
            }
        };

        // ONE loop that runs for the whole life of the page and never stops
        const frame = (now) => {
            // Schedule the next frame first, so nothing below can ever kill the loop
            rafId = requestAnimationFrame(frame);

            try {
                if (now < enabledAt) {
                    last = now;
                    return;
                }

                // Visitor is interacting: do nothing, just remember that we were paused
                if (now < pausedUntil) {
                    wasPaused = true;
                    last = now;
                    return;
                }

                // Coming back from a pause (or the very first run): continue from the real position
                if (wasPaused) {
                    wasPaused = false;
                    last = now;
                    pos = window.scrollY;
                    goTo("down", now);
                    return;
                }

                step(now);
                last = now;
            } catch (error) {
                console.error("[AutoScroll] error in frame:", error);
            }
        };

        // Any real input pauses auto-scroll for IDLE_RESUME ms, then it continues by itself
        const onUserInput = () => {
            pausedUntil = performance.now() + IDLE_RESUME;
        };

        const onMouseDown = (e) => {
            // A mousedown directly on <html> is the page scrollbar
            if (e.target === html) onUserInput();
        };

        // Fired by IntroAnimation only after the intro has fully faded out and been removed
        const onIntroComplete = () => {
            log("intro complete -> starting soon");
            enabledAt = performance.now() + START_DELAY;
            wasPaused = true;
        };

        window.addEventListener("wedding-intro-complete", onIntroComplete);
        window.addEventListener("wheel", onUserInput, { passive: true });
        window.addEventListener("touchstart", onUserInput, { passive: true });
        window.addEventListener("touchmove", onUserInput, { passive: true });
        window.addEventListener("touchend", onUserInput, { passive: true });
        window.addEventListener("keydown", onUserInput);
        window.addEventListener("mousedown", onMouseDown);

        // Intro already finished before this component mounted (e.g. after a hot reload)
        if (window.__weddingIntroComplete) onIntroComplete();

        rafId = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("wedding-intro-complete", onIntroComplete);
            window.removeEventListener("wheel", onUserInput);
            window.removeEventListener("touchstart", onUserInput);
            window.removeEventListener("touchmove", onUserInput);
            window.removeEventListener("touchend", onUserInput);
            window.removeEventListener("keydown", onUserInput);
            window.removeEventListener("mousedown", onMouseDown);
        };
    }, []);

    return null; // no UI at all
};

export default AutoScroll;
