import React, { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Menu, X, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const navItems = [
    { key: "invitation", label: "menu.invitation", targetId: "invitation-section" },
    { key: "family", label: "menu.family", targetId: "family-section" },
    { key: "auspiciousTime", label: "menu.auspiciousTime", targetId: "muhurt-section" },
    { key: "venueEvents", label: "menu.venueEvents", targetId: "venue-section" },
    { key: "contact", label: "menu.contact", targetId: "contact-section" },
];

const languages = [
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "ENG" },
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(navItems[0].key);
    const [scrollProgress, setScrollProgress] = useState(0);

    const dropdownRef = useRef(null);
    const navRef = useRef(null);
    const clickLockRef = useRef(false);
    const lockTimerRef = useRef(null);

    const { t, i18n } = useTranslation("navbar");
    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "mr").split("-")[0];
    const currentLangLabel = languages.find((l) => l.code === currentLanguage)?.label || "मराठी";

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setIsLangDropdownOpen(false);
    };

    const getNavHeight = () => (navRef.current ? navRef.current.offsetHeight : 64);

    // Close language dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Scroll progress + active section tracking
    useEffect(() => {
        let ticking = false;

        const update = () => {
            ticking = false;

            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0);

            // Don't override the active tab while a click-triggered smooth scroll is running
            if (clickLockRef.current) return;

            // A section becomes active once its top crosses this line (just under the navbar)
            const line = getNavHeight() + 120;
            let current = navItems[0].key;

            navItems.forEach((item) => {
                const el = document.getElementById(item.targetId);
                if (el && el.getBoundingClientRect().top <= line) {
                    current = item.key;
                }
            });

            // At the very bottom of the page, the last tab is active
            if (maxScroll > 0 && scrollTop >= maxScroll - 4) {
                current = navItems[navItems.length - 1].key;
            }

            setActiveTab(current);
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    useEffect(() => () => clearTimeout(lockTimerRef.current), []);

    const scrollToId = useCallback((targetId, key) => {
        if (key) setActiveTab(key);

        clickLockRef.current = true;
        clearTimeout(lockTimerRef.current);
        lockTimerRef.current = setTimeout(() => {
            clickLockRef.current = false;
        }, 1000);

        // First tab: go to the very top of the page
        if (targetId === navItems[0].targetId) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const el = document.getElementById(targetId);
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.scrollY - getNavHeight() - 8;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }, []);

    const handleNavClick = (e, item) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        requestAnimationFrame(() => scrollToId(item.targetId, item.key));
    };

    const handleMapClick = () => {
        setIsMobileMenuOpen(false);
        scrollToId("venue-section", "venueEvents");
    };

    return (
        <div ref={navRef} className="sticky top-0 z-50 w-full">
            <nav className="w-full bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 relative">
                <div className="w-full xl:max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 gap-2 md:gap-4 lg:gap-6">
                    {/* Logo & Name */}
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#fcf0c7] rounded flex items-center justify-center text-primary font-bold text-lg md:text-xl border border-secondary/50">🕉️</div>
                        <div className="flex flex-col">
                            <span className="text-[9px] md:text-[10px] text-secondary font-devanagari tracking-widest whitespace-nowrap">{t("ganeshMantra")}</span>
                            <span className="font-display font-bold text-sm md:text-lg text-primary tracking-wide whitespace-nowrap">{t("coupleName")}</span>
                        </div>
                    </div>

                    {/* Desktop links */}
                    <div className="hidden lg:flex items-center gap-3 xl:gap-5 font-devanagari text-sm font-semibold text-on-surface-variant whitespace-nowrap">
                        {navItems.map((item) => {
                            const isActive = activeTab === item.key;
                            return (
                                <a
                                    key={item.key}
                                    href={`#${item.targetId}`}
                                    onClick={(e) => handleNavClick(e, item)}
                                    aria-current={isActive ? "true" : undefined}
                                    className={
                                        isActive ? "px-3 py-1.5 bg-primary-container text-surface rounded hover:bg-primary transition-colors" : "px-3 py-1.5 hover:text-primary transition-colors"
                                    }
                                >
                                    {t(item.label)}
                                </a>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2 md:gap-3 lg:gap-4 shrink-0">
                        <button
                            type="button"
                            onClick={handleMapClick}
                            className="flex items-center justify-center p-2 md:px-3 lg:px-4 md:py-2 bg-primary text-surface rounded-full text-sm hover:bg-primary-container transition-colors shadow-sm whitespace-nowrap"
                        >
                            <MapPin size={16} />
                            <span className="font-semibold hidden md:inline ml-1.5">{t("map")}</span>
                        </button>

                        {/* Desktop language selector */}
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

                        {/* Mobile language selector */}
                        <div className="relative md:hidden" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsLangDropdownOpen((o) => !o)}
                                className="flex items-center justify-center gap-1 bg-surface-container border border-outline-variant text-primary rounded-full px-3 py-1.5 text-xs font-devanagari font-bold outline-none focus:border-primary transition-colors"
                            >
                                {currentLangLabel}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isLangDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-28 bg-surface border border-outline-variant rounded-xl shadow-lg py-1 z-[60]">
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

                        {/* Mobile menu button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen((o) => !o)}
                            aria-label={isMobileMenuOpen ? t("mobileMenu.close") : t("mobileMenu.open")}
                            aria-expanded={isMobileMenuOpen}
                            className="lg:hidden p-1.5 md:p-2 text-primary hover:bg-surface-container rounded-md transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-surface border-b border-outline-variant/30 shadow-lg py-4 px-6 flex flex-col gap-2 z-50">
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

                {/* Scroll progress bar */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-secondary/20 overflow-hidden z-[60]"
                    role="progressbar"
                    aria-label="Page scroll progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(scrollProgress)}
                >
                    <div className="h-full bg-gradient-to-r from-[#a87916] via-[#d4af37] to-[#f5df91] transition-[width] duration-100 ease-out" style={{ width: `${scrollProgress}%` }} />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
