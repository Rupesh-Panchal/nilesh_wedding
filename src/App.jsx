import React from "react";
import IntroAnimation from "./components/IntroAnimation";
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
            {/* 1. Website Opening Animation */}
            <IntroAnimation />

            {/* 2. Global Background Animation */}
            <BackgroundAnimation />

            {/* 3. Main Content Container */}
            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <HeroSection />

                {/* Family Section */}
                <FamilySection />

                {/* Auspicious Time / Muhurt */}
                <MuhurtSection />

                {/* Venue & Events */}
                <VenueSection />

                {/* Contact & Download Section */}
                <ContactSection />

                {/* Little Ones / Fun Section */}
                <LittleOnesSection />

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default App;
