import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronUp, Languages } from "lucide-react";
import introImage from "../assets/intro-devotional.png";

// How long the intro takes to fade away (ms). Increase for a slower fade.
const FADE_DURATION = 2500;

const LANGUAGES = [
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "English" },
];

// Texts that belong only to the welcome screen
const COPY = {
    mr: { enter: "प्रवेश करा", hint: "निमंत्रण उघडा", invite: "आपणास सस्नेह निमंत्रण", language: "भाषा निवडा", alt: "श्रीराम, लक्ष्मण, सीता आणि हनुमान" },
    hi: { enter: "प्रवेश करें", hint: "निमंत्रण खोलें", invite: "आपको सादर आमंत्रण", language: "भाषा चुनें", alt: "श्रीराम, लक्ष्मण, सीता और हनुमान" },
    en: { enter: "Enter", hint: "Open the invitation", invite: "You are warmly invited", language: "Choose language", alt: "Ram, Lakshman, Sita and Hanuman" },
};

/* ------------------------------------------------------------------ */
/*  Layout detection: wide screens show the artwork as a 16:9 stage,   */
/*  tall screens (phones / portrait tablets) show the storytelling     */
/*  layout. The WHOLE image is always visible, never cropped.          */
/* ------------------------------------------------------------------ */
const LANDSCAPE_QUERY = "(min-aspect-ratio: 5/4)";
const subscribeLandscape = (callback) => {
    const mq = window.matchMedia(LANDSCAPE_QUERY);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
};
const useIsLandscape = () =>
    useSyncExternalStore(
        subscribeLandscape,
        () => window.matchMedia(LANDSCAPE_QUERY).matches,
        () => true,
    );

/* ------------------------------------------------------------------ */
/*  Decorative building blocks                                         */
/* ------------------------------------------------------------------ */
const GoldDefs = () => (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <defs>
            <linearGradient id="wiGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fdeeb8" />
                <stop offset="0.5" stopColor="#dcac43" />
                <stop offset="1" stopColor="#9a6b16" />
            </linearGradient>
        </defs>
    </svg>
);

const LotusIcon = ({ className = "" }) => (
    <svg viewBox="0 0 64 50" className={className} fill="none" aria-hidden="true">
        <path d="M32 2 C22 13 23 26 32 35 C41 26 42 13 32 2Z" fill="url(#wiGold)" stroke="#fff3c6" strokeWidth="0.6" />
        <path d="M30 35 C16 23 6 25 7 34 C8 43 22 44 30 35Z" fill="url(#wiGold)" opacity="0.92" />
        <path d="M34 35 C48 23 58 25 57 34 C56 43 42 44 34 35Z" fill="url(#wiGold)" opacity="0.92" />
        <path d="M28 38 C15 35 2 38 3 43 C5 49 22 48 28 38Z" fill="url(#wiGold)" opacity="0.72" />
        <path d="M36 38 C49 35 62 38 61 43 C59 49 42 48 36 38Z" fill="url(#wiGold)" opacity="0.72" />
        <path d="M32 12 V33" stroke="#7a0f18" strokeWidth="0.8" opacity="0.35" />
    </svg>
);

const RingsIcon = ({ className = "" }) => (
    <svg viewBox="0 0 64 40" className={className} fill="none" aria-hidden="true">
        <circle cx="24" cy="22" r="13" stroke="url(#wiGold)" strokeWidth="3" />
        <circle cx="40" cy="22" r="13" stroke="url(#wiGold)" strokeWidth="3" />
        <path d="M32 1 L35 6 L32 11 L29 6Z" fill="url(#wiGold)" />
    </svg>
);

const Corner = ({ className = "" }) => (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
        <path d="M4 116 V32 C4 16 16 4 32 4 H116" stroke="url(#wiGold)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M14 116 V38 C14 25 25 14 38 14 H116" stroke="url(#wiGold)" strokeWidth="0.9" opacity="0.7" />
        <path d="M30 30 C46 30 54 40 54 54 C42 54 30 48 30 30Z" fill="url(#wiGold)" opacity="0.9" />
        <path d="M30 30 C30 46 40 54 54 54" stroke="#fff3c6" strokeWidth="0.7" opacity="0.7" />
        <circle cx="30" cy="30" r="4.2" fill="url(#wiGold)" />
        <circle cx="70" cy="9" r="2.6" fill="url(#wiGold)" />
        <circle cx="9" cy="70" r="2.6" fill="url(#wiGold)" />
        <path d="M80 4 C86 10 94 10 99 4 C93 1 86 1 80 4Z" fill="url(#wiGold)" opacity="0.85" />
        <path d="M4 80 C10 86 10 94 4 99 C1 93 1 86 4 80Z" fill="url(#wiGold)" opacity="0.85" />
    </svg>
);

