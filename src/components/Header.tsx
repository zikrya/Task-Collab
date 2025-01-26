import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-12"
  >
    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{title}</h1>
    <p className="text-xl text-gray-600">{subtitle}</p>
  </motion.div>
);

export default Header;
