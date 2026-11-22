import React from "react";

const petals = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${(i * 41.7) % 100}%`,
    size: 12 + (i % 5) * 5,
    duration: 12 + (i % 8) * 2,
    delay: -((i * 3) % 20),
    sway: 30 + (i % 5) * 15,
    rotation: (i * 37) % 360,
    // 🎨 NEW THEME COLORS: Antique Gold, Marigold, Pale Gold, Warm Ivory
    color: ["#D4AF37", "#E1C561", "#FCF0C7", "#E5C07B"][i % 4],
}));

const BackgroundAnimation = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#FDFBF7]">
            {/* Golden background glow */}
            <div
                className="
                    absolute top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2
                    w-[120vw] h-[120vw]
                    max-w-[1200px] max-h-[1200px]
                    rounded-full
                    bg-[radial-gradient(circle,rgba(252,211,88,0.22)_0%,rgba(253,251,247,0)_65%)]
                    animate-pulse
                    [animation-duration:8s]
                "
            />

            {/* Falling petals */}
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="
                        absolute top-[-60px]
                        animate-[petal-fall_linear_infinite]
                        will-change-transform
                    "
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
                            // Softened opacity to make them look more elegant
                            opacity: 0.4 + (petal.id % 4) * 0.1,
                        }}
                    >
                        {/* Petal Shape */}
                        <path d="M15 43 C12 35 2 26 3 16 C4 5 12 1 15 2 C18 1 26 5 27 16 C28 26 18 35 15 43Z" fill={petal.color} />

                        {/* Subtle detail line inside petal - changed to a soft gold stroke */}
                        <path d="M15 40 Q14 22 15 5" stroke="#B38B22" strokeWidth="0.8" opacity="0.3" />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default BackgroundAnimation;
