import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronUp, Check, Languages } from "lucide-react";
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
    const langRef = useRef(null);
    const { i18n } = useTranslation();

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "mr").split("-")[0];
    const currentLangLabel = languages.find((l) => l.code === currentLanguage)?.label || "मराठी";

    useEffect(() => {
        const syncState = () => setIsPlaying(!weddingAudio.paused);

        weddingAudio.addEventListener("play", syncState);
        weddingAudio.addEventListener("pause", syncState);
        weddingAudio.addEventListener("ended", syncState);

        const handleWeddingStart = async () => {
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

    // Close the language dropdown when tapping outside of it
    useEffect(() => {
        const handleOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside, { passive: true });

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
            {/* LEFT: Language dropdown */}
            <div ref={langRef} className="fixed bottom-5 left-5 z-[99999]">
                {isLangOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-32 overflow-hidden rounded-xl border border-[#d4a44c]/70 bg-[#fff4d6] py-1 shadow-[0_4px_20px_rgba(100,30,20,0.2)]">
                        {languages.map((language) => {
                            const isActive = currentLanguage === language.code;

                            return (
                                <button
                                    key={language.code}
                                    type="button"
                                    onClick={() => selectLanguage(language.code)}
                                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-devanagari transition-colors ${
                                        isActive ? "bg-[#780d16] font-bold text-[#fff4d6]" : "text-[#780d16] hover:bg-[#f8e7bd]"
                                    }`}
                                >
                                    {language.label}
                                    {isActive && <Check size={14} />}
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
                    className="flex h-12 items-center gap-1.5 rounded-full border border-[#d4a44c]/70 bg-[#fff4d6] px-3.5 text-sm font-bold font-devanagari text-[#780d16] shadow-[0_4px_20px_rgba(100,30,20,0.2)] backdrop-blur-md transition-all duration-300 hover:bg-[#f8e7bd] active:scale-95"
                >
                    <Languages size={16} />
                    <span>{currentLangLabel}</span>
                    <ChevronUp size={14} className={`transition-transform duration-200 ${isLangOpen ? "" : "rotate-180"}`} />
                </button>
            </div>

            {/* RIGHT: Music button */}
            <button
                type="button"
                onClick={toggleMusic}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                title={isPlaying ? "Pause music" : "Play music"}
                className="fixed bottom-5 right-5 z-[99999] flex h-14 w-14 items-center justify-center rounded-full border border-[#d4a44c]/70 bg-[#fff4d6] text-[#780d16] shadow-[0_4px_20px_rgba(100,30,20,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#f8e7bd] active:scale-95"
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                )}

                {isPlaying && <span className="pointer-events-none absolute inset-0 rounded-full border border-[#d4a44c] animate-ping opacity-20" />}
            </button>
        </>
    );
};

export default BackgroundMusic;
