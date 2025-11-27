import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2 } from 'lucide-react';
interface PreviewModalProps {
  file: { type: string; name: string };
  onClose: () => void;
  onAuthOpen: () => void;
}
const MockPDFPreview = () => (
  <div className="grid grid-cols-2 gap-4 p-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white/80 rounded-md aspect-[8.5/11] p-2 space-y-1">
        <div className="h-2 w-3/4 bg-gray-300/80 rounded"></div>
        <div className="h-20 w-full bg-gray-200/80 rounded"></div>
      </div>
    ))}
  </div>
);
const MockDocPreview = () => (
  <div className="p-4 space-y-3">
    <div className="h-4 w-1/2 bg-gray-300/80 rounded"></div>
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="space-y-1.5">
        <div className="h-2 w-full bg-gray-200/80 rounded"></div>
        <div className="h-2 w-full bg-gray-200/80 rounded"></div>
        <div className="h-2 w-5/6 bg-gray-200/80 rounded"></div>
      </div>
    ))}
  </div>
);
const MockDrawingPreview = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 150" className="p-4">
    <defs>
      <filter id="svgBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
      </filter>
    </defs>
    <g filter="url(#svgBlur)" stroke="#a0aec0" strokeWidth="2" fill="none">
      <rect x="20" y="20" width="160" height="110" rx="5" />
      <circle cx="70" cy="75" r="20" />
      <path d="M110 55 h 50 v 40 h -50 z" />
      <line x1="20" y1="20" x2="180" y2="130" />
    </g>
  </svg>
);
const getMockPreview = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return <MockPDFPreview />;
    case 'doc':
      return <MockDocPreview />;
    case 'drawing':
      return <MockDrawingPreview />;
    default:
      return <MockDocPreview />;
  }
};
export function PreviewModal({ file, onAuthOpen }: PreviewModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAuthOpen();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onAuthOpen]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
      onClick={onAuthOpen}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative w-full max-w-3xl aspect-video bg-gray-100/10 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the content
      >
        <div className="absolute inset-0 filter blur-sm scale-105">
          {getMockPreview(file.type)}
        </div>
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 border border-white/30 mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Sign in to view full document</h2>
          <p className="text-white/80 mt-2 max-w-md">
            This is a secure preview. To access the complete file, please sign in.
          </p>
          <div className="mt-6 flex items-center gap-2 text-white/90">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Redirecting to sign in...</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}