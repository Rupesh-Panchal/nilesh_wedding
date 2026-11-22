import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Clock, Calendar, Navigation } from "lucide-react";

// Wedding Ring Icon
const RingIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="14" r="7" />
        <path d="M9 7l3-4 3 4" />
        <path d="M12 7v2" />
    </svg>
);

const VenueSection = () => {
    const { t } = useTranslation("venue");

    // Official venue address as printed on the invitation card
    const venueAddress = "Thathai Bhatia Seva Fund Hall No. 4, Cross Lane, Opposite Namaha Hospital, S.K. Road, Kandivali West, Mumbai, Maharashtra, India";

    // Google Maps URLs generated from the same venue address
    const encodedVenue = encodeURIComponent(venueAddress);

    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedVenue}`;

    const mapEmbedUrl = `https://www.google.com/maps?q=${encodedVenue}&output=embed`;

    return (
        <section id="venue-section" className="relative w-full pt-4 pb-12 md:pt-4 md:pb-20 bg-transparent overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-10 -left-24 w-72 h-72 bg-[#fcd358]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="absolute bottom-10 -right-24 w-72 h-72 bg-[#c5a028]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="absolute top-1/4 right-10 text-[#c5a028]/30 text-4xl pointer-events-none">✥</div>

            <div className="absolute bottom-1/4 left-10 text-[#d4af37]/30 text-2xl pointer-events-none">✦</div>

            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="font-devanagari text-[22px] sm:text-3xl md:text-4xl font-bold text-[#5b0309] mb-4 leading-snug">{t("title")}</h2>

                    <p className="font-devanagari text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-5">
                        {/* Wedding Event Card */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex gap-4 md:gap-5 transition-transform hover:-translate-y-1 duration-300">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#fef3c7] text-[#b45309] flex items-center justify-center shrink-0">
                                <RingIcon />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="font-devanagari text-xs font-bold text-[#b45309] tracking-wide">{t("vivah.label")}</span>

                                    <span className="bg-[#fef3c7] text-[#b45309] text-[10px] font-bold px-2 py-1 rounded-full font-devanagari shrink-0">{t("vivah.day")}</span>
                                </div>

                                <h3 className="font-devanagari text-lg md:text-xl font-bold text-[#5b0309] mb-3 leading-snug">{t("vivah.title")}</h3>

                                <p className="font-devanagari text-sm text-gray-600 mb-3 flex items-center gap-2">
                                    <Calendar size={15} className="text-[#c5a028] shrink-0" />
                                    {t("vivah.date")}
                                </p>

                                <p className="font-devanagari text-sm text-gray-600 leading-relaxed">{t("vivah.desc")}</p>
                            </div>
                        </div>

                        {/* Animated Wedding Decoration */}
                        <div className="hidden lg:flex relative w-full flex-1 min-h-[440px] bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-100 items-center justify-center overflow-hidden">
                            <div className="absolute w-64 h-64 rounded-full bg-[#fcd358]/10 blur-3xl animate-pulse" />

                            {/* Floating Decorations */}
                            <div className="wedding-petal petal-one">✦</div>
                            <div className="wedding-petal petal-two">❋</div>
                            <div className="wedding-petal petal-three">✧</div>
                            <div className="wedding-petal petal-four">✦</div>
                            <div className="wedding-petal petal-five">❋</div>
                            <div className="wedding-petal petal-six">✧</div>

                            {/* Mandala Container - Positioned higher up */}
                            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="relative w-[280px] h-[280px] flex items-center justify-center">
                                    {/* Rotating Mandala */}
                                    <div className="absolute inset-0 rounded-full border border-[#d4af37]/30 wedding-rotate">
                                        <div className="absolute inset-3 rounded-full border border-dashed border-[#d4af37]/50" />

                                        <svg viewBox="0 0 240 240" className="w-full h-full">
                                            <g fill="none" stroke="#c5a028" strokeWidth="1.2" opacity="0.65">
                                                <circle cx="120" cy="120" r="105" />
                                                <circle cx="120" cy="120" r="88" />
                                                <circle cx="120" cy="120" r="65" />

                                                {Array.from({ length: 12 }).map((_, i) => (
                                                    <ellipse key={i} cx="120" cy="45" rx="10" ry="24" transform={`rotate(${i * 30} 120 120)`} />
                                                ))}

                                                {Array.from({ length: 8 }).map((_, i) => (
                                                    <circle key={i} cx="120" cy="20" r="3" transform={`rotate(${i * 45} 120 120)`} fill="#d4af37" />
                                                ))}
                                            </g>
                                        </svg>
                                    </div>

                                    {/* Wedding Seal */}
                                    <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#fff8df] to-[#fce9ad] border border-[#d4af37]/50 shadow-[0_5px_30px_rgba(197,160,40,0.18)] flex flex-col items-center justify-center wedding-heartbeat">
                                        <svg viewBox="0 0 64 64" className="w-12 h-12 text-[#7a0911]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <circle cx="25" cy="35" r="13" />
                                            <circle cx="39" cy="35" r="13" />
                                            <path d="M18 18 L25 10 L32 18" stroke="#c5a028" />
                                            <path d="M32 18 L39 10 L46 18" stroke="#c5a028" />
                                        </svg>

                                        <span className="font-devanagari text-[10px] font-bold text-[#7a0911] mt-1">{t("vivah.label")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Wedding Greeting - Fixed Area */}
                            <div className="absolute bottom-0 left-0 right-0 h-[90px] flex items-center justify-center px-3">
                                <p className="font-devanagari text-lg md:text-xl font-bold text-[#7a0911] tracking-wide text-center leading-relaxed">{t("decoration.greeting")}</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - VENUE */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full">
                        {/* Venue Heading */}
                        <div className="flex gap-4 md:gap-5 mb-5 items-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#5b0309] text-[#c5a028] flex items-center justify-center shrink-0 shadow-inner">
                                <MapPin size={28} />
                            </div>

                            <div className="min-w-0">
                                <span className="font-devanagari text-xs font-bold text-[#c5a028] tracking-wide mb-1 block">{t("venue.label")}</span>

                                <h3 className="font-devanagari text-xl md:text-2xl font-bold text-[#5b0309] leading-tight">{t("venue.name")}</h3>

                                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[#b45309] font-semibold flex items-center gap-1 mt-2 hover:underline">
                                    <Navigation size={13} />
                                    {t("venue.mapLabel")}
                                </a>
                            </div>
                        </div>

                        {/* Google Maps */}
                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t("venue.openMap")}
                            className="block w-full min-h-[220px] rounded-xl overflow-hidden mb-5 border border-gray-200 shadow-sm relative group"
                        >
                            <iframe
                                src={mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{
                                    border: 0,
                                    pointerEvents: "none",
                                }}
                                loading="lazy"
                                title={t("venue.mapTitle")}
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 w-full h-full"
                            />

                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all">
                                <span className="bg-white text-[#5b0309] font-semibold text-sm px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Navigation size={15} className="inline mr-2" />
                                    {t("venue.openMap")}
                                </span>
                            </div>
                        </a>

                        {/* Venue Address */}
                        <div className="flex flex-col gap-4 mb-6">
                            <div className="font-devanagari text-sm text-gray-600 flex items-start gap-3">
                                <MapPin size={19} className="text-[#c5a028] shrink-0 mt-0.5" />

                                <span className="leading-relaxed">{t("venue.address")}</span>
                            </div>

                            {/* Landmark */}
                            <div className="font-devanagari text-sm text-gray-600 flex items-start gap-3">
                                <Navigation size={18} className="text-[#c5a028] shrink-0 mt-0.5" />

                                <span className="leading-relaxed">{t("venue.landmark")}</span>
                            </div>

                            <div className="font-devanagari text-sm text-gray-600 flex items-start gap-3">
                                <Clock size={18} className="text-[#c5a028] shrink-0 mt-0.5" />

                                <span className="leading-relaxed">{t("venue.locationNote")}</span>
                            </div>
                        </div>

                        {/* Directions Button */}
                        <a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto w-full bg-[#5b0309] hover:bg-[#78131b] text-white font-devanagari font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-md"
                        >
                            <Navigation size={18} />
                            <span>{t("venue.directions")}</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VenueSection;
