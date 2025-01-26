import type React from "react"
import { motion } from "framer-motion"
import type { HeaderProps } from "@/lib/types"

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="text-center mb-8"
  >
    <h1 className="text-3xl font-semibold text-gray-800 mb-1">{title}</h1>
    <p className="text-lg text-gray-600">{subtitle}</p>
  </motion.div>
)

export default Header

