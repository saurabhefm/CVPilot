"use client";

import React from "react";
import { FileText, AlignLeft, ArrowRight, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const TailoringModule = () => {
  return (
    <section className="py-24 bg-brand-charcoal overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-white mb-4">Precision Tailoring</h2>
          <p className="text-slate-400 text-lg">Align your career history with any job post using AI-driven semantics.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
          {/* Left: Uploader */}
          <div className="p-12 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-brand-mint rounded-2xl flex items-center justify-center text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">1. Upload Your Resume</h3>
                <p className="text-slate-500 text-sm italic">Existing PDF or master copy</p>
              </div>
            </div>
            
            <div className="h-64 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 bg-white/5">
               <FileText className="w-12 h-12 text-white/20" />
               <p className="text-slate-400 text-sm font-medium">Drop file here or browse</p>
            </div>
          </div>

          {/* Right: Job Description */}
          <div className="p-12 bg-brand-mint text-brand-charcoal">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-brand-charcoal rounded-2xl flex items-center justify-center text-white">
                <AlignLeft className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">2. Paste Job Description</h3>
                <p className="text-brand-charcoal/60 text-sm italic italic">The target role requirements</p>
              </div>
            </div>

            <textarea 
               placeholder="Paste the job description here..."
               className="w-full h-64 bg-white/40 border border-brand-charcoal/10 rounded-3xl p-6 text-brand-charcoal placeholder:text-brand-charcoal/40 font-medium focus:outline-none focus:bg-white transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="mt-12 flex justify-center">
            <Button size="lg" className="h-16 px-12 text-xl gap-3">
              Generate Tailored Resume <Wand2 className="w-6 h-6" />
            </Button>
        </div>
      </div>
    </section>
  );
};

export default TailoringModule;