const Divider = () => (
    <div className="wi-divider" aria-hidden="true">
        <span />
        <LotusIcon className="wi-divider-lotus" />
        <span />
    </div>
);

// Falling rose / marigold petals
const PETAL_COLORS = ["#c8213a", "#e8566e", "#f0b43c", "#ffd98a"];
const PETALS = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 5) % 100}%`,
    size: 14 + (i % 4) * 5,
    duration: 11 + (i % 6) * 2,
    delay: -(i * 1.7),
    sway: (i % 2 ? 1 : -1) * (30 + (i % 5) * 14),
    color: PETAL_COLORS[i % PETAL_COLORS.length],
}));

// Tiny golden twinkles
const TWINKLES = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 53 + 11) % 96}%`,
    top: `${(i * 29 + 7) % 90}%`,
    size: 8 + (i % 3) * 4,
    delay: (i * 0.45) % 3.2,
}));

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const IntroAnimation = () => {
    const { t, i18n } = useTranslation("hero");
    const isLandscape = useIsLandscape();

    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const removeTimerRef = useRef(null);
    const langRef = useRef(null);

    const lang = (i18n.resolvedLanguage || i18n.language || "mr").split("-")[0];
    const copy = COPY[lang] || COPY.mr;
    const activeIndex = Math.max(
        0,
        LANGUAGES.findIndex((l) => l.code === lang),
    );

    useEffect(() => {
        const revealTimer = setTimeout(() => setIsRevealed(true), 100);

        return () => {
            clearTimeout(revealTimer);
            clearTimeout(removeTimerRef.current);
        };
    }, []);

    // Close the language list when the visitor taps anywhere else (or presses Esc)
    useEffect(() => {
        const handleOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) setIsLangOpen(false);
        };
        const handleKey = (event) => {
            if (event.key === "Escape") setIsLangOpen(false);
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside, { passive: true });
        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
            document.removeEventListener("keydown", handleKey);
        };
    }, []);

    // Lock the page behind the intro so there is no scrollbar / scrolling
    useEffect(() => {
        if (!isVisible) return undefined;

        const html = document.documentElement;
        const body = document.body;
        const prevHtml = html.style.overflow;
        const prevBody = body.style.overflow;

        window.scrollTo(0, 0);
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";

        return () => {
            html.style.overflow = prevHtml;
            body.style.overflow = prevBody;
        };
    }, [isVisible]);

    const handleEnter = () => {
        if (isExiting) return; // ignore repeat clicks

        // Music starts right away on the visitor's click
        window.dispatchEvent(new Event("wedding-start"));

        // Start slow fade-out
        setIsExiting(true);

        // Remove intro only after the fade has fully finished
        removeTimerRef.current = setTimeout(() => {
            setIsVisible(false);

            // Flag + event: AutoScroll starts only after the intro is completely gone
            window.__weddingIntroComplete = true;
            window.dispatchEvent(new Event("wedding-intro-complete"));
        }, FADE_DURATION + 100);
    };

    const handleLanguage = (code) => {
        if (code !== lang) i18n.changeLanguage(code);
        setIsLangOpen(false);
    };

    if (!isVisible) return null;

    /* ---------- Shared pieces ---------- */
    const enterButton = (
        <button type="button" className="wi-enter wi-rise" style={{ "--d": "1s" }} onClick={handleEnter} aria-label={`${copy.enter} – ${copy.hint}`}>
            <span className="wi-enter-shine" aria-hidden="true" />
            <LotusIcon className="wi-enter-icon" />
            <span className="wi-enter-text">
                <span className="wi-enter-label">{copy.enter}</span>
                <small>{copy.hint}</small>
            </span>
            <LotusIcon className="wi-enter-icon" />
        </button>
    );

    const languageSwitch = (
        <div ref={langRef} className="wi-lang wi-rise" style={{ "--d": "1.2s" }}>
            {isLangOpen && (
                <div className="wi-lang-menu" role="listbox" aria-label={copy.language}>
                    {LANGUAGES.map((language) => {
                        const isActive = language.code === lang;

                        return (
                            <button key={language.code} type="button" role="option" aria-selected={isActive} className="wi-lang-opt" onClick={() => handleLanguage(language.code)}>
                                <span>{language.label}</span>
                                {isActive && <Check size={15} />}
                            </button>
                        );
                    })}
                </div>
            )}

            <button type="button" className="wi-lang-btn" aria-haspopup="listbox" aria-expanded={isLangOpen} aria-label={copy.language} onClick={() => setIsLangOpen((open) => !open)}>
                <Languages size={16} />
                <span>{LANGUAGES[activeIndex].label}</span>
                <ChevronUp size={16} className={`wi-lang-chev ${isLangOpen ? "open" : ""}`} />
            </button>
        </div>
    );

    return (
        <div
            className={`wi-root ${isRevealed ? "is-in" : ""} ${isLandscape ? "is-wide" : "is-tall"}`}
            data-lang={lang}
            style={{
                opacity: isExiting ? 0 : 1,
                transform: isExiting ? "scale(1.04)" : "scale(1)",
                transition: `opacity ${FADE_DURATION}ms ease-in-out, transform ${FADE_DURATION}ms ease-in-out`,
                pointerEvents: isExiting ? "none" : "auto",
                willChange: "opacity, transform",
            }}
        >
            <style>{STYLES}</style>
            <GoldDefs />

            {/* Soft blurred copy of the artwork fills any empty space around the full image */}
            <div className="wi-backdrop" aria-hidden="true">
                <img src={introImage} alt="" />
            </div>

            {/* Ambient layers */}
            <div className="wi-ambient" aria-hidden="true">
                {TWINKLES.map((s) => (
                    <span key={s.id} className="wi-twinkle" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
                ))}
                {PETALS.map((p) => (
                    <span key={p.id} className="wi-petal" style={{ left: p.left, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`, "--sway": `${p.sway}px` }}>
                        <svg width={p.size} height={p.size * 1.5} viewBox="0 0 30 45" fill="none">
                            <path d="M15 43 C12 35 2 26 3 16 C4 5 12 1 15 2 C18 1 26 5 27 16 C28 26 18 35 15 43Z" fill={p.color} opacity="0.85" />
                            <path d="M15 40 Q14 22 15 5" stroke="#fff" strokeWidth="0.8" opacity="0.35" />
                        </svg>
                    </span>
                ))}
            </div>

            {isLandscape ? (
                /* ==================== WIDE SCREENS ==================== */
                <>
                    <div className="wi-stage">
                        <img src={introImage} alt={copy.alt} fetchPriority="high" draggable="false" />
                    </div>

                    <div className="wi-bar">
                        <div className="wi-bar-side">{languageSwitch}</div>
                        {enterButton}
                        <div className="wi-bar-side" />
                    </div>
                </>
            ) : (
                /* ==================== PHONES / PORTRAIT ==================== */
                <>
                    <div className="wi-hairline" aria-hidden="true" />
                    <Corner className="wi-corner tl" />
                    <Corner className="wi-corner tr" />
                    <Corner className="wi-corner bl" />
                    <Corner className="wi-corner br" />

                    <div className="wi-portrait">
                        <header className="wi-head wi-rise" style={{ "--d": "0.2s" }}>
                            <p className="wi-mantra">{t("ganeshMantra")}</p>
                            <Divider />
                        </header>

                        <main className="wi-mid">
                            <div className="wi-frame wi-rise" style={{ "--d": "0.4s" }}>
                                <img src={introImage} alt={copy.alt} fetchPriority="high" draggable="false" />
                            </div>

                            <div className="wi-names">
                                <p className="wi-invite wi-rise" style={{ "--d": "0.7s" }}>
                                    {copy.invite}
                                </p>
                                <h1 className="wi-title">
                                    <span className="wi-name wi-rise" style={{ "--d": "0.8s" }}>
                                        {t("groomName")}
                                    </span>
                                    <span className="wi-rings wi-rise" style={{ "--d": "0.9s" }} aria-hidden="true">
                                        <i />
                                        <RingsIcon />
                                        <i />
                                    </span>
                                    <span className="wi-name wi-rise" style={{ "--d": "1s" }}>
                                        {t("brideName")}
                                    </span>
                                </h1>
                                <p className="wi-sub wi-rise" style={{ "--d": "1.1s" }}>
                                    {t("subtitle")}
                                </p>
                                <p className="wi-date wi-rise" style={{ "--d": "1.15s" }}>
                                    {t("weddingDate")} <b aria-hidden="true">✦</b> {t("weddingTime")}
                                </p>
                            </div>
                        </main>

                        <footer className="wi-foot">
                            {enterButton}
                            {languageSwitch}
                        </footer>
                    </div>
                </>
            )}

            {/* Golden bloom when the visitor enters */}
            <div className={`wi-flash ${isExiting ? "on" : ""}`} aria-hidden="true" />
        </div>
    );
};

/* ------------------------------------------------------------------ */
/*  Styles (scoped with the wi- prefix)                                */
/* ------------------------------------------------------------------ */
const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");

.wi-root{position:fixed;inset:0;z-index:99998;width:100%;height:100vh;height:100dvh;overflow:hidden;background:#f7dfae;color:#6a0a13;
  font-family:var(--font-devanagari,"Noto Serif Devanagari"),var(--font-body,"Noto Serif"),serif;
  touch-action:none;overscroll-behavior:none;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}
.wi-root[data-lang="en"]{font-family:var(--font-display,"Playfair Display"),serif}
.wi-root *{box-sizing:border-box}

/* ---------- backdrop & ambience ---------- */
.wi-backdrop{position:absolute;inset:0;overflow:hidden}
.wi-backdrop img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.2);filter:blur(40px) saturate(1.1);opacity:.9}
.wi-backdrop::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(255,238,196,.22),rgba(110,20,25,.22) 100%)}
.is-tall .wi-backdrop img{opacity:.55;filter:blur(50px) saturate(.9)}
.is-tall .wi-backdrop::after{background:radial-gradient(ellipse at 50% 38%,rgba(255,246,222,.85),rgba(252,226,170,.7) 65%,rgba(240,200,130,.75) 100%)}
.wi-ambient{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}
.wi-petal{position:absolute;top:-6%;opacity:0;will-change:transform,opacity;animation:wi-fall linear infinite}
.wi-twinkle{position:absolute;opacity:0;background:radial-gradient(circle,#fff6d0 0%,rgba(255,214,120,.9) 30%,transparent 70%);clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);animation:wi-twinkle 3.2s ease-in-out infinite}
@keyframes wi-fall{0%{transform:translate3d(0,-8vh,0) rotate(0);opacity:0}10%{opacity:.9}50%{transform:translate3d(var(--sway),55vh,0) rotate(180deg)}90%{opacity:.9}100%{transform:translate3d(calc(var(--sway)*-.6),112vh,0) rotate(360deg);opacity:0}}
@keyframes wi-twinkle{0%,100%{opacity:0;transform:scale(.4) rotate(0)}50%{opacity:.95;transform:scale(1) rotate(45deg)}}

/* ---------- reveal ---------- */
.wi-rise{opacity:0;transform:translateY(14px);transition:opacity 1.1s ease,transform 1.1s cubic-bezier(.22,1,.36,1);transition-delay:var(--d,0s)}
.is-in .wi-rise{opacity:1;transform:none}

/* ---------- WIDE: full 16:9 stage ---------- */
.wi-stage{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2;aspect-ratio:16/9;
  width:min(100%,calc(100vh*1.7778));width:min(100%,calc(100dvh*1.7778));
  -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 2%,#000 98%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 2%,#000 98%,transparent 100%)}
.wi-stage img{display:block;width:100%;height:100%;object-fit:contain;opacity:0;transform:scale(.97);transition:opacity 1.6s ease,transform 2.2s cubic-bezier(.22,1,.36,1);
  -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 2%,#000 98%,transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 2%,#000 98%,transparent 100%)}
.is-in .wi-stage img{opacity:1;transform:none}

.wi-bar{position:absolute;left:0;right:0;z-index:5;bottom:max(14px,2.4vh);height:clamp(46px,7.4vh,64px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 clamp(12px,1.6vw,24px);pointer-events:none}
.wi-bar>*{pointer-events:auto}
.wi-bar-side{display:flex;align-items:center;justify-content:flex-start;pointer-events:none}
.wi-bar-side>*{pointer-events:auto}

/* ---------- PORTRAIT: storytelling layout ---------- */
.wi-hairline{position:absolute;inset:10px;z-index:2;border:1px solid rgba(214,168,70,.55);border-radius:18px;pointer-events:none}
.wi-corner{position:absolute;z-index:2;width:clamp(56px,17vw,96px);height:auto;pointer-events:none;filter:drop-shadow(0 2px 3px rgba(110,20,10,.25));animation:wi-breathe 5s ease-in-out infinite}
.wi-corner.tl{top:8px;left:8px}
.wi-corner.tr{top:8px;right:8px;transform:scaleX(-1)}
.wi-corner.bl{bottom:8px;left:8px;transform:scaleY(-1)}
.wi-corner.br{bottom:8px;right:8px;transform:scale(-1,-1)}
@keyframes wi-breathe{0%,100%{opacity:.8}50%{opacity:1}}

.wi-portrait{position:relative;z-index:4;height:100%;max-width:640px;margin:0 auto;display:flex;flex-direction:column;align-items:center;justify-content:space-between;
  padding:max(22px,env(safe-area-inset-top)) 22px max(20px,env(safe-area-inset-bottom))}
.wi-head{flex:none;display:flex;flex-direction:column;align-items:center;gap:6px;padding-top:clamp(0px,1dvh,10px)}
.wi-mantra{margin:0;font-size:clamp(15px,4.4vw,20px);font-weight:600;letter-spacing:.04em;color:#7a0f18;text-shadow:0 1px 0 rgba(255,240,190,.8)}
.wi-divider{display:flex;align-items:center;gap:10px;width:clamp(180px,56vw,260px)}
.wi-divider span{flex:1;height:1px;background:linear-gradient(90deg,transparent,#c9962f,transparent)}
.wi-divider-lotus{width:clamp(30px,8vw,40px);height:auto;filter:drop-shadow(0 1px 2px rgba(110,60,10,.3))}

.wi-mid{flex:1;min-height:0;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(10px,2.2dvh,22px)}
.wi-frame{position:relative;padding:5px;border-radius:18px;width:min(100%,calc(34vh*1.7778 + 10px));width:min(100%,calc(34dvh*1.7778 + 10px));
  background:linear-gradient(135deg,#fbe9ad,#c99530 40%,#f7de94 65%,#a8741a);box-shadow:0 16px 40px rgba(90,20,10,.35),0 0 0 1px rgba(255,244,200,.8) inset}
.wi-frame::before{content:"";position:absolute;inset:-18px;z-index:-1;border-radius:30px;background:radial-gradient(ellipse,rgba(255,214,120,.55),transparent 70%);animation:wi-breathe 4s ease-in-out infinite}
.wi-frame img{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;border-radius:13px;box-shadow:0 0 0 2px #7a0f18}

.wi-names{display:flex;flex-direction:column;align-items:center;text-align:center;gap:clamp(2px,.7dvh,8px)}
.wi-invite{margin:0;font-size:clamp(11px,3.2vw,14px);font-weight:600;color:#8a5a12}
.wi-root[data-lang="en"] .wi-invite{letter-spacing:.3em;text-transform:uppercase}
.wi-title{margin:0;display:flex;flex-direction:column;align-items:center;gap:clamp(0px,.4dvh,4px);font-weight:600}
.wi-name{display:block;font-size:clamp(2.1rem,10.5vw,3.5rem);line-height:1.2;font-weight:600;color:#7a0f18;
  background:linear-gradient(180deg,#a3202b 0%,#6a0a13 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 2px 0 rgba(255,232,170,.85))}
.wi-root[data-lang="en"] .wi-name{font-family:"Great Vibes","Playfair Display",cursive;font-style:italic;font-weight:400;font-size:clamp(2.7rem,13.5vw,4.5rem);line-height:1.05}
.wi-rings{display:flex;align-items:center;gap:10px;width:clamp(150px,46vw,210px)}
.wi-rings i{flex:1;height:1px;background:linear-gradient(90deg,transparent,#c9962f,transparent)}
.wi-rings svg{width:clamp(34px,9vw,46px);height:auto;animation:wi-float 4.5s ease-in-out infinite}
@keyframes wi-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.wi-sub{margin:4px 0 0;font-size:clamp(13px,3.8vw,16px);font-weight:600;color:#7a0f18}
.wi-root[data-lang="en"] .wi-sub{letter-spacing:.22em;text-transform:uppercase;font-size:clamp(11px,3.2vw,13px)}
.wi-date{margin:0;font-size:clamp(12px,3.5vw,15px);color:#8a5a12;text-wrap:balance}
.wi-date b{color:#c9962f;margin:0 4px;font-weight:400}

.wi-foot{flex:none;width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(10px,1.8dvh,16px)}
.wi-foot .wi-enter{min-width:min(100%,260px);height:clamp(52px,7.4dvh,62px)}
.wi-foot .wi-lang-btn{height:42px;min-width:160px}

/* ---------- ENTER button ---------- */
.wi-enter{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:clamp(10px,1.4vw,16px);height:clamp(46px,7.4vh,64px);min-width:clamp(190px,24vw,290px);padding:0 clamp(20px,2.6vw,36px);
  border:0;border-radius:999px;cursor:pointer;color:#fff2cf;font-family:inherit;
  background:linear-gradient(180deg,#a3202b 0%,#750d17 52%,#52060b 100%);
  box-shadow:0 0 0 1px #f6dd92,0 0 0 4px #6a0a13,0 0 0 5.5px #e3bd5c,0 12px 30px rgba(80,10,15,.45),inset 0 1px 0 rgba(255,232,165,.55),inset 0 -10px 18px rgba(0,0,0,.25);
  transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,filter .35s,opacity 1.1s ease;-webkit-appearance:none;appearance:none}
.wi-enter.wi-rise{transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,filter .35s,opacity 1.1s ease var(--d,0s)}
.wi-enter::before{content:"";position:absolute;inset:-9px;border-radius:999px;border:1px solid rgba(240,200,100,.6);pointer-events:none;animation:wi-ring 2.8s ease-out infinite}
.wi-enter:hover{transform:translateY(-2px) scale(1.04);filter:brightness(1.1);box-shadow:0 0 0 1px #fff0b8,0 0 0 4px #6a0a13,0 0 0 5.5px #f0cc6c,0 16px 38px rgba(80,10,15,.5),0 0 34px rgba(255,200,90,.55),inset 0 1px 0 rgba(255,232,165,.65),inset 0 -10px 18px rgba(0,0,0,.25)}
.wi-enter:active{transform:scale(.96)}
.wi-enter:focus-visible,.wi-lang-btn:focus-visible,.wi-lang-opt:focus-visible{outline:2px solid #fff3c6;outline-offset:4px}
.is-in .wi-enter.wi-rise:hover{transform:translateY(-2px) scale(1.04)}
.is-in .wi-enter.wi-rise:active{transform:scale(.96)}
.wi-enter-shine{position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none}
.wi-enter-shine::after{content:"";position:absolute;top:0;bottom:0;width:45%;left:0;background:linear-gradient(105deg,transparent 20%,rgba(255,238,175,.6) 50%,transparent 80%);transform:translateX(-130%) skewX(-18deg);animation:wi-shine 3.8s ease-in-out 1.6s infinite}
.wi-enter-icon{position:relative;flex:none;width:clamp(24px,3.6vh,32px);height:auto;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4));animation:wi-float 4s ease-in-out infinite}
.wi-enter-icon:last-child{animation-delay:.6s}
.wi-enter-text{position:relative;display:flex;flex-direction:column;align-items:center;line-height:1.2}
.wi-enter-label{font-size:clamp(15px,2.3vh,19px);font-weight:700;color:#ffefc4;text-shadow:0 1px 2px rgba(0,0,0,.45)}
.wi-root[data-lang="en"] .wi-enter-label{letter-spacing:.34em;text-transform:uppercase;margin-right:-.34em}
.wi-enter small{margin-top:2px;font-size:clamp(10px,1.45vh,12px);font-weight:500;color:#f6dd92;opacity:.95}
.wi-root[data-lang="en"] .wi-enter small{letter-spacing:.08em;font-style:italic}
@keyframes wi-shine{0%,55%{transform:translateX(-130%) skewX(-18deg)}100%{transform:translateX(330%) skewX(-18deg)}}
@keyframes wi-ring{0%{transform:scale(.96);opacity:.8}100%{transform:scale(1.22);opacity:0}}

/* ---------- LANGUAGE dropdown (closed by default, opens upward) ---------- */
.wi-lang{position:relative;z-index:8}
.wi-lang-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-width:clamp(140px,15vw,180px);height:clamp(38px,5.6vh,46px);padding:0 16px;border:0;border-radius:999px;cursor:pointer;color:#6a0a13;
  font-family:var(--font-devanagari,"Noto Serif Devanagari"),serif;font-size:clamp(13px,1.8vh,15px);font-weight:700;line-height:1;
  background:linear-gradient(180deg,rgba(255,250,232,.97),rgba(255,236,190,.94));
  box-shadow:0 0 0 1px #d9ae4e,0 0 0 3.5px rgba(255,244,214,.6),0 8px 22px rgba(90,20,10,.28),inset 0 1px 0 #fff;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s}
.wi-lang-btn:hover{transform:translateY(-1px);box-shadow:0 0 0 1px #c9962f,0 0 0 3.5px rgba(255,244,214,.8),0 10px 26px rgba(90,20,10,.34),0 0 20px rgba(255,200,90,.45),inset 0 1px 0 #fff}
.wi-lang-btn:active{transform:scale(.97)}
.wi-lang-btn svg{flex:none;color:#a3202b}
.wi-lang-chev{transition:transform .35s cubic-bezier(.22,1,.36,1)}
.wi-lang-chev.open{transform:rotate(180deg)}
.wi-lang-menu{position:absolute;left:50%;bottom:calc(100% + 12px);width:100%;min-width:170px;padding:6px;border-radius:20px;transform:translateX(-50%);transform-origin:bottom center;
  background:linear-gradient(180deg,#fffaf0,#fdebc2);box-shadow:0 0 0 1px #d9ae4e,0 0 0 4px rgba(255,244,214,.75),0 18px 40px rgba(80,20,10,.38);animation:wi-menu-pop .3s cubic-bezier(.22,1,.36,1)}
.wi-lang-opt{display:flex;width:100%;align-items:center;justify-content:space-between;gap:12px;padding:11px 14px;margin:0;border:0;border-radius:14px;background:transparent;cursor:pointer;color:#6a0a13;
  font-family:var(--font-devanagari,"Noto Serif Devanagari"),serif;font-size:15px;font-weight:700;line-height:1.2;text-align:left;transition:background .25s,color .25s}
.wi-lang-opt+.wi-lang-opt{margin-top:2px}
.wi-lang-opt:hover{background:rgba(217,174,78,.28)}
.wi-lang-opt[aria-selected="true"]{background:linear-gradient(180deg,#a3202b,#6a0a13);color:#ffefc4;box-shadow:inset 0 1px 0 rgba(255,225,150,.5)}
@keyframes wi-menu-pop{from{opacity:0;transform:translateX(-50%) translateY(10px) scale(.92)}to{opacity:1;transform:translateX(-50%)}}

/* ---------- bloom on enter ---------- */
.wi-flash{position:absolute;inset:0;z-index:6;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 55%,rgba(255,238,180,.95),rgba(255,200,90,.35) 40%,transparent 70%)}
.wi-flash.on{animation:wi-flash 1.8s ease-out forwards}
@keyframes wi-flash{0%{opacity:0}25%{opacity:.85}100%{opacity:0}}

/* ---------- small / short screens ---------- */
@media (max-height:640px){
  .wi-invite,.wi-sub,.wi-head .wi-divider{display:none}
  .wi-portrait{padding-top:18px;padding-bottom:14px}
}
@media (max-height:430px){
  .wi-enter small{display:none}
}
@media (max-width:420px){
  .wi-portrait{padding-left:18px;padding-right:18px}
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion:reduce){
  .wi-petal,.wi-twinkle,.wi-corner,.wi-frame::before,.wi-enter::before,.wi-enter-shine::after,.wi-enter-icon,.wi-rings svg,.wi-lang-menu{animation:none!important}
  .wi-rise,.wi-stage img{transition-duration:.01s!important;transition-delay:0s!important}
}
`;

export default IntroAnimation;
