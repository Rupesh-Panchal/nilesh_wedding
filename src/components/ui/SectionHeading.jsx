import { Divider } from "../ornaments/decor";
import { tidy } from "./text";

/**
 * Chapter heading: a gilded medallion holding the chapter's icon, a title and
 * an optional subtitle. The Marathi "||" danda pair is shown as proper ॥.
 */

const SectionHeading = ({ icon: Icon, title, subtitle, tone = "dark", className = "" }) => {
    const isLight = tone === "light";

    return (
        <header className={`mx-auto max-w-3xl text-center ${className}`}>
            {Icon && (
                <div
                    className={`mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border shadow-glow ${
                        isLight ? "border-gold-light/70 bg-oxblood text-gold-light" : "border-gold/70 bg-ivory text-gold-deep"
                    }`}
                >
                    <span className={`grid h-[3.35rem] w-[3.35rem] place-items-center rounded-full border border-dashed ${isLight ? "border-gold-light/50" : "border-gold/60"}`}>
                        <Icon className="h-8 w-8" />
                    </span>
                </div>
            )}

            <h2 className={`font-heading text-[1.7rem] leading-[1.5] sm:text-4xl md:text-[2.8rem] ${isLight ? "text-gilt" : "text-kumkum"}`}>{tidy(title)}</h2>

            <Divider tone={isLight ? "light" : "dark"} className="mt-4" />

            {subtitle && <p className={`mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg md:leading-9 ${isLight ? "text-ivory/85" : "text-ink/80"}`}>{subtitle}</p>}
        </header>
    );
};

export default SectionHeading;
