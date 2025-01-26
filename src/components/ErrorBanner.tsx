import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorBannerProps {
  message: string | null;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-md"
        role="alert"
      >
        <p className="text-red-700">{message}</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ErrorBanner;
