import React from "react";
import { useTranslation } from "react-i18next";
import { Phone, Download } from "lucide-react";
import invitationImage from "../assets/invitation.jpeg";

// Shared horizontal alignment with Navbar
const containerClasses = "w-full xl:max-w-7xl mx-auto px-4 md:px-6 lg:px-8";

// Decorative golden mandala
const MandalaDecoration = ({ className = "" }) => {
    return (
        <div aria-hidden="true" className={`pointer-events-none ${className}`}>
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g stroke="#C5A028" strokeWidth="1.1" strokeLinecap="round">
                    <circle cx="80" cy="80" r="66" opacity="0.4" />
                    <circle cx="80" cy="80" r="53" opacity="0.55" />
                    <circle cx="80" cy="80" r="38" opacity="0.6" />

                    {Array.from({ length: 12 }).map((_, i) => (
                        <g key={i} transform={`rotate(${i * 30} 80 80)`}>
                            <path d="M80 14 C69 30 70 42 80 51 C90 42 91 30 80 14Z" fill="#D4AF37" fillOpacity="0.12" />
                            <path d="M80 14 L80 51" opacity="0.5" />
                            <circle cx="80" cy="8" r="2" fill="#D4AF37" />
                        </g>
                    ))}

                    {Array.from({ length: 8 }).map((_, i) => (
                        <g key={i} transform={`rotate(${i * 45} 80 80)`}>
                            <path d="M80 43 Q64 60 80 72 Q96 60 80 43Z" fill="#D4AF37" fillOpacity="0.12" />
                        </g>
                    ))}
                </g>

                <circle cx="80" cy="80" r="7" fill="#D4AF37" fillOpacity="0.25" />
                <circle cx="80" cy="80" r="3" fill="#C5A028" />
            </svg>
        </div>
    );
};

// Side ornament with rotating outer circle
const SideOrnament = ({ position = "left" }) => {
    return (
        <div
            aria-hidden="true"
            className={`
                pointer-events-none
                absolute top-1/2 -translate-y-1/2
                hidden md:flex flex-col items-center gap-4
                opacity-60
                ${position === "left" ? "left-3 md:left-6 lg:left-8" : "right-3 md:right-6 lg:right-8"}
            `}
        >
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#C5A028] to-[#D4AF37]" />

            <div className="relative flex items-center justify-center">
                {/* Rotating outer circle */}
                <div className="absolute w-16 h-16 rounded-full border border-[#C5A028]/30 animate-[spin_24s_linear_infinite]" />

                {/* Inner circle */}
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/60 flex items-center justify-center">
                    <span className="text-[#C5A028] text-xl">✥</span>
                </div>
            </div>

            <div className="flex flex-col items-center gap-3">
                <span className="text-[#C5A028] text-sm">✦</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[#C5A028] text-xs">✧</span>
            </div>

            <div className="w-px h-20 bg-gradient-to-b from-[#D4AF37] via-[#C5A028] to-transparent" />
        </div>
    );
};

// Static golden particles
const GoldenSparkles = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <span className="absolute left-[12%] top-[16%] text-[#D4AF37] text-xs opacity-60">✦</span>

            <span className="absolute left-[30%] top-[75%] text-[#C5A028] text-[10px] opacity-50">✧</span>

            <span className="absolute right-[15%] top-[18%] text-[#D4AF37] text-xs opacity-60">✦</span>

            <span className="absolute right-[28%] top-[72%] text-[#C5A028] text-[10px] opacity-50">✧</span>

            <span className="absolute left-[8%] top-[48%] text-[#D4AF37] text-[9px] opacity-40">✧</span>

            <span className="absolute right-[9%] top-[50%] text-[#D4AF37] text-[9px] opacity-40">✧</span>
        </div>
    );
};

