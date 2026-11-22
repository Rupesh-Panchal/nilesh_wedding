import React from "react";
import { Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation("footer");

    const linkedinUrl = "https://www.linkedin.com/in/rupesh-panchal-528716261?utm_source=share_via&utm_content=profile&utm_medium=member_android";

    return (
        <footer className="w-full bg-[#faf6f2]/95 border-t border-[#d4af37]/30 relative overflow-hidden">
            <div className="w-full xl:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5 md:py-6">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
                    {/* Center: Mantra / Blessing */}
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="font-devanagari text-sm sm:text-base font-bold text-[#8b4513] mb-1">{t("blessingTitle")}</h3>

                        <p className="font-devanagari text-xs sm:text-sm text-[#6b5140] leading-relaxed">{t("blessingDescription")}</p>
                    </div>

                    {/* Right: Footer Details */}
                    <div className="text-center md:text-right flex flex-col gap-2 shrink-0">
                        {/* Footer Links */}
                        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 font-devanagari text-xs text-[#8b4513]">
                            <span>{t("footerLinks.bond")}</span>

                            <span className="text-[#d4af37]">•</span>

                            <span>{t("footerLinks.tradition")}</span>

                            <span className="text-[#d4af37]">•</span>

                            <span>{t("footerLinks.celebration")}</span>
                        </div>

                        {/* Developer Credit */}
                        <div className="flex items-center justify-center md:justify-end gap-1.5 text-xs sm:text-sm text-[#6b5140]">
                            <span>Developed By</span>

                            <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Connect with Rupesh Panchal on LinkedIn"
                                className="inline-flex items-center gap-1.5 font-semibold text-[#8b4513] hover:text-[#b8860b] transition-colors duration-200"
                            >
                                <span>Rupesh Panchal</span>
                                <Linkedin size={15} />
                                <span>{t("connect")}</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative Divider */}
                <div className="mt-5 flex justify-center">
                    <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
