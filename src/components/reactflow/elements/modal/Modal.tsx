import { Button, notification, Input } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import './Modal.less'
const { TextArea } = Input;
export default function Modal({ showModal }) {
    const [code, setCode] = useState('')
    useEffect(() => {
        // document.querySelectorAll("pre code").forEach(block => {
        //     try { hljs.highlightBlock(block); }
        //     catch (e) { console.log(e); }
        // });
        const code = `
        <div className="code-block" style={{ position: 'relative', marginTop: 8 }}>
        <pre>
          <code id={language} ref={preRef} className={language}>
            {code}
          </code>
        </pre>
      </div>
      `;
      hljs.highlightAll();
        // const code1 = hljs?.highlight("python", code).value;
        // setCode(code1)
    }, [showModal])

    const content = `
        <pre>
          <code>
    "take me to ur heart",
    "    give areYouRolling up [\"Together \",\"forever\", \"and never to part\", \"Together\", \"foverer\", \"we two\"]",
    "    give astleyCounter up 0",
    "    together forever and never to part",
    "        and if u ask me how im feeling astleyCounter == len(areYouRolling)",
    "           desert u",
    "       say goodbye",
    "       i just wanna tell u how im feeling areYouRolling[astleyCounter] + \"\n\"",
    "       give astleyCounter up astleyCounter + 1",
    "   say goodbye",
    "say goodbye"
    </code>
                   
        </pre>
     `
    return <div className="modal" style={{ display: showModal ? '' : 'none' }}>
        <div className='modal-content'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
}