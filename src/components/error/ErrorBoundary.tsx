'use client';

import { logger } from '@/lib/logger';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error', { error: error.message, info: errorInfo.componentStack });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-black/80 md:bg-white/5 border border-white/10 rounded-3xl p-10 md:backdrop-blur-xl"
            >
              <div className="w-20 h-20 bg-neon-orange/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-neon-orange/30">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="font-raela font-bold text-3xl text-white mb-4 uppercase tracking-tighter">
                Oops! Something went <span className="text-neon-orange">wrong</span>
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                An unexpected error occurred in our system. Don&apos;t worry, your data is safe.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-white text-black font-raela font-black py-4 rounded-full hover:bg-neon-orange hover:text-white transition-all transform hover:-translate-y-1 shadow-lg shadow-white/5"
              >
                Reload Page
              </button>
            </motion.div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
