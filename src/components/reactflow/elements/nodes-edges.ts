const position = { x: 0, y: 0 };
const edgeType = 'floating';

export const initialNodes = [
  {
    id: 'Source',
    type: 'custom',
    data: { label: 'Source' },
    position,
    shape:'circle'
  },
  {
    id: 'Lexer',
    data: { label: 'Lexer' },
    type: 'custom',
    
    position,
  },
  {
    id: 'Parser',
    data: { label: 'Parser' },
    type: 'custom',
    position,
  },
  {
    id: 'Intereter',
    data: { label: 'Intereter' },
    type: 'custom',
    position,
  },
  {
    id: 'python',
    data: { label: 'transpiler: python' },
    type: 'custom',
    position,
  },
 
].map((node) =>{
  node.type='custom'
  return node
})
export const initialEdges = [
  { id: 'e12', source: 'Source', target: 'Lexer', type: edgeType, animated: true, },
  { id: 'e2Parser', source: 'Lexer', target: 'Parser', type: edgeType, animated: true },
  { id: 'e2Parser', source: 'Lexer', target: 'Intereter', type: edgeType, animated: true },
  { id: 'e2transpiler', source: 'Intereter', target: 'python', type: edgeType, animated: true },
 
];
