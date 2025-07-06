"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const coc_nvim_1 = require("coc.nvim");
async function activate(context) {
    console.log('coc-who5673-snippets activated!');
    context.subscriptions.push(coc_nvim_1.languages.registerCompletionItemProvider('coc-nasm', 'nasm', ['nasm'], new NasmCompletionProvider(), ['']));
}
exports.activate = activate;
class NasmCompletionProvider {
    async provideCompletionItems(document, position) {
        return [
            {
                label: 'mov',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Move data from source to destination (mov [destination], [source].)',
            },
            {
                label: 'jmp',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Jump to a label',
            },
            {
                label: 'inc',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Increment operand (inc something = something += 1)',
            },
            {
                label: 'eax',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Register EAX',
            },
            {
                label: 'rax',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Register RAX (needed to call the syscall number or return a value in a function)',
            },
            {
                label: 'rdi',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Register RDI (needed to read the file descriptor of a file (Hint: Terminal screen = stdout = 1))',
            },
            {
                label: 'rsi',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Register RSI',
            },
            {
                label: 'rdx',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Register RDX',
            },
            {
                label: 'rbx',
                kind: coc_nvim_1.CompletionItemKind.Keyword,
                detail: 'Register RBX',
            }
        ];
    }
}
