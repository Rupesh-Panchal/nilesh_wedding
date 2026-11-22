import React, { useEffect, useRef, useState } from "react";
import mangalRang from "../assets/mangal_rang.mp4";

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.volume = 0.5;

        const startMusic = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        };

        // Attempt to play when the website opens
        startMusic();

        // If autoplay is blocked, start on first interaction
        const handleInteraction = () => {
            if (audio.paused) {
                startMusic();
            }
        };

        window.addEventListener("click", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);

        return () => {
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
        };
    }, []);

    const toggleMusic = async () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={mangalRang} loop preload="auto" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />

            <button
                onClick={toggleMusic}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                title={isPlaying ? "Pause Mangal Rang" : "Play Mangal Rang"}
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

                {isPlaying && <span className="absolute inset-0 rounded-full border border-[#d4a44c] animate-ping opacity-20" />}
            </button>
        </>
    );
};

export default BackgroundMusic;
