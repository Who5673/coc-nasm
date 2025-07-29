<!--
coc-who5673-nasm - A coc.nvim plugin that is open source for programing NASM Language.
Copyright © 2025 who5673. All rights served.

The MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
-->
# coc-nasm
__coc-nasm__ is a vim plug which can be downloaded from coc.nvim. It is also one of the plugin for Netwide Assembler (NASM) programing. In fact, Assembly Languages and Assemblers have few plugins for coding, but that does not mean we do not have any of them to support us.  
  
## Install coc-nasm:
```
:CocInstall coc-nasm
```
## Our website (work in progress):
```
https://who5673.github.io/coc-nasm-web/
```
This website is under construction.  
- Test text

## About coc-nasm
- Manufacturing date: The 6<sup>th</sup> of July, 2025 (7/6/2025 - mm/dd/yy).
- Reddit publish date: The 7<sup>th</sup> of July, 2025 (7/7/2025 - mm/dd/yy).
- This package is under MIT License, open-source.
- Maybe it is not the first Netwide Assembler plugin for auto-completion and snippet in the world.
- __However__, it is one of the **strong** plugin for NASM.
- Netwide Assembler does have a lack of good plugins for snippets and auto-completions so that is why coc-nasm needs to be invented.
- coc-nasm has snippets and auto-completions for NASM, but note: This plugin does not support syntax highlighting. You may need them by installing third-party plugins for NASM. Fortunately, vim supports syntax highlighting for that language.
- If you have any problem about this plugin, please fix it by yourself as this product is __NO WARRANTY__. However, I will tell you that my contact information is in contact.txt in GitHub repository.

## Dependencies
Not all the dependencies of the app will be installed via `:CocInstall coc-nasm`, but you also can install them from coc.nvim.
**Firstly**, to make sure that coc-nasm works correctly, after installing, you need to:
- Open a `.nasm` file.
- Make sure you have coc.nvim installed (coc.nvim is invented by neoclide)
(github link: [`coc.nvim`](https://github.com/neoclide/coc.nvim))
__Secondly__, install coc-snippets, as coc-nasm depends much on it:  
```
:CocInstall coc-snippets
```

github link for coc-snippets (coc-snippets is invented by neoclide): [`coc-snippets`](https://github.com/neoclide/coc-snippets)

- Execute this command in vim command mode: 
```
:CocRestart
```
- Reload vim or restart your computer if necessary.  
- Now, as I does not use Neovim's Lua, I cannot support you to install this plugin via ~/.config/nvim/init.lua. If you know how to install this plugin using Lua, I think you will need to think of about the installation by yourself (even this can work on Neovim via Lua).

- __Other suggested plugins for coc-nasm__: 
## Features
coc-nasm has some special words for NASM to use like:
- `printHello` (snippet): Print an example Netwide Assembler program (for Linux, it prints "Hello world");  
- `program` (snippet): Get a basic template of a Netwide Assembler program to start coding faster (if you want to make a library, do not use this snippet);  
- `sum` (snippet): Get a basic example of a function that calculates the sum of 2 integers.  
- `default rel` (auto-completion): Must put this at the 1^st (first) line of the NASM language if you want to create and import a NASM library into C/C++ or in another NASM script.
- `const` (snippet): `equ $-labelname` snippet to calculate the length of a string. Place this right after you have defined byte a string label.
- `pi64` and `pi32` (snippets): Basic pi for 64-bit (pi64) and 32-bit (pi32) architecture.
- `basicoutput` (snippet): Write a basic script to print a variable into stdout (terminal screen). 
- Supports basic NASM commands like `mov`, `lea`, `rep`,...and some registers like `rax`, `rdi`, `rsi`,...
- Supports preprocessors
- You do not need to configure anything in ~/.vimrc (Unix-based Operating System) or ~/_vimrc (Windows)

## Please Note:
- This plugin is created so as to make you write the script faster, not for creating an environment to code NASM language more modern.  
Therefore, I am not going to make a Language Server Protocol (LSP), formatters, IntelliSense, live preview or hot Reload, like modern plugins on VS Code and coc.nvim do.  
- You can use this plugin on Windows, but I recommend you to use this on Linux as I write this plugin on Kali Linux so that I may not know the issue it will happen in Windows Latest Version.
- As NASM does not have many long and new commands, we cannot support all the things like plugins for high-level language. __Please note that NASM is a low-level language so you need to have skills from higher language than it. We strongly recommend that you need to learn how to program C and C++ first__.  
- __Another important thing__ is that I do not want to add the feature that checks and alerts the wrong syntax in your script due to some mistakes must be made for another program running (such as emcc latest version), so if you use it, you need to learn how to debug and maintain your NASM script. Yep, __NO WARRANTY__.
- By the way, I hope that you will help me to __make this plugin better for developers__ in the future. Due to the high difficulty of NASM, that will not be easy to do. However, I will also carry on developing newer version of coc-nasm even no one uses my plugin.  
- I also suggest that you should write some plugins for yourself, especially Assemblers' plugins in general (such as GNU Assembler - GAS).
- As I have searched for NASM plugins, I realize that almost all of VS Code extensions, coc.nvim and many more IDE and plugs do not support NASM language.  
- After reading those articles, I have a question like this:  
___Would you like to write more plugins for programming Assembler languages in the world?___  
- Please answer my question in your mind and come up with your idea if you can. You do not need to send that idea to me.  
  
## See also 
[`who5673-nasm`](https://github.com/Who5673/who5673-nasm) - A plugin which has the benefit is almost like this plugin but for `lazy.nvim`

## My plan in the future
- Making a source code to help people program Object-Oriented Programming in the future.
- Creating a compiler to compile Netwide Assembler to WebAssembly (it is hard, so I can not do it by myself, but no one helps me so I need to it on my own).  

Thank you for using my coc-nasm plugin so much.  

<hr />
Copyright &copy; by who5673. All rights served.  
  
This is an official coc.nvim plugin for NASM (made by who5673).  

## License
MIT
