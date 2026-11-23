import { useTranslation } from "react-i18next";
import OrnateFrame from "./ui/OrnateFrame";
import SectionHeading from "./ui/SectionHeading";
import { Divider, Lotus, Monogram } from "./ornaments/decor";
import { IconCrown, IconLotus, IconKalash, IconPin, IconCalendar, IconClock, IconSparkle } from "./ornaments/icons";

/* The arched niche that holds each family's emblem, echoing the hero arch */
const EmblemNiche = ({ children, dark = false }) => (
    <div className="relative mx-auto h-[7.5rem] w-24">
        <div className={`absolute inset-0 rounded-t-[999px] rounded-b-2xl border-2 ${dark ? "border-gold-light/80" : "border-gold"} p-1`}>
            <div className={`grid h-full w-full place-items-center rounded-t-[999px] rounded-b-xl ${dark ? "bg-oxblood text-gold-light" : "bg-gradient-to-b from-cream to-blush/60 text-kumkum"}`}>{children}</div>
        </div>
        <IconSparkle className={`absolute -right-3 bottom-1 h-6 w-6 ${dark ? "text-gold-light" : "text-gold"}`} strokeWidth={1.3} />
    </div>
);

/* Groom / Bride card */
const FamilyCard = ({ type, title, subtitle, name, parentsTitle, parents, address, footer, addressLabel }) => {
    const isGroom = type === "groom";
    const Emblem = isGroom ? IconCrown : IconLotus;

    return (
        <OrnateFrame className="h-full" innerClassName="flex flex-col">
            <div className="flex flex-1 flex-col items-center px-7 pb-6 pt-9 text-center sm:px-9">
                <p className={`rounded-full px-6 py-1.5 text-base ${isGroom ? "bg-kumkum text-gold-light" : "bg-gold-deep text-ivory"}`}>{title}</p>

                <div className="mt-8">
                    <EmblemNiche>
                        <Emblem className="h-12 w-12" strokeWidth={1.3} />
                    </EmblemNiche>
                </div>

                <p className="mt-6 text-base text-gold-deep">{subtitle}</p>
                <h3 className="mt-1 font-heading text-[1.9rem] leading-[1.5] text-kumkum md:text-[2.1rem]">{name}</h3>

                <Divider className="my-4 w-full" />

                <p className="text-base text-gold-deep">{parentsTitle}</p>
                <p className="mt-2 whitespace-pre-line text-[1.08rem] leading-9 text-ink/85">{parents}</p>

                <div className="mt-6 w-full flex-1" />

                <div className="w-full rounded-2xl border border-gold/40 bg-parchment/50 px-4 py-4">
                    <div className="flex items-center justify-center gap-2 text-gold-deep">
                        <IconPin className="h-6 w-6" strokeWidth={1.4} />
                        <span className="text-base">{addressLabel}</span>
                    </div>
                    <p className="mt-2 whitespace-pre-line text-[0.98rem] leading-8 text-ink/75">{address}</p>
                </div>

                <p className="mt-5 flex items-center justify-center gap-2 text-base text-gold-deep">
                    <IconSparkle className="h-4 w-4" strokeWidth={1.6} />
                    {footer}
                    <IconSparkle className="h-4 w-4" strokeWidth={1.6} />
                </p>
            </div>
        </OrnateFrame>
    );
};

/* The centre card: the two families become one */
const WeddingCard = ({ t }) => (
    <OrnateFrame tone="dark" className="h-full" innerClassName="flex flex-col">
        <div className="relative flex flex-1 flex-col items-center px-7 pb-8 pt-9 text-center sm:px-9">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 text-[11rem] leading-none text-gold-light/[0.07]">
                ॐ
            </div>

            <Monogram tone="light" className="relative h-28 w-28" />

            <p className="mt-5 text-lg text-gold-light">{t("wedding.mantra")}</p>
            <h3 className="mt-2 font-heading text-[1.9rem] leading-[1.5] text-ivory md:text-[2.1rem]">{t("wedding.title")}</h3>

            <Divider tone="light" className="my-4 w-full" />

            <p className="text-[1.02rem] leading-8 text-ivory/85">{t("sectionSubtitle")}</p>

            <div className="mt-6 w-full rounded-2xl border border-gold-light/40 bg-oxblood/70 p-5">
                <p className="text-base text-gold-light">{t("wedding.muhurtTitle")}</p>

                <div className="mt-4 flex items-center justify-center gap-3 text-ivory">
                    <IconCalendar className="h-7 w-7 shrink-0 text-gold-light" />
                    <p className="text-lg leading-8">{t("wedding.date")}</p>
                </div>

                <div className="gilt-rule mx-auto my-3 w-3/4" />

                <div className="flex items-center justify-center gap-3 text-gold-light">
                    <IconClock className="h-7 w-7 shrink-0" />
                    <p className="font-heading text-2xl leading-9">{t("wedding.time")}</p>
                </div>
            </div>

            <p className="mt-6 flex-1 text-base italic leading-8 text-ivory/80">“{t("wedding.quote")}”</p>

            <p className="mt-5 flex items-center justify-center gap-2 text-base text-gold-light">
                <IconSparkle className="h-4 w-4" strokeWidth={1.6} />
                शुभमंगल सावधान
                <IconSparkle className="h-4 w-4" strokeWidth={1.6} />
            </p>
        </div>
    </OrnateFrame>
);

const FamilySection = () => {
    const { t } = useTranslation("family");

    return (
        <section id="family-section" className="relative w-full overflow-hidden pb-16 pt-6 md:pb-24 md:pt-10">
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-marigold/10 blur-[100px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-rose/10 blur-[100px]" />
            <Lotus className="pointer-events-none absolute right-6 top-24 hidden h-20 w-20 animate-lotus-float lg:block" opacity={0.35} />
            <Lotus className="pointer-events-none absolute bottom-28 left-6 hidden h-16 w-16 animate-lotus-float lg:block" opacity={0.3} />

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-10">
                <SectionHeading icon={IconKalash} title={t("sectionTitle")} subtitle={t("sectionSubtitle")} className="mb-12 md:mb-16" />

                <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    <FamilyCard
                        type="groom"
                        title={t("groomFamily.title")}
                        subtitle={t("groomFamily.subtitle")}
                        name={t("groomFamily.name")}
                        parentsTitle={t("groomFamily.parentsTitle")}
                        parents={t("groomFamily.parents")}
                        address={t("groomFamily.address")}
                        footer={t("groomFamily.footer")}
                        addressLabel={t("addressLabel", "मूळ गाव / पत्ता")}
                    />

                    <div className="h-full">
                        <WeddingCard t={t} />
                    </div>

                    <div className="h-full md:col-span-2 md:mx-auto md:w-1/2 md:min-w-[22rem] lg:col-span-1 lg:mx-0 lg:w-auto lg:min-w-0">
                        <FamilyCard
                            type="bride"
                            title={t("brideFamily.title")}
                            subtitle={t("brideFamily.subtitle")}
                            name={t("brideFamily.name")}
                            parentsTitle={t("brideFamily.parentsTitle")}
                            parents={t("brideFamily.parents")}
                            address={t("brideFamily.address")}
                            footer={t("brideFamily.footer")}
                            addressLabel={t("addressLabel", "मूळ गाव / पत्ता")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FamilySection;
