import React from "react";
import { useTranslation } from "react-i18next";

/* Male Icon */
const MaleIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" aria-hidden="true">
        {/* Hair */}
        <path d="M19 25C17 12 23 5 32 5C42 5 47 13 45 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Face */}
        <path d="M20 24C20 15 25 11 32 11C39 11 44 15 44 24V29C44 38 39 44 32 44C25 44 20 38 20 29V24Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Neck */}
        <path d="M26 43V49M38 43V49" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Shoulders */}
        <path d="M26 47C20 48 14 52 12 59H52C50 52 44 48 38 47" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Shirt Collar */}
        <path d="M26 47L32 54L38 47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* Female Icon */
const FemaleIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" aria-hidden="true">
        {/* Hair */}
        <path d="M17 29V24C17 11 23 5 32 5C41 5 47 11 47 24V29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Face */}
        <path d="M21 23C21 15 25 11 32 11C39 11 43 15 43 23V29C43 38 38 44 32 44C26 44 21 38 21 29V23Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Long Hair */}
        <path d="M17 25C14 34 16 43 20 49M47 25C50 34 48 43 44 49" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Neck */}
        <path d="M26 43V49M38 43V49" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Shoulders */}
        <path d="M26 47C20 48 14 52 12 59H52C50 52 44 48 38 47" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dress Neckline */}
        <path d="M26 47C27 51 29 53 32 54C35 53 37 51 38 47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/* Heart Icon */
const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
    </svg>
);

/* Location Icon */
const LocationIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
    </svg>
);

/* Calendar Icon */
const CalendarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
    </svg>
);

/* Clock Icon */
const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
);

