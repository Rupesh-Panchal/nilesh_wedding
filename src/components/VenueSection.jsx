import { useTranslation } from "react-i18next";
import OrnateFrame from "./ui/OrnateFrame";
import SectionHeading from "./ui/SectionHeading";
import { tidy } from "./ui/text";
import { Mandala, Lotus } from "./ornaments/decor";
import { IconRings, IconPin, IconCompass, IconCalendar, IconClock, IconSparkle } from "./ornaments/icons";

const VenueSection = () => {
    const { t } = useTranslation("venue");

    // Official venue address as printed on the invitation card
    const venueAddress = "Thathai Bhatia Seva Fund Hall No. 4, Cross Lane, Opposite Namaha Hospital, S.K. Road, Kandivali West, Mumbai, Maharashtra, India";

    // Google Maps URLs generated from the same venue address
    const encodedVenue = encodeURIComponent(venueAddress);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedVenue}`;
    const mapEmbedUrl = `https://www.google.com/maps?q=${encodedVenue}&output=embed`;

    return (
        <section id="venue-section" className="relative w-full overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16">
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-marigold/10 blur-[100px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-rose/10 blur-[100px]" />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-10">
                <SectionHeading icon={IconPin} title={t("title")} subtitle={t("subtitle")} className="mb-12 md:mb-14" />

                <div className="grid grid-cols-1 items-stretch gap-7 lg:grid-cols-2 lg:gap-9">
                    {/* LEFT: the ceremony */}
                    <div className="flex flex-col gap-7">
                        <OrnateFrame>
                            <div className="flex gap-4 p-6 md:gap-5 md:p-8">
                                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-gold/60 bg-kumkum text-gold-light shadow-glow md:h-[4.5rem] md:w-[4.5rem]">
                                    <IconRings className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.3} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-base text-gold-deep">{t("vivah.label")}</span>
                                        <span className="shrink-0 rounded-full bg-kumkum px-3 py-0.5 text-sm text-gold-light">{t("vivah.day")}</span>
                                    </div>

                                    <h3 className="mt-2 font-heading text-xl leading-[1.6] text-kumkum md:text-2xl">{t("vivah.title")}</h3>

                                    <p className="mt-3 flex items-center gap-2 text-base text-ink/80">
                                        <IconCalendar className="h-5 w-5 shrink-0 text-gold-deep" />
                                        {t("vivah.date")}
                                    </p>

                                    <p className="mt-2 text-base leading-8 text-ink/70">{t("vivah.desc")}</p>
                                </div>
                            </div>
                        </OrnateFrame>

                        {/* Wedding mandala panel (large screens) */}
                        <div className="relative hidden min-h-[26rem] flex-1 items-center justify-center overflow-hidden rounded-[1.75rem] border border-gold/40 bg-gradient-to-b from-cream/80 via-ivory/70 to-blush/50 lg:flex">
                            <div aria-hidden="true" className="absolute h-64 w-64 rounded-full bg-marigold/20 blur-3xl animate-halo" />
                            <div aria-hidden="true" className="absolute left-1/2 top-[44%] aspect-square w-[22rem] -translate-x-1/2 -translate-y-1/2 text-gold/60 wedding-rotate">
                                <Mandala />
                            </div>

                            <IconSparkle aria-hidden="true" className="absolute left-[12%] top-[16%] h-7 w-7 animate-sparkle text-gold" strokeWidth={1.2} />
                            <IconSparkle aria-hidden="true" className="absolute right-[12%] top-[22%] h-5 w-5 animate-sparkle text-gold [animation-delay:0.8s]" strokeWidth={1.2} />
                            <Lotus aria-hidden="true" className="absolute bottom-24 left-[10%] h-12 w-12 animate-lotus-float" opacity={0.7} />
                            <Lotus aria-hidden="true" className="absolute bottom-28 right-[10%] h-10 w-10 animate-lotus-float [animation-delay:1.2s]" opacity={0.7} />

                            <div className="absolute left-1/2 top-[44%] grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold bg-gradient-to-br from-ivory to-cream shadow-glow wedding-heartbeat">
                                <div className="flex flex-col items-center text-kumkum">
                                    <IconRings className="h-11 w-11" strokeWidth={1.3} />
                                    <span className="mt-0.5 px-2 text-center text-xs leading-4">{t("vivah.label")}</span>
                                </div>
                            </div>

                            <p className="absolute inset-x-0 bottom-8 px-4 text-center font-heading text-xl leading-[1.6] text-kumkum">{tidy(t("decoration.greeting"))}</p>
                        </div>
                    </div>

                    {/* RIGHT: the venue */}
                    <OrnateFrame className="h-full" innerClassName="flex flex-col">
                        <div className="flex flex-1 flex-col p-6 md:p-8">
                            <div className="flex items-center gap-4 md:gap-5">
                                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-gold/60 bg-ivory text-kumkum shadow-glow md:h-[4.5rem] md:w-[4.5rem]">
                                    <IconPin className="h-9 w-9 md:h-10 md:w-10" strokeWidth={1.3} />
                                </div>

                                <div className="min-w-0">
                                    <span className="block text-base text-gold-deep">{t("venue.label")}</span>
                                    <h3 className="font-heading text-xl leading-[1.6] text-kumkum md:text-2xl">{t("venue.name")}</h3>
                                </div>
                            </div>

                            {/* Google Maps preview (opens directions) */}
                            <a
                                href={directionsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t("venue.openMap")}
                                className="group relative mt-6 block min-h-[16rem] w-full flex-1 overflow-hidden rounded-2xl border-2 border-gold/60 shadow-chandan"
                            >
                                <iframe
                                    src={mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, pointerEvents: "none" }}
                                    loading="lazy"
                                    title={t("venue.mapTitle")}
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 h-full w-full sepia-[.25] saturate-[.9]"
                                />

                                <div className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-kumkum/35 via-transparent to-transparent p-4 transition-colors duration-300 group-hover:from-kumkum/55">
                                    <span className="flex items-center gap-2 rounded-full border border-gold bg-ivory px-4 py-2 text-base text-kumkum shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                                        <IconCompass className="h-5 w-5" />
                                        {t("venue.openMap")}
                                    </span>
                                </div>
                            </a>

                            <ul className="mt-6 flex flex-col gap-4 text-base leading-8 text-ink/80">
                                <li className="flex items-start gap-3">
                                    <IconPin className="mt-1 h-6 w-6 shrink-0 text-gold-deep" strokeWidth={1.4} />
                                    <span>{t("venue.address")}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconCompass className="mt-1 h-6 w-6 shrink-0 text-gold-deep" strokeWidth={1.4} />
                                    <span>{t("venue.landmark")}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <IconClock className="mt-1 h-6 w-6 shrink-0 text-gold-deep" strokeWidth={1.4} />
                                    <span>{t("venue.locationNote")}</span>
                                </li>
                            </ul>

                            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-kumkum mt-7 w-full">
                                <IconCompass className="h-6 w-6 shrink-0" />
                                <span>{t("venue.directions")}</span>
                            </a>
                        </div>
                    </OrnateFrame>
                </div>
            </div>
        </section>
    );
};


export default VenueSection;
