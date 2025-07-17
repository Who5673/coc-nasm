import {
  ExtensionContext,
  languages,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  Position,
  TextDocument,
} from 'coc.nvim';

function reg(label: string, detail?: string): CompletionItem {
  return {
    label,
    kind: CompletionItemKind.Keyword,
    detail: detail
  }
}

export async function activate(context: ExtensionContext): Promise<void> {
  console.log('coc-who5673-snippets activated!');
  context.subscriptions.push(
    languages.registerCompletionItemProvider(
      'coc-nasm',
      'nasm',
      ['nasm'],
      new NasmCompletionProvider(),
      [''],
    )
  );
}
const nasmInstructions: [string, string][] = [
  ['default', 'This code must be at the first line of the script if you combine with rel in order to compile using gcc/g++ if you extern this from C/C++.'],
  ['neg', 'neg command - compute the absolute value (abs) of a register'],
  ['rel', 'rel command in order to use a relative address of something'],
  ['byte', 'Use this to work with bytes. You can cmp byte using this (example: cmp byte [rdi + rcx], 0).'],
  ['mov', 'Move data from source to destination (mov [dst], [src])'],
  ['lea', 'lea command to work with memory'],
  ['rep', 'Repeat string operation'],
  ['jnz', 'Jump if ZF != 0 (ZF stands for Zero Flag)'],
  ['loop', 'loop = dec and jnz'],
  ['add', 'Add an integer value into a variable/label.\nExample: add rax, 5'],
  ['sub', 'Subtract an integer value into a variable/label.\nExample: sub rax, 2'],
  ['mul', 'Multiply'],
  ['div', 'Divide (unsigned) 2 numbers'],
  ['idiv', 'Divide (signed) 2 numbers'],
  ['int', 'Interrupt'],
  ['ret', 'Return from procedure'],
  ['push', 'Push to stack'],
  ['pop', 'Pop from stack'],
  ['inc', 'Increment 1 unit of a register or memory'],
  ['dec', 'Decrement 1 unit of a register or memory'],
  ['xor', 'Bitwise XOR'],
  ['and', 'Bitwise AND'],
  ['or', 'Bitwise OR'],
  ['div', 'div command'],
  ['not', 'NOT logic operator'],
  ['shl', 'Take the margin from the right to the left (<<). Example: 1 SHL 2'],
  ['shr', 'Take the margin from the left to the right (>>). Example: 8 SHR 1'],
  ['syscall', 'Call the system kernel'],
  ['extern', 'extern a function (normally use for include libraries)'],
  ['align', 'align N in order to make the script faster by initializing N using the common muliple of N, like 16 or 64'],
  ['movsb', 'normally used with rep to copy bytes from one place to another'],
  ['stosb', 'normally used with rep to write bytes from one place to another'],
  ['cmpsb', 'normally used with repne to compare different byte strings'],
  ['repne', 'like rep but used for cmpsb to compare strings'],
  ['MOD', 'Modulus operator'],
  ['sete', 'Compare and initialize a value to a register based on the result of the contition in previous cmp (sete has == operator).\nZF = 1 for this operator.\nZF stands for Zero Flag, SF stands for Sign Flag, OF stands for Overflow Flag, and CF stands for Carry Flag'],
  ['setne', '(setne has != operator) See sete for instructions for setxx.\nZF = 0'],
  ['setg', '(setg has > operator) See sete for setxx instructions.\nZF = 0 and SF = OF'],
  ['setge', '(setge has >= operator) See sete for setxx instructions.\nSF = OF'],
  ['setl', '(setl has < operator) See sete for setxx instructions.\nSF != OF'],
  ['setle', '(sele has <= operator) See sete for setxx instructions.\nZF = 1 or SF != OF'],
  ['seta', '(unsigned > operator, unsigned means that you want to compare the absolute (abs) value of 2 variables/labels) See sete for setxx instructions.\nCF = 0, ZF = 0'],
  ['setb', '(unsigned < operator) See sete for setxx instructions and seta for unsigned instructions.\nCF = 1'],
  ['setae', '(unsigned <= operator) See sete for setxx instructions and seta for unsigned instructions.\nCF = 0'],
  ['setbe', '(unsigned <= operator) See sete for setxx instructions and seta for unsigned instructions.\nCF = 1 or ZF = 1'],
  ['sets', 'Is the value less than 0?\nSF = 1'],
  ['setns', 'Is the value a nature number that is greater than 0?\nSF = 0'],
  ['seto', 'Do any overflows appear?\nOF = 1'],
  ['setno', 'Don\'t any overflows appear?\nOF = 0'],
  ['setc', 'Does the comparison have any carry flags?\nCF = 1'],
  ['setnc', 'Doesn\'t the comparison have any carry flags?\nCF = 0'],
  ['setz', 'Is that value/comparison equal to 0?\nZF = 1 (sete)'],
  ['setnz', 'Isn\'t that value/comparison equal to 0?\nZF = 0 (setne)'],
  ['setp', 'Parity even bit memory?\nPF = 1'],
  ['setnp', 'Parity odd bit memory?\nPF = 0'],

  // Registers:
  // 64-bit:
  ['rax', 'Register RAX'], ['rbx', 'Register RBX'], ['rcx', 'Register RCX'], ['rdx', 'Register RDX'],
  ['rsi', 'Register RSI'], ['rdi', 'Register RDI'], ['rsp', 'Register RSP'], ['rbp', 'Register RBP'],
  ['r8', 'Register R8'], ['r9', 'Register R9'], ['r10', 'Register R10'], ['r11', 'Register R11'],
  ['r12', 'Register R12'], ['r13', 'Register R13'], ['r14', 'Register R14'], ['r15', 'Register R15'],

  // 32-bit
  ['eax', 'Register EAX'], ['ebx', 'Register EBX'], ['ecx', 'Register ECX'], ['edx', 'Register EDX'],
  ['esi', 'Register ESI'], ['edi', 'Register EDI'], ['esp', 'Register ESP'], ['ebp', 'Register EBP'],
  ['r8d', 'Register R8D'], ['r9d', 'Register R9D'], ['r10d', 'Register R10D'], ['r11d', 'Register R11D'],
  ['r12d', 'Register R12D'], ['r13d', 'Register R13D'], ['r14d', 'Register R14D'], ['r15d', 'Register R15D'],

  // 16-bit
  ['ax', 'Register AX'], ['bx', 'Register BX'], ['cx', 'Register CX'], ['dx', 'Register DX'],
  ['si', 'Register SI'], ['di', 'Register DI'], ['sp', 'Register SP'], ['bp', 'Register BP'],
  ['r8w', 'Register R8W'], ['r9w', 'Register R9W'], ['r10w', 'Register R10W'], ['r11w', 'Register R11W'],
  ['r12w', 'Register R12W'], ['r13w', 'Register R13W'], ['r14w', 'Register R14W'], ['r15w', 'Register R15W'],

  // 8-bit (High and Low)
  ['al', 'Register AL'], ['ah', 'Register AH'], ['bl', 'Register BL'], ['bh', 'Register BH'],
  ['cl', 'Register CL'], ['ch', 'Register CH'], ['dl', 'Register DL'], ['dh', 'Register DH'],
  ['spl', 'Register SPL'], ['bpl', 'Register BPL'], ['sil', 'Register SIL'], ['dil', 'Register DIL'],
  ['r8b', 'Register R8B'], ['r9b', 'Register R9B'], ['r10b', 'Register R10B'], ['r11b', 'Register R11B'],
  ['r12b', 'Register R12B'], ['r13b', 'Register R13B'], ['r14b', 'Register R14B'], ['r15b', 'Register R15B'],

  // Segment Registers
  ['cs', 'Register CS (Code Segment)'], ['ds', 'Register DS (Data Segment)'],
  ['ss', 'Register SS (Stack Segment)'], ['es', 'Register ES (Extra Segment)'],
  ['fs', 'Register FS'], ['gs', 'Register GS'],

  // Flags 
  // ['eflags', 'EFLAGS Register'],
  // ['rflags', 'RFLAGS Register'],
  // Some important sections:
  ['.data', '.data section'],
  ['.bss', '.bss section for creating uninitialized memory'],
  ['.text', '.text section'],
  ['_start', '_start main function'],
  ['section', 'define a section'],
  ['global', 'global a function'],
  ['.bss', '.bss section (used to define buffers)'],
  ['db', 'Define byte (1 byte, for chars, strings, short numbers,...)'],
  ['dw', 'Define word (2 bytes, for 16-bit short int)'],
  ['dd', 'Define double word (4 bytes, for 32-bit int)'],
  ['dq', 'Define quad word (8 bytes, for 64-bit int)'],
  ['dt', 'Define ten bytes (10 bytes, for extended real numbers, x87 float)'],
  ['resb', 'uninitialized n bytes'],
  ['resw', 'uninitialized n words (2n bytes)'],
  ['resd', 'uninitialized n double words (4n bytes)'],
  ['resq', 'uninitialized n quad word (8n bytes)'],
  ['equ', 'define a constant'],
  ['msg', 'popular word for label'],
  ['buffer', 'popular word for buffer'],
  ['len', 'popular word for string length'],
];

class NasmCompletionProvider implements CompletionItemProvider {
  async provideCompletionItems(
    document: TextDocument,
    position: Position
  ): Promise<CompletionItem[]> {
    return nasmInstructions.map(([label, detail]) => ({
      label,
      kind: CompletionItemKind.Keyword,
      detail,
    }));
  }
}
