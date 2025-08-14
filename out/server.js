#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
// Valid registers
const validRegs = [
    // 64-bit registers
    'rax', 'rbx', 'rcx', 'rdx',
    'rsi', 'rdi', 'rsp', 'rbp',
    'r8', 'r9', 'r10', 'r11',
    'r12', 'r13', 'r14', 'r15',
    // 32-bit registers
    'eax', 'ebx', 'ecx', 'edx',
    'esi', 'edi', 'esp', 'ebp',
    'r8d', 'r9d', 'r10d', 'r11d',
    'r12d', 'r13d', 'r14d', 'r15d',
    // 16-bit registers
    'ax', 'bx', 'cx', 'dx',
    'si', 'di', 'sp', 'bp',
    'r8w', 'r9w', 'r10w', 'r11w',
    'r12w', 'r13w', 'r14w', 'r15w',
    // 8-bit registers (high and low)
    'al', 'ah', 'bl', 'bh',
    'cl', 'ch', 'dl', 'dh',
    'sil', 'dil', 'spl', 'bpl',
    'r8b', 'r9b', 'r10b', 'r11b',
    'r12b', 'r13b', 'r14b', 'r15b',
    // Segment registers
    'cs', 'ds', 'ss', 'es',
    'fs', 'gs',
];
connection.onInitialize((_params) => {
    return {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental
        }
    };
});
function validateTextDocument(textDocument) {
    const text = textDocument.getText().split(/\r?\n/);
    const diagnostics = [];
    for (let i = 0; i < text.length; i++) {
        const line = text[i].trim();
        if (line === "" || line.startsWith(";"))
            continue;
        if (line.startsWith("mov")) {
            const match = line.match(/^mov\s+([^,]+)\s*,\s*(.+)$/);
            if (!match) {
                diagnostics.push({
                    severity: node_1.DiagnosticSeverity.Error,
                    range: {
                        start: { line: i, character: 0 },
                        end: { line: i, character: line.length }
                    },
                    message: "Invalid mov syntax, expected: mov <reg>, <imm>",
                    source: "who5673-nasm-lsp"
                });
            }
            else {
                const reg = match[1].trim();
                const imm = match[2].trim();
                if (!validRegs.includes(reg)) {
                    diagnostics.push({
                        severity: node_1.DiagnosticSeverity.Error,
                        range: {
                            start: { line: i, character: 0 },
                            end: { line: i, character: reg.length }
                        },
                        message: `Unknown register: ${reg}`,
                        source: "who5673-nasm-lsp"
                    });
                }
                if (!/^\d+$/.test(imm)) {
                    diagnostics.push({
                        severity: node_1.DiagnosticSeverity.Error,
                        range: {
                            start: { line: i, character: line.indexOf(imm) },
                            end: { line: i, character: line.indexOf(imm) + imm.length }
                        },
                        message: `Immediate must be a number: ${imm}`,
                        source: "who5673-nasm-lsp"
                    });
                }
            }
        }
        else {
            diagnostics.push({
                severity: node_1.DiagnosticSeverity.Error,
                range: {
                    start: { line: i, character: 0 },
                    end: { line: i, character: line.length }
                },
                message: `Unknown instruction: ${line.split(/\s+/)[0]}`,
                source: "who5673-nasm-lsp"
            });
        }
    }
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}
documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
});
documents.listen(connection);
connection.listen();
