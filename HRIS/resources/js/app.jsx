import React from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";

function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-xl shadow-xl">
                <h1 className="text-2xl font-bold text-slate-800">
                    Laravel 12 + React
                </h1>
                <p className="text-slate-500 mt-2">Tailwind ready</p>
            </div>
        </div>
    );
}

createRoot(document.getElementById("app")).render(<App />);
