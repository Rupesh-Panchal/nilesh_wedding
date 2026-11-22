import React, { useEffect, useRef, useState } from "react";
import introImage from "../assets/intro-devotional.png";

const IntroAnimation = () => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const dismissRef = useRef(false);

    useEffect(() => {
        let removeTimer;

        const dismissIntro = () => {
            if (dismissRef.current) return;

            dismissRef.current = true;
            setIsExiting(true);

            removeTimer = setTimeout(() => {
                setIsVisible(false);
            }, 1000);
        };

        const handleWheel = (event) => {
            if (event.deltaY > 10) dismissIntro();
        };

        const handleTouchStart = (event) => {
            touchStartY = event.touches[0].clientY;
        };

        let touchStartY = 0;

        const handleTouchMove = (event) => {
            const currentY = event.touches[0].clientY;

            if (touchStartY - currentY > 15) {
                dismissIntro();
            }
        };

        const handleKeyDown = (event) => {
            if (["ArrowDown", "PageDown", " "].includes(event.key)) {
                dismissIntro();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("keydown", handleKeyDown);

            clearTimeout(removeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[99999] h-screen h-[100svh] w-full overflow-hidden bg-[#fff0d5] transition-all duration-1000 ease-in-out ${
                isExiting ? "opacity-0 scale-[1.02] pointer-events-none" : "opacity-100 scale-100"
            }`}
            aria-hidden="true"
        >
            {/* Mobile blurred background - fills the screen */}
            <div className="absolute inset-0 md:hidden">
                <img src={introImage} alt="" className="h-full w-full scale-110 object-cover object-center blur-xl opacity-50" />

                <div className="absolute inset-0 bg-[#fff0d5]/40" />
            </div>

            {/* Desktop background */}
            <div className="absolute inset-0 hidden md:block">
                <img src={introImage} alt="" className="h-full w-full object-cover object-center" />
            </div>

            {/* Mobile foreground - original image, no cropping */}
            <div className="relative z-10 flex h-full w-full items-center justify-center px-2 py-6 md:hidden">
                <img src={introImage} alt="" fetchPriority="high" draggable="false" className="max-h-full max-w-full object-contain drop-shadow-[0_8px_25px_rgba(120,65,20,0.12)]" />
            </div>

            {/* Desktop subtle overlay */}
            <div className="pointer-events-none absolute inset-0 hidden md:block bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.12)_0%,transparent_70%)]" />

            {/* Scroll cue */}
            {!isExiting && (
                <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8b4513] animate-bounce">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em]">Scroll to Enter</span>

                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14" />
                        <path d="m19 12-7 7-7-7" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default IntroAnimation;
