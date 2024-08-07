# What is a Programming Language?
`Language` is the primary method for human communication through the composition of structured words.
Then, what is a programming language? You can think that it is a language human (programmers) talk to machine.
We the programmers are precision-pursuing. A language, or a list of words, is a programming language if and only if it:
1. specifies a set of instructions for a machine to perform. (if this is satisfied, then it is a language at least!)
2. is Turing complete (meaning that this language can emulate a [Turing machine](https://wikipedia.org/wiki/Turing_machine)).
Therefore, HTML (markup language), CSS (style sheet language), and Markdown (similar to HTML) are not programming languages as they only specify instructions, but cannot emulate a Turing machine. In another approach, if a language has valid if and looping statements, then it is able to simulate a Turing machine. Notice: Although the [BF langauge](https://wikipedia.org/wiki/Brainfuck) does not have any regular statements like regular languages such as Java and C++, BF itself is a simulation of a Turing machine, therefore it is also a programming language!

# Ways to Implement a Programming Language
There are mainly three ways of implementing a programming language:
1. making a compiler
2. making an interpreter
3. making a transpiler (source-to-source compiler)
4. making a just-in-time compiler (JIT)
## Compiler
A compiler is a program that converts a higher-level code into machine or low-level code to execute it.
Some languages that are built as compilers are C, C++, and Rust.
C++ compilers, such as G++ or Clang++, convert C++ source code into [intermediate representation](https://en.wikipedia.org/wiki/Intermediate_representation#:~:text=An%20intermediate%20representation%20(IR)%20is,such%20as%20optimization%20and%20translation.)(IR), and then to machine code. Translating to IR is to optimize the source code, such as [dead code elimination](https://en.wikipedia.org/wiki/Dead-code_elimination) and [code motion or frequency reduction](https://www.geeksforgeeks.org/frequency-reduction-in-code-optimization).
## Interpreter
An interpreter analyzes and executes a high-level code line by line, usually with a virtual machine. Some examples are Python, Ruby, and PHP. Python and Ruby first convert their source code into abstract syntax trees, and then the byte code gets executed by [virtual machines](https://medium.com/@principledminds/virtual-machines-explained-5578371195f#:~:text=Summary-,Virtual%20machines%20are%20programs%20that%20compile%20an%20intermediate%20language%20down,compilers%20for%20each%20individual%20language.).
## Transpiler
A transpiler converts a piece of code to another code in another language, and these 2 pieces of code have the same level (complexity). For example, there is a transpiler that converts C++ to C. The most famous transpiler must be [Babel](https://babeljs.io/), a tool for developers to write modern JS code in once and transpile to older version code for compatibility!
## JIT
JIT is a special interpreter that improves code performance by compiling bytecodes to native machine code at run time.

In This tutorial, we are going through the [Rickroll Programming Language](https://github.com/Rick-Lang/rickroll-lang), a compiling, interpreting, and transpiling language!


# Making a Transpiler
Transpiler is the easiest to make among all other implementations. Our task is to convert the Rickroll source code into Python.
## Lexer
We have the source file ended in `.rickroll`, but we need to break the string down to meaningful keywords and values, and we call them, tokens. Click the interactive example - Lexer:

You can look into the Rickroll source code, [src-py/Lexer.py](https://github.com/Rick-Lang/rickroll-lang/blob/main/src/Lexer.py)
## Translator
Since we have the tokens, we can map them to the corresponding keywords in Python! E.g. `i just wanna tell u how im feeling` is equivalent to `print()` in Python. Click the interactive example - Transpiler:

You can look into the Rickroll source code, [src-py/pyrickroll.py](https://github.com/Rick-Lang/rickroll-lang/blob/main/src/pyrickroll.py), class TranslateToPython()

## Executor
After storing our translated python code into `py_code`, we can execute it: `exec(transpiler.py_code, globals(), globals())`. In this case, we transpile our code to Python, therefore the executor is the Python interpreter. If we transpile it to C/C++, the executor would be GCC/G++ or Clang/Clang++, which compiles the converted code into binary to execute.

# Making an Interpreter
Different from transpiler, an interpreter requires a virtual machine and the use of [abstract syntax tree](https://medium.com/basecs/leveling-up-ones-parsing-game-with-asts-d7a6fc2400ff), or AST, a tree structure that stores pieces of tokens to represent the order of code execution.

## Lexer
We use the same lexer with transpiler, breaking the source code down into the same tokens

## Parser
The tokens cannot represent the structure and order of execution of the code alone, and AST is the solution. For example, in the if control flow, the tokens are
```python
['if', 'a', '==', '1', ':', 'print', '(', '"', '"Hello World!"', '"', ')']
```
the interpreter still doesn't know the relation between the if statement and the print statement, in which the print statement won't be executed if the if statement's condition is false. In AST, these tokens are represented as:
```python
['if', ['a', '==', '1'], ['print', ['"Hello World!"']]]
```
In which the interpreter knows that `['a', '==', '1']` is the condition, and `['print', ['"Hello World!"']]` is the child statement, which would be triggered once the condition is true.

Click the interactive example:

![](Parser_eg.gif)

Look into [src-py/Parser.py](https://github.com/Rick-Lang/rickroll-lang/blob/main/src/Parser.py) to see how it is implemented.

## Interpreter
An interpreter, or virtual machine, interprets the AST and directly executes it, without converting it to machine code. To make an interpreter, we first have to traverse the AST.
Interpreter
An interpreter, or virtual machine, interprets the AST and directly executes it, without converting it to machine code. To make an interpreter, we first have to traverse the AST.

### Traversing the AST
The interpreter will traverse the AST, visiting each node and executing the corresponding action. For example, if it encounters a print statement, it will execute the print function with the given arguments. Here's a simplified version of what the traversal might look like:
```
python
class RickrollInterpreter:
    def __init__(self, ast):
        self.ast = ast

    def evaluate_node(self, node):
        if isinstance(node, list):
            if node[0] == 'if':
                condition = self.evaluate_node(node[1])
                if condition:
                    self.evaluate_node(node[2])
            elif node[0] == 'print':
                print(self.evaluate_node(node[1]))
        elif isinstance(node, str):
            if node.startswith('"') and node.endswith('"'):
                return node.strip('"')
            # Add more cases for other types of nodes as necessary
        return node

    def run(self):
        for node in self.ast:
            self.evaluate_node(node)
```
You can look into the Rickroll source code, [src-py/Interpreter.py](https://github.com/Rick-Lang/rickroll-lang/blob/main/src/interpreter.py) for a more complete implementation.

