import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { codeExamples, floatingCards } from "../data/CodeExample";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Hero() {

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeTab, setActiveTab] = useState("App.jsx");

    useEffect(() => {
        function handleMouseMove(e) {
            setMousePosition({ x: e.clientX, y: e.clientY });
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const tabBase =
        "px-3 py-2 text-xs sm:text-sm rounded-t-lg border backdrop-blur-sm transition-all duration-200 whitespace-nowrap";

    const tabActive =
        "bg-blue-500/20 text-white border-blue-400/40 shadow-md";

    const tabInactive =
        "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white";

    return <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-10 px-4 sm:px-8 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
        }} />

        <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative order-2 w-full">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-3 ">
                <div className="bg-gradient-to-br from-gray-900//20 to-gray-800/20 backdrop-blur-sm rounded-lg overflow-hidden h-[280px] lg:h-[450px] border-white/5">
                    {/* CODE HEADER */}
                    <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
                        <div className="flex space-x-1 sm:space-x-2 items-center">
                            <div className="flex space-x-1 sm:space-x-2 items-center">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-xs sm:text-sm text-gray-300">UiClone AI</span>
                        </div>
                        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    </div>
                    <div className="flex space-x-1 sm:space-x-2 mb-3 sm:mb-4 overflow-x-auto">

                        <button
                            className={`${tabBase} ${activeTab === "App.jsx" ? tabActive : tabInactive
                                }`}
                            onClick={() => setActiveTab("App.jsx")}
                        >
                            App.jsx
                        </button>

                        <button
                            className={`${tabBase} ${activeTab === "Hero.jsx" ? tabActive : tabInactive
                                }`}
                            onClick={() => setActiveTab("Hero.jsx")}
                        >
                            Hero.jsx
                        </button>

                        <button
                            className={`${tabBase} ${activeTab === "Navbar.jsx" ? tabActive : tabInactive
                                }`}
                            onClick={() => setActiveTab("Navbar.jsx")}
                        >
                            Navbar.jsx
                        </button>
                    </div>
                    <div className="relative overflow-hidden flex-grow">
                        <SyntaxHighlighter language="javascript" style={nightOwl} customStyle={{ background: "transparent", margin: 0, height: "100%" }}>
                            {codeExamples[activeTab]}
                        </SyntaxHighlighter>
                    </div>
                </div>
                {/* floating cards */}
                <div className={`hidden lg:block absolute bottom-4 right-4 tranform trnaslate-x-8 w-72 ${floatingCards[activeTab].bgColor} rounded-lg backdrop-blur-sm border border-white/10 p-4 shadow-lg`}>
                    <div className="flex items-center space-x-2 mb-2">
                     <div>{floatingCards[activeTab].icon}</div> <div className="text-sm font-medium">{floatingCards[activeTab].title}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}