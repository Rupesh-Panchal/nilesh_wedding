import React from "react";
import { useTranslation } from "react-i18next";
import ganeshImg from "../assets/ganesh.png";

const LotusDecoration = ({ className = "" }) => {
    return (
        <div aria-hidden="true" className={`pointer-events-none ${className}`}>
            <svg viewBox="0 0 116 92" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_4px_12px_rgba(184,41,47,0.16)]">
                <path d="M58 8 C44 26 46 42 58 53 C70 42 72 26 58 8Z" fill="#E59A24" fillOpacity="0.22" stroke="#B8292F" strokeWidth="1.4" />
                <path d="M55 51 C35 20 18 27 19 45 C20 59 39 62 55 51Z" fill="#E59A24" fillOpacity="0.16" stroke="#C69232" strokeWidth="1.35" />
                <path d="M61 51 C81 20 98 27 97 45 C96 59 77 62 61 51Z" fill="#E59A24" fillOpacity="0.16" stroke="#C69232" strokeWidth="1.35" />
                <path d="M51 56 C23 41 6 46 10 59 C14 72 37 70 51 56Z" fill="#F5C74D" fillOpacity="0.24" stroke="#C69232" strokeWidth="1.25" />
                <path d="M65 56 C93 41 110 46 106 59 C102 72 79 70 65 56Z" fill="#F5C74D" fillOpacity="0.24" stroke="#C69232" strokeWidth="1.25" />
                <path d="M14 65 Q58 88 102 65 Q82 85 58 84 Q34 85 14 65Z" fill="#B8292F" fillOpacity="0.12" stroke="#B8292F" strokeWidth="1.35" />
                <circle cx="58" cy="57" r="3.5" fill="#B8292F" />
                <path d="M35 76 Q58 83 81 76" stroke="#C69232" strokeWidth="1.15" strokeLinecap="round" />
            </svg>
        </div>
    );
};

const GoldenSparkles = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
            <span className="absolute left-[14%] top-[20%] text-[#D4AF37] text-sm animate-pulse opacity-80">✦</span>
            <span className="absolute left-[26%] top-[74%] text-[#B8292F] text-xs animate-pulse opacity-65 [animation-delay:700ms]">✧</span>
            <span className="absolute right-[14%] top-[20%] text-[#D4AF37] text-sm animate-pulse opacity-80 [animation-delay:500ms]">✦</span>
            <span className="absolute right-[26%] top-[74%] text-[#B8292F] text-xs animate-pulse opacity-65 [animation-delay:1000ms]">✧</span>
            <span className="absolute left-[8%] top-[50%] text-[#E59A24] text-xs animate-pulse opacity-70 [animation-delay:300ms]">❀</span>
            <span className="absolute right-[8%] top-[50%] text-[#E59A24] text-xs animate-pulse opacity-70 [animation-delay:800ms]">❀</span>
        </div>
    );
};

