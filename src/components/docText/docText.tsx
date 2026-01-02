import { useState, useEffect } from 'react';
import './docText.less'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

export default function DocText() {
    const [md,setMd]=useState('')
    
    useEffect(() => {
        // Try different paths to find the tutorial content
        const tryFetch = async () => {
            const paths = [
                'tutorial_content.md',
                './tutorial_content.md',
                '/tutorial_content.md',
                '/programming-language-explainer/tutorial_content.md'
            ];
            
            for (const path of paths) {
                try {
                    console.log(`Trying to fetch from: ${path}`);
                    const response = await fetch(path);
                    if (response.ok) {
                        // Explicitly handle the response as UTF-8 text
                        const arrayBuffer = await response.arrayBuffer();
                        const decoder = new TextDecoder('utf-8');
                        const text = decoder.decode(arrayBuffer);
                        console.log(`Success! Loaded from ${path}, length: ${text.length}`);
                        console.log('First 100 characters:', text.substring(0, 100));
                        setMd(text);
                        return;
                    }
                } catch (err) {
                    console.log(`Failed to fetch from ${path}:`, err);
                }
            }
            console.error('All fetch attempts failed');
        };
        
        tryFetch();
    }, [])
    
    return <div className="doc-text">
        {md ? (
            <ReactMarkdown children={md} remarkPlugins={[gfm]}></ReactMarkdown>
        ) : (
            <div>Loading tutorial content...</div>
        )}
    </div>
}