import { initialNodes, initialEdges } from './elements/nodes-edges';
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useLayoutEffect ,useState} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ConnectionMode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './index.less'
import Modal from './elements/modal/Modal'
import CustomNode from './elements/customNode/CustomNode';
import SimpleFloatingEdge from './elements/SimpleFloatingEdge/SimpleFloatingEdge';
const elk = new ELK();
const nodeTypes = {
  // custom: CustomNode,
};
const edgeTypes = {
  // floating: SimpleFloatingEdge,
};
// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = (nodes, edges, options = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};

function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const opts = { 'elk.direction': direction, ...elkOptions };
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;

      getLayoutedElements(ns, es, opts).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges]
  );

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout({ direction: 'DOWN', useInitialNodes: true });
  }, []);
  const onNodeClick = (event: React.MouseEvent, node: Node)=>{
    setShowModal(true)
    event.stopPropagation()
  }
  const onClick = (event: React.MouseEvent)=>{
    setShowModal(false)
  }
  console.log(nodes,edges);
  
  const [showModal,setShowModal] = useState(false)
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      zoomOnScroll={false}
      zoomOnPinch={false}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      connectionMode={ConnectionMode.Loose}
      preventScrolling={false}
      selectionKeyCode={null}
      multiSelectionKeyCode={null}
      onClick={onClick}
      proOptions={{'hideAttribution':true}}
      fitView
    >
      <Modal showModal={showModal}></Modal>
    </ReactFlow>
  );
}

export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);
