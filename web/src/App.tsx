import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.less'
import ReactFlowProvider from './components/reactflow/index'
import DocText from './components/docText/docText'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='header'>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{height:'calc(100vh - 100px)',width:'97vw'}}>
        <ReactFlowProvider ></ReactFlowProvider>
      </div>
       <DocText></DocText>
    </>
  )
}

export default App
