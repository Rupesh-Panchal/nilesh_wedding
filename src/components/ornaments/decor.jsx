import { useId } from "react";

/* ==========================================================================
   Decorative pieces: lotus, mandala, toran, dividers, frames, monogram seal.
   All artwork is inline SVG: crisp on every screen, no extra image downloads.
   ========================================================================== */

/** Gold lotus with a soft gradient fill */
export const Lotus = ({ className = "w-16 h-16", opacity = 1 }) => {
    const id = useId();
    return (
        <svg viewBox="0 0 100 85" fill="none" className={className} aria-hidden="true" style={{ opacity }}>
            <defs>
                <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f6e3a0" />
                    <stop offset="1" stopColor="#c5a028" />
                </linearGradient>
            </defs>
            <g stroke="#a67c14" strokeWidth="1.2" strokeLinejoin="round" fill={`url(#${id}-g)`} fillOpacity="0.38">
                <path d="M50 8C37 25 39 39 50 49 61 39 63 25 50 8Z" />
                <path d="M48 48C31 20 17 26 18 42 19 55 35 58 48 48Z" />
                <path d="M52 48C69 20 83 26 82 42 81 55 65 58 52 48Z" />
                <path d="M46 52C22 39 7 43 10 55 14 67 34 65 46 52Z" />
                <path d="M54 52C78 39 93 43 90 55 86 67 66 65 54 52Z" />
                <path d="M12 60Q50 80 88 60 72 78 50 77 28 78 12 60Z" fillOpacity="0.5" />
            </g>
            <circle cx="50" cy="53" r="3" fill="#a67c14" />
            <path d="M50 14v28M44 22c2 8 3 14 6 20M56 22c-2 8-3 14-6 20" stroke="#a67c14" strokeWidth="0.7" opacity="0.55" />
        </svg>
    );
};

/** Concentric mandala built from petal rings. Tint with text colour. */
export const Mandala = ({ className = "w-full h-full" }) => (
    <svg viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="1" className={className} aria-hidden="true">
        <circle cx="120" cy="120" r="117" strokeWidth="2" strokeDasharray="0.5 6" />
        <circle cx="120" cy="120" r="109" />
        {Array.from({ length: 24 }).map((_, i) => (
            <path key={`o${i}`} d="M120 12C115 22 115 30 120 37 125 30 125 22 120 12Z" transform={`rotate(${i * 15} 120 120)`} strokeWidth="0.9" />
        ))}
        <circle cx="120" cy="120" r="88" />
        {Array.from({ length: 12 }).map((_, i) => (
            <g key={`m${i}`} transform={`rotate(${i * 30} 120 120)`}>
                <path d="M120 34C106 52 106 70 120 87 134 70 134 52 120 34Z" />
                <path d="M120 44v34" strokeWidth="0.7" opacity="0.7" />
            </g>
        ))}
        <circle cx="120" cy="120" r="63" />
        {Array.from({ length: 8 }).map((_, i) => (
            <path key={`i${i}`} d="M120 58C111 70 111 82 120 93 129 82 129 70 120 58Z" transform={`rotate(${i * 45} 120 120)`} />
        ))}
        <circle cx="120" cy="120" r="30" />
        <circle cx="120" cy="120" r="9" fill="currentColor" fillOpacity="0.3" />
    </svg>
);

/**
 * Toran: the door-garland of mango leaves and marigolds hung at every
 * Indian wedding entrance. Drawn as swags so it can span any width.
 */
