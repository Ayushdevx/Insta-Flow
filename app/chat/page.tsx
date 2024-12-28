'use client';

import { AIChatbot } from '@/components/chat/ai-chat';
import { motion } from 'framer-motion';

export default function ChatPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        AI Assistant
      </motion.h1>
      <AIChatbot />
    </motion.div>
  );
}