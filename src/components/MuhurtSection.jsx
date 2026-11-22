import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Clock, Calendar, Sparkles } from "lucide-react";

const GoldOrnament = ({ className = "" }) => (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 C40 25 40 35 50 50 C60 35 60 25 50 5Z" fill="#D4AF37" fillOpacity="0.15" stroke="#C5A028" strokeWidth="1.5" />
            <path d="M50 50 C25 30 10 40 20 60 C30 75 45 65 50 50Z" fill="#D4AF37" fillOpacity="0.12" stroke="#C5A028" strokeWidth="1.2" />
            <path d="M50 50 C75 30 90 40 80 60 C70 75 55 65 50 50Z" fill="#D4AF37" fillOpacity="0.12" stroke="#C5A028" strokeWidth="1.2" />
            <path d="M15 65 Q50 95 85 65" stroke="#C5A028" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="50" cy="53" r="3" fill="#D4AF37" />
        </svg>
    </div>
);

const SideDecorations = ({ position }) => {
    const isLeft = position === "left";

    return (
        <div className="hidden lg:flex relative h-[480px] w-full items-center justify-center pointer-events-none">
            <div className={`absolute w-36 h-36 rounded-full border border-[#c5a028]/25 ${isLeft ? "top-10 right-6" : "bottom-10 left-6"} animate-[float_7s_ease-in-out_infinite]`}>
                <div className="absolute inset-3 rounded-full border border-dashed border-[#c5a028]/30"></div>
                <div className="absolute inset-0 flex items-center justify-center text-[#c5a028]/50 text-3xl">✥</div>
            </div>
            <GoldOrnament className={`w-20 h-20 ${isLeft ? "bottom-20 left-8" : "top-20 right-8"} animate-[float_5s_ease-in-out_infinite]`} />
            <div className={`absolute w-5 h-5 rotate-45 border border-[#c5a028]/50 bg-[#fcd358]/10 ${isLeft ? "top-1/3 left-1/4" : "bottom-1/3 right-1/4"} animate-[spin_12s_linear_infinite]`}></div>
            <span className={`absolute text-[#c5a028] text-2xl animate-pulse ${isLeft ? "bottom-1/3 right-1/4" : "top-1/3 left-1/4"}`}>✦</span>
            <span className={`absolute text-[#d4af37] text-sm animate-pulse ${isLeft ? "top-1/4 right-1/3" : "bottom-1/4 left-1/3"}`} style={{ animationDelay: "1s" }}>
                ✧
            </span>
            <div className="absolute top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#c5a028]/60 to-transparent"></div>
        </div>
    );
};

// ==========================================
// COUNTDOWN BOX (Adjusted for mobile row)
// ==========================================
const CountdownBox = ({ value, label }) => {
    return (
        <div className="group relative bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl border border-[#c5a028]/40 shadow-[0_4px_15px_rgba(116,91,0,0.07)] hover:shadow-[0_8px_22px_rgba(116,91,0,0.13)] hover:-translate-y-1 transition-all duration-300 w-[62px] h-[75px] sm:w-[70px] sm:h-20 md:w-24 md:h-28 flex flex-col items-center justify-center overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-full h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-[#c5a028] to-transparent"></div>
            <span className="font-display text-xl sm:text-2xl md:text-4xl font-bold text-[#5b0309] tabular-nums">{String(value).padStart(2, "0")}</span>
            <span className="font-devanagari text-[9px] sm:text-[10px] md:text-xs text-gray-500 mt-1">{label}</span>
            <div className="absolute bottom-1.5 md:bottom-2 w-4 md:w-5 h-px bg-[#c5a028]/50"></div>
        </div>
    );
};

