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
            <div ref={langRef} className="fixed bottom-[calc(2.25rem+env(safe-area-inset-bottom))] left-5 z-[99999] md:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]">
                {isLangOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-36 overflow-hidden rounded-2xl border border-gold/70 bg-ivory/95 py-1 shadow-gilt backdrop-blur-md">
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
                    className="flex h-12 items-center gap-2 rounded-full border border-gold/70 bg-ivory/95 px-4 text-base text-kumkum shadow-gilt backdrop-blur-md transition-all duration-300 hover:bg-parchment active:scale-95"
                >
                    <span aria-hidden="true" className="font-heading text-lg leading-none text-gold-deep">
                        अ
                    </span>
                    <span>{currentLangLabel}</span>
                    <IconChevron className={`h-4 w-4 transition-transform duration-200 ${isLangOpen ? "" : "rotate-180"}`} />
                </button>
            </div>

            {/* RIGHT: Music button */}
            <button
                type="button"
                onClick={toggleMusic}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                title={isPlaying ? "Pause music" : "Play music"}
                className="fixed bottom-[calc(2.25rem+env(safe-area-inset-bottom))] right-5 z-[99999] flex h-14 w-14 items-center justify-center rounded-full border border-gold/70 bg-ivory/95 text-kumkum shadow-gilt backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-parchment active:scale-95 md:bottom-[calc(1.25rem+env(safe-area-inset-bottom))]"
            >
                {isPlaying ? <IconPause className="h-6 w-6" strokeWidth={1.8} /> : <IconMusic className="h-6 w-6" strokeWidth={1.6} />}

                {isPlaying && <span className="pointer-events-none absolute inset-0 rounded-full border border-gold animate-ping opacity-30" />}
            </button>
        </>
    );
};

export default BackgroundMusic;
