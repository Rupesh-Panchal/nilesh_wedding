import React from "react";
import { useTranslation } from "react-i18next";

const LittleOnesSection = () => {
    const { t } = useTranslation("littleOnes");

    return (
        <section id="muhurt-section" className="relative w-full pt-8 md:pt-12 pb-16 md:pb-20 bg-transparent overflow-hidden">
            {/* Background Glows matching your theme */}
            <div className="absolute top-10 left-[-100px] w-72 h-72 bg-[#fcd358]/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-10 right-[-100px] w-72 h-72 bg-[#c5a028]/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 flex flex-col items-center">
                {/* Text Content */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="font-devanagari text-2xl sm:text-3xl md:text-4xl font-bold text-[#5b0309] mb-4 tracking-wide">{t("title", '"आमच्या दादांच्या लग्नाला यायचं हं...!"')}</h2>
                    <p className="font-devanagari text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {t("subtitle", "हसऱ्या चेहऱ्यांनी आणि उत्साहाने भरलेल्या चिमुकल्यांचा आग्रहाचा निमंत्रण संदेश.")}
                    </p>
                </div>

                {/* Footer Message with Icons */}
                <div className="grid w-full max-w-xl grid-cols-[24px_minmax(0,1fr)_24px] items-center gap-2 md:gap-4 mx-auto">
                    {/* Left Clapboard Icon */}
                    <svg className="w-6 h-6 text-[#b45309] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 22h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.18a2 2 0 0 1-1.41-.59l-1.41-1.41A2 2 0 0 0 9.58 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z" />
                        <path d="m15 2-2 4" />
                        <path d="m9 2-2 4" />
                        <path d="m3 2-2 4" />
                    </svg>

                    {/* Center Message */}
                    <p className="min-w-0 text-center font-devanagari text-xs sm:text-sm md:text-base font-bold text-[#b45309] tracking-wide leading-relaxed break-words">
                        ✦ {t("footerMessage", "टाळ्यांच्या गजरात आपले स्वागत")} ✦
                    </p>

                    {/* Right Party Popper Icon */}
                    <svg className="w-6 h-6 text-[#b45309] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5.8 11.3 2 22l10.7-3.79" />
                        <path d="M4 3h.01" />
                        <path d="M22 8h.01" />
                        <path d="M15 2h.01" />
                        <path d="M22 20h.01" />
                        <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
                        <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" />
                        <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
                        <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default LittleOnesSection;
