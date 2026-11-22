import React, { useEffect, useState } from "react";
import mangalRang from "../assets/mangal_rang.mp4";

// One shared audio instance for the entire application
const weddingAudio = new Audio(mangalRang);

weddingAudio.loop = true;
weddingAudio.volume = 0.7;
weddingAudio.preload = "auto";

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Stop any old audio tags left in the page
        document.querySelectorAll("audio").forEach((element) => {
            element.pause();
            element.currentTime = 0;
            element.remove();
        });

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        weddingAudio.addEventListener("play", handlePlay);
        weddingAudio.addEventListener("pause", handlePause);

        const handleWeddingStart = async () => {
            try {
                await weddingAudio.play();
            } catch (error) {
                console.error("Music playback failed:", error);
            }
        };

        window.addEventListener("wedding-start", handleWeddingStart);

        return () => {
            weddingAudio.removeEventListener("play", handlePlay);
            weddingAudio.removeEventListener("pause", handlePause);
            window.removeEventListener("wedding-start", handleWeddingStart);
        };
    }, []);

    const toggleMusic = async () => {
        if (!weddingAudio.paused) {
            weddingAudio.pause();
            weddingAudio.currentTime = 0;
            return;
        }

        try {
            await weddingAudio.play();
        } catch (error) {
            console.error("Music playback failed:", error);
        }
    };

    return (
        <button
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
        </button>
    );
};

export default BackgroundMusic;
