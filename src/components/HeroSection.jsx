import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ganeshImg from "../assets/ganesh.png";
import { Toran, Mandala, Lotus, Divider } from "./ornaments/decor";
import { IconRings, IconCalendar, IconClock } from "./ornaments/icons";

/* A brass temple bell that hangs from the toran and sways gently */
const HangingBell = ({ className = "", delay = "0s", string = "h-14 md:h-24" }) => (
    <div aria-hidden="true" className={`pointer-events-none absolute flex origin-top flex-col items-center animate-swing ${className}`} style={{ animationDelay: delay }}>
        <span className={`w-px bg-gradient-to-b from-transparent to-gold-deep ${string}`} />
        <div className="relative">
            <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold/50 blur-lg animate-pulse" />
            <svg viewBox="0 0 32 40" className="relative h-9 w-7 drop-shadow-md md:h-12 md:w-10" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="16" cy="3.5" r="2.2" stroke="#8d6b0f" strokeWidth="1.3" />
                <path d="M16 5.7V10" stroke="#8d6b0f" strokeWidth="1.3" />
                <path d="M6.5 29c0-9 3-16 9.500-16s9.500 7 9.500 16z" fill="#e6c25a" stroke="#8d6b0f" strokeWidth="1.3" />
                <path d="M9.500 23h13M10.500 18.500h11" stroke="#8d6b0f" strokeWidth="0.9" opacity="0.7" />
                <path d="M4.500 29h23" stroke="#8d6b0f" strokeWidth="1.5" />
                <circle cx="16" cy="33.500" r="2.600" fill="#c5a028" stroke="#8d6b0f" strokeWidth="1.1" />
            </svg>
        </div>
    </div>
);

/* Flanking verse columns (large screens) */
const SideVerse = ({ main, sub, position }) => {
    const isLeft = position === "left";
    return (
        <div aria-hidden="true" className={`absolute top-[46%] hidden w-44 -translate-y-1/2 flex-col items-center text-center xl:flex ${isLeft ? "left-6 2xl:left-16" : "right-24 2xl:right-28"}`}>
            <Lotus className="h-16 w-16 animate-lotus-float" opacity={0.9} />
            <span className="my-4 h-16 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
            <p className="text-xl leading-9 text-kumkum">{main}</p>
            <p className="mt-3 text-[0.95rem] italic leading-7 text-ink/60 text-balance">{sub}</p>
            <span className="mt-4 h-16 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        </div>
    );
};

