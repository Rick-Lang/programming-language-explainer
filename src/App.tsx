import './App.less'
import ReactFlowProvider from './components/reactflow/index'
import DocText from './components/docText/docText'
import {
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import "github-markdown-css/github-markdown-dark.css"
import "cornercss/index.css";
function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <div className='markdown-body' >
      <motion.div className="progress" style={{ scaleX }} />
      <div className='header'>
        <div>Programming Language Explainer - By Rick Lang</div>
      </div>
      <div className='content' style={{ height: 'calc(100vh - 100px)', width: '' }}>
        <ReactFlowProvider ></ReactFlowProvider>
      </div>
      <DocText></DocText>
    </div>
  )
}

export default App
