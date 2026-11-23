import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import introImage from "../assets/intro-devotional.png";
import { IconSparkle } from "./ornaments/icons";

// How long the intro takes to fade away (ms). Increase for a slower fade.
const FADE_DURATION = 2500;

const IntroAnimation = () => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isRevealed, setIsRevealed] = useState(false);
    const removeTimerRef = useRef(null);

    const { t } = useTranslation("intro");

    useEffect(() => {
        const revealTimer = setTimeout(() => setIsRevealed(true), 100);

        return () => {
            clearTimeout(revealTimer);
            clearTimeout(removeTimerRef.current);
        };
    }, []);

    // ==========================================
    // SCROLL LOCK LOGIC
    // ==========================================
    useEffect(() => {
        if (!isVisible) return;

        const body = document.body;
        const html = document.documentElement;

        // Save original styles
        const originalBodyOverflow = body.style.overflow;
        const originalHtmlOverflow = html.style.overflow;
        const originalBodyHeight = body.style.height;
        const originalHtmlHeight = html.style.height;
        const originalBodyOverscroll = body.style.overscrollBehavior;
        const originalHtmlOverscroll = html.style.overscrollBehavior;

        // Lock scrolling completely (and fix iOS/Android body bounce)
        body.style.overflow = "hidden";
        html.style.overflow = "hidden";
        body.style.height = "100%";
        html.style.height = "100%";
        body.style.overscrollBehavior = "none";
        html.style.overscrollBehavior = "none";

        return () => {
            body.style.overflow = originalBodyOverflow;
            html.style.overflow = originalHtmlOverflow;
            body.style.height = originalBodyHeight;
            html.style.height = originalHtmlHeight;
            body.style.overscrollBehavior = originalBodyOverscroll;
            html.style.overscrollBehavior = originalHtmlOverscroll;
        };
    }, [isVisible]);

    const handleEnter = () => {
        if (isExiting) return;

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
            // Removed touch-none to allow native scroll/pull-to-refresh at the browser level
            // Kept overscroll-none to prevent the background page from rubber-banding
            className="fixed inset-0 z-[99999] h-screen h-[100svh] w-full overflow-hidden overscroll-none bg-[#fff0d5]"
            style={{
                opacity: isExiting ? 0 : 1,
                transform: isExiting ? "scale(1.04)" : "scale(1)",
                transition: `opacity ${FADE_DURATION}ms ease-in-out, transform ${FADE_DURATION}ms ease-in-out`,
                pointerEvents: isExiting ? "none" : "auto",
                willChange: "opacity, transform",
            }}
        >
            {/* Mobile blurred background */}
            <div className="absolute inset-0 md:hidden">
                <img src={introImage} alt="" draggable="false" className="h-full w-full scale-110 object-cover object-center blur-xl opacity-50" />
                <div className="absolute inset-0 bg-[#fff0d5]/40" />
            </div>

            {/* Desktop background */}
            <div className="absolute inset-0 hidden md:block">
                <img src={introImage} alt="" draggable="false" className="h-full w-full object-cover object-center" />
            </div>

            {/* Mobile foreground artwork and entry button */}
            {/* Increased pb-32 to pb-44 to push everything much higher */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-4 pt-6 pb-44 md:hidden">
                {/* Top Section (Mantra) */}
                <div className={`w-full shrink-0 flex flex-col items-center transition-all duration-[1200ms] ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
                    <p className="text-center font-serif text-[15px] font-bold tracking-wider text-[#8d202b]">{t("ganeshMantra")}</p>
                    <div className="mt-4 flex w-full max-w-[210px] items-center justify-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c89a39] to-[#c89a39]" />
                        <span className="text-2xl text-[#c99a32]">❋</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#c89a39] to-[#c89a39]" />
                    </div>
                </div>

                {/* Middle Section (Image) */}
                {/* Reduced margin to my-2 */}
                <div
                    className={`relative my-2 flex w-full flex-1 min-h-0 items-center justify-center transition-all duration-[1800ms] ease-out ${isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"}`}
                >
                    <img
                        src={introImage}
                        alt={t("devotionalImageAlt")}
                        draggable="false"
                        fetchPriority="high"
                        className="max-h-full max-w-full select-none object-contain drop-shadow-[0_15px_20px_rgba(112,55,12,0.22)]"
                    />
                </div>

                {/* Bottom Section (Details, Button, Instruction) */}
                <div className="w-full shrink-0 flex flex-col items-center">
                    <div
                        className={`relative z-10 flex w-full flex-col items-center text-center transition-all duration-[1500ms] delay-200 ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    >
                        <p className="text-[12px] font-semibold tracking-wider text-[#956a31]">{t("invitationHeading")}</p>
                        <h1 className="mt-1 font-serif text-[29px] font-bold leading-tight text-[#982c35]">{t("groomName")}</h1>

                        <div className="my-2 flex w-full max-w-[170px] items-center justify-center gap-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c99a39]" />
                            <span className="text-xl text-[#d5a43b]">♡</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c99a39]" />
                        </div>

                        <h2 className="font-serif text-[29px] font-bold leading-tight text-[#982c35]">{t("brideName")}</h2>
                        <p className="mt-3 text-[14px] font-bold tracking-wide text-[#8e2630]">{t("weddingTitle")}</p>

                        <p className="mt-2 text-center text-[12px] font-medium tracking-wide text-[#956d35]">
                            {t("weddingDate")}
                            <span className="mx-2 text-[#d49b35]">✦</span>
                            {t("weddingTime")}
                        </p>
                    </div>

                    {/* Reduced top margin to mt-4 */}
                    <div
                        className={`relative z-20 mt-4 flex w-full flex-col items-center transition-all duration-[1500ms] delay-300 ${isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                    >
                        <button
                            onClick={handleEnter}
                            disabled={isExiting}
                            className="btn-kumkum flex w-[82%] max-w-[280px] items-center justify-center gap-3 rounded-full px-6 py-3 text-base font-bold tracking-wide shadow-[0_7px_18px_rgba(111,28,27,0.22)] transition-transform active:scale-95"
                        >
                            <IconSparkle className="h-5 w-5" strokeWidth={1.4} />
                            {t("enter")}
                            <IconSparkle className="h-5 w-5" strokeWidth={1.4} />
                        </button>

                        <p className="mt-3 text-center text-[12px] font-medium tracking-wider text-[#8e2630]">{t("instruction")}</p>
                    </div>
                </div>
            </div>

            {/* Desktop foreground entry */}
            <div className="relative z-10 hidden h-full w-full flex-col items-center justify-end pb-16 md:flex">
                <button onClick={handleEnter} className="btn-kumkum flex items-center gap-3 px-12 py-4 text-lg font-bold tracking-[0.25em]">
                    <IconSparkle className="h-5 w-5" strokeWidth={1.4} />
                    {t("enter")}
                    <IconSparkle className="h-5 w-5" strokeWidth={1.4} />
                </button>

                <p className="mt-4 text-base tracking-wider text-kumkum">{t("instruction")}</p>
            </div>

            {/* Desktop subtle glow */}
            <div className="pointer-events-none absolute inset-0 hidden md:block bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.12)_0%,transparent_70%)]" />

            {/* Mobile subtle glow */}
            <div className="pointer-events-none absolute inset-0 md:hidden bg-[radial-gradient(ellipse_at_center,rgba(255,215,130,0.16)_0%,transparent_70%)]" />
        </div>
    );
};

export default IntroAnimation;
