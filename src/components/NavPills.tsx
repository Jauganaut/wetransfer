import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
const navItems = ['Features', 'Pricing', 'Use cases', 'Resources'];
export function NavPills() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-30"
    >
      <div className="hidden md:flex items-center gap-2 p-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-soft">
        {navItems.map((item) => (
          <Button
            key={item}
            variant="ghost"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {item}
          </Button>
        ))}
        <div className="h-6 border-l border-gray-200 mx-1"></div>
        <Button
          variant="ghost"
          className="rounded-full px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          Log in
        </Button>
        <Button className="rounded-full px-4 py-1.5 text-sm font-medium bg-[#17202A] text-white hover:bg-[#17202A]/90">
          Sign up
        </Button>
      </div>
      <div className="md:hidden">
        <Button variant="outline" className="rounded-full bg-white/80 backdrop-blur-sm">Menu</Button>
      </div>
    </motion.nav>
  );
}