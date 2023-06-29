import { useState } from 'react';
import './docText.less'
import ReactMarkdown from 'react-markdown'
export default function DocText() {
    const [md,setMd]=useState('')
    fetch('/src/assets/data/tutorial_content.md').then(res=>res.text()).then(res=>{
        setMd(res)
    })
    return <div className="doc-text">
        <ReactMarkdown children={md}></ReactMarkdown>
    </div>
}