export const Toran = ({ swags = 9, className = "" }) => {
    const W = 260; // width of one swag
    const sag = 40;
    const perSwag = 9;
    const items = [];

    for (let s = 0; s < swags; s++) {
        const x0 = s * W;
        const x1 = x0 + W;
        const cx = x0 + W / 2;
        const y0 = 6;
        const cy = y0 + sag * 2;
        const pt = (t) => ({
            x: (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1,
            y: (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y0,
        });

        items.push(<path key={`s${s}`} d={`M${x0} ${y0} Q${cx} ${cy} ${x1} ${y0}`} stroke="#8d6b0f" strokeWidth="1.6" fill="none" />);

        for (let i = 0; i < perSwag; i++) {
            const t = (i + 0.5) / perSwag;
            const p = pt(t);
            const tilt = (t - 0.5) * 26;
            items.push(
                <g key={`l${s}-${i}`} transform={`translate(${p.x} ${p.y}) rotate(${tilt})`}>
                    <path d="M0 0C8 7 9 21 0 36 -9 21 -8 7 0 0Z" fill="#56733f" stroke="#3b5329" strokeWidth="0.8" />
                    <path d="M0 3V31" stroke="#3b5329" strokeWidth="0.7" opacity="0.7" />
                </g>,
            );
        }

        for (let i = 1; i < perSwag; i += 2) {
            const p = pt(i / perSwag);
            items.push(
                <g key={`m${s}-${i}`} transform={`translate(${p.x} ${p.y + 3})`}>
                    <circle r="7.5" fill="#e8941a" />
                    <circle r="7.5" fill="none" stroke="#b25f06" strokeWidth="1.3" strokeDasharray="1.4 2" />
                    <circle r="4.4" fill="#f4b744" />
                    <circle r="1.7" fill="#a85a05" />
                </g>,
            );
        }

        // Tassel with a brass bell at each joint between swags
        if (s < swags - 1) {
            items.push(
                <g key={`b${s}`} transform={`translate(${x1} ${y0})`}>
                    <path d="M0 0V16" stroke="#8d6b0f" strokeWidth="1.2" />
                    <circle cy="22" r="6.5" fill="#e8941a" />
                    <circle cy="22" r="6.5" fill="none" stroke="#b25f06" strokeWidth="1.2" strokeDasharray="1.4 2" />
                    <path d="M-4 30h8l-1.2 9h-5.6z" fill="#c5a028" stroke="#8d6b0f" strokeWidth="0.8" />
                    <circle cy="40.5" r="1.4" fill="#8d6b0f" />
                </g>,
            );
        }
    }

    return (
        <svg viewBox={`0 0 ${swags * W} 96`} width={swags * W} height="96" className={`max-w-none ${className}`} aria-hidden="true">
            {items}
        </svg>
    );
};

/** Section divider: gilt rules around a small lotus-and-diamond motif */
export const Divider = ({ className = "", tone = "dark" }) => {
    const gold = tone === "light" ? "text-gold-light" : "text-gold";
    const rule = tone === "light" ? "from-transparent to-gold-light/80" : "from-transparent to-gold";
    const ruleR = tone === "light" ? "from-gold-light/80 to-transparent" : "from-gold to-transparent";
    return (
        <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
            <span className={`h-px w-14 sm:w-28 bg-gradient-to-r ${rule}`} />
            <svg viewBox="0 0 64 20" className={`w-14 h-5 ${gold}`} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
                <path d="M32 2c-4 3-4 8 0 11 4-3 4-8 0-11z" fill="currentColor" fillOpacity="0.25" />
                <path d="M32 14c-6 1-10-1-12-4 4-.8 9 .2 12 4zM32 14c6 1 10-1 12-4-4-.8-9 .2-12 4z" />
                <path d="M4 10h10M50 10h10" strokeLinecap="round" />
                <path d="M18 10l2.5-2.5L23 10l-2.5 2.5zM41 10l2.5-2.5L46 10l-2.5 2.5z" fill="currentColor" fillOpacity="0.4" />
            </svg>
            <span className={`h-px w-14 sm:w-28 bg-gradient-to-r ${ruleR}`} />
        </div>
    );
};

/** Corner flourish for frames. Rotate with the `rotate` class. */
export const CornerFlourish = ({ className = "" }) => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className={className} aria-hidden="true">
        <path d="M3 44V15a12 12 0 0 1 12-12h29" />
        <path d="M10 44V20a10 10 0 0 1 10-10h24" strokeOpacity="0.5" />
        <path d="M15 15c4-1 6-3 7-7 1 4 3 6 7 7-4 1-6 3-7 7-1-4-3-6-7-7z" fill="currentColor" fillOpacity="0.35" />
        <circle cx="34" cy="3" r="1.4" fill="currentColor" />
        <circle cx="3" cy="34" r="1.4" fill="currentColor" />
    </svg>
);

/**
 * A scalloped (cusped-arch) edge, like the carved borders of a palace.
 * Used to move the visitor from one chapter of the story to the next.
 */
export const ScallopEdge = ({ position = "top", fill = "#3a0409", stroke = "#ecd48a", className = "" }) => {
    const id = useId();
    const isTop = position === "top";
    return (
        <svg
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 z-10 block h-6 w-full ${isTop ? "-top-[23px]" : "-bottom-[23px]"} ${className}`}
            preserveAspectRatio="none"
        >
            <defs>
                <pattern id={id} width="48" height="24" patternUnits="userSpaceOnUse">
                    {isTop ? (
                        <>
                            <path d="M0 24A24 24 0 0 1 48 24Z" fill={fill} />
                            <path d="M0 24A24 24 0 0 1 48 24" fill="none" stroke={stroke} strokeOpacity="0.7" strokeWidth="1.2" />
                            <circle cx="24" cy="9" r="1.6" fill={stroke} fillOpacity="0.7" />
                        </>
                    ) : (
                        <>
                            <path d="M0 0H48A24 24 0 0 1 0 0Z" fill={fill} />
                            <path d="M48 0A24 24 0 0 1 0 0" fill="none" stroke={stroke} strokeOpacity="0.7" strokeWidth="1.2" />
                            <circle cx="24" cy="15" r="1.6" fill={stroke} fillOpacity="0.7" />
                        </>
                    )}
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
    );
};

/** N & J monogram seal */
export const Monogram = ({ className = "w-24 h-24", tone = "dark" }) => {
    const ink = tone === "light" ? "#f6e3a0" : "#5b0309";
    const gold = tone === "light" ? "#ecd48a" : "#a67c14";
    const leaves = [-76, -62, -48, -34, -20];
    const leaf = "M0 0C3.6-3.4 3.6-9 0-13 -3.6-9 -3.6-3.4 0 0Z";
    return (
        <svg viewBox="0 0 120 120" className={className} role="img" aria-label="N & J">
            <circle cx="60" cy="60" r="57" fill="none" stroke={gold} strokeWidth="1.4" />
            <circle cx="60" cy="60" r="51" fill="none" stroke={gold} strokeWidth="0.8" strokeDasharray="1 3.2" strokeLinecap="round" />
            {leaves.map((a, i) => (
                <g key={i}>
                    <g transform={`rotate(${a} 60 60)`}>
                        <path d={leaf} transform="translate(60 106) rotate(-38)" fill={gold} fillOpacity="0.55" />
                    </g>
                    <g transform={`rotate(${-a} 60 60)`}>
                        <path d={leaf} transform="translate(60 106) rotate(38)" fill={gold} fillOpacity="0.55" />
                    </g>
                </g>
            ))}
            <path d="M60 15c-2.6 3.4-2.6 6.8 0 10 2.6-3.200 2.6-6.600 0-10z" fill={gold} />
            <text x="39" y="68" textAnchor="middle" fontSize="38" fill={ink} style={{ fontFamily: "var(--font-script)" }}>
                N
            </text>
            <text x="81" y="70" textAnchor="middle" fontSize="38" fill={ink} style={{ fontFamily: "var(--font-script)" }}>
                J
            </text>
            <path d="M60 90c-4-2.600-5.200-4.600-5.200-6.400a2.600 2.600 0 0 1 5.200-.700 2.600 2.600 0 0 1 5.200.700c0 1.800-1.200 3.800-5.200 6.400z" fill={gold} />
        </svg>
    );
};
