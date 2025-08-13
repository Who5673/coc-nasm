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
  // Data types
  ['byte', 'Use this to work with bytes. You can cmp byte using this (example: cmp byte [rdi + rcx], 0).'],
  ['word', "word data type (2 bytes = 16 bits).\nC-type relation: short int.\nSigned range: -32768 to +32767.\nUnsigned range: 0 to +65535"],
  ["dword", "dword data type (4 bytes = 32 bits).\nC-type relation: int, long int, float.\nSigned range (int): -2_147_483_648 to +2_147_483_647.\nUnsigned range (int): 0 to +4_294_967_296"],
  ["qword", "qword data type (8 bytes = 64 bits).\nC-type relation: long long int, double.\nSigned range (long long int): -9_223_372_036_854_775_808 to +9_223_372_036_854_775_807.\nUnsigned range (long long int): 0 to +18_446_744_073_709_551_615"],
  ["tword", "tword data type (10 bytes = 80 bits).\nC-type relation: long double."],
  ["oword", "(LARGE, FOR SSE) oword data type (16 bytes = 128 bits)"],
  ["yword", "(ULTRA LARGE, FOR AVX) yword data type (32 bytes = 256 bits)"],
  ["zword", "(SUPER LARGE, FOR AVX-512) zword data type (64 bytes = 512 bits)"],
  // movs
  ['mov', 'Move data from source to destination (mov [dst], [src])'],
  ['movsb', "Move 1-byte data from src to dest, same with `mov byte`.\nExample:\n\ncld          ; clear direction flag\nrep movsb    ; copy RCX bytes from [RSI] to [RDI]"],
  ['movsw', "Move 2-byte data from src to dest, same with `mov word`"],
  ['movsd', "Move 4-byte data from src to dest, same with `mov dword`"],
  ['movsq', "Move 8-byte data from src to dest, same with `mov qword`"],
  ['movst', "Move 10-byte data from src to dest, same with `mov tword`"],
  ['movso', "FOR SSE. Move 16-byte data from src to dest, same with `mov oword`"],
  ['movsy', "FOR AVX. Move 32-byte data from src to dest, same with `mov yword`"],
  ["movsz", "FOR AVX-512. Move 64-byte data from src to dest, same with `mov zword`"],
  ['lea', 'lea command to work with memory'],
  ['rep', 'Repeat string operation'],
  ['jnz', 'Jump if ZF != 0 (ZF stands for Zero Flag)'],
  ['jz', 'Jump if ZF == 0 (ZF stands for Zero Flag)'],
  ['test', 'test command'],
  ['loop', 'loop = dec and jnz'],
  ['add', 'Add an integer value into a variable/label.\nExample: add rax, 5'],
  ['sub', 'Subtract an integer value into a variable/label.\nExample: sub rax, 2'],
  ['mul', 'Multiply'],
  ['div', 'Divide (unsigned) 2 numbers'],
  ['idiv', 'Divide (signed) 2 numbers'],
  ['int', 'Interrupt'],
  ['cli', "Clear interrupt"],
  ['hlt', "(Halt) Wait for the hardware signal, does not spin CPU"],
  ['bits', "bits command"],
  ['ret', 'Return from procedure'],
  ['leave', "Cleans the stack frame and restore the previous value (which is initialized before entering)"],
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
  ['alignb', 'align N in order to make the script faster by initializing N using the common muliple of N, like 16 or 64'],
  ['align', `
align N           ; align on N-byte boundary (common values: 4, 16, 64)
align 8,db 0x0a   ; pad with 0x0As rather than NOPs
align 16,resz 1   ; align to 16 zword in the BSS section, zword 512-bit
`],
  ["sectalign", `
This align macro can be used at any time. For example:

SECTALIGN 16    ; Sets the section alignment requirements to 16 bytes
                ; Once increased it can not be decreased, the magnitude may grow only.

You can turn ON or OFF this alignment.
  `],
  ["on", "Turn on the SECTALIGN"],
  ["off", "Turn off the SECTALIGN"],
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
  ['rax', 'Register RAX (caller-saved).\nOpcode 64-bit: 48 B8 XX XX XX XX XX XX XX XX.\nOpcode 32-bit: 48 C7 C0 XX XX XX XX.\n(XX is little-endian immediate).'],
  ['rcx', 'Register RCX (caller-saved).\nOpcode 64-bit: 48 B9 XX...\nOpcode 32-bit: 48 C7 C1 XX...'],
  ['rdx', 'Register RDX (caller-saved).\nOpcode 64-bit: 48 BA XX...\nOpcode 32-bit: 48 C7 C2 XX...'],
  ['rbx', 'Register RBX (caller-saved).\nOpcode 64-bit: 48 BB XX...'],
  ['rsp', 'Register RSP (caller-saved).\nOpcode 64-bit: 48 BC XX...'],
  ['rbp', 'Register RBP (caller-saved).\nOpcode 64-bit: 48 BD XX...'],
  ['rsi', 'Register RSI (caller-saved).\nOpcode 64-bit: 48 BE XX...'],
  ['rdi', 'Register RDI (caller-saved).\nOpcode 64-bit: 48 BF XX...'],
  ['r8', 'Register R8 (caller-saved, REX.B = 1).\nOpcode 64-bit: 49 B8 XX...'],
  ['r9', 'Register R9 (caller-saved, REX.B = 1).\nOpcode 64-bit: 49 B9 XX...'],
  ['r10', 'Register R10 (caller-saved, REX.B = 1).\nOpcode 64-bit: 49 BA XX...'],
  ['r11', 'Register R11 (caller-saved, REX.B = 1).\nOpcode 64-bit: 49 BB XX...'],
  ['r12', 'Register R12 (callee-saved, REX.B = 1).\nOpcode 64-bit: 49 BC XX...'],
  ['r13', 'Register R13 (callee-saved, REX.B = 1).\nOpcode 64-bit: 49 BD XX...'],
  ['r14', 'Register R14 (callee-saved, REX.B = 1).\nOpcode 64-bit: 49 BE XX...'],
  ['r15', 'Register R15 (callee-saved, REX.B = 1).\nOpcode 64-bit: 49 BF XX...'],

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
  [".nolist", ".nolist for disabling listing expansion"],
  ['_start', '_start main function'],
  ['section', 'define a section'],
  ['global', 'global a function'],
  ['.bss', '.bss section (used to define buffers)'],
  ['times', 'Create multiple times of a definding action.\nExample: buffer times 20 db 0xA    ; 20 line feeds (line feed = 10(dec) = 0xA(hex)'],
  ['db', 'Define byte (1 byte, for chars, strings, short numbers,...). C-type relation: char'],
  ['dw', 'Define word (2 bytes, for 16-bit short int). C-type relation: short int'],
  ['dd', 'Define double word (4 bytes, for 32-bit int and float). C-type relation: long int, int, float'],
  ['dq', 'Define quad word (8 bytes, for 64-bit int and double). C-type relation: long long int, double'],
  ['dt', 'Define ten bytes (10 bytes, for extended real numbers, x87 float). C-type relation: long double (80-bit)'],
  ['do', 'Define oword (16 bytes, for SSE, available from NASM >=2.15).'],
  ['dy', 'Define a yword (32 bytes, for AVX, available from NASM >=2.15).'],
  ['dz', 'Define a zword (64 bytes, for AVX-512, available from NASM >=2.15).'],
  ['resb', 'uninitialized n bytes'],
  ['resw', 'uninitialized n words (2n bytes)'],
  ['resd', 'uninitialized n double words (4n bytes)'],
  ['resq', 'uninitialized n quad words (8n bytes)'],
  ['rest', 'uninitialized n ten bytes (10n bytes)'],
  ['reso', 'uninitialized n owords (16n bytes)'],
  ['resy', 'uninitialized n ywords (32n bytes)'],
  ['resz', 'uninitialized n ywords (64n bytes)'],
  ['equ', 'define a constant'],
  ['msg', 'popular word for label'],
  ['buffer', 'popular word for buffer'],
  ['len', 'popular word for string length'],
  ['incbin', 'Include an external binary file.\nSyntax: incbin "file",skip(optional),include(optional).\nExample: incbin "example.dat",356,16 is including example.dat, also skipping the first 356 bytes and including at most 16 bytes'],
  // Float commands:
  ["fld", "Load float value onto FPU stack"],
  ["fild", "Load integer as float onto Floating Point Unit (FPU) stack"],
  ["fst", "Store float value from FPU stack (without pop)"],
  ["fstp", "Store float value from FPU stack (and pop)"],
  ["fist", "Store FPU float as integer (without pop)"],
  ["fistp", "Store FPU float as integer (and pop)"],
  ["fadd", "Add float (st(0) + source)"],
  ["fsub", "Subtract float (st(0) - source)"],
  ["fsubr", "Reverse subtract (source - st(0))"],
  ["fmul", "Multiply float (st(0) * source)"],
  ["fdiv", "Divide float (st(0) / source)"],
  ["fdivr", "Reverse divide (source / st(0))"],
  ["frndint", "Round st(0) to an integer (based on current FPU rounding mode)"],
  ["fist", "Store st(0) as integer (truncate/floor depending on mode)"],
  ["fistp", "Store st(0) as integer and pop the FPU stack"],
  ["fldcw", "Load a value into FPU control word so as to change how FPU deals with the floating point number (rounding numbers, accuracy, handle exceptions,...).\nSyntax: fldcw [mem16]"],
  ["__?NASM_VERSION_ID?__", "Returns Netwide Assembler version ID (dword integer)"],
  ["__?NASM_VER?__", "Returns Netwide Assembler current version inside a script (bytes data)"],
  ["__?FILE?__", "Returns the name of the input file"],
  ["__?LINE?__", "Returns the number of current line in a file"],
  ["__?BITS?__", `
Return the current code generation mode.
Current code generation mode can be defined by using BITS command:

BITS 16    ; Code generation: 16-bit mode (great for making a BOOTLOADER).

`],
  ["__?OUTPUT_FORMAT?__", `
Returns the format type of the file.
Format type of the file can be given using the parameter -f to assemble a file into an object file (.obj in Windows, .o in Linux distros). For instance:

nasm -f elf64 main.nasm -o main.o   # Format can be elf64, win64, elf32, win32, bin,..., which depends on the Instruction Set Architecture of a hardware device.

So that the macro returns "elf64" value.
  `],
  ["__?DEBUG_FORMAT?__", `
If the debug format is enabled, it returns the debug format.
Otherwise, it returns "null".

The debug format can be found using -F and -g option. Type nasm -f output y for a list.
  `],

  /* Date and time macros */
  ["__?DATE?__", "Returns the assembly DATE as strings in ISO 8601 format (YYYY-MM-DD)"],
  ["__?TIME?__", "Returns the assembly TIME as strings in ISO 8601 format (HH:MM:SS)"],
  ["__?DATE_NUM?__", "Returns the assembly DATE in numeric form (YYYYMMDD)"],
  ["__?TIME_NUM?__", "Returns the assembly TIME in numeric form (HHMMSS)"],
  ["__?UTC_DATE?__", "Gives the assembly DATE in universal time (UTC) as strings, in ISO 8681 format (YYYY-MM-DD)"],
  ["__?UTC_TIME?__", "Gives the assembly TIME in universal time (UTC) as strings, in ISO 8681 format (HH:MM:SS)"],
  ["__?POSIX_TIME?__", `
Returns the POSIX TIME (qword integer).

What is POSIX TIME?
- POSIX TIME is a number of seconds that has been from the first of January in 1970 at 00:00:00 UTC.
- Calculate the POSIX TIME (unit: seconds):

  POSIX_TIME = current_time - 1970-01-01 00:00:00 (s)

- POSIX TIME helps us compare the time super fast as we only need to compare 2 different integers.
- It is also easy to calculate the seconds to make a new time.
- That time is great for the sync between UNIX-like system.

Expire time (YYYY-MM-DD):
- dword (32-bit): 2038-01-19 (Year 2038 problem).
- qword (64-bit): about the year ~200 000 000 000.
  `],
  ["__?PASS?__", `
Assembly pass.

This macro defined to be 1 on preparatory passes, and 2 on the final pass. In preprocess-only mode, it is set to 3.  
When running only to generate dependencies (because of the -M or -MG option), it is set to 0.  

It is strongly recommended to avoid using this macro if at all possible. It is tremendously easy to generate very strange errors by misusing it, and the semantics may change in future versions of NASM.
  `],
  ["__?ALIGNMODE?__", "Returns the align mode"],
  ["altreg", `
Alternate Register Names  

Provides numeric register names for all registers. For example:
r0l -> al
r0h -> ah
r1l -> cl
r1h -> ch
r2l -> dl
r2h -> dh
r3l -> bl
r3h -> bh
`],
  ["smartalign", `
# Smart ALIGN macro

Provides align modes:
- generic: (default) Works on all x86 CPU. Default jump threshold: 8;
- nop: Pad out with NOP instructions. Default jump threshold: 16;
- k7: Optimize for the AMD K7 (Athlon/Althon XP). Works on all x86 CPU. Default jump threshold: 16;
- k8: Optimize for the AMD K8 (Opteron/Althon X64). Works on all x86 CPU. Default jump threshold: 16;
- p6: Optimize for Intel CPUs. This is ncompatible with all CPUs of family 5 or lower. The default jump threshold is 16;

  `],
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
