'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Prizes() {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "200px" });
   const count = useMotionValue(0);
   
   // Format the number to Indonesian Locale e.g. Rp 46.000.000
   const roundedDisplay = useTransform(count, (latest) => {
       return "Rp " + new Intl.NumberFormat('id-ID').format(Math.round(latest));
   });

   useEffect(() => {
       if (isInView) {
           const controls = animate(count, 46000000, { 
               duration: 1.2, 
               ease: "easeOut"
           });
           return controls.stop;
       }
   }, [isInView, count]);

   return (
      <section id="prizes" className="py-16 md:py-32 relative overflow-hidden">
         {/* Original subtle cyan tracking blur */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-cyan-900/10 rounded-full max-md:blur-[40px] md:blur-[120px] pointer-events-none" />

         <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, amount: 0, margin: "0px 0px 800px 0px" }}
               transition={{ duration: 0.8 }}
               className="text-center"
            >
               <h2 className="font-raela font-bold text-3xl md:text-5xl lg:text-7xl text-white mb-8 md:mb-12">
                  TOTAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-purple">HADIAH</span>
               </h2>

               {/* Clean, Premium Glassmorphic Plaque */}
               <motion.div 
                   className="relative inline-block px-6 py-8 md:px-16 md:py-12 rounded-[2rem] md:rounded-[3rem] backdrop-blur-md md:backdrop-blur-[24px] bg-white/[0.03] border border-white/10 shadow-2xl"
                   whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)' }}
                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
               >
                   <motion.h1 
                      className="text-[12vw] md:text-[8rem] xl:text-[10rem] font-black font-raela text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange leading-none tracking-tighter"
                   >
                      {roundedDisplay}
                   </motion.h1>
               </motion.div>
            </motion.div>
         </div>
      </section>
   );
}

