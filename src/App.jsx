import React from "react";
import IntroAnimation from "./components/IntroAnimation";
import BackgroundMusic from "./components/BackgroundMusic";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FamilySection from "./components/FamilySection";
import MuhurtSection from "./components/MuhurtSection";
import VenueSection from "./components/VenueSection";
import LittleOnesSection from "./components/LittleOnesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import AutoScroll from "./components/AutoScroll";

function App() {
    return (
        <div className="relative min-h-screen bg-surface font-body text-on-surface">
            {/* Website Opening Animation */}
            <IntroAnimation />

            {/* Background Music */}
            <BackgroundMusic />

            {/* Global Background Animation */}
            <BackgroundAnimation />
            <AutoScroll />
            {/* Main Website Content */}
            <div className="relative z-10">
                <Navbar />
                <HeroSection />
                <FamilySection />
                <MuhurtSection />
                <VenueSection />
                <ContactSection />
                <LittleOnesSection />
                <Footer />
            </div>
        </div>
    );
}

export default App;
