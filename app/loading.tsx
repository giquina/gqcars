import { motion } from "framer-motion"
import { fadeIn } from "./components/ui/animations"

export default function Loading() {
  return (
    <motion.div
      {...fadeIn}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="relative">
        <div className="animate-ping absolute inset-0 rounded-full bg-white/20"></div>
        <div className="animate-spin relative rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    </motion.div>
  )
}