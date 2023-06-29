# Definition of Programming Language?
`Language` is the primary method for human communication through composition of structured word.
Then, what is a programming language? You can think that it is a language human (programmers) talk to machine.
We the programmers are precision-pursuing. A language, or a list of words, is a programming language if and only if it:
1. specifies a set of instructions for a machine to perform. (if this is satisfied, then it is a language at least!)
2. is Turing complete (meaning that this language is able to emulate a [Turing machine](https://wikipedia.org/wiki/Turing_machine)).
Therefore, HTML (markup language), CSS (style sheet langauge), and Markdown (similar to HTML) are not programming languages as they only specify instructions, but cannot emulate a Turing machine. In another approach, if a language has valid if and looping statements, then it is able to simulate a Turing machine. Notice: although the [BF langauge](https://wikipedia.org/wiki/Brainfuck) does not have any regular statements like regular langauges such as Java and C++, BF itself is a simulation of a turing machine, therefore it is also a programming language!

# Ways of Implementing a Programming Language
There are mainly three ways of implementng a programming language:
1. making a compiler
2. making an interpreter
3. making a transpiler (source-to-source compiler)
4. Making a just-in-time compiler (JIT)
### Compiler
A compiler is a program that converts a higher-level code into machine or low level code to execute them.
Some langauges that are built as compiler are C, C++, and Rust.
C++ compilers, such as G++ or Clang++, convert C++ source code into [intermediate representation](https://en.wikipedia.org/wiki/Intermediate_representation#:~:text=An%20intermediate%20representation%20(IR)%20is,such%20as%20optimization%20and%20translation.)(IR), and then to machine code. Translating to IR is to optimize the source code, such as [dead code elimination](https://en.wikipedia.org/wiki/Dead-code_elimination) and [code motion or frequency reduction](https://www.geeksforgeeks.org/frequency-reduction-in-code-optimization).
### Interpreter
An interpreter is a program that analyzes and executes a high-level code line by line, usually with a virtual machine. Some examples are Python, Ruby, and PHP. Python first converts the python source code into abstract syntax trees, and then byte code 