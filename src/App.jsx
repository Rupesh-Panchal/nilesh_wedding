import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FamilySection from "./components/FamilySection";
import MuhurtSection from "./components/MuhurtSection";
import VenueSection from "./components/VenueSection"; // <-- Added Import
import BackgroundAnimation from "./components/BackgroundAnimation";

function App() {
    return (
        <div className="min-h-screen bg-surface font-body text-on-surface relative">
            {/* 1. Global Background Animation */}
            <BackgroundAnimation />

            {/* 2. Main Content Container */}
            <div className="relative z-10">
                <Navbar />
                <HeroSection />
                <FamilySection />

                {/* Auspicious Time / Muhurt */}
                <MuhurtSection />

                {/* Venue & Events */}
                <VenueSection />

                {/* Future sections will go here (e.g., Little Ones, Contact) */}
            </div>
        </div>
    );
}

export default App;