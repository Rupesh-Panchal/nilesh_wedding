
// Marigold, antique gold, rose and pale gold: the colours of a real phoolon ki barsaat
const PETAL_COLORS = ["#e8941a", "#d4af37", "#f0cf7a", "#b83a55", "#e5c07b", "#f4b744"];

const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 41.7) % 100}%`,
    size: 12 + (i % 5) * 4,
    duration: 14 + (i % 8) * 2,
    delay: -((i * 3) % 22),
    sway: 30 + (i % 5) * 15,
    rotation: (i * 37) % 360,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
}));

const BackgroundAnimation = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-silk">
            {/* Lamp-light glow */}
            <div className="absolute left-1/2 top-1/2 h-[120vw] max-h-[1200px] w-[120vw] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,148,26,0.14)_0%,rgba(251,244,230,0)_65%)] animate-pulse [animation-duration:8s]" />

            {/* Soft vignette so the page feels held, like an unrolled scroll */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(141,107,15,0.12)_100%)]" />

            {/* Falling petals */}
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="absolute top-[-60px] animate-[petal-fall_linear_infinite] will-change-transform"
                    style={{
                        left: petal.left,
                        animationDuration: `${petal.duration}s`,
                        animationDelay: `${petal.delay}s`,
                        "--sway": `${petal.sway}px`,
                    }}
                >
                    <svg
                        width={petal.size}
                        height={petal.size * 1.5}
                        viewBox="0 0 30 45"
                        fill="none"
                        style={{
                            transform: `rotate(${petal.rotation}deg)`,
                            opacity: 0.38 + (petal.id % 4) * 0.1,
                        }}
                    >
                        <path d="M15 43 C12 35 2 26 3 16 C4 5 12 1 15 2 C18 1 26 5 27 16 C28 26 18 35 15 43Z" fill={petal.color} />
                        <path d="M15 40 Q14 22 15 5" stroke="#8d6b0f" strokeWidth="0.8" opacity="0.3" />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default BackgroundAnimation;