const HeroSection = () => {
    const { t } = useTranslation("hero");

    // The arch opens as the intro dissolves: one orchestrated moment, no scattered effects.
    const [revealed, setRevealed] = useState(() => typeof window !== "undefined" && !!window.__weddingIntroComplete);

    useEffect(() => {
        if (window.__weddingIntroComplete) return undefined;
        const open = () => setRevealed(true);
        window.addEventListener("wedding-start", open);
        window.addEventListener("wedding-intro-complete", open);
        return () => {
            window.removeEventListener("wedding-start", open);
            window.removeEventListener("wedding-intro-complete", open);
        };
    }, []);

    return (
        <section id="invitation-section" className={`relative w-full overflow-hidden ${revealed ? "hero-revealed" : "hero-pending"}`}>
            {/* Toran across the entrance */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[96px] justify-center overflow-hidden">
                <Toran swags={9} className="shrink-0" />
            </div>

            <HangingBell className="left-[5%] top-[72px] z-20 md:left-[9%]" />
            <HangingBell className="right-[5%] top-[72px] z-20 md:right-[9%]" delay="1s" />

            <SideVerse position="left" main={t("leftDecoration.main")} sub={t("leftDecoration.sub")} />
            <SideVerse position="right" main={t("rightDecoration.main")} sub={t("rightDecoration.sub")} />

            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-16 pt-[120px] text-center md:pt-[140px] md:pb-24">
                {/* Invocation */}
                <div className="flex items-center gap-3 rounded-full border border-gold/60 bg-ivory/80 px-6 py-2 shadow-chandan backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                    <p className="text-base text-gold-deep md:text-lg">{t("ganeshMantra")}</p>
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                </div>

                {/* THE MANDAP ARCH: the memorable moment */}
                <div className="hero-arch relative mt-14 w-[min(74vw,300px)] md:w-[340px]">
                    <div aria-hidden="true" className="absolute left-1/2 top-[44%] -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 text-gold/45 wedding-rotate">
                        <Mandala />
                    </div>
                    <div aria-hidden="true" className="absolute left-1/2 top-[44%] -z-10 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold/25 blur-3xl animate-halo" />

                    {/* keystone with Om */}
                    <div className="absolute -top-7 left-1/2 z-20 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border border-gold-light bg-kumkum shadow-glow">
                        <span className="text-gilt text-3xl leading-none">ॐ</span>
                    </div>

                    <Lotus className="absolute -bottom-5 -left-9 z-20 h-16 w-16 drop-shadow-md md:-left-12 md:h-20 md:w-20" />
                    <Lotus className="absolute -bottom-5 -right-9 z-20 h-16 w-16 drop-shadow-md md:-right-12 md:h-20 md:w-20" />

                    <div className="rounded-t-[999px] rounded-b-[2rem] bg-gilt p-[3px] shadow-gilt">
                        <div className="rounded-t-[999px] rounded-b-[1.9rem] bg-ivory p-2">
                            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] border border-gold/70 bg-gradient-to-b from-cream via-ivory to-blush/70 px-5 pb-7 pt-14 md:px-7">
                                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-marigold/15 to-transparent" />
                                <img
                                    src={ganeshImg}
                                    alt={t("ganeshImageAlt")}
                                    draggable="false"
                                    className="relative mx-auto aspect-square w-[92%] scale-[1.06] select-none object-cover mix-blend-multiply"
                                />
                                <Divider className="mt-3" />
                                <div className="mt-3 space-y-1 text-[0.95rem] leading-7 text-gold-deep md:text-base">
                                    <p>{t("ganeshBlessing")}</p>
                                    <p>{t("ravळनाथBlessing")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Names */}
                <div className="hero-names mt-12 md:mt-16">
                    <p className="text-xl italic text-maroon md:text-2xl">{t("subtitle")}</p>

                    <h1 className="mt-4 flex flex-col items-center gap-1 font-heading text-[3.1rem] leading-[1.45] text-kumkum md:flex-row md:justify-center md:gap-7 md:text-[5.2rem] md:leading-[1.4]">
                        <span>{t("groomName")}</span>
                        <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/70 bg-ivory text-gold-deep shadow-glow md:h-[4.5rem] md:w-[4.5rem]" aria-hidden="true">
                            <IconRings className="h-8 w-8 md:h-11 md:w-11" strokeWidth={1.4} />
                        </span>
                        <span>{t("brideName")}</span>
                    </h1>
                </div>

                {/* Date ribbon, verse */}
                <div className="hero-after mt-9 flex w-full flex-col items-center md:mt-12">
                    <div className="relative w-full max-w-[34rem] drop-shadow-[0_10px_16px_rgba(91,3,9,0.3)]">
                        <div className="bg-kumkum px-10 py-4 text-gold-light [clip-path:polygon(0_0,100%_0,calc(100%-18px)_50%,100%_100%,0_100%,18px_50%)] md:px-14">
                            <div className="pointer-events-none absolute inset-y-1.5 left-5 right-5 border-y border-gold-light/40" aria-hidden="true" />
                            <div className="relative flex flex-col items-center justify-center gap-x-5 gap-y-1 text-lg md:flex-row md:text-xl">
                                <span className="flex items-center gap-2.5">
                                    <IconCalendar className="h-6 w-6 shrink-0" />
                                    {t("weddingDate")}
                                </span>
                                <span className="hidden h-1.5 w-1.5 rotate-45 bg-gold-light/70 md:block" aria-hidden="true" />
                                <span className="flex items-center gap-2.5">
                                    <IconClock className="h-6 w-6 shrink-0" />
                                    {t("weddingTime")}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 max-w-xl">
                        <Lotus className="mx-auto h-10 w-10" opacity={0.85} />
                        <p className="mt-3 text-base italic leading-8 text-ink/75 md:text-lg">
                            “{t("bottomShloka.line1")}
                            <br />
                            {t("bottomShloka.line2")}”
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
