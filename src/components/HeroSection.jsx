import React from "react";
import { useTranslation } from "react-i18next";
import ganeshImg from "../assets/ganesh.png";

const LotusDecoration = ({ className = "" }) => {
    return (
        <div aria-hidden="true" className={`pointer-events-none ${className}`}>
            <svg viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_2px_5px_rgba(197,160,40,0.15)]">
                <path d="M50 8 C37 25 39 39 50 49 C61 39 63 25 50 8Z" fill="#D4AF37" fillOpacity="0.18" stroke="#C5A028" strokeWidth="1.5" />
                <path d="M48 48 C31 20 17 26 18 42 C19 55 35 58 48 48Z" fill="#D4AF37" fillOpacity="0.13" stroke="#C5A028" strokeWidth="1.3" />
                <path d="M52 48 C69 20 83 26 82 42 C81 55 65 58 52 48Z" fill="#D4AF37" fillOpacity="0.13" stroke="#C5A028" strokeWidth="1.3" />
                <path d="M46 52 C22 39 7 43 10 55 C14 67 34 65 46 52Z" fill="#E8CB75" fillOpacity="0.18" stroke="#D4AF37" strokeWidth="1.2" />
                <path d="M54 52 C78 39 93 43 90 55 C86 67 66 65 54 52Z" fill="#E8CB75" fillOpacity="0.18" stroke="#D4AF37" strokeWidth="1.2" />
                <path d="M12 60 Q50 80 88 60 Q72 78 50 77 Q28 78 12 60Z" fill="#D4AF37" fillOpacity="0.16" stroke="#C5A028" strokeWidth="1.4" />
                <circle cx="50" cy="53" r="3" fill="#D4AF37" />
                <path d="M30 70 Q50 76 70 70" stroke="#C5A028" strokeWidth="1" strokeLinecap="round" />
            </svg>
        </div>
    );
};

const GoldenSparkles = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
            <span className="absolute left-[23%] top-[25%] text-[#D4AF37] text-xs animate-pulse opacity-60">✦</span>
            <span className="absolute left-[33%] top-[70%] text-[#C5A028] text-[10px] animate-pulse opacity-50 [animation-delay:700ms]">✧</span>
            <span className="absolute right-[23%] top-[25%] text-[#D4AF37] text-xs animate-pulse opacity-60 [animation-delay:500ms]">✦</span>
            <span className="absolute right-[33%] top-[70%] text-[#C5A028] text-[10px] animate-pulse opacity-50 [animation-delay:1000ms]">✧</span>
            <span className="absolute left-[15%] top-[48%] text-[#D4AF37] text-[9px] animate-pulse opacity-40 [animation-delay:300ms]">✧</span>
            <span className="absolute right-[15%] top-[48%] text-[#D4AF37] text-[9px] animate-pulse opacity-40 [animation-delay:800ms]">✧</span>
        </div>
    );
};

const SideDecoration = ({ main, sub, position }) => {
    const isLeft = position === "left";

    return (
        <div
            aria-hidden="true"
            className={`
                hidden lg:flex flex-col items-center
                absolute top-1/2 -translate-y-1/2
                w-48 xl:w-52
                ${isLeft ? "left-4 xl:left-8" : "right-4 xl:right-8"}
                opacity-70
            `}
        >
            <div className="h-20 flex items-center justify-center mb-4">
                <LotusDecoration className={`opacity-80 animate-[float_5s_ease-in-out_infinite] ${isLeft ? "" : "[animation-delay:1s]"}`} />
            </div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c5a028] to-transparent mb-5" />
            <div className="w-full text-[#5b0309] text-center space-y-4">
                <p className="font-devanagari text-xl font-bold tracking-widest leading-relaxed min-h-[32px]">{main}</p>
                <div className="flex items-center justify-center gap-2 h-10">
                    <div className="w-6 h-px bg-[#c5a028]/60" />
                    <span className="text-3xl text-[#c5a028]">✥</span>
                    <div className="w-6 h-px bg-[#c5a028]/60" />
                </div>
                <div className="h-16 flex items-start justify-center">
                    <p className="font-devanagari text-sm text-gray-500 italic max-w-[150px] mx-auto text-balance leading-relaxed">{sub}</p>
                </div>
            </div>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#c5a028] to-transparent mt-6" />
            <div className="h-8 flex items-center justify-center">
                <span className="text-[#c5a028] text-xl">✧</span>
            </div>
        </div>
    );
};

const HeroSection = () => {
    const { t } = useTranslation("hero");

    return (
        // Removed min-h-screen and changed items-center to items-start for mobile
        <div className="relative w-full overflow-hidden">
            <div className="w-full max-w-7xl mx-auto relative flex flex-col lg:flex-row justify-center px-4 md:px-6 lg:px-8 pt-6 md:pt-12 pb-8 md:pb-16">
                <SideDecoration position="left" main={t("leftDecoration.main")} sub={t("leftDecoration.sub")} />
                <SideDecoration position="right" main={t("rightDecoration.main")} sub={t("rightDecoration.sub")} />

                {/* Main Content - Reduced top padding (pt-2) */}
                <main className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl mx-auto pt-2 md:pt-0">
                    <div className="flex items-center gap-2 bg-[#fcf0c7] border border-[#e1c561] px-6 py-2 rounded-full mb-6 md:mb-10 shadow-sm">
                        <span className="text-secondary text-xs">✦</span>
                        <p className="font-devanagari text-secondary text-sm tracking-widest font-semibold">{t("ganeshMantra")}</p>
                        <span className="text-secondary text-xs">✦</span>
                    </div>

                    <div className="relative flex items-center justify-center mb-8 md:mb-10 group w-full max-w-lg md:max-w-2xl">
                        <GoldenSparkles />

                        <div className="absolute left-[-10px] md:left-10 top-0 flex flex-col items-center animate-swing origin-top">
                            <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-transparent to-[#745b00]"></div>
                            <div className="relative">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-[#fcd358] blur-md opacity-60 animate-pulse"></div>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-md md:w-[40px] md:h-[40px]">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#745b00" fillOpacity="0.2" />
                                    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="#D4AF37" />
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#FCF0C7" />
                                </svg>
                            </div>
                        </div>

                        <div className="absolute right-[-10px] md:right-10 top-0 flex flex-col items-center animate-swing origin-top" style={{ animationDelay: "1s" }}>
                            <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-transparent to-[#745b00]"></div>
                            <div className="relative">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-[#fcd358] blur-md opacity-60 animate-pulse"></div>
                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-md md:w-[40px] md:h-[40px]">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#745b00" fillOpacity="0.2" />
                                    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="#D4AF37" />
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#FCF0C7" />
                                </svg>
                            </div>
                        </div>

                        <div className="relative z-10 bg-white p-2 rounded-2xl shadow-[0_4px_20px_rgba(197,160,40,0.2)] transition-transform duration-700 hover:scale-105 mx-auto">
                            <div className="absolute inset-0 bg-[#fcf0c7] blur-2xl opacity-60 rounded-full scale-110 -z-10 animate-pulse"></div>
                            <img src={ganeshImg} alt={t("ganeshImageAlt")} className="w-[140px] h-[140px] md:w-[240px] md:h-[240px] object-contain rounded-xl" />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 font-devanagari text-xs md:text-sm text-[#745b00] font-bold mb-4">
                        <p>{t("ganeshBlessing")}</p>
                        <div className="w-1.5 h-1.5 bg-[#745b00] rounded-full animate-ping"></div>
                        <p>{t("ravळनाथBlessing")}</p>
                    </div>

                    <p className="font-devanagari text-primary-container text-lg md:text-xl font-medium mb-2 tracking-wide">{t("subtitle")}</p>

                    <h1 className="font-devanagari text-4xl md:text-7xl font-bold text-primary leading-tight mb-6 md:mb-8 drop-shadow-sm flex items-center justify-center gap-2 flex-wrap">
                        {t("groomName")}
                        <span className="text-secondary font-normal text-3xl md:text-6xl pb-2">ॐ</span>
                        {t("brideName")}
                    </h1>

                    <div className="bg-primary-container text-surface font-devanagari text-sm md:text-lg px-5 py-3 rounded-lg flex items-center gap-3 shadow-chandan border border-[#5b0309] transition-all hover:shadow-lg w-full max-w-[90%] md:w-auto justify-center">
                        <span className="text-secondary-container text-lg md:text-xl">📅</span>
                        <span className="font-semibold">
                            {t("weddingDate")} | {t("weddingTime")}
                        </span>
                    </div>

                    <div className="mt-8 md:mt-10 text-center font-devanagari text-sm text-on-surface-variant leading-relaxed italic mb-4">
                        <p>"{t("bottomShloka.line1")}</p>
                        <p>{t("bottomShloka.line2")}"</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HeroSection;
