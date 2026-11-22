import React, { useEffect, useState } from "react";
import introImage from "../assets/intro-devotional.png";

const IntroAnimation = () => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const revealTimer = setTimeout(() => {
            setIsRevealed(true);
        }, 100);

        return () => clearTimeout(revealTimer);
    }, []);

    const handleEnter = () => {
        // Start background music through the visitor's interaction
        window.dispatchEvent(new Event("wedding-start"));

        // Start intro fade-out
        setIsExiting(true);

        // Remove intro after fade transition
        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[99999] h-screen h-[100svh] w-full overflow-hidden bg-[#fff0d5] transition-opacity duration-1000 ease-in-out ${
                isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
            {/* Mobile blurred background */}
            <div className="absolute inset-0 md:hidden">
                <img src={introImage} alt="" className="h-full w-full scale-110 object-cover object-center blur-xl opacity-50" />

                <div className="absolute inset-0 bg-[#fff0d5]/40" />
            </div>

            {/* Desktop background */}
            <div className="absolute inset-0 hidden md:block">
                <img src={introImage} alt="" className="h-full w-full object-cover object-center" />
            </div>

            {/* Mobile foreground artwork and entry button */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-2 py-6 md:hidden">
                <img
                    src={introImage}
                    alt="Ram, Lakshman, Sita and Hanuman"
                    fetchPriority="high"
                    draggable="false"
                    className={`max-h-[80%] max-w-full select-none object-contain drop-shadow-[0_8px_25px_rgba(120,65,20,0.12)] transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
                    }`}
                />

                {/* Mobile Entry Button */}
                <button
                    onClick={handleEnter}
                    className="mt-4 rounded-full border border-[#d4a44c] bg-[#fff4d6]/90 px-8 py-3 text-sm font-semibold tracking-[0.2em] text-[#780d16] shadow-[0_4px_20px_rgba(100,30,20,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#f8e7bd] active:scale-95"
                >
                    ✨ शुभारंभ ✨
                </button>

                <p className="mt-3 text-center text-xs tracking-wider text-[#780d16]">Tap to enter the wedding invitation</p>
            </div>

            {/* Desktop foreground entry */}
            <div className="relative z-10 hidden h-full w-full flex-col items-center justify-end pb-16 md:flex">
                <button
                    onClick={handleEnter}
                    className="rounded-full border border-[#d4a44c] bg-[#fff4d6]/90 px-10 py-4 text-base font-semibold tracking-[0.2em] text-[#780d16] shadow-[0_4px_20px_rgba(100,30,20,0.2)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#f8e7bd] active:scale-95"
                >
                    ✨ शुभारंभ ✨
                </button>

                <p className="mt-4 text-sm tracking-wider text-[#780d16]">Click to enter the wedding invitation</p>
            </div>

            {/* Desktop subtle glow */}
            <div className="pointer-events-none absolute inset-0 hidden md:block bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.12)_0%,transparent_70%)]" />

            {/* Mobile subtle glow */}
            <div className="pointer-events-none absolute inset-0 md:hidden bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.16)_0%,transparent_70%)]" />
        </div>
    );
};

export default IntroAnimation;
