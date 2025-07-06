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
      }
    ];
  }
}
