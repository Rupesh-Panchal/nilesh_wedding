import { useTranslation } from "react-i18next";
import invitationImage from "../assets/invitation.jpeg";
import OrnateFrame from "./ui/OrnateFrame";
import SectionHeading from "./ui/SectionHeading";
import { Divider, Lotus, Mandala, Monogram } from "./ornaments/decor";
import { IconPhone, IconInvitation, IconSparkle, IconHeart } from "./ornaments/icons";

const ContactSection = () => {
    const { t, i18n } = useTranslation("contact");

    const language = i18n.language.split("-")[0];

    const fontClass = language === "hi" || language === "mr" ? "font-devanagari" : "font-heading";

    const formatDigits = (text) => {
        if (language !== "hi" && language !== "mr") return text;

        const formatter = new Intl.NumberFormat(language === "hi" ? "hi-IN-u-nu-deva" : "mr-IN-u-nu-deva");

        return String(text).replace(/[0-9]/g, (digit) => formatter.format(Number(digit)));
    };

    // Contact numbers available until 5 December 2026 (Expires at midnight Dec 6)
    const contactExpiryDate = new Date(2026, 11, 6, 0, 0, 0);
    const isContactAvailable = new Date() < contactExpiryDate;

    // UPDATED: Added all 4 organizers mapping to your JSON
    const organizers = [
        {
            name: t("organizers.name1"),
            location: t("organizers.location1"),
            phone: t("organizers.phone1"),
        },
        {
            name: t("organizers.name2"),
            location: t("organizers.location2"),
            phone: t("organizers.phone2"),
        },
        {
            name: t("organizers.name3"),
            location: t("organizers.location3"),
            phone: t("organizers.phone3"),
        },
        {
            name: t("organizers.name4"),
            location: t("organizers.location4"),
            phone: t("organizers.phone4"),
        },
    ];

    const formatPhoneNumber = (phone) => {
        // If the contact is expired, return the masked format
        if (!isContactAvailable) return "+xx XXXXXXXXXX";

        // Otherwise, format it normally
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
        <section id="contact-section" className={`relative w-full overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16 ${fontClass}`}>
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-4 h-44 w-44 text-gold/25 wedding-rotate sm:h-60 sm:w-60 md:h-72 md:w-72">
                <Mandala />
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-4 h-44 w-44 text-gold/25 wedding-rotate-reverse sm:h-60 sm:w-60 md:h-72 md:w-72">
                <Mandala />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-4xl px-4 md:px-6">
                <SectionHeading icon={IconPhone} title={t("title", "व्यवस्थापक व निवासस्थान")} subtitle={t("headerTop", "सहकार्य व संपर्क")} className="mb-10 md:mb-14" />

                <OrnateFrame className="mx-auto max-w-2xl">
                    <div className="p-6 pt-9 sm:p-10 sm:pt-12">
                        <h3 className="flex items-center justify-center gap-3 text-center font-heading text-xl leading-[1.6] text-kumkum md:text-2xl">
                            <IconHeart className="h-6 w-6 shrink-0 text-rose" strokeWidth={1.4} />
                            {t("organizers.title", "व्यवस्थापक / संपर्क व्यक्ती")}
                        </h3>

                        <Divider className="my-5" />

                        <div className="flex flex-col gap-4">
                            {organizers.map((person, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center justify-between gap-4 rounded-2xl border border-gold/45 bg-parchment/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-chandan sm:p-5"
                                >
                                    <div className="min-w-0">
                                        <h4 className="text-xl leading-8 text-kumkum md:text-2xl">{person.name}</h4>
                                        <p className="text-base text-gold-deep">{person.location}</p>
                                        {/* Contact number - displays masked number if expired */}
                                        <p className="mt-1 font-devanagari text-lg tracking-wider text-kumkum/90">
                                            {isContactAvailable ? formatDigits(formatPhoneNumber(person.phone)) : "+xx XXXXXXXXXX"}
                                        </p>
                                    </div>

                                    {/* Call button - completely hidden/disabled after expiry */}
                                    {isContactAvailable && (
                                        <a
                                            href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}
                                            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold-light bg-kumkum text-gold-light shadow-gilt transition-transform duration-300 hover:scale-110 focus-visible:scale-110"
                                            aria-label={`Call ${person.name}`}
                                        >
                                            <IconPhone className="h-7 w-7" strokeWidth={1.5} />
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        <p className="mt-6 text-center text-base leading-8 text-ink/75">{t("note", "काही अडचण किंवा माहितीसाठी कृपया वरील क्रमांकावर संपर्क साधावा.")}</p>

                        <button type="button" onClick={handleDownload} className="btn-gold mt-7 w-full">
                            <IconInvitation className="h-7 w-7 shrink-0" strokeWidth={1.5} />
                            <span className="text-lg">{t("downloadButton", "पत्रिका डाउनलोड करा")}</span>
                        </button>
                    </div>
                </OrnateFrame>

                {/* Closing blessing */}
                <div className="mt-16 flex flex-col items-center text-center md:mt-24">
                    <Lotus className="h-12 w-12" opacity={0.9} />

                    <Monogram className="mt-3 h-28 w-28 md:h-32 md:w-32" />

                    <p className="mt-5 flex items-center gap-3 font-heading text-[1.7rem] leading-[1.6] text-gilt md:text-4xl">
                        <IconSparkle className="h-6 w-6 text-gold" strokeWidth={1.4} />॥ {t("footer", "शुभं भवतु")} ॥
                        <IconSparkle className="h-6 w-6 text-gold" strokeWidth={1.4} />
                    </p>

                    <Divider className="mt-5" />
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
