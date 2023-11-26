import { useEffect, useState } from "react";
import { Segmented } from "antd";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import "./Modal.less";
import jsonData from "/src/assets/data/rickroll_src_eg.json";
import { motion, AnimatePresence } from "framer-motion";
export default function Modal({ showModal, nodeName, ...props }: any) {
  const [code, setCode] = useState("");
  const [value, setValue] = useState<string | number>("Hello World");
  useEffect(() => {
    nodeName && onChange("Hello World");
  }, [nodeName]);

  const onChange = (val) => {
    setValue(val);
    let code = jsonData[nodeName][val];
    if (Array.isArray(code)) {
      code = code.join("\n");
    }
    const content = `<pre><code>${code} </code></pre>`;
    setCode(content);
    setTimeout(() => {
      hljs.highlightAll();
    });
  };

  return (
    <div
      {...props}
      className="modal"
      style={{ display: showModal ? "" : "none" }}
    >
      <Segmented
        options={["Hello World", "If", "While"]}
        value={value}
        onChange={onChange}
      />
      <div className="modal-content">
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </div>
    </div>
  );
}
