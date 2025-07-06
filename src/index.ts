import { 
  ExtensionContext,
  languages,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  Position,
  TextDocument,
  CancellationToken,
  CompletionContext,
  CompletionList,
  ProviderResult,
} from 'coc.nvim';

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

class NasmCompletionProvider implements CompletionItemProvider {
  async provideCompletionItems(
    document: TextDocument,
    position: Position
  ): Promise<CompletionItem[]> {
    return [
      {
        label: 'mov',
        kind: CompletionItemKind.Keyword,
        detail: 'Move data from source to destination (mov [destination], [source].)',
      },
      {
        label: 'jmp',
        kind: CompletionItemKind.Keyword,
        detail: 'Jump to a label',
      },
      {
        label: 'jnz',
        kind: CompletionItemKind.Keyword,
        detail: 'Jump to a label if ZF != 0',
      },
      {
        label: 'syscall',
        kind: CompletionItemKind.Keyword,
        detail: "Call the system or (or and) kernel"
      },
      {
        label: 'inc',
        kind: CompletionItemKind.Keyword,
        detail: 'Increment operand (inc something = something += 1)',
      },
      {
        label: 'eax',
        kind: CompletionItemKind.Keyword,
        detail: 'Register EAX',
      },
      {
        label: 'rax',
        kind: CompletionItemKind.Keyword,
        detail: 'Register RAX (needed to call the syscall number or return a value in a function)',
      },
      {
        label: 'rdi',
        kind: CompletionItemKind.Keyword,
        detail: 'Register RDI (needed to read the file descriptor of a file (Hint: Terminal screen = stdout = 1))',
      },
      {
        label: 'rsi',
        kind: CompletionItemKind.Keyword,
        detail: 'Register RSI',
      },
      {
        label: 'rdx',
        kind: CompletionItemKind.Keyword,
        detail: 'Register RDX',
      },
      {
        label: 'rbx',
        kind: CompletionItemKind.Keyword,
        detail: 'Register RBX',
      },
      {
        label: 'add',
        kind: CompletionItemKind.Keyword,
        detail: 'Add a value into a target (example: add [target], 2 means [target] += 2).\nTarget can be a register.',
      },
      {
        label: 'sub',
        kind: CompletionItemKind.Keyword,
        detail: 'Subtract a value into a target (example: sub [target], 2 means [target] += 2).',
      },
      {
        label: 'db',
        kind: CompletionItemKind.Keyword,
        detail: 'Define byte a value (1 byte) for a character, array of characters or short numbers',
      },
      {
        label: 'dw',
        kind: CompletionItemKind.Keyword,
        detail: 'Define word (2 bytes) for 16-bit short int',
      },
      {
        label: 'dd',
        kind: CompletionItemKind.Keyword,
        detail: 'Define double word (4 bytes) for 32-bit int',
      },
      {
        label: 'dq',
        kind: CompletionItemKind.Keyword,
        detail: 'Define quad word (8 bytes) for 64-bit int',
      },
      {
        label: 'dt',
        kind: CompletionItemKind.Keyword,
        detail: 'Define ten bytes (10 bytes) for extended real number (x87 float)'
      },
      {
        label: 'equ',
        kind: CompletionItemKind.Keyword,
        detail: 'Define a constant',
      },
      {
        label: '.data',
        kind: CompletionItemKind.Keyword,
        detail: '.data section for defining some labels',
      },
      {
        label: '.text',
        kind: CompletionItemKind.Keyword,
        detail: '.text section',
      },
      {
        label: '.bss',
        kind: CompletionItemKind.Keyword,
        detail: '.bss section for creating a memory for reading (buffer)',
      },
      {
        label: 'resb',
        kind: CompletionItemKind.Keyword,
        detail: 'Define and use memory for non-initialized data (avoid buffer overflow while reading something)',
      },
      {
        label: 'global',
        kind: CompletionItemKind.Keyword,
        detail: 'Global a label of a program (example: global _start)',
      },
      {
        label: '_start',
        kind: CompletionItemKind.Keyword,
        detail: 'The label for nasm to start the program.'
      }
    ];
  }
}
