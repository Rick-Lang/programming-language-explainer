import { useState } from 'react';
import './docText.less'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
export default function DocText() {
    const [md,setMd]=useState('')
    fetch('/programming-language-explainer/tutorial_content.md').then(res=>res.text()).then(res=>{
        setMd(res)
    })
    return <div className="doc-text">
        <ReactMarkdown children={md}  remarkPlugins={[gfm]}></ReactMarkdown>
    </div>
}