const HeroSection = () => {
    const { t } = useTranslation("hero");

    return (
        <div className="relative w-full overflow-hidden">
            <div className="w-full max-w-5xl mx-auto relative flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 pb-8 md:pb-16">
                {/* Top Invocation Banner */}
                <div className="relative z-10 flex items-center gap-2.5 bg-[#FBF0D4] border border-[#D4AF37] px-6 py-2 rounded-full mb-6 md:mb-9 shadow-[0_6px_18px_rgba(90,18,25,0.08)]">
                    <span className="text-[#B8292F] text-xs animate-pulse">✦</span>
                    <p className="font-patrika-classic text-[#5A1219] text-sm md:text-base tracking-wider font-bold">{t("ganeshMantra")}</p>
                    <span className="text-[#B8292F] text-xs animate-pulse">✦</span>
                </div>

                {/* Mandap Arch Stage: Lotus Flanks + Swinging Lamps + Ganesh Medallion */}
                <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center mb-6 md:mb-9">
                    <div className="relative flex items-center justify-center w-full max-w-xl md:max-w-2xl">
                        <GoldenSparkles />

                        {/* Left Swinging Brass Lamp */}
                        <div className="absolute left-0 sm:left-4 md:left-10 top-0 flex flex-col items-center animate-swing origin-top z-20">
                            <div className="w-[1.5px] h-16 md:h-24 bg-gradient-to-b from-transparent to-[#745B00]" />
                            <div className="relative">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-[#FCD358] blur-md opacity-65 animate-pulse" />
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-md md:w-[40px] md:h-[40px]">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#745B00" fillOpacity="0.2" />
                                    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="#D4AF37" />
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#FCF0C7" />
                                </svg>
                            </div>
                        </div>

                        {/* Right Swinging Brass Lamp */}
                        <div className="absolute right-0 sm:right-4 md:right-10 top-0 flex flex-col items-center animate-swing origin-top z-20" style={{ animationDelay: "1s" }}>
                            <div className="w-[1.5px] h-16 md:h-24 bg-gradient-to-b from-transparent to-[#745B00]" />
                            <div className="relative">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-[#FCD358] blur-md opacity-65 animate-pulse" />
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative z-10 drop-shadow-md md:w-[40px] md:h-[40px]">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#745B00" fillOpacity="0.2" />
                                    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="#D4AF37" />
                                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="#FCF0C7" />
                                </svg>
                            </div>
                        </div>

                        {/* Sacred Ganesha Arch Frame */}
                        <div className="relative z-10 bg-gradient-to-b from-[#FFFDF9] via-[#FCF6E8] to-[#F7E8C8] pt-8 pb-4 px-5 md:pt-10 md:pb-5 md:px-7 rounded-t-[130px] rounded-b-3xl border-2 border-[#C69232] shadow-[0_14px_34px_rgba(90,18,25,0.13)] transition-transform duration-700 hover:scale-105 mx-auto">
                            <div aria-hidden="true" className="absolute inset-0 bg-[#FCF0C7] blur-2xl opacity-65 rounded-full scale-110 -z-10 animate-pulse" />
                            <img src={ganeshImg} alt={t("ganeshImageAlt")} className="w-[144px] h-[144px] sm:w-[172px] sm:h-[172px] md:w-[228px] md:h-[228px] object-contain rounded-2xl" />
                        </div>
                    </div>

                    {/* Flanking Auspicious Blessings Row (Left & Right of Centerpiece) */}
                    <div className="mt-5 md:mt-6 w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6">
                        {/* Left Blessing */}
                        <div className="flex flex-col items-center text-center">
                            <LotusDecoration className="animate-[float_5s_ease-in-out_infinite] mb-1.5" />
                            <p className="font-patrika-classic text-lg sm:text-xl font-bold text-[#5A1219] tracking-wide">{t("leftDecoration.main")}</p>
                            <p className="font-patrika-clear text-xs sm:text-sm text-[#6E3439] max-w-[220px] leading-snug">{t("leftDecoration.sub")}</p>
                        </div>

                        {/* Center Deity Invocation */}
                        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 font-patrika-classic text-xs sm:text-sm md:text-base text-[#745B00] font-bold px-4 py-2 rounded-full bg-[#FCF6E8]/90 border border-[#E1C561]/70">
                            <p>{t("ganeshBlessing")}</p>
                            <span aria-hidden="true" className="w-1.5 h-1.5 bg-[#745B00] rounded-full animate-ping" />
                            <p>{t("ravळनाथBlessing")}</p>
                        </div>

                        {/* Right Blessing */}
                        <div className="flex flex-col items-center text-center">
                            <LotusDecoration className="animate-[float_5s_ease-in-out_infinite] [animation-delay:1s] mb-1.5" />
                            <p className="font-patrika-classic text-lg sm:text-xl font-bold text-[#5A1219] tracking-wide">{t("rightDecoration.main")}</p>
                            <p className="font-patrika-clear text-xs sm:text-sm text-[#6E3439] max-w-[220px] leading-snug">{t("rightDecoration.sub")}</p>
                        </div>
                    </div>
                </div>

                {/* Ceremony Subtitle & Couple Names */}
                <main className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl mx-auto">
                    <p className="font-patrika-classic text-[#6E161F] text-lg sm:text-xl md:text-2xl font-semibold mb-2 tracking-wide">{t("subtitle")}</p>

                    <h1 className="font-patrika-title text-4xl sm:text-5xl md:text-7xl font-bold text-[#5A1219] leading-tight mb-6 md:mb-8 drop-shadow-[0_2px_6px_rgba(90,18,25,0.1)] flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap">
                        <span>{t("groomName")}</span>
                        <span aria-hidden="true" className="text-[#B8292F] font-normal text-3xl sm:text-5xl md:text-6xl pb-1">
                            ॐ
                        </span>
                        <span>{t("brideName")}</span>
                    </h1>

                    {/* Wedding Date & Time Pill */}
                    <div className="patrika-pill-box text-[#4A0E14] font-patrika-clear text-sm sm:text-base md:text-lg px-5 sm:px-7 py-3 flex items-center gap-3 w-full max-w-[92%] sm:w-auto justify-center">
                        <span aria-hidden="true" className="text-lg md:text-xl leading-none">
                            📅
                        </span>
                        <span className="font-bold tracking-wide">
                            {t("weddingDate")} | {t("weddingTime")}
                        </span>
                    </div>

                    {/* Sacred Closing Shloka */}
                    <div className="mt-8 md:mt-10 text-center font-patrika-classic text-sm sm:text-base text-[#5C252A] leading-relaxed max-w-xl px-2 mb-2">
                        <p className="font-semibold">“{t("bottomShloka.line1")}</p>
                        <p className="font-semibold">{t("bottomShloka.line2")}”</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HeroSection;
