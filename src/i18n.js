import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Navbar translations
import EnglishNavbar from "./locales/English/navbar.json";
import MarathiNavbar from "./locales/Marathi/navbar.json";
import HindiNavbar from "./locales/Hindi/navbar.json";

// Hero translations
import EnglishHero from "./locales/English/hero.json";
import MarathiHero from "./locales/Marathi/hero.json";
import HindiHero from "./locales/Hindi/hero.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            navbar: EnglishNavbar,
            hero: EnglishHero,
        },
        mr: {
            navbar: MarathiNavbar,
            hero: MarathiHero,
        },
        hi: {
            navbar: HindiNavbar,
            hero: HindiHero,
        },
    },

    lng: "mr",
    fallbackLng: "mr",

    ns: ["navbar", "hero"],
    defaultNS: "navbar",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
