import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import introImage from "../assets/intro-devotional.png";
import { IconSparkle, IconChevron, IconCheck } from "./ornaments/icons";

// How long the intro takes to fade away (ms)
const FADE_DURATION = 2500;

const languages = [
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "English" },
];

const IntroAnimation = () => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const removeTimerRef = useRef(null);
    const langRef = useRef(null);

    const { t, i18n } = useTranslation("intro");

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "mr").split("-")[0];

    const currentLangLabel = languages.find((l) => l.code === currentLanguage)?.label || "मराठी";

    useEffect(() => {
        const revealTimer = setTimeout(() => setIsRevealed(true), 100);

        return () => {
            clearTimeout(revealTimer);
            clearTimeout(removeTimerRef.current);
        };
    }, []);

    // Close language dropdown when clicking outside
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

    const selectLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsLangOpen(false);
    };

    const handleEnter = () => {
        if (isExiting) return;

        // Start music after visitor interaction
        window.dispatchEvent(new Event("wedding-start"));

        setIsExiting(true);

        removeTimerRef.current = setTimeout(() => {
            setIsVisible(false);

            window.__weddingIntroComplete = true;
            window.dispatchEvent(new Event("wedding-intro-complete"));
        }, FADE_DURATION + 100);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[99999] h-screen h-[100svh] w-full overflow-hidden bg-[#fff0d5]"
            style={{
                opacity: isExiting ? 0 : 1,
                transform: isExiting ? "scale(1.04)" : "scale(1)",
                transition: `opacity ${FADE_DURATION}ms ease-in-out, transform ${FADE_DURATION}ms ease-in-out`,
                pointerEvents: isExiting ? "none" : "auto",
                willChange: "opacity, transform",
            }}
        >
            {/* Language Selector */}
            <div ref={langRef} className="absolute right-5 top-5 z-50">
                {isLangOpen && (
                    <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-2xl border border-gold/70 bg-ivory/95 py-1 shadow-gilt backdrop-blur-md">
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
                    onClick={() => setIsLangOpen((open) => !open)}
                    aria-label="Change language"
                    aria-expanded={isLangOpen}
                    className="flex h-11 items-center gap-2 rounded-full border border-gold/70 bg-ivory/95 px-4 text-sm text-kumkum shadow-gilt backdrop-blur-md transition-all hover:bg-parchment"
                >
                    <span className="font-heading text-lg text-gold-deep">अ</span>

                    <span>{currentLangLabel}</span>

                    <IconChevron className={`h-4 w-4 transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            {/* Mobile blurred background */}
            <div className="absolute inset-0 md:hidden">
                <img src={introImage} alt="" className="h-full w-full scale-110 object-cover object-center blur-xl opacity-50" />
                <div className="absolute inset-0 bg-[#fff0d5]/40" />
            </div>

            {/* Desktop background */}
            <div className="absolute inset-0 hidden md:block">
                <img src={introImage} alt="" className="h-full w-full object-cover object-center" />
            </div>

            {/* Mobile foreground */}
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

                <button onClick={handleEnter} className="btn-kumkum mt-4 flex items-center gap-3 px-9 py-3 text-base tracking-[0.2em]">
                    <IconSparkle className="h-5 w-5" strokeWidth={1.4} />
                    {t("enter")}
                    <IconSparkle className="h-5 w-5" strokeWidth={1.4} />
                </button>

                <p className="mt-3 text-center text-sm tracking-wider text-kumkum">{t("instruction")}</p>
            </div>

            {/* Desktop foreground */}
            <div className="relative z-10 hidden h-full w-full flex-col items-center justify-end pb-16 md:flex">
                <button onClick={handleEnter} className="btn-kumkum flex items-center gap-3 px-12 py-4 text-lg tracking-[0.25em]">
                    <IconSparkle className="h-5 w-5" strokeWidth={1.4} />
                    {t("enter")}
                    <IconSparkle className="h-5 w-5" strokeWidth={1.4} />
                </button>

                <p className="mt-4 text-base tracking-wider text-kumkum">{t("instruction")}</p>
            </div>

            {/* Subtle glow */}
            <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.12)_0%,transparent_70%)] md:block" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.16)_0%,transparent_70%)] md:hidden" />
        </div>
    );
};

export default IntroAnimation;
