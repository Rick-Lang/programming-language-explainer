import { initialNodes, initialEdges } from './elements/nodes-edges';
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ConnectionMode,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './index.less'
import Modal from './elements/modal/Modal'
import SimpleFloatingEdge from './elements/SimpleFloatingEdge/SimpleFloatingEdge';

const edgeTypes = {
  floating: SimpleFloatingEdge,
};




function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
 

  // Calculate the initial layout on mount.
  useEffect(() => {
    // onLayout({ direction: 'DOWN', useInitialNodes: true });
    const onClick = (event) => {
      setShowModal(false)
    }
    document.addEventListener('click', onClick)
    return () => {
      document.addEventListener('click', onClick)
    }
  }, []);
  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setShowModal(true)
    setnodeName(node.data.label)
    event.stopPropagation()
  }
  const modalClick = (event: React.MouseEvent) => {
    console.log(213);
    
    setShowModal(true)
    event.stopPropagation()
  }
  const [nodeName, setnodeName] = useState('')
  const [showModal, setShowModal] = useState(false)
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      zoomOnScroll={false}
      zoomOnPinch={false}
      edgeTypes={edgeTypes}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      preventScrolling={false}
      nodesDraggable={false}
      panOnDrag={false}
      selectionKeyCode={null}
      multiSelectionKeyCode={null}

      proOptions={{ 'hideAttribution': true }}
      fitView
    >
      <Modal showModal={showModal} nodeName={nodeName} onClick={modalClick}></Modal>
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);
