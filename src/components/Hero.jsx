import { ArrowRight, ChevronDown, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
// Assuming your data structure from the previous messages
import { codeExamples, floatingCards } from "../data/CodeExample";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("App.jsx");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentFloatingCard = floatingCards[activeTab];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030712]">
      {/* Interactive Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Decorative Blobs */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 animate-in slide-in-from-bottom">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm text-blue-300 font-medium">Introducing CodeFlow AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-in slide-in-from-bottom delay-100">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent block">Code Faster</span>
              <span className="bg-gradient-to-b from-blue-400 to-cyan-400 bg-clip-text text-transparent block">Build Better</span>
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent block">With AI</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto lg:mx-0 animate-in slide-in-from-bottom delay-200">
              Accelerate your development workflow with intelligent code completion and smart debugging.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in slide-in-from-bottom delay-300">
              <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2">
                <span>Start Coding Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-semibold transition-all flex items-center justify-center space-x-2">
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* RIGHT CODE PREVIEW */}
          <div className="relative w-full max-w-2xl lg:max-w-none">
            {/* The main wrapper - NO overflow-hidden here */}
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2 sm:p-3 shadow-2xl">
              
              {/* Window Container */}
              <div className="bg-gray-900/50 rounded-lg border border-white/5 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    CodeFlow AI <ChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex p-2 gap-2 bg-black/20">
                  {["App.jsx", "Hero.jsx", "Navbar.jsx"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 text-xs rounded-md transition-all duration-200 ${
                        activeTab === tab 
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Code Area */}
                <div className="h-[300px] lg:h-[400px] text-sm overflow-auto">
                  <SyntaxHighlighter
                    language="javascript"
                    style={nightOwl}
                    customStyle={{ background: "transparent", padding: "1.5rem" }}
                  >
                    {codeExamples[activeTab] || "// No code available"}
                  </SyntaxHighlighter>
                </div>
              </div>

              {/* FLOATING CARD - Positioned relative to the glass wrapper */}
              {currentFloatingCard && (
                <div 
                  key={activeTab} // Adding key triggers re-animation on tab change
                  className={`hidden lg:block absolute -bottom-6 -right-6 w-72 p-4 rounded-xl border border-white/20 shadow-2xl backdrop-blur-2xl z-20 animate-in slide-in-from-bottom animate-bounce-subtle ${currentFloatingCard.bgColor}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-6 h-6 flex items-center justify-center rounded font-bold ${currentFloatingCard.iconColor}`}>
                      {currentFloatingCard.icon}
                    </div>
                    <span className={`font-semibold text-sm ${currentFloatingCard.textColor}`}>
                      {currentFloatingCard.title}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${currentFloatingCard.contentColor}`}>
                    {currentFloatingCard.content}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}