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

// Venue translations
import EnglishVenue from "./locales/English/venue.json";
import MarathiVenue from "./locales/Marathi/venue.json";
import HindiVenue from "./locales/Hindi/venue.json";

// Little Ones translations
import EnglishLittleOnes from "./locales/English/littleOnes.json";
import MarathiLittleOnes from "./locales/Marathi/littleOnes.json";
import HindiLittleOnes from "./locales/Hindi/littleOnes.json";

// Contact translations
import EnglishContact from "./locales/English/contact.json";
import MarathiContact from "./locales/Marathi/contact.json";
import HindiContact from "./locales/Hindi/contact.json";

// Footer translations
import EnglishFooter from "./locales/English/footer.json";
import MarathiFooter from "./locales/Marathi/footer.json";
import HindiFooter from "./locales/Hindi/footer.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            navbar: EnglishNavbar,
            hero: EnglishHero,
            family: EnglishFamily,
            muhurt: EnglishMuhurt,
            venue: EnglishVenue,
            littleOnes: EnglishLittleOnes,
            contact: EnglishContact,
            footer: EnglishFooter,
        },

        mr: {
            navbar: MarathiNavbar,
            hero: MarathiHero,
            family: MarathiFamily,
            muhurt: MarathiMuhurt,
            venue: MarathiVenue,
            littleOnes: MarathiLittleOnes,
            contact: MarathiContact,
            footer: MarathiFooter,
        },

        hi: {
            navbar: HindiNavbar,
            hero: HindiHero,
            family: HindiFamily,
            muhurt: HindiMuhurt,
            venue: HindiVenue,
            littleOnes: HindiLittleOnes,
            contact: HindiContact,
            footer: HindiFooter,
        },
    },

    lng: "mr",
    fallbackLng: "mr",

    ns: ["navbar", "hero", "family", "muhurt", "venue", "littleOnes", "contact", "footer"],

    defaultNS: "navbar",

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