// ==========================================
// MAIN MUHURT SECTION
// ==========================================
const MuhurtSection = () => {
    const { t } = useTranslation("muhurt");

    const targetDate = new Date(2026, 11, 5, 12, 17, 0).getTime();

    const calculateTimeLeft = () => {
        const distance = targetDate - new Date().getTime();
        if (distance <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
        }
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            completed: false,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const googleCalendarLink =
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nilesh+%26+Jyotsna+Wedding&dates=20261205T064700Z/20261205T100000Z&details=Shubh+Vivah+of+Nilesh+and+Jyotsna&location=Mumbai";

    return (
        // Changed background to transparent to let the global falling leaves show through
        <section id="muhurt-section" className="relative w-full py-16 md:py-24 bg-transparent overflow-hidden">
            <div className="absolute top-10 left-[-100px] w-72 h-72 bg-[#fcd358]/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-10 right-[-100px] w-72 h-72 bg-[#c5a028]/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,850px)_1fr] gap-6 items-center">
                    <SideDecorations position="left" />

                    {/* CENTER CARD */}
                    <div className="relative w-full max-w-4xl mx-auto group">
                        <div className="absolute -inset-[3px] rounded-[2.2rem] bg-gradient-to-br from-[#d4af37] via-[#f8e7a0] to-[#9b761b] opacity-80 blur-[1px]"></div>

                        {/* Added backdrop-blur-md and bg-opacity to the main card */}
                        <div className="relative bg-[#fffdf8]/95 backdrop-blur-md rounded-[2rem] p-[2px] shadow-[0_15px_50px_rgba(91,3,9,0.10)]">
                            {/* Inner border */}
                            <div className="relative rounded-[1.9rem] border border-[#c5a028]/60 px-5 py-6 sm:p-6 md:p-12 flex flex-col items-center text-center overflow-hidden">
                                <div className="absolute inset-2 sm:inset-3 border border-[#c5a028]/20 rounded-[1.5rem] pointer-events-none"></div>

                                <span className="absolute top-3 sm:top-4 left-4 sm:left-5 text-[#c5a028] text-sm sm:text-xl">❖</span>
                                <span className="absolute top-3 sm:top-4 right-4 sm:right-5 text-[#c5a028] text-sm sm:text-xl">❖</span>
                                <span className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 text-[#c5a028] text-sm sm:text-xl">❖</span>
                                <span className="absolute bottom-3 sm:bottom-4 right-4 sm:right-5 text-[#c5a028] text-sm sm:text-xl">❖</span>

                                {/* TITLE */}
                                <h2 className="relative font-devanagari text-lg sm:text-2xl md:text-4xl font-bold text-[#5b0309] mb-3 sm:mb-4 tracking-tight leading-snug pt-6 sm:pt-4 w-full max-w-full px-3 sm:px-0 text-center break-words">
                                    {t("title")}
                                </h2>

                                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                                    <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#c5a028]"></div>
                                    <span className="text-[#c5a028] text-base sm:text-lg">✥</span>
                                    <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#c5a028]"></div>
                                </div>

                                <p className="relative font-devanagari text-xs sm:text-sm md:text-base text-gray-700 max-w-2xl leading-relaxed mb-2 px-2 sm:px-0">{t("description")}</p>
                                <p className="relative font-devanagari text-xs sm:text-sm text-gray-500 italic mb-8 sm:mb-10">{t("subtext")}</p>

                                <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center mb-8 sm:mb-10">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_4px_15px_rgba(91,3,9,0.05)] border border-[#c5a028]/35 px-4 sm:px-6 py-4 sm:py-5 flex flex-col items-center w-full sm:w-64 transition-all duration-300 hover:border-[#c5a028] hover:-translate-y-1">
                                        <Calendar size={20} className="text-[#c5a028] mb-2 sm:mb-3" strokeWidth={1.6} />
                                        <span className="font-devanagari text-[10px] sm:text-xs text-gray-500 mb-1">{t("dateLabel")}</span>
                                        <span className="font-devanagari text-xl sm:text-2xl font-bold text-[#5b0309] mb-1">{t("dateValue")}</span>
                                        <span className="font-devanagari text-[10px] sm:text-xs text-gray-400">{t("dayValue")}</span>
                                    </div>

                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_4px_15px_rgba(91,3,9,0.05)] border border-[#c5a028]/35 px-4 sm:px-6 py-4 sm:py-5 flex flex-col items-center w-full sm:w-64 transition-all duration-300 hover:border-[#c5a028] hover:-translate-y-1">
                                        <Clock size={20} className="text-[#c5a028] mb-2 sm:mb-3" strokeWidth={1.6} />
                                        <span className="font-devanagari text-[10px] sm:text-xs text-gray-500 mb-1">{t("timeLabel")}</span>
                                        <span className="font-devanagari text-xl sm:text-2xl font-bold text-[#5b0309] mb-1">{t("timeValue")}</span>
                                        <span className="font-devanagari text-[10px] sm:text-xs text-gray-400">{t("timeSubtext")}</span>
                                    </div>
                                </div>

                                <div className="relative w-full">
                                    <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
                                        <Sparkles size={14} className="text-[#c5a028] sm:w-[15px] sm:h-[15px]" />
                                        <p className="font-devanagari text-xs sm:text-sm font-semibold text-gray-600">
                                            {timeLeft.completed ? t("completedLabel", "शुभविवाह संपन्न") : t("countdownLabel")}
                                        </p>
                                        <Sparkles size={14} className="text-[#c5a028] sm:w-[15px] sm:h-[15px]" />
                                    </div>

                                    {!timeLeft.completed ? (
                                        <div className="flex flex-nowrap gap-1.5 sm:gap-2 md:gap-4 w-full justify-center">
                                            <CountdownBox value={timeLeft.days} label={t("days")} />
                                            <CountdownBox value={timeLeft.hours} label={t("hours")} />
                                            <CountdownBox value={timeLeft.minutes} label={t("minutes")} />
                                            <CountdownBox value={timeLeft.seconds} label={t("seconds")} />
                                        </div>
                                    ) : (
                                        <p className="font-devanagari text-[#5b0309] text-lg sm:text-xl md:text-2xl font-bold py-5">{t("completedMessage", "नवदाम्पत्यास मंगलमय शुभेच्छा!")}</p>
                                    )}
                                </div>

                                <a
                                    href={googleCalendarLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative mt-8 sm:mt-10 flex sm:inline-flex items-center justify-center text-center gap-2 sm:gap-3 bg-gradient-to-r from-[#5b0309] to-[#78131b] hover:from-[#78131b] hover:to-[#5b0309] text-white font-devanagari font-semibold px-4 sm:px-7 py-3.5 sm:py-3.5 rounded-xl transition-all duration-300 shadow-[0_6px_18px_rgba(91,3,9,0.2)] hover:shadow-[0_10px_25px_rgba(91,3,9,0.3)] hover:-translate-y-1 text-sm sm:text-base w-full sm:w-auto"
                                >
                                    <Calendar size={18} className="shrink-0" />
                                    <span className="leading-tight">{t("addToCalendar")}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <SideDecorations position="right" />
                </div>
            </div>
        </section>
    );
};

export default MuhurtSection;
