'use client'

import { motion } from 'framer-motion'

export function AnimatedHero() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-accent">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight"
        >
          {/* Add your heading text here */}
        </motion.h1>
      </div>
    </section>
  )
}