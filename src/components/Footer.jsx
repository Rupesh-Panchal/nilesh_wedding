import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation("footer");

    const linkedinUrl = "https://www.linkedin.com/in/rupesh-panchal-528716261?utm_source=share_via&utm_content=profile&utm_medium=member_android";

    return (
        <footer className="relative z-10 w-full overflow-hidden border-t border-gold/40 bg-ivory">
            <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-3">
                {/* Decorative Divider */}
                <div className="mb-2 flex w-full max-w-40 items-center gap-2">
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
            </div>
        </footer>
    );
};

export default Footer;
