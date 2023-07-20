import {motion, AnimatePresence} from "framer-motion"
import { ReactNode } from "react"

const Animation = ({children, className}: {children: ReactNode, className?: string}) => {
  return (
    <AnimatePresence>
    <motion.div className={className}
    initial = {{ x: 200,  opacity: 0}}
    animate = {{ x : 0, opacity:1, type:'animate'}}
    exit={{ x: -200, opacity:0}}
    key="connect"
    transition={{ duration: 0.2}}>
        {children}
    </motion.div>
    </AnimatePresence>
  )
}

export default Animation