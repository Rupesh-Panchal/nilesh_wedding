import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IconKalash, IconRings, IconDiya, IconPin, IconSparkle, IconPhone } from "../ornaments/icons";

/**
 * The golden thread of the story.
 * - A fine gold thread fills across the top of the screen as the visitor travels
 *   through the invitation (all screen sizes).
 * - On large screens a trail of chapter icons sits on the right edge, showing
 *   where you are in the journey and letting you jump between chapters.
 */
const CHAPTERS = [
    { id: "invitation-section", icon: IconKalash, label: "menu.invitation" },
    { id: "family-section", icon: IconRings, label: "menu.family" },
    { id: "muhurt-section", icon: IconDiya, label: "menu.auspiciousTime" },
    { id: "venue-section", icon: IconPin, label: "menu.venueEvents" },
    { id: "little-ones-section", icon: IconSparkle, label: "menu.littleOnes" },
    { id: "contact-section", icon: IconPhone, label: "menu.contact" },
];

const JourneyThread = () => {
    const { t } = useTranslation("navbar");
    const [progress, setProgress] = useState(0);
    const [active, setActive] = useState(0);
    const ticking = useRef(false);

    useEffect(() => {
        const update = () => {
            ticking.current = false;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);

            const probe = window.innerHeight * 0.4;
            let current = 0;
            CHAPTERS.forEach((chapter, index) => {
                const el = document.getElementById(chapter.id);
                if (el && el.getBoundingClientRect().top <= probe) current = index;
            });
            setActive(current);
        };

        const onScroll = () => {
            if (ticking.current) return;
            ticking.current = true;
            requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const goTo = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        // Tell the slow auto-scroll that the visitor is steering, so it pauses politely
        window.dispatchEvent(new Event("wheel"));
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 8, behavior: "smooth" });
    };

    return (
        <>
            {/* Top thread */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[3px] bg-gold/15">
                <div className="h-full origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-light" style={{ transform: `scaleX(${progress})` }} />
            </div>

            {/* Chapter trail (large screens) */}
            <nav aria-label="Invitation chapters" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
                <div className="relative flex flex-col items-center gap-3.5 rounded-full border border-gold/40 bg-ivory/80 px-2 py-3 shadow-gilt backdrop-blur-md">
                    <span aria-hidden="true" className="absolute bottom-6 top-6 w-px bg-gold/25" />
                    <span aria-hidden="true" className="absolute left-1/2 top-6 w-px -translate-x-1/2 bg-gold" style={{ height: `calc((100% - 3rem) * ${progress})` }} />

                    {CHAPTERS.map((chapter, index) => {
                        const Icon = chapter.icon;
                        const isActive = index === active;
                        const isPast = index < active;

                        return (
                            <button
                                key={chapter.id}
                                type="button"
                                onClick={() => goTo(chapter.id)}
                                aria-label={t(chapter.label)}
                                title={t(chapter.label)}
                                aria-current={isActive ? "true" : undefined}
                                className={`relative grid h-9 w-9 place-items-center rounded-full border transition-all duration-500 ${
                                    isActive
                                        ? "scale-110 border-gold bg-kumkum text-gold-light shadow-glow"
                                        : isPast
                                          ? "border-gold/70 bg-parchment text-gold-deep"
                                          : "border-gold/30 bg-ivory text-gold-deep/60 hover:border-gold hover:text-gold-deep"
                                }`}
                            >
                                <Icon className="h-5 w-5" strokeWidth={1.6} />
                            </button>
                        );
                    })}
                </div>
            </nav>
        </>
    );
};

export default JourneyThread;
