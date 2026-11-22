import React from "react";
import IntroAnimation from "./components/IntroAnimation";
import BackgroundMusic from "./components/BackgroundMusic";
import AutoScroll from "./components/AutoScroll";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FamilySection from "./components/FamilySection";
import MuhurtSection from "./components/MuhurtSection";
import VenueSection from "./components/VenueSection";
import LittleOnesSection from "./components/LittleOnesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";

function App() {
    return (
        <div className="relative min-h-screen bg-surface font-body text-on-surface">
            {/* Website Opening Animation */}
            <IntroAnimation />

            {/* Background Music + language dropdown */}
            <BackgroundMusic />

            {/* Slow auto scroll (no UI) */}
            <AutoScroll />

            {/* Global Background Animation */}
            <BackgroundAnimation />

            {/* Main Website Content */}
            <div className="relative z-10">
                {/* <Navbar /> */}
                <HeroSection />
                <FamilySection />
                <MuhurtSection />
                <VenueSection />
                <LittleOnesSection />
                <ContactSection />
                {/* <Footer /> */}
            </div>
        </div>
    );
}

export default App;
