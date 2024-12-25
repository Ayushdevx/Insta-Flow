'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Instagram, Bot, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-accent">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Automate Your Instagram Growth with AI
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Powerful automation tools powered by AI to help you grow your Instagram presence,
            engage with your audience, and save time.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-card rounded-lg shadow-lg"
            >
              <Instagram className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Instagram Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly connect with Instagram's API to automate posts, comments, and DMs.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-card rounded-lg shadow-lg"
            >
              <Bot className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Responses</h3>
              <p className="text-muted-foreground">
                Generate intelligent responses using advanced AI for comments and messages.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-6 bg-card rounded-lg shadow-lg"
            >
              <Zap className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Automated Workflows</h3>
              <p className="text-muted-foreground">
                Create custom automation workflows triggered by specific keywords or actions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-accent">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-muted-foreground">Messages Sent</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}