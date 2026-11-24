import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconChevron, IconCheck, IconMusic, IconPause } from "./ornaments/icons";
import ramayanaAudio from "../assets/ramayana.mp3";

// Create ONE audio instance
const weddingAudio = new Audio(ramayanaAudio);
weddingAudio.loop = true;
weddingAudio.volume = 0.7;
weddingAudio.preload = "auto";

const languages = [
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "English" },
];

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

    // Close language dropdown when tapping outside
    useEffect(() => {
        const handleOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside, {
            passive: true,
        });

        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
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
        setIsLangOpen(false);
    };

    return (
        <>
            {/* ── Disco equalizer / glow keyframes ── */}
            <style>{`
                @keyframes disco-spin {
                    0%   { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes disco-pulse {
                    0%, 100% { opacity: 0.35; transform: scale(1); }
                    50%      { opacity: 0.75; transform: scale(1.15); }
                }
                @keyframes disco-bar {
                    0%, 100% { transform: scaleY(0.35); }
                    50%      { transform: scaleY(1); }
                }
            `}</style>

            {/* LEFT: Language dropdown */}
            <div ref={langRef} className="fixed bottom-[calc(2.25rem+env(safe-area-inset-bottom))] left-5 z-[99999] md:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]">
                {isLangOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-40 overflow-hidden rounded-2xl border border-gold/70 bg-ivory/95 py-1 shadow-gilt backdrop-blur-md">
                        {languages.map((language) => {
                            const isActive = currentLanguage === language.code;

                            return (
                                <button
                                    key={language.code}
                                    type="button"
                                    onClick={() => selectLanguage(language.code)}
                                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-base transition-colors ${
                                        isActive ? "bg-kumkum text-gold-light" : "text-kumkum hover:bg-parchment"
                                    }`}
                                >
                                    {language.label}
                                    {isActive && <IconCheck className="h-4 w-4" />}
                                </button>
                            );
                        })}
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => setIsLangOpen((o) => !o)}
                    aria-haspopup="listbox"
                    aria-expanded={isLangOpen}
                    aria-label="Change language"
                    className="group relative flex h-12 items-center gap-2 overflow-hidden rounded-full border border-gold/70 bg-ivory/95 px-4 text-base text-kumkum shadow-gilt backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-parchment hover:shadow-lg active:scale-95"
                >
                    {/* soft gold sheen */}
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <span aria-hidden="true" className="font-heading text-lg leading-none text-gold-deep">
                        अ
                    </span>

                    <span className="tracking-wide">{currentLangLabel}</span>

                    <IconChevron className={`h-4 w-4 text-gold-deep transition-transform duration-300 ${isLangOpen ? "rotate-0" : "rotate-180"}`} />
                </button>
            </div>

            {/* RIGHT: Disco music button - hidden during intro */}
            {showMusicButton && (
                <button
                    type="button"
                    onClick={toggleMusic}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                    title={isPlaying ? "Pause music" : "Play music"}
                    className="group fixed bottom-[calc(2.25rem+env(safe-area-inset-bottom))] right-5 z-[99999] flex h-14 w-14 items-center justify-center rounded-full border border-gold/70 bg-ivory/95 text-kumkum shadow-gilt backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-parchment active:scale-95 md:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]"
                >
                    {/* Rotating conic gradient halo (disco ring) */}
                    <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute -inset-[3px] rounded-full ${isPlaying ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
                        style={{
                            background: "conic-gradient(from 0deg, #d4af37, #ff6ec4, #7873f5, #4ADEDE, #d4af37)",
                            filter: "blur(6px)",
                            animation: isPlaying ? "disco-spin 4s linear infinite" : "none",
                            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
                            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
                        }}
                    />

                    {/* Outer pulse ring when playing */}
                    {isPlaying && (
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full border border-gold" style={{ animation: "disco-pulse 1.8s ease-in-out infinite" }} />
                    )}

                    {/* Icon or equalizer */}
                    {isPlaying ? (
                        <span className="relative flex items-end justify-center gap-[3px]" aria-hidden="true">
                            <span
                                className="w-[3px] rounded-full bg-kumkum"
                                style={{
                                    height: "14px",
                                    transformOrigin: "bottom",
                                    animation: "disco-bar 0.9s ease-in-out infinite",
                                    animationDelay: "0s",
                                }}
                            />
                            <span
                                className="w-[3px] rounded-full bg-kumkum"
                                style={{
                                    height: "18px",
                                    transformOrigin: "bottom",
                                    animation: "disco-bar 0.9s ease-in-out infinite",
                                    animationDelay: "0.15s",
                                }}
                            />
                            <span
                                className="w-[3px] rounded-full bg-kumkum"
                                style={{
                                    height: "12px",
                                    transformOrigin: "bottom",
                                    animation: "disco-bar 0.9s ease-in-out infinite",
                                    animationDelay: "0.3s",
                                }}
                            />
                            <span
                                className="w-[3px] rounded-full bg-kumkum"
                                style={{
                                    height: "16px",
                                    transformOrigin: "bottom",
                                    animation: "disco-bar 0.9s ease-in-out infinite",
                                    animationDelay: "0.45s",
                                }}
                            />
                        </span>
                    ) : (
                        <IconMusic className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.6} />
                    )}
                </button>
            )}
        </>
    );
};

export default BackgroundMusic;
