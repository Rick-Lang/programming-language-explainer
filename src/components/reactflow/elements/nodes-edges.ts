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
    id: 'Intereter',
    data: { label: 'interpreter' },
    type: 'custom',
    position: { x: 250, y: 100 },
  },
  {
    id: 'python',
    data: { label: 'transpiler: python' },
    type: 'custom',
    position: { x: 500, y: 100 },
  },

].map((node) => {
  node.type = 'custom'
  return node
})
export const initialEdges = [
  { id: 'e12', source: 'Source', target: 'Lexer', type: edgeType, animated: true, },
  { id: 'e2Parser', source: 'Lexer', target: 'Parser', type: edgeType, animated: true },
  { id: 'e2Parser1', source: 'Lexer', target: 'Intereter', type: edgeType, animated: true },
  { id: 'e2transpiler', source: 'Intereter', target: 'python', type: edgeType, animated: true },

].map((edge) => {
  return {
    ...edge,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  }
})
