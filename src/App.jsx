import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FamilySection from "./components/FamilySection";
import MuhurtSection from "./components/MuhurtSection"; // <-- Import
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

                {/* Add the new section here */}
                <MuhurtSection />

                {/* Future sections will go here */}
            </div>
        </div>
    );
}

export default App;