/* Groom and Bride Family Cards */
const FamilyCard = ({ type, title, subtitle, name, parentsTitle, parents, address, footer }) => {
    const isGroom = type === "groom";

    return (
        <article
            className="relative h-full min-h-[560px] flex flex-col
            overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm
            border border-[#e9dfc5]
            shadow-[0_10px_35px_rgba(91,3,9,0.08)]
            transition-all duration-300 hover:-translate-y-1
            hover:shadow-[0_18px_45px_rgba(91,3,9,0.14)]"
        >
            {/* Top Border */}
            <div className={`h-1.5 w-full ${isGroom ? "bg-[#5b0309]" : "bg-[#745b00]"}`} />

            {/* Header */}
            <div className="px-5 pt-6">
                <div
                    className={`rounded-xl py-3 px-4 text-center
                    text-white font-devanagari font-semibold text-lg
                    shadow-sm ${isGroom ? "bg-[#5b0309]" : "bg-[#745b00]"}`}
                >
                    {title}
                </div>
            </div>

            {/* Content */}
            <div
                className="flex-1 flex flex-col items-center
                text-center px-6 pt-7 pb-5"
            >
                {/* Male / Female Icon */}
                <div className="relative mb-5">
                    <div
                        className="w-[76px] h-[76px] rounded-2xl
                        bg-[#fcf0c7] border border-[#ead9a7]
                        flex items-center justify-center
                        text-[#745b00] shadow-inner"
                    >
                        {isGroom ? <MaleIcon /> : <FemaleIcon />}
                    </div>

                    <span
                        className="absolute -bottom-2 -right-2
                        w-7 h-7 rounded-full bg-[#5b0309]
                        border-2 border-white flex items-center
                        justify-center text-[#fcf0c7] text-xs"
                    >
                        ✦
                    </span>
                </div>

                {/* Subtitle */}
                <p
                    className="font-devanagari text-sm
                    text-[#987b38] font-medium mb-2"
                >
                    {subtitle}
                </p>

                {/* Name */}
                <h3
                    className="font-devanagari text-2xl
                    md:text-[27px] font-bold text-[#5b0309]
                    mb-5 leading-relaxed"
                >
                    {name}
                </h3>

                {/* Divider */}
                <div
                    className="flex items-center
                    justify-center gap-3 w-full mb-5"
                >
                    <span className="h-px flex-1 bg-[#e9dcb9]" />
                    <span className="text-[#b18a35] text-lg">✥</span>
                    <span className="h-px flex-1 bg-[#e9dcb9]" />
                </div>

                {/* Parents */}
                <div className="w-full mb-6">
                    <h4
                        className="font-devanagari text-sm
                        font-bold text-[#745b00] mb-3"
                    >
                        {parentsTitle}
                    </h4>

                    <p
                        className="font-devanagari text-[15px]
                        text-gray-700 leading-8 whitespace-pre-line"
                    >
                        {parents}
                    </p>
                </div>

                {/* Address */}
                <div className="w-full mt-auto">
                    <div
                        className="bg-[#faf7ef] rounded-xl
                        border border-[#eee4cf] px-4 py-4"
                    >
                        <div
                            className="flex justify-center
                            items-center gap-2 text-[#745b00] mb-2"
                        >
                            <LocationIcon />

                            <span
                                className="font-devanagari
                                text-sm font-semibold"
                            >
                                मूळ गाव / पत्ता
                            </span>
                        </div>

                        <p
                            className="font-devanagari text-sm
                            text-gray-600 leading-7 whitespace-pre-line"
                        >
                            {address}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className="border-t border-[#eee4cf]
                bg-[#fcfaf5] py-4 px-4 text-center"
            >
                <p
                    className="font-devanagari text-sm
                    font-medium text-[#745b00] flex
                    items-center justify-center gap-2"
                >
                    <span>✦</span>
                    {footer}
                    <span>✦</span>
                </p>
            </div>
        </article>
    );
};

/* Wedding Details Card */
const WeddingCard = ({ t }) => (
    <article
        className="relative h-full min-h-[560px] flex flex-col
        overflow-hidden rounded-2xl bg-[#5b0309] text-white
        border border-[#76252b]
        shadow-[0_12px_40px_rgba(91,3,9,0.22)]
        transition-all duration-300 hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(91,3,9,0.3)]"
    >
        {/* Gold Top Border */}
        <div className="h-1.5 bg-[#c5a028]" />

        {/* Decorative Background */}
        <div
            className="absolute top-20 left-0 w-full
            flex justify-center opacity-[0.06]
            pointer-events-none"
        >
            <span className="text-[180px] leading-none">ॐ</span>
        </div>

        <div
            className="relative flex-1 flex flex-col
            items-center text-center px-6 pt-8 pb-6"
        >
            {/* Heart Icon */}
            <div
                className="w-[76px] h-[76px] rounded-2xl
                bg-[#745b00] border border-[#b28e36]
                flex items-center justify-center
                text-[#fff3cf] shadow-lg mb-5"
            >
                <HeartIcon />
            </div>

            {/* Mantra */}
            <p
                className="font-devanagari text-sm
                text-[#f2d995] font-semibold mb-3"
            >
                {t("wedding.mantra")}
            </p>

            {/* Wedding Title */}
            <h3
                className="font-devanagari text-2xl
                md:text-[27px] font-bold leading-relaxed mb-5"
            >
                {t("wedding.title")}
            </h3>

            {/* Divider */}
            <div className="flex items-center gap-3 w-full mb-6">
                <span className="h-px flex-1 bg-[#a66b6d]" />
                <span className="text-[#e1bd64] text-xl">✥</span>
                <span className="h-px flex-1 bg-[#a66b6d]" />
            </div>

            {/* Invitation Message */}
            <p
                className="font-devanagari text-sm
                text-[#f8e8c7] leading-8 mb-6"
            >
                {t("sectionSubtitle")}
            </p>

            {/* Muhurt Box */}
            <div
                className="w-full bg-[#470207]/80
                border border-[#8c494d] rounded-xl p-5 mb-5"
            >
                <p
                    className="font-devanagari text-[#e6c775]
                    text-sm font-semibold mb-4"
                >
                    {t("wedding.muhurtTitle")}
                </p>

                {/* Date */}
                <div
                    className="flex items-center
                    justify-center gap-3 mb-4 text-[#fff0d2]"
                >
                    <CalendarIcon />

                    <p
                        className="font-devanagari text-base
                        font-semibold leading-relaxed"
                    >
                        {t("wedding.date")}
                    </p>
                </div>

                <div
                    className="w-3/4 mx-auto h-px
                    bg-[#885053] mb-4"
                />

                {/* Time */}
                <div
                    className="flex items-center
                    justify-center gap-3 text-[#e6c775]"
                >
                    <ClockIcon />

                    <p className="font-devanagari text-xl font-bold">{t("wedding.time")}</p>
                </div>
            </div>

            {/* Wedding Quote */}
            <div className="mt-auto w-full">
                <p
                    className="font-devanagari text-sm italic
                    leading-8 text-[#f8e8c7]"
                >
                    "{t("wedding.quote")}"
                </p>
            </div>
        </div>

        {/* Footer */}
        <div
            className="bg-[#470207] border-t border-[#854044]
            py-4 text-center"
        >
            <p
                className="font-devanagari text-sm
                font-semibold text-[#e9cb83]"
            >
                ✦ शुभमंगल सावधान ✦
            </p>
        </div>
    </article>
);

/* Main Family Section */
const FamilySection = () => {
    const { t } = useTranslation("family");

    return (
        <section
            className="relative w-full py-16 md:py-24
            bg-white/40 backdrop-blur-[2px]"
        >
            <div
                className="w-full max-w-7xl mx-auto
                px-4 md:px-6 lg:px-8"
            >
                {/* Section Heading */}
                <div className="text-center mb-14">
                    <div
                        className="flex items-center
                        justify-center gap-4 mb-5"
                    >
                        <span className="w-14 h-px bg-[#c5a028]" />
                        <span className="text-[#a27d27] text-xl">✥</span>
                        <span className="w-14 h-px bg-[#c5a028]" />
                    </div>

                    <h2
                        className="font-devanagari text-3xl
                        md:text-4xl font-bold text-[#5b0309]
                        mb-4 tracking-wide"
                    >
                        {t("sectionTitle")}
                    </h2>

                    <p
                        className="font-devanagari text-sm
                        md:text-base text-gray-700 max-w-2xl
                        mx-auto leading-8"
                    >
                        {t("sectionSubtitle")}
                    </p>
                </div>

                {/* Three Equal Cards */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2
                    lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
                >
                    {/* Groom's Family */}
                    <FamilyCard
                        type="groom"
                        title={t("groomFamily.title")}
                        subtitle={t("groomFamily.subtitle")}
                        name={t("groomFamily.name")}
                        parentsTitle={t("groomFamily.parentsTitle")}
                        parents={t("groomFamily.parents")}
                        address={t("groomFamily.address")}
                        footer={t("groomFamily.footer")}
                    />

                    {/* Wedding Details */}
                    <WeddingCard t={t} />

                    {/* Bride's Family */}
                    <FamilyCard
                        type="bride"
                        title={t("brideFamily.title")}
                        subtitle={t("brideFamily.subtitle")}
                        name={t("brideFamily.name")}
                        parentsTitle={t("brideFamily.parentsTitle")}
                        parents={t("brideFamily.parents")}
                        address={t("brideFamily.address")}
                        footer={t("brideFamily.footer")}
                    />
                </div>
            </div>
        </section>
    );
};

export default FamilySection;
