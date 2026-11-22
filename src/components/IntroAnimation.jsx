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

        // Keep the intro visible for 4 seconds
        const exitTimer = setTimeout(() => {
            setIsExiting(true);
        }, 4000);

        // Remove the intro after the fade transition
        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => {
            clearTimeout(revealTimer);
            clearTimeout(exitTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[99999] h-screen h-[100svh] w-full overflow-hidden bg-[#fff0d5] transition-opacity duration-1000 ease-in-out ${
                isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-hidden="true"
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

            {/* Mobile foreground artwork */}
            <div className="relative z-10 flex h-full w-full items-center justify-center px-2 py-6 md:hidden">
                <img
                    src={introImage}
                    alt=""
                    fetchPriority="high"
                    draggable="false"
                    className={`max-h-full max-w-full select-none object-contain drop-shadow-[0_8px_25px_rgba(120,65,20,0.12)] transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"
                    }`}
                />
            </div>

            {/* Desktop subtle glow */}
            <div className="pointer-events-none absolute inset-0 hidden md:block bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.12)_0%,transparent_70%)]" />

            {/* Mobile subtle glow */}
            <div className="pointer-events-none absolute inset-0 md:hidden bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.16)_0%,transparent_70%)]" />
        </div>
    );
};

export default IntroAnimation;
