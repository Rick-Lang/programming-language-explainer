import { MarkerType } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = 'floating';

export const initialNodes = [
  {
    id: 'Source',
    type: 'custom',
    data: { label: 'Source' },
    position,
    shape: 'circle'
  },
  {
    id: 'Lexer',
    data: { label: 'Lexer' },
    type: 'custom',
    position: { x: 0, y: 100 },
  },
  {
    id: 'Parser',
    data: { label: 'Parser' },
    type: 'custom',
    position: { x: 0, y: 200 },
  },
  {
    id: 'Interpreter',
    data: { label: 'Interpreter' },
    type: 'custom',
    position: { x: 0, y: 300 },
  },
  {
    id: 'python',
    data: { label: 'Transpiler: Python' },
    type: 'custom',
    position: { x: 250, y: 100 },
  },

].map((node) => {
  node.type = 'custom'
  return node
})
export const initialEdges = [
  { id: 'e12', source: 'Source', target: 'Lexer', type: edgeType, animated: true, },
  { id: 'e2Parser', source: 'Lexer', target: 'Parser', type: edgeType, animated: true },
  { id: 'e2transpiler', source: 'Lexer', target: 'python', type: edgeType, animated: true },
  { id: 'e2Parser2', source: 'Parser', target: 'Interpreter', type: edgeType, animated: true },

].map((edge) => {
  return {
    ...edge,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 30,
      height: 30,
    },
  }
})
