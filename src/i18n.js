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

// Family translations
import EnglishFamily from "./locales/English/family.json";
import MarathiFamily from "./locales/Marathi/family.json";
import HindiFamily from "./locales/Hindi/family.json";

// Muhurt translations
import EnglishMuhurt from "./locales/English/muhurt.json";
import MarathiMuhurt from "./locales/Marathi/muhurt.json";
import HindiMuhurt from "./locales/Hindi/muhurt.json";

// Venue translations  <-- ADDED IMPORTS
import EnglishVenue from "./locales/English/venue.json";
import MarathiVenue from "./locales/Marathi/venue.json";
import HindiVenue from "./locales/Hindi/venue.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            navbar: EnglishNavbar,
            hero: EnglishHero,
            family: EnglishFamily,
            muhurt: EnglishMuhurt,
            venue: EnglishVenue, // <-- ADDED RESOURCE
        },
        mr: {
            navbar: MarathiNavbar,
            hero: MarathiHero,
            family: MarathiFamily,
            muhurt: MarathiMuhurt,
            venue: MarathiVenue, // <-- ADDED RESOURCE
        },
        hi: {
            navbar: HindiNavbar,
            hero: HindiHero,
            family: HindiFamily,
            muhurt: HindiMuhurt,
            venue: HindiVenue, // <-- ADDED RESOURCE
        },
    },

    lng: "mr",
    fallbackLng: "mr",

    // Added "venue" to the namespaces array
    ns: ["navbar", "hero", "family", "muhurt", "venue"],
    defaultNS: "navbar",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
