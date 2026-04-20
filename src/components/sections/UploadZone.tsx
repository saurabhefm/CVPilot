"use client";

import React, { useState } from "react";
import { Upload, FileUp, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const UploadZone = () => {
  const [isDragActive, setIsDragActive] = useState(false);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-6">
            Scan Your Resume in Seconds <br />
            <span className="text-brand-mint">— No Sign-up Required</span>
          </h2>
          <p className="text-slate-500 text-lg mb-12">
            Just upload your current CV and see how CVPilot can optimize it for your dream role instantly.
          </p>

          <div 
            onDragEnter={() => setIsDragActive(true)}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={() => setIsDragActive(false)}
            className={`
              relative p-12 border-4 border-dashed rounded-3xl transition-all duration-300
              ${isDragActive ? "border-brand-mint bg-brand-mint/5" : "border-slate-100 bg-slate-50 hover:border-slate-300"}
            `}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6">
                <FileUp className="w-10 h-10 text-brand-mint" />
              </div>
              <p className="text-xl font-bold text-slate-900 mb-2">Drag and drop your resume</p>
              <p className="text-slate-500 mb-8">PDF or DOCX files accepted (Max 5MB)</p>
              
              <button className="bg-[#0F172A] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors flex items-center gap-3">
                <Upload className="w-5 h-5" />
                Select File
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 bg-white px-8 py-4 rounded-full shadow-lg border border-slate-100 min-w-max">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Privacy Guaranteed</span>
              </div>
              <div className="h-4 w-[1px] bg-slate-200" />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-mint" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Immediate Scrutiny</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadZone;
