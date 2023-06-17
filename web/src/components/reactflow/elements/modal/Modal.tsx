import { Button, notification,Input } from 'antd';
import { useEffect, useMemo } from 'react';
import './Modal.less'
const { TextArea } = Input;
export default function Modal({showModal}) {

    useEffect(()=>{
    },[showModal])
    
    return <div className="modal" style={{display:showModal?'':'none'}}>
        <div className='modal-content'>
        <TextArea></TextArea>
        <TextArea></TextArea>
        </div>
    </div>
}