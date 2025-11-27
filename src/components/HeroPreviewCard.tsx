import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Download, Eye, FileText, Film, Image as ImageIcon, Link as LinkIcon, Music } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
const MOCK_FILES = [
  { id: 1, name: 'brand-assets.zip', size: '2.1 GB', type: 'zip' },
  { id: 2, name: 'project-final.mov', size: '874 MB', type: 'video' },
  { id: 3, name: 'logo-v2.png', size: '1.2 MB', type: 'image' },
  { id: 4, name: 'website-copy.docx', size: '88 KB', type: 'doc' },
  { id: 5, name: 'background-music.mp3', size: '4.5 MB', type: 'audio' },
];
const fileTypeIcons: { [key: string]: React.ReactNode } = {
  zip: <FileText className="w-5 h-5 text-gray-500" />,
  video: <Film className="w-5 h-5 text-gray-500" />,
  image: <ImageIcon className="w-5 h-5 text-gray-500" />,
  doc: <FileText className="w-5 h-5 text-gray-500" />,
  audio: <Music className="w-5 h-5 text-gray-500" />,
};
const FileItem = ({ file, isLoaded }: { file: typeof MOCK_FILES[0]; isLoaded: boolean }) => (
  <div className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
    {isLoaded ? (
      <>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
            <AvatarFallback className="bg-transparent">{fileTypeIcons[file.type]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-800">{file.name}</p>
            <p className="text-xs text-gray-500">{file.size}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Download className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Download</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Preview</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </>
    ) : (
      <div className="flex items-center gap-3 w-full">
        <Skeleton className="h-8 w-8 rounded-md" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    )}
  </div>
);
export function HeroPreviewCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Card className="shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden border-gray-200/80 bg-white/80 backdrop-blur-xl">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-semibold text-gray-900">Your files are ready</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="border rounded-xl divide-y max-h-64 overflow-y-auto p-2">
              {(isLoaded ? MOCK_FILES : Array(5).fill(0)).map((file, index) => (
                <FileItem key={file.id || index} file={file} isLoaded={isLoaded} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Button variant="link" size="sm" className="text-gray-500 hover:text-gray-800">
                <LinkIcon className="w-3 h-3 mr-1.5" />
                Report a problem
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50/70 p-6 flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="w-full bg-[#2F6BF6] hover:bg-[#2F6BF6]/90 text-white rounded-full shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
              Download all
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-white hover:bg-gray-50 rounded-full border-gray-300 transition-all hover:-translate-y-0.5 active:scale-95">
              Open preview
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}