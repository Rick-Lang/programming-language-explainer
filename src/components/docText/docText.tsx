import { useState, useEffect } from 'react';
import './docText.less'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
export default function DocText() {
    const [md,setMd]=useState('')
    
    useEffect(() => {
        fetch('./tutorial_content.md').then(res=>res.text()).then(res=>{
            setMd(res)
        }).catch(err => {
            console.error('Failed to load tutorial content:', err);
        })
    }, [])
    
    return <div className="doc-text">
        <ReactMarkdown children={md}  remarkPlugins={[gfm]}></ReactMarkdown>
    </div>
}