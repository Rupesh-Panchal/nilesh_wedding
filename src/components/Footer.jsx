import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation("footer");

    const linkedinUrl = "https://www.linkedin.com/in/rupesh-panchal-528716261?utm_source=share_via&utm_content=profile&utm_medium=member_android";

    return (
        <footer className="relative z-10 w-full overflow-hidden border-t border-gold/40 bg-ivory">
            {/* 
                CHANGED: 
                pt-8 (top padding keeps it elegant)
                pb-28 (bottom padding pushes content UP above the floating buttons)
                md:pb-32 (extra padding on desktop)
            */}
            <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-8 pb-20 md:pb-32">
                {/* Decorative Divider */}
                <div className="mb-3 flex w-full max-w-40 items-center gap-2">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold" />
                    <span className="h-1.5 w-1.5 rotate-45 border border-gold bg-marigold/30" />
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold" />
                </div>

                {/* Developer Credit */}
                <div className="inline-flex flex-wrap items-center justify-center gap-1.5 font-heading text-sm tracking-wide md:text-base">
                    <span className="text-xs text-ink/60 md:text-sm">{t("developedBy")}</span>
                    <span className="font-semibold text-kumkum">{t("developerName")}</span>
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${t("connectOnLinkedIn")} ${t("developerName")}`}
                        className="text-xs font-semibold text-gold-deep underline decoration-gold/50 underline-offset-2 transition-colors duration-300 hover:text-kumkum md:text-sm"
                    >
                        {t("connectOnLinkedIn")}
                    </a>
                </div>

                {/* NEW: Elegant closing ornament added below the sentence */}
                <div className="mt-4 flex items-center justify-center gap-3 opacity-60">
                    <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold" />
                    <svg className="h-3 w-3 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2C12 2 13.5 8.5 22 12C13.5 15.5 12 22 12 22C12 22 10.5 15.5 2 12C10.5 8.5 12 2 12 2Z" />
                    </svg>
                    <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
