import { useTranslation } from "react-i18next";
import { IconGarland, IconSparkle, IconHeart } from "./ornaments/icons";
import { tidy } from "./ui/text";

/* A string of bunting, like the paper flags the children hang for the wedding */
const Bunting = () => {
    const colors = ["#5b0309", "#e8941a", "#c5a028", "#b83a55", "#56733f"];
    const flags = Array.from({ length: 14 });
    return (
        <svg viewBox="0 0 560 70" className="mx-auto h-16 w-full max-w-2xl" aria-hidden="true" preserveAspectRatio="xMidYMin meet">
            <path d="M0 6Q280 56 560 6" fill="none" stroke="#8d6b0f" strokeWidth="1.4" />
            {flags.map((_, i) => {
                const t = (i + 0.5) / flags.length;
                const x = t * 560;
                const y = (1 - t) * (1 - t) * 6 + 2 * (1 - t) * t * 56 + t * t * 6;
                const color = colors[i % colors.length];
                return (
                    <g key={i} transform={`translate(${x} ${y}) rotate(${(t - 0.5) * 22})`}>
                        <path d="M-14 0H14L0 28Z" fill={color} fillOpacity="0.92" />
                        <path d="M-14 0H14L0 28Z" fill="none" stroke="#ecd48a" strokeWidth="0.9" strokeOpacity="0.8" />
                        <circle cy="7" r="2.1" fill="#ecd48a" fillOpacity="0.85" />
                    </g>
                );
            })}
        </svg>
    );
};

const LittleOnesSection = () => {
    const { t } = useTranslation("littleOnes");

    return (
        <section id="little-ones-section" className="relative w-full overflow-hidden pb-16 pt-10 md:pb-24 md:pt-14">
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-rose/10 blur-[100px]" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-marigold/10 blur-[100px]" />

            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-4 md:px-6">
                <Bunting />

                {/* A handwritten-feeling note card from the children */}
                <div className="relative mt-10 w-full rounded-[2rem] border-2 border-dashed border-gold/60 bg-gradient-to-b from-blush/70 via-ivory/90 to-cream/90 px-6 pb-10 pt-12 text-center shadow-chandan md:px-14">
                    <div className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border border-gold bg-ivory text-rose shadow-glow">
                        <IconHeart className="h-8 w-8" strokeWidth={1.4} />
                    </div>

                    <h2 className="font-heading text-[1.55rem] leading-[1.7] text-kumkum sm:text-3xl md:text-[2.4rem]">{tidy(t("title", '"आमच्या दादाच्या लग्नाला यायचं हं...!"'))}</h2>

                    <p className="mx-auto mt-4 max-w-xl text-base italic leading-8 text-ink/75 md:text-lg md:leading-9">{t("subtitle", "हसऱ्या चेहऱ्यांनी आणि उत्साहाने भरलेल्या चिमुकल्यांचा आग्रहाचा निमंत्रण संदेश.")}</p>

                    <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 md:gap-4">
                        <IconGarland className="h-9 w-9 shrink-0 text-gold-deep" strokeWidth={1.3} />
                        <p className="min-w-0 text-base leading-8 text-kumkum md:text-lg">{t("footerMessage", "टाळ्यांच्या गजरात आपले स्वागत")}</p>
                        <IconSparkle className="h-9 w-9 shrink-0 text-gold-deep" strokeWidth={1.3} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LittleOnesSection;
