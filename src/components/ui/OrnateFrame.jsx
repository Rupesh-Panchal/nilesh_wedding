import { CornerFlourish } from "../ornaments/decor";

/**
 * Gilded double-border frame with corner flourishes.
 * `tone="light"` is ivory paper; `tone="dark"` is maroon silk with a jali lattice.
 * Used for every major card so the whole invitation shares one visual language.
 */
const OrnateFrame = ({ children, tone = "light", className = "", innerClassName = "", as: Tag = "div" }) => {
    const isDark = tone === "dark";

    return (
        <Tag className={`relative rounded-[1.75rem] bg-gilt p-[2.5px] shadow-gilt ${className}`}>
            <div
                className={`relative h-full rounded-[1.65rem] overflow-hidden ${
                    isDark ? "bg-kumkum bg-jali text-ivory" : "bg-ivory/95 bg-silk text-ink"
                } ${innerClassName}`}
            >
                {/* inner hairline */}
                <div aria-hidden="true" className={`pointer-events-none absolute inset-2 rounded-[1.3rem] border ${isDark ? "border-gold-light/35" : "border-gold/40"}`} />

                {/* corner flourishes */}
                {["top-2.5 left-2.5", "top-2.5 right-2.5 rotate-90", "bottom-2.5 right-2.5 rotate-180", "bottom-2.5 left-2.5 -rotate-90"].map((pos) => (
                    <CornerFlourish key={pos} className={`pointer-events-none absolute h-9 w-9 sm:h-11 sm:w-11 ${pos} ${isDark ? "text-gold-light/80" : "text-gold"}`} />
                ))}

                <div className="relative h-full">{children}</div>
            </div>
        </Tag>
    );
};

export default OrnateFrame;
