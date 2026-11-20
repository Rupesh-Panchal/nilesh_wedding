import React from "react";

const LanguageToggle = () => {
    return (
        <div className="absolute top-24 right-8 z-40">
            <div className="flex items-center bg-surface p-1 rounded-full border border-outline-variant shadow-chandan">
                <button className="px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-devanagari font-bold">मराठी</button>
                <button className="px-4 py-1.5 text-on-surface-variant rounded-full text-xs font-devanagari hover:bg-surface-container transition-colors">हिंदी</button>
                <button className="px-4 py-1.5 text-on-surface-variant rounded-full text-xs font-devanagari hover:bg-surface-container transition-colors">ENG</button>
            </div>
        </div>
    );
};

export default LanguageToggle;
