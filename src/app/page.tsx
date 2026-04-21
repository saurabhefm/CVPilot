"use client";

import React, { useState } from "react";
import Hero from "@/components/sections/Hero";
import UploadZone from "@/components/sections/UploadZone";
import FeatureGrid from "@/components/sections/FeatureGrid";
import TailoringModule from "@/components/sections/TailoringModule";
import SummaryModule from "@/components/sections/SummaryModule";
import Pricing from "@/components/sections/Pricing";
import SnippetModal from "@/components/ui/SnippetModal";
import TemplateSelector from "@/components/sections/TemplateSelector";
import StepTracker from "@/components/ui/StepTracker";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Loader2 } from "lucide-react";

const steps = [
  { id: 1, label: "Upload" },
  { id: 2, label: "Template" },
  { id: 3, label: "Tailor" }
];

export default function Home() {
  const [file, setFile] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isParsing, setIsParsing] = useState(false);
  const [parsingProgress, setParsingProgress] = useState(0);
  
  const [modal, setModal] = useState<{ open: boolean; title: string; placeholder: string; action: string }>({
    open: false,
    title: "",
    placeholder: "",
    action: ""
  });

  const handleFileUpload = async (fileObj: File) => {
    setIsParsing(true);
    setParsingProgress(10);
    setFile(fileObj.name);

    try {
      // 1. Read PDF Text
      const arrayBuffer = await fileObj.arrayBuffer();
      
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      console.log(`[PDF Parser] Total Pages: ${pdf.numPages}`);
      
      let fullText = "";
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        let lastY;
        let pageText = "";
        
        for (const item of textContent.items as any[]) {
          if (lastY !== undefined && Math.abs(item.transform[5] - lastY) > 5) {
             pageText += "\n";
          }
          pageText += item.str;
          lastY = item.transform[5];
        }
        
        fullText += pageText + "\n\n";
        setParsingProgress(10 + (i / pdf.numPages) * 30);
      }

      console.log(`[PDF Parser] Total Characters Extracted: ${fullText.length}`);
      setParsingProgress(50);
      await processContent(fullText, fileObj.name);

    } catch (error) {
      console.error("Parsing failed:", error);
      setIsParsing(false);
      alert(`Parsing failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleTextSubmit = async (text: string) => {
    setIsParsing(true);
    setParsingProgress(20);
    setFile("Pasted Content");
    
    try {
       await processContent(text, "Pasted Content");
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsParsing(false);
      alert(`Analysis failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const processContent = async (text: string, fileName: string) => {
    // 2. Extract with AI
    const response = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ task: "EXTRACT", content: text })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "AI Extraction failed");
    }
    
    setParsingProgress(90);
    const profile = await response.json();

    // 3. Save & Navigate
    if (typeof window !== "undefined") {
      const cleanName = (profile.name || fileName.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ")).trim();
      localStorage.setItem("cv_file_name", fileName);
      localStorage.setItem("cv_full_profile", JSON.stringify(profile));
      localStorage.setItem("cv_user_name", cleanName);
    }

    setParsingProgress(100);
    setTimeout(() => {
      setIsParsing(false);
      setCurrentStep(2);
      scrollToSection("templates");
    }, 500);
  };

  const openModal = (title: string, placeholder: string, action: string) => {
    setModal({ open: true, title, placeholder, action });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleTemplateSelect = (id: string) => {
    setSelectedTemplate(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("cv_selected_template", id);
    }
    setCurrentStep(3);
    setTimeout(() => scrollToSection("tailor"), 800);
  };

  const onStepClick = (stepId: number) => {
    const ids = ["upload", "templates", "tailor"];
    scrollToSection(ids[stepId - 1]);
    setCurrentStep(stepId);
  };

  return (
    <>
      <AnimatePresence>
        {isParsing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-charcoal/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full space-y-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                 <Loader2 className="w-24 h-24 text-brand-mint animate-spin opacity-20" />
                 <Wand2 className="w-10 h-10 text-brand-mint absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tight">Analyzing Career DNA</h2>
                <p className="text-slate-400 font-medium">Our AI is mapping your experience to the digital canvas...</p>
              </div>
              
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${parsingProgress}%` }}
                    className="h-full bg-brand-mint shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                   <span>Extraction: {Math.round(parsingProgress)}%</span>
                   <span>Model: Google Gemini</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="hero">
        <Hero matchScore={matchScore} openModal={openModal} />
      </div>
      
      <div id="upload">
        <UploadZone onFileUpload={handleFileUpload} onTextSubmit={handleTextSubmit} />
      </div>
      
      <div id="features">
        <FeatureGrid />
      </div>
      
      <div id="templates">
        <TemplateSelector 
          selectedTemplate={selectedTemplate} 
          onSelect={handleTemplateSelect} 
        />
      </div>

      <div id="tailor">
        <TailoringModule 
          hasFile={!!file} 
          onGenerate={(score) => setMatchScore(score)} 
        />
      </div>

      <StepTracker 
        currentStep={currentStep} 
        steps={steps} 
        onStepClick={onStepClick} 
      />
      
      <div id="summary">
        <SummaryModule />
      </div>
      
      <div id="pricing">
        <Pricing />
      </div>

      <SnippetModal 
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        placeholder={modal.placeholder}
        actionLabel={modal.action}
      />
    </>
  );
}