const ContactSection = () => {
    const { t } = useTranslation("contact");

    // Contact numbers available until 5 December 2026
    const contactExpiryDate = new Date(2026, 11, 6, 0, 0, 0);
    const isContactAvailable = new Date() < contactExpiryDate;

    const organizers = [
        {
            name: t("organizers.name1"),
            location: t("organizers.location1"),
            phone: "+919876543210",
        },
        {
            name: t("organizers.name2"),
            location: t("organizers.location2"),
            phone: "+919876543211",
        },
    ];

    const formatPhoneNumber = (phone) => {
        return phone.replace(/^(\+91)(\d{10})$/, "+91 $2");
    };

    const handleDownload = () => {
        const link = document.createElement("a");

        link.href = invitationImage;
        link.download = "Invitation_Card.jpeg";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="contact-section" className="relative w-full py-16 md:py-24 overflow-hidden bg-transparent">
            {/* Navbar-aligned decoration container */}
            <div
                className={`
                    absolute inset-0
                    ${containerClasses}
                    pointer-events-none
                `}
            >
                {/* LEFT MANDALA */}
                <div
                    className="
                        absolute
                        top-4 left-3
                        sm:top-6 sm:left-4
                        md:top-6 md:left-6
                        lg:left-8
                        w-28 h-28
                        sm:w-36 sm:h-36
                        md:w-56 md:h-56
                        lg:w-64 lg:h-64
                        opacity-30
                        animate-[spin_80s_linear_infinite]
                    "
                >
                    <MandalaDecoration />
                </div>

                {/* RIGHT MANDALA */}
                <div
                    className="
                        absolute
                        bottom-4 right-3
                        sm:bottom-6 sm:right-4
                        md:bottom-6 md:right-6
                        lg:right-8
                        w-28 h-28
                        sm:w-36 sm:h-36
                        md:w-56 md:h-56
                        lg:w-64 lg:h-64
                        opacity-30
                        animate-[spin_90s_linear_infinite_reverse]
                    "
                >
                    <MandalaDecoration />
                </div>

                {/* LEFT SIDE ORNAMENT */}
                <SideOrnament position="left" />

                {/* RIGHT SIDE ORNAMENT */}
                <SideOrnament position="right" />

                {/* Static golden accents */}
                <div className="absolute top-[22%] right-[15%] text-[#C5A028] text-xl opacity-40">✧</div>

                <div className="absolute bottom-[25%] left-[14%] text-[#D4AF37] text-lg opacity-40">✦</div>
            </div>

            {/* Main Content */}
            <div className={`relative ${containerClasses}`}>
                <div className="w-full max-w-4xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-10 md:mb-14">
                        <p className="font-devanagari text-sm md:text-base text-[#c5a028] font-bold tracking-widest mb-2">॥ {t("headerTop", "सहकार्य व संपर्क")} ॥</p>

                        <h2 className="font-devanagari text-3xl md:text-4xl font-bold mb-4 tracking-wide text-[#5b0309]">{t("title", "व्यवस्थापक व निवासस्थान")}</h2>
                    </div>

                    {/* Main Contact Card */}
                    <div className="relative bg-white rounded-3xl p-6 md:p-10 shadow-[0_10px_40px_rgba(197,160,40,0.15)] border border-[#e1c561] max-w-2xl mx-auto overflow-hidden">
                        <GoldenSparkles />

                        {/* Card Header */}
                        <div className="relative z-10 flex items-center gap-3 mb-6 border-b border-[#e1c561] pb-4">
                            <Phone className="text-[#c5a028]" size={24} />

                            <h3 className="font-devanagari text-xl md:text-2xl font-bold text-[#5b0309]">{t("organizers.title", "व्यवस्थापक / संपर्क व्यक्ती")}</h3>
                        </div>

                        {/* Organizers List */}
                        <div className="relative z-10 flex flex-col gap-4 mb-8">
                            {organizers.map((person, index) => (
                                <div
                                    key={index}
                                    className="
                                        bg-[#fcf0c7]/60 rounded-xl p-4
                                        flex items-center justify-between gap-4
                                        border border-[#e1c561]
                                        hover:border-[#c5a028]
                                        hover:shadow-[0_5px_18px_rgba(197,160,40,0.15)]
                                        hover:-translate-y-0.5
                                        transition-all duration-300
                                    "
                                >
                                    <div className="min-w-0">
                                        <h4 className="font-devanagari text-lg md:text-xl font-bold text-[#5b0309] mb-1">{person.name}</h4>

                                        <p className="font-devanagari text-sm text-[#c5a028] mb-2">{person.location}</p>

                                        {/* Contact Number */}
                                        <p className="font-sans text-sm md:text-base font-semibold tracking-wide text-[#5b0309]">
                                            {isContactAvailable ? formatPhoneNumber(person.phone) : "XX XXXXXXXXXX"}
                                        </p>
                                    </div>

                                    {/* Call Button */}
                                    {isContactAvailable && (
                                        <a
                                            href={`tel:${person.phone}`}
                                            className="
                                                w-12 h-12 rounded-lg
                                                bg-[#c5a028] hover:bg-[#d4af37]
                                                flex items-center justify-center
                                                transition-all duration-300
                                                hover:scale-105 shadow-md
                                                shrink-0 text-[#5b0309]
                                            "
                                            aria-label={`Call ${person.name}`}
                                        >
                                            <Phone size={20} fill="currentColor" />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer Note */}
                        <p className="relative z-10 font-devanagari text-center text-sm text-[#745b00] mb-8 leading-relaxed">
                            {t("note", "काही अडचण किंवा माहितीसाठी कृपया वरील क्रमांकावर संपर्क साधावा.")}
                        </p>

                        {/* Download Button */}
                        <button
                            type="button"
                            onClick={handleDownload}
                            className="
                                relative z-10 w-full
                                bg-[#c5a028] hover:bg-[#d4af37]
                                text-[#5b0309]
                                font-devanagari font-bold
                                py-4 px-6 rounded-xl
                                flex items-center justify-center gap-3
                                transition-all duration-300
                                shadow-[0_6px_20px_rgba(197,160,40,0.25)]
                                hover:-translate-y-1
                            "
                        >
                            <Download size={22} />

                            <span className="text-lg">{t("downloadButton", "पत्रिका डाउनलोड करा")}</span>
                        </button>
                    </div>

                    {/* Bottom Text */}
                    <div className="text-center mt-12 md:mt-16">
                        <p className="font-devanagari text-xl md:text-2xl font-bold text-[#c5a028] tracking-widest">॥ {t("footer", "शुभं भवतु")} ॥</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
