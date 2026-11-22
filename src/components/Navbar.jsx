import React, { useState, useRef, useEffect } from "react";
import { MapPin, Menu, X, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("invitation");
    const [scrollProgress, setScrollProgress] = useState(0);

    const dropdownRef = useRef(null);

    const { t, i18n } = useTranslation("navbar");

    const currentLanguage = i18n.resolvedLanguage || i18n.language;

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setIsLangDropdownOpen(false);
    };

    const navItems = [
        {
            key: "invitation",
            label: "menu.invitation",
            targetId: "invitation-section",
        },
        {
            key: "auspiciousTime",
            label: "menu.auspiciousTime",
            targetId: "muhurt-section",
        },
        {
            key: "venueEvents",
            label: "menu.venueEvents",
            targetId: "venue-section",
        },
        {
            key: "family",
            label: "menu.family",
            targetId: "family-section",
        },
        {
            key: "littleOnes",
            label: "menu.littleOnes",
            targetId: "little-ones-section",
        },
        {
            key: "contact",
            label: "menu.contact",
            targetId: "contact-section",
        },
    ];

    const languages = [
        { code: "mr", label: "मराठी" },
        { code: "hi", label: "हिंदी" },
        { code: "en", label: "ENG" },
    ];

    const currentLangLabel = languages.find((lang) => lang.code === currentLanguage)?.label || "मराठी";

    // Close language dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Actual page scroll progress and active section tracking
    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Calculate actual scroll percentage
            const progress = scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0;

            setScrollProgress(progress);

            // Update active navigation item based on current section
            const scrollPosition = scrollTop + 160;

            let currentSection = navItems[0].key;

            navItems.forEach((item) => {
                const section = document.getElementById(item.targetId);

                if (section && section.offsetTop <= scrollPosition) {
                    currentSection = item.key;
                }
            });

            setActiveTab(currentSection);
        };

        // Initial calculation
        updateScrollProgress();

        // Listen to scroll and resize events
        window.addEventListener("scroll", updateScrollProgress, {
            passive: true,
        });

        window.addEventListener("resize", updateScrollProgress);

        return () => {
            window.removeEventListener("scroll", updateScrollProgress);
            window.removeEventListener("resize", updateScrollProgress);
        };
    }, []);

    // Smooth navigation scrolling
    const handleNavClick = (e, item) => {
        e.preventDefault();

        setActiveTab(item.key);
        setIsMobileMenuOpen(false);

        const targetElement = document.getElementById(item.targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="sticky top-0 z-50 w-full">
            {/* Navbar Container */}
            <nav className="w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 relative">
                <div className="w-full xl:max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 gap-2 md:gap-4 lg:gap-6">
                    {/* Left: Logo & Name */}
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#fcf0c7] rounded flex items-center justify-center text-primary font-bold text-lg md:text-xl border border-secondary/50">🕉️</div>

                        <div className="flex flex-col">
                            <span className="text-[9px] md:text-[10px] text-secondary font-devanagari tracking-widest whitespace-nowrap">{t("ganeshMantra")}</span>

                            <span className="font-display font-bold text-sm md:text-lg text-primary tracking-wide whitespace-nowrap">{t("coupleName")}</span>
                        </div>
                    </div>

                    {/* Center: Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-3 xl:gap-5 font-devanagari text-sm font-semibold text-on-surface-variant whitespace-nowrap">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.key;

                            return (
                                <a
                                    key={item.key}
                                    href={`#${item.targetId}`}
                                    onClick={(e) => handleNavClick(e, item)}
                                    className={isActive ? "px-3 py-1.5 bg-primary-container text-surface rounded hover:bg-primary transition-colors" : "hover:text-primary transition-colors py-1.5"}
                                >
                                    {t(item.label)}
                                </a>
                            );
                        })}
                    </div>

                    {/* Right: Map, Language Selector & Mobile Menu */}
                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4 shrink-0">
                        {/* Map Button */}
                        <button
                            type="button"
                            className="flex items-center justify-center p-2 md:px-3 lg:px-4 md:py-2 bg-primary text-surface rounded-full text-sm hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap"
                        >
                            <MapPin size={16} />

                            <span className="font-semibold hidden md:inline ml-1.5">{t("map")}</span>
                        </button>

                        {/* Desktop Language Selector */}
                        <div className="hidden md:flex items-center bg-surface-container p-1 rounded-full border border-outline-variant shadow-sm">
                            {languages.map((language) => {
                                const isActive = currentLanguage === language.code;

                                return (
                                    <button
                                        key={language.code}
                                        type="button"
                                        onClick={() => changeLanguage(language.code)}
                                        aria-pressed={isActive}
                                        className={`px-3 py-1.5 rounded-full text-xs font-devanagari font-bold transition-all ${
                                            isActive ? "bg-secondary-container text-on-secondary-container shadow-sm" : "text-on-surface-variant hover:bg-surface-high"
                                        }`}
                                    >
                                        {language.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mobile Language Selector */}
                        <div className="relative md:hidden" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                                className="flex items-center justify-center gap-1 bg-surface-container border border-outline-variant text-primary rounded-full px-3 py-1.5 text-xs font-devanagari font-bold outline-none focus:border-primary transition-colors"
                            >
                                {currentLangLabel}

                                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-28 bg-surface border border-outline-variant rounded-xl shadow-lg py-1 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                                    {languages.map((language) => {
                                        const isActive = currentLanguage === language.code;

                                        return (
                                            <button
                                                key={language.code}
                                                type="button"
                                                onClick={() => changeLanguage(language.code)}
                                                className={`w-full text-left px-4 py-2 text-xs font-devanagari flex items-center justify-between transition-colors ${
                                                    isActive ? "bg-secondary-container/30 text-primary font-bold" : "text-on-surface-variant hover:bg-surface-container"
                                                }`}
                                            >
                                                {language.label}

                                                {isActive && <Check size={14} className="text-primary" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? t("mobileMenu.close") : t("mobileMenu.open")}
                            aria-expanded={isMobileMenuOpen}
                            className="lg:hidden p-1.5 md:p-2 text-primary hover:bg-surface-container rounded-md transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-surface border-b border-outline-variant/30 shadow-lg py-4 px-6 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.key;

                            return (
                                <a
                                    key={item.key}
                                    href={`#${item.targetId}`}
                                    onClick={(e) => handleNavClick(e, item)}
                                    className={
                                        isActive
                                            ? "py-2.5 text-center bg-primary-container text-surface rounded font-devanagari text-base font-semibold hover:bg-primary transition-colors"
                                            : "py-2.5 text-center font-devanagari text-base font-semibold text-on-surface-variant hover:text-primary transition-colors"
                                    }
                                >
                                    {t(item.label)}
                                </a>
                            );
                        })}
                    </div>
                )}

                {/* PAGE SCROLL PROGRESS BAR */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-secondary/20 overflow-hidden z-[60]"
                    role="progressbar"
                    aria-label="Page scroll progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(scrollProgress)}
                >
                    <div
                        className="h-full bg-gradient-to-r from-[#a87916] via-[#d4af37] to-[#f5df91] transition-[width] duration-100 ease-out"
                        style={{
                            width: `${scrollProgress}%`,
                        }}
                    />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
