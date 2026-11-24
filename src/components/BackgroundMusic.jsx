import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconChevron, IconMusic } from "./ornaments/icons";
import ramayanaAudio from "../assets/ramayana.mp3";

// Create ONE audio instance
const weddingAudio = new Audio(ramayanaAudio);
weddingAudio.loop = true;
weddingAudio.volume = 0.7;
weddingAudio.preload = "auto";

const languages = [
    { code: "mr", label: "मराठी", sub: "Marathi" },
    { code: "hi", label: "हिंदी", sub: "Hindi" },
    { code: "en", label: "English", sub: "English" },
];

/* Shared "kumkum + gold" look, same family as the ENTER button */
const kumkumSurface = {
    background: "linear-gradient(135deg, #7b1c1c, #5b0309 60%, #3a0409)",
    boxShadow: "0 10px 24px -10px rgba(91,3,9,0.75), inset 0 0 0 3px #5b0309, inset 0 0 0 4px rgba(236,212,138,0.45)",
};

/* Small gold diamond used as the "selected" marker */
const GoldDiamond = () => <span aria-hidden="true" className="inline-block h-2 w-2 shrink-0 rotate-45 bg-gold-light shadow-[0_0_6px_rgba(236,212,138,0.9)]" />;

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [showMusicButton, setShowMusicButton] = useState(() => typeof window !== "undefined" && !!window.__weddingIntroComplete);

    const langRef = useRef(null);
    const { i18n } = useTranslation();

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "mr").split("-")[0];
    const currentLangLabel = languages.find((l) => l.code === currentLanguage)?.label || "मराठी";

    useEffect(() => {
        const syncState = () => setIsPlaying(!weddingAudio.paused);

        weddingAudio.addEventListener("play", syncState);
        weddingAudio.addEventListener("pause", syncState);
        weddingAudio.addEventListener("ended", syncState);

        // Show music button after visitor clicks ENTER
        const handleWeddingStart = async () => {
            setShowMusicButton(true);

            // Do not start if the user has already paused it
            if (!weddingAudio.paused) return;

            try {
                await weddingAudio.play();
            } catch (error) {
                console.error("Music playback failed:", error);
            }
        };

        window.addEventListener("wedding-start", handleWeddingStart);

        return () => {
            weddingAudio.removeEventListener("play", syncState);
            weddingAudio.removeEventListener("pause", syncState);
            weddingAudio.removeEventListener("ended", syncState);
            window.removeEventListener("wedding-start", handleWeddingStart);
        };
    }, []);

    // Close language dropdown when tapping outside or pressing Escape
    useEffect(() => {
        const handleOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };
        const handleEscape = (event) => {
            if (event.key === "Escape") setIsLangOpen(false);
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside, { passive: true });
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const toggleMusic = async () => {
        if (!weddingAudio.paused) {
            weddingAudio.pause();
            return;
        }

        try {
            await weddingAudio.play();
        } catch (error) {
            console.error("Music playback failed:", error);
        }
    };

    const selectLanguage = (code) => {
        i18n.changeLanguage(code);
        try {
            window.localStorage.setItem("i18nextLng", code);
        } catch {
            // Ignore storage restrictions
        }
        setIsLangOpen(false);
    };

    const barHeights = [10, 16, 12, 18, 11];

    return (
        <>
            <style>{`
                @keyframes mandala-spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes diya-glow {
                    0%, 100% { opacity: 0.45; transform: scale(1); }
                    50%      { opacity: 0.9;  transform: scale(1.18); }
                }
                @keyframes music-bar {
                    0%, 100% { transform: scaleY(0.4); }
                    50%      { transform: scaleY(1); }
                }
                @keyframes lang-pop {
                    from { opacity: 0; transform: translateY(8px) scale(0.96); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .music-anim, .lang-anim { animation: none !important; }
                }
            `}</style>

            {/* LEFT: Language dropdown */}
            <div ref={langRef} className="fixed bottom-[calc(2.25rem+env(safe-area-inset-bottom))] left-5 z-[99999] select-none md:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]">
                {isLangOpen && (
                    <div
                        role="listbox"
                        aria-label="Choose language"
                        className="lang-anim absolute bottom-full left-0 mb-3 w-52 origin-bottom-left rounded-[1.4rem] border border-gold bg-cream p-1.5 shadow-[0_22px_50px_-18px_rgba(91,3,9,0.55),0_4px_14px_-6px_rgba(141,107,15,0.4)]"
                        style={{ animation: "lang-pop 0.22s cubic-bezier(0.22,1,0.36,1) both" }}
                    >
                        {/* inner gold hairline, like the invitation frame */}
                        <div className="rounded-[1.1rem] border border-gold/45 bg-gradient-to-b from-ivory to-parchment/70 p-1.5">
                            {/* tiny ornamental header */}
                            <div aria-hidden="true" className="mb-1 flex items-center justify-center gap-2 px-2 pt-0.5">
                                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
                                <span className="text-[11px] leading-none text-gold-deep">❋</span>
                                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
                            </div>

                            <div className="flex flex-col gap-1">
                                {languages.map((language) => {
                                    const isActive = currentLanguage === language.code;

                                    return (
                                        <button
                                            key={language.code}
                                            type="button"
                                            role="option"
                                            aria-selected={isActive}
                                            onClick={() => selectLanguage(language.code)}
                                            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2 text-left transition-all duration-200 ${
                                                isActive ? "border border-gold text-gold-light" : "border border-transparent text-kumkum hover:border-gold/50 hover:bg-gold-light/30"
                                            }`}
                                            style={
                                                isActive
                                                    ? { background: "linear-gradient(135deg, #7b1c1c, #5b0309 70%)", boxShadow: "inset 0 0 0 2px #5b0309, inset 0 0 0 3px rgba(236,212,138,0.35)" }
                                                    : undefined
                                            }
                                        >
                                            <span className="flex flex-col">
                                                <span className="font-devanagari text-[17px] leading-tight">{language.label}</span>
                                                <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] leading-tight ${isActive ? "text-gold-light/75" : "text-gold-deep/80"}`}>
                                                    {language.sub}
                                                </span>
                                            </span>
                                            {isActive && <GoldDiamond />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => setIsLangOpen((o) => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={isLangOpen}
                    aria-label="Change language"
                    className="group relative flex h-12 items-center gap-2.5 overflow-hidden rounded-full border border-gold pl-4 pr-3.5 text-gold-light transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    style={kumkumSurface}
                >
                    {/* soft gold sheen on hover */}
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-light/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <span aria-hidden="true" className="relative font-heading text-lg leading-none text-gold-light">
                        अ
                    </span>

                    <span className="relative font-devanagari text-[16px] leading-none tracking-wide">{currentLangLabel}</span>

                    <IconChevron className={`relative h-4 w-4 text-gold-light/80 transition-transform duration-300 ${isLangOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
            </div>

            {/* RIGHT: Music button - hidden during intro */}
            {showMusicButton && (
                <button
                    type="button"
                    onClick={toggleMusic}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                    title={isPlaying ? "Pause music" : "Play music"}
                    className="group fixed bottom-[calc(2.25rem+env(safe-area-inset-bottom))] right-5 z-[99999] flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold-light transition-all duration-300 hover:scale-105 active:scale-95 md:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]"
                    style={kumkumSurface}
                >
                    {/* Warm diya-style glow while playing (gold only, no rainbow) */}
                    {isPlaying && (
                        <span
                            aria-hidden="true"
                            className="music-anim pointer-events-none absolute -inset-2 rounded-full"
                            style={{
                                background: "radial-gradient(circle, rgba(236,212,138,0.55) 0%, rgba(197,160,40,0.25) 45%, transparent 70%)",
                                animation: "diya-glow 2.4s ease-in-out infinite",
                                zIndex: -1,
                            }}
                        />
                    )}

                    {/* Slow-turning dashed gold ring, like the mandala around the Om */}
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 56 56"
                        className="music-anim pointer-events-none absolute inset-0 h-full w-full"
                        style={{ animation: isPlaying ? "mandala-spin 14s linear infinite" : "none", opacity: isPlaying ? 1 : 0.55, transition: "opacity 0.5s" }}
                    >
                        <circle cx="28" cy="28" r="23.5" fill="none" stroke="#ecd48a" strokeWidth="1" strokeDasharray="1.5 4.2" strokeLinecap="round" />
                    </svg>

                    {/* Icon or equalizer */}
                    {isPlaying ? (
                        <span className="relative flex h-5 items-end justify-center gap-[3px]" aria-hidden="true">
                            {barHeights.map((h, i) => (
                                <span
                                    key={i}
                                    className="music-anim w-[2.5px] rounded-full bg-gold-light"
                                    style={{
                                        height: `${h}px`,
                                        transformOrigin: "bottom",
                                        animation: "music-bar 1s ease-in-out infinite",
                                        animationDelay: `${i * 0.14}s`,
                                    }}
                                />
                            ))}
                        </span>
                    ) : (
                        <IconMusic className="relative h-6 w-6" strokeWidth={1.5} />
                    )}
                </button>
            )}
        </>
    );
};

export default BackgroundMusic;
