import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronUp, Check, Languages } from "lucide-react";
import ramayanaAudio from "../assets/ramayana.mp3";

// Create ONE audio instance
const weddingAudio = new Audio(ramayanaAudio);
weddingAudio.loop = true;
weddingAudio.volume = 0.7;
weddingAudio.preload = "auto";

const languages = [
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "English" },
];

const MENU_TITLE = { mr: "भाषा", hi: "भाषा", en: "Language" };

const LotusMark = ({ className = "" }) => (
    <svg viewBox="0 0 64 50" className={className} fill="currentColor" aria-hidden="true">
        <path d="M32 2 C22 13 23 26 32 35 C41 26 42 13 32 2Z" />
        <path d="M30 35 C16 23 6 25 7 34 C8 43 22 44 30 35Z" opacity="0.85" />
        <path d="M34 35 C48 23 58 25 57 34 C56 43 42 44 34 35Z" opacity="0.85" />
        <path d="M28 38 C15 35 2 38 3 43 C5 49 22 48 28 38Z" opacity="0.55" />
        <path d="M36 38 C49 35 62 38 61 43 C59 49 42 48 36 38Z" opacity="0.55" />
    </svg>
);

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    // The welcome screen has its own language switch, so ours appears once it is gone
    const [introDone, setIntroDone] = useState(() => Boolean(window.__weddingIntroComplete));
    const langRef = useRef(null);
    const { i18n } = useTranslation();

    const currentLanguage = (i18n.resolvedLanguage || i18n.language || "mr").split("-")[0];
    const currentLangLabel = languages.find((l) => l.code === currentLanguage)?.label || "मराठी";

    useEffect(() => {
        const syncState = () => setIsPlaying(!weddingAudio.paused);

        weddingAudio.addEventListener("play", syncState);
        weddingAudio.addEventListener("pause", syncState);
        weddingAudio.addEventListener("ended", syncState);

        const handleWeddingStart = async () => {
            // Do not start if the user has already paused it
            if (!weddingAudio.paused) return;

            try {
                await weddingAudio.play();
            } catch (error) {
                console.error("Music playback failed:", error);
            }
        };

        const handleIntroComplete = () => setIntroDone(true);

        window.addEventListener("wedding-start", handleWeddingStart);
        window.addEventListener("wedding-intro-complete", handleIntroComplete);

        return () => {
            weddingAudio.removeEventListener("play", syncState);
            weddingAudio.removeEventListener("pause", syncState);
            weddingAudio.removeEventListener("ended", syncState);
            window.removeEventListener("wedding-start", handleWeddingStart);
            window.removeEventListener("wedding-intro-complete", handleIntroComplete);
        };
    }, []);

    // Close the language dropdown when tapping outside of it
    useEffect(() => {
        const handleOutside = (event) => {
            if (langRef.current && !langRef.current.contains(event.target)) {
                setIsLangOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside, { passive: true });

        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
        };
    }, []);

    const toggleMusic = async () => {
        if (!weddingAudio.paused) {
            weddingAudio.pause();
            return;
        }

        try {
            await weddingAudio.play();
        } catch (error) {
            console.error("Music playback failed:", error);
        }
    };

    const selectLanguage = (code) => {
        i18n.changeLanguage(code);
        setIsLangOpen(false);
    };

    return (
        <>
            <style>{STYLES}</style>

            {/* LEFT: Language selector (after the welcome screen) */}
            {introDone && (
                <div ref={langRef} className="wm-lang-wrap">
                    {isLangOpen && (
                        <div className="wm-menu" role="listbox" aria-label="Language">
                            <div className="wm-menu-head" aria-hidden="true">
                                <span />
                                <LotusMark className="wm-menu-lotus" />
                                <span />
                            </div>
                            <p className="wm-menu-title">{MENU_TITLE[currentLanguage] || MENU_TITLE.en}</p>
                            {languages.map((language) => {
                                const isActive = currentLanguage === language.code;

                                return (
                                    <button key={language.code} type="button" role="option" aria-selected={isActive} onClick={() => selectLanguage(language.code)} className="wm-opt">
                                        <span>{language.label}</span>
                                        {isActive && <Check size={15} />}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <button type="button" onClick={() => setIsLangOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={isLangOpen} aria-label="Change language" className="wm-medal wm-lang-btn">
                        <Languages size={17} />
                        <span>{currentLangLabel}</span>
                        <ChevronUp size={14} className={`wm-chev ${isLangOpen ? "" : "flip"}`} />
                    </button>
                </div>
            )}

            {/* RIGHT: Music button */}
            <button
                type="button"
                onClick={toggleMusic}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                title={isPlaying ? "Pause music" : "Play music"}
                className={`wm-medal wm-music ${isPlaying ? "playing" : ""}`}
            >
                {isPlaying ? (
                    <span className="wm-eq" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <i />
                    </span>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M9 18V5l12-2v13" />
                        <circle cx="6" cy="18" r="3" />
                        <circle cx="18" cy="16" r="3" />
                    </svg>
                )}
            </button>
        </>
    );
};

const STYLES = `
.wm-medal{position:relative;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:999px;cursor:pointer;color:#ffefc4;
  background:linear-gradient(180deg,#a3202b 0%,#750d17 55%,#52060b 100%);
  box-shadow:0 0 0 1px #f6dd92,0 0 0 3.5px #6a0a13,0 0 0 5px #e3bd5c,0 8px 22px rgba(80,10,15,.4),inset 0 1px 0 rgba(255,232,165,.5);
  transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s,filter .3s;-webkit-tap-highlight-color:transparent}
.wm-medal:hover{transform:translateY(-2px) scale(1.05);filter:brightness(1.1);box-shadow:0 0 0 1px #fff0b8,0 0 0 3.5px #6a0a13,0 0 0 5px #f0cc6c,0 10px 26px rgba(80,10,15,.5),0 0 22px rgba(255,200,90,.5),inset 0 1px 0 rgba(255,232,165,.6)}
.wm-medal:active{transform:scale(.94)}
.wm-medal:focus-visible,.wm-opt:focus-visible{outline:2px solid #fff3c6;outline-offset:4px}

/* language */
.wm-lang-wrap{position:fixed;z-index:99999;left:clamp(14px,2vw,22px);bottom:20px;animation:wm-in .9s ease both}
.wm-lang-btn{height:44px;padding:0 15px;gap:8px;font-family:var(--font-devanagari,"Noto Serif Devanagari"),serif;font-size:14px;font-weight:700;line-height:1}
.wm-chev{transition:transform .25s}
.wm-chev.flip{transform:rotate(180deg)}
.wm-menu{position:absolute;left:0;bottom:calc(100% + 16px);min-width:170px;padding:8px 8px 8px;border-radius:20px;transform-origin:bottom left;
  background:linear-gradient(180deg,#fffaf0,#fdebc2);box-shadow:0 0 0 1px #d9ae4e,0 0 0 4px rgba(255,244,214,.75),0 18px 40px rgba(80,20,10,.38);
  animation:wm-pop .3s cubic-bezier(.22,1,.36,1)}
.wm-menu-head{display:flex;align-items:center;gap:8px;padding:4px 10px 0;color:#c9962f}
.wm-menu-head span{flex:1;height:1px;background:linear-gradient(90deg,transparent,#c9962f,transparent)}
.wm-menu-lotus{width:26px;height:auto}
.wm-menu-title{margin:2px 0 6px;text-align:center;font-size:11px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:#8a5a12;font-family:var(--font-devanagari,"Noto Serif Devanagari"),serif}
.wm-opt{display:flex;width:100%;align-items:center;justify-content:space-between;gap:14px;padding:11px 14px;margin-top:2px;border:0;border-radius:13px;background:transparent;cursor:pointer;color:#6a0a13;
  font-family:var(--font-devanagari,"Noto Serif Devanagari"),serif;font-size:15px;font-weight:700;line-height:1.2;text-align:left;transition:background .25s,color .25s}
.wm-opt:hover{background:rgba(217,174,78,.25)}
.wm-opt[aria-selected="true"]{background:linear-gradient(180deg,#a3202b,#6a0a13);color:#ffefc4;box-shadow:inset 0 1px 0 rgba(255,225,150,.5)}

/* music */
.wm-music{position:fixed;z-index:99999;right:clamp(16px,2.2vw,24px);bottom:20px;width:52px;height:52px}
.wm-music.playing::after{content:"";position:absolute;inset:-11px;border-radius:50%;border:1px dashed rgba(227,189,92,.9);pointer-events:none;animation:wm-spin 14s linear infinite}
.wm-eq{display:flex;align-items:flex-end;gap:3px;height:20px}
.wm-eq i{display:block;width:3px;height:100%;border-radius:2px;background:linear-gradient(180deg,#fff3c6,#e3bd5c);transform-origin:bottom;animation:wm-bar 1s ease-in-out infinite}
.wm-eq i:nth-child(2){animation-delay:.2s}
.wm-eq i:nth-child(3){animation-delay:.45s}
.wm-eq i:nth-child(4){animation-delay:.1s}

@keyframes wm-bar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
@keyframes wm-spin{to{transform:rotate(360deg)}}
@keyframes wm-pop{from{opacity:0;transform:translateY(8px) scale(.92)}to{opacity:1;transform:none}}
@keyframes wm-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

@media (max-width:480px){
  .wm-music{width:46px;height:46px;right:14px;bottom:18px}
  .wm-lang-btn{height:42px;padding:0 13px}
  .wm-lang-wrap{bottom:18px}
}
@media (prefers-reduced-motion:reduce){
  .wm-music.playing::after,.wm-eq i,.wm-lang-wrap,.wm-menu{animation:none!important}
}
`;

export default BackgroundMusic;
