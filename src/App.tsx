import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.less'
import ReactFlowProvider from './components/reactflow/index'
import DocText from './components/docText/docText'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";
function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <>
       <motion.div className="progress" style={{ scaleX }} />
      <div className='header'>
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
        <div>Programming Language Explainer - By Rick Lang</div>
      </div>
      <div className='content' style={{height:'calc(100vh - 100px)',width:'97vw'}}>
        <ReactFlowProvider ></ReactFlowProvider>
      </div>
       <DocText></DocText>
    </>
  )
}

export default App
