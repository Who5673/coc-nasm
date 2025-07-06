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
  ['mov', 'Move data from source to destination (mov [dst], [src])'],
  ['lea', 'lea command to work with memory'],
  ['rep', 'Repeat string operation'],
  ['jnz', 'Jump if not zero'],
  ['add', 'Add integers'],
  ['sub', 'Subtract integers'],
  ['mul', 'Multiply'],
  ['div', 'Divide'],
  ['int', 'Interrupt'],
  ['call', 'Call procedure'],
  ['ret', 'Return from procedure'],
  ['push', 'Push to stack'],
  ['pop', 'Pop from stack'],
  ['inc', 'Increment'],
  ['dec', 'Decrement'],
  ['xor', 'Bitwise XOR'],
  ['and', 'Bitwise AND'],
  ['or', 'Bitwise OR'],
  ['syscall', 'Call the system kernel'],
  ['extern', 'extern a function (normally use for include libraries)'],
  // Registers:
  ['rax', 'Register RAX'], ['rbx', 'Register RBX'], ['rcx', 'Register RCX'], ['rdx', 'Register RDX'],
  ['rsi', 'Register RSI'], ['rdi', 'Register RDI'], ['rsp', 'Register RSP'], ['rbp', 'Register RBP'],
  ['r8',  'Register R8'],  ['r9',  'Register R9'],  ['r10', 'Register R10'], ['r11', 'Register R11'],
  ['r12', 'Register R12'], ['r13', 'Register R13'], ['r14', 'Register R14'], ['r15', 'Register R15'],

  // 32-bit
  ['eax', 'Register EAX'], ['ebx', 'Register EBX'], ['ecx', 'Register ECX'], ['edx', 'Register EDX'],
  ['esi', 'Register ESI'], ['edi', 'Register EDI'], ['esp', 'Register ESP'], ['ebp', 'Register EBP'],
  ['r8d', 'Register R8D'], ['r9d', 'Register R9D'], ['r10d','Register R10D'],['r11d','Register R11D'],
  ['r12d','Register R12D'],['r13d','Register R13D'],['r14d','Register R14D'],['r15d','Register R15D'],

  // 16-bit
  ['ax', 'Register AX'], ['bx', 'Register BX'], ['cx', 'Register CX'], ['dx', 'Register DX'],
  ['si', 'Register SI'], ['di', 'Register DI'], ['sp', 'Register SP'], ['bp', 'Register BP'],
  ['r8w', 'Register R8W'], ['r9w', 'Register R9W'], ['r10w','Register R10W'],['r11w','Register R11W'],
  ['r12w','Register R12W'],['r13w','Register R13W'],['r14w','Register R14W'],['r15w','Register R15W'],

  // 8-bit (High and Low)
  ['al', 'Register AL'], ['ah', 'Register AH'], ['bl', 'Register BL'], ['bh', 'Register BH'],
  ['cl', 'Register CL'], ['ch', 'Register CH'], ['dl', 'Register DL'], ['dh', 'Register DH'],
  ['spl','Register SPL'], ['bpl','Register BPL'], ['sil','Register SIL'], ['dil','Register DIL'],
  ['r8b', 'Register R8B'], ['r9b', 'Register R9B'], ['r10b','Register R10B'],['r11b','Register R11B'],
  ['r12b','Register R12B'],['r13b','Register R13B'],['r14b','Register R14B'],['r15b','Register R15B'],

  // Segment Registers
  ['cs', 'Register CS (Code Segment)'], ['ds', 'Register DS (Data Segment)'],
  ['ss', 'Register SS (Stack Segment)'], ['es', 'Register ES (Extra Segment)'],
  ['fs', 'Register FS'], ['gs', 'Register GS'],

  // Flags (nếu bạn muốn thêm về sau)
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
