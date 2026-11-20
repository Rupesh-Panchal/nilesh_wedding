import React from "react";
import { useTranslation } from "react-i18next";
import ganeshImg from "../assets/ganesh.png";

const HeroSection = () => {
    const { t } = useTranslation("hero");

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* HERO CONTENT */}
            <main className="relative z-10 flex flex-col items-center text-center px-4 pt-6 md:pt-12 pb-12">
                {/* Top Shloka Badge */}
                <div className="flex items-center gap-2 bg-[#fcf0c7] border border-[#e1c561] px-6 py-2 rounded-full mb-6 md:mb-12 shadow-sm">
                    <span className="text-secondary text-xs">✦</span>

                    <p className="font-devanagari text-secondary text-sm tracking-widest font-semibold">{t("ganeshMantra")}</p>

                    <span className="text-secondary text-xs">✦</span>
                </div>

                {/* Center Image Area with Animated Diyas */}
                <div className="relative flex items-center justify-center mb-10 group w-full max-w-lg md:max-w-2xl">
                    {/* Left Side Animated Diya */}
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

                    {/* Right Side Animated Diya */}
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

                    {/* The Actual Ganesh Image */}
                    <div className="relative z-10 bg-white p-2 rounded-2xl shadow-[0_4px_20px_rgba(197,160,40,0.2)] transition-transform duration-700 hover:scale-105 mx-auto">
                        <div className="absolute inset-0 bg-[#fcf0c7] blur-2xl opacity-60 rounded-full scale-110 -z-10 animate-pulse"></div>

                        <img src={ganeshImg} alt={t("ganeshImageAlt")} className="w-[140px] h-[140px] md:w-[240px] md:h-[240px] object-contain rounded-xl" />
                    </div>
                </div>

                {/* Sub Shlokas */}
                <div className="flex items-center gap-4 font-devanagari text-sm text-[#745b00] font-bold mb-4">
                    <p>{t("ganeshBlessing")}</p>

                    <div className="w-1.5 h-1.5 bg-[#745b00] rounded-full animate-ping"></div>

                    <p>{t("ravळनाथBlessing")}</p>
                </div>

                {/* Subtitle */}
                <p className="font-devanagari text-primary-container text-lg md:text-xl font-medium mb-2 tracking-wide">{t("subtitle")}</p>

                {/* Main Title */}
                <h1 className="font-devanagari text-4xl md:text-7xl font-bold text-primary leading-tight mb-8 drop-shadow-sm flex items-center justify-center gap-2">
                    {t("groomName")}

                    <span className="text-secondary font-normal text-3xl md:text-6xl pb-2">ॐ</span>

                    {t("brideName")}
                </h1>

                {/* Date Badge */}
                <div className="bg-primary-container text-surface font-devanagari text-sm md:text-lg px-5 py-3 rounded-lg flex items-center gap-3 shadow-chandan border border-[#5b0309] transition-all hover:shadow-lg w-full max-w-[90%] md:w-auto justify-center">
                    <span className="text-secondary-container text-lg md:text-xl">📅</span>

                    <span className="font-semibold">
                        {t("weddingDate")} | {t("weddingTime")}
                    </span>
                </div>

                {/* Bottom Shloka */}
                <div className="mt-10 text-center font-devanagari text-sm text-on-surface-variant leading-relaxed italic">
                    <p>"{t("bottomShloka.line1")}</p>
                    <p>{t("bottomShloka.line2")}"</p>
                </div>
            </main>
        </div>
    );
};

export default HeroSection;
