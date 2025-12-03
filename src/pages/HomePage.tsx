import React, { useState } from 'react';
import { motion, easeOut } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { HeroPreviewCard } from '@/components/HeroPreviewCard';
import { NavPills } from '@/components/NavPills';
import { HeroDecorations } from '@/components/HeroDecorations';
export function HomePage() {
  const [ctaVariant, setCtaVariant] = useState<'primary' | 'outline'>('primary');
  const handleCtaClick = () => {
    // This will be picked up by the errorReporter to simulate an analytics event
    console.warn('CTA clicked', { timestamp: Date.now(), variant: 'Try it now' });
    toast.success('Coming soon!', {
      description: 'We are preparing something amazing for you.',
    });
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white font-sans">
      <HeroDecorations />
      <NavPills />
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen flex items-center py-16 md:py-24">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="order-2 lg:order-1 flex justify-center">
                <HeroPreviewCard />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display tracking-tighter text-[#17202A]"
                >
                  Think about it.
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-600"
                >
                  WeTransfer is the simplest way to send your files around the world. Share large files and photos. Transfer up to 2GB free.
                </motion.p>
                <motion.div
                  variants={itemVariants}
                  className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  <Button
                    size="lg"
                    onClick={handleCtaClick}
                    onMouseEnter={() => setCtaVariant('outline')}
                    onMouseLeave={() => setCtaVariant('primary')}
                    variant={ctaVariant}
                    className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 bg-[#2F6BF6] text-white hover:bg-transparent hover:text-[#2F6BF6] border-2 border-transparent hover:border-[#2F6BF6] shadow-blue-500/30"
                  >
                    Try it now
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="link"
                        aria-label="Learn more about our free trial"
                        className="text-gray-600 font-medium hover:text-[#2F6BF6]"
                      >
                        Learn more about our free trial
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Free Trial Information</SheetTitle>
                        <SheetDescription>
                          <ul className="list-disc list-inside space-y-2 mt-4 text-left">
                            <li>14-day premium access to all features.</li>
                            <li>No credit card required to get started.</li>
                            <li>Unlimited transfers up to 2GB per transfer.</li>
                            <li>Enhanced security and collaboration tools.</li>
                          </ul>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <footer className="absolute bottom-4 w-full text-center text-sm text-gray-400 z-10">
        <p>Built with ❤️ at Cloudflare</p>
      </footer>
      <Toaster richColors closeButton />
    </div>
  );
}