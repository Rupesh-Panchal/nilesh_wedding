import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "English" },
];

export default function LanguageToggle() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    const currentCode = (i18n.resolvedLanguage || i18n.language || "mr").slice(0, 2).toLowerCase();

    const activeLang = LANGUAGES.find((item) => item.code === currentCode) || LANGUAGES[0];

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleSelectLanguage = (code) => {
        i18n.changeLanguage(code);
        try {
            window.localStorage.setItem("i18nextLng", code);
        } catch {
            // Ignore storage restrictions
        }
        setOpen(false);
    };

    return (
        <div ref={containerRef} className="fixed bottom-5 left-5 z-50 select-none" aria-label="Language Selector">
            {/* Popover Dropdown Menu */}
            {open && (
                <div
                    role="listbox"
                    aria-label="Choose language"
                    className="mb-2.5 w-44 rounded-2xl border-2 border-[#D4AF37]/80 bg-[#FBF0D4] p-2 shadow-[0_14px_32px_rgba(74,10,16,0.22)] ring-2 ring-[#FDF8EC]/90 transition-all duration-200"
                >
                    <div className="flex flex-col gap-1">
                        {LANGUAGES.map((lang) => {
                            const isSelected = lang.code === activeLang.code;
                            return (
                                <button
                                    key={lang.code}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleSelectLanguage(lang.code)}
                                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-left text-[15px] font-bold transition-colors ${
                                        isSelected ? "bg-[#6E0D17] text-[#FFF8E8] shadow-sm" : "text-[#5C1118] hover:bg-[#F3E2BA]"
                                    }`}
                                >
                                    <span className="leading-snug">{lang.label}</span>
                                    {isSelected && (
                                        <svg
                                            className="h-4 w-4 shrink-0 text-[#FFF8E8]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Bottom-Left Trigger Pill */}
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-full border-2 border-[#D4AF37]/80 bg-[#FBF0D4] px-4 py-2.5 text-[15px] font-bold text-[#5C1118] shadow-[0_10px_24px_rgba(74,10,16,0.16)] ring-2 ring-[#FDF8EC]/90 transition-all hover:border-[#C59B27] hover:bg-[#FDF4DE] active:scale-[0.98]"
            >
                {/* Translate / 文A Icon */}
                <svg className="h-4 w-4 shrink-0 text-[#7A151E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                </svg>

                <span className="leading-none">{activeLang.label}</span>

                {/* Chevron */}
                <svg
                    className={`h-4 w-4 shrink-0 text-[#7A151E] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>
        </div>
    );
}
