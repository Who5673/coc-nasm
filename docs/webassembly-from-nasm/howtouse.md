<!--
Copyright (c) 2025 who5673. All rights served.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
-->

# About `nasm-to-wasm` 

Not all the commands in Netwide Assembler programming language is supported by me, but you can use some basic ones like `mov`, `add`, `sub`, `mul`, `div` and `idiv`.  

Example Netwide Assembler script: `main.nasm` - Compute the sum of 2 integers
```
section .text 
  global sum

sum:
  mov rax, rdi
  add rax, rsi
  ret
```
Here are the instructions to use `./nasm-to-wasm`  

__Note__: This depends on `wabt`, so you need to install it first by using `sudo apt install wabt --yes`.  

***NASM --> WAT --> WASM***  

From that way to compile, I do not think it is a great idea to read these instructions.

## Compile into WebAssembly Text (WAT):
```
./nasm-to-wasm -i inputfile.nasm -o outputfile.wat
```
- `-i`, `--input`: Specify a `.nasm` or `.asm` file to compile (recommend: `.nasm`);
- `-o`, `--output`: Take down the name of the file you want to receive after compiling. If not specified, the default is `inputfile.wasm`.

## Compile into WebAssembly binary (WASM):
```
./nasm-to-wasm -i inputfile.nasm -o outputfile.wasm
```
Even you choose the option to compile into WebAssembly Text or WebAssembly binary, you still have an extra JavaScript file in order to push it into website, like this (`(inputfile).js`):
```
export async function loadWasm() {
    // Load WebAssembly normal functions:
    const response = await fetch("{outputfile}");
    const bytes = await response.arrayBuffer();
    const result = await WebAssembly.instantiate(bytes);
    return result.instance;
}

```
## Establish a website to test

To make sure it works on your website, please test like this:  
- You need to make some directories.
- Imagine the output JavaScript file is `main.js`

__index.html:__
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WASM TEST</title>
</head>
<body>
    <h1 id="demo"></h1>
    <script type="module" src="frontend.js"></script>
</body>
</html>
```
__frontend.js:__
```
import { loadWasm } from './main.js'

loadWasm().then(instance => {
    const add = instance.exports.add;
    const result = add(15, 60);
    document.getElementById("demo").textContent = result;
});
```

## Run the test website

*Visual Studio Code is recommended to run this web with Live Server extension*

Open your website using Live Server to check the result.

## Metadata information
Copyright &copy; 2025 July by Who5673. All rights served

## License
MIT
