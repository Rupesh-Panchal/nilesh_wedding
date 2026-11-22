import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BackgroundAnimation from "./components/BackgroundAnimation";
import FamilySection from "./components/FamilySection";

function App() {
    return (
        <div className="min-h-screen bg-surface font-body text-on-surface relative">
            {/* 1. Global Background Animation */}
            <BackgroundAnimation />

            {/* 2. Main Content Container */}
            <div className="relative z-10">
                {/* Navbar is now sticky and holds the language toggle */}
                <Navbar />
                <HeroSection />
                <FamilySection /> 
            </div>
        </div>
    );
}

export default App;
