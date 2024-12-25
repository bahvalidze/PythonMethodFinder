"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.findMethods', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Open a Python file to search for methods!');
            return;
        }
        const text = editor.document.getText();
        const functionRegex = /def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*?)\)/g;
        const functions = [];
        const methods = [];
        let match;
        while ((match = functionRegex.exec(text)) !== null) {
            const position = editor.document.positionAt(match.index);
            const functionName = match[1];
            const argumentsList = match[2] || '';
            if (argumentsList.includes('self')) {
                methods.push({ name: functionName, position });
            }
            else {
                functions.push({ name: functionName, position });
            }
        }
        if (functions.length === 0 && methods.length === 0) {
            vscode.window.showInformationMessage('No methods or functions found!');
            return;
        }
        const items = [];
        if (functions.length > 0) {
            items.push({ label: 'Functions', description: '' });
            functions.forEach(func => items.push({ label: func.name }));
        }
        if (methods.length > 0) {
            items.push({ label: 'Methods', description: '' });
            methods.forEach(method => items.push({ label: method.name }));
        }
        vscode.window.showQuickPick(items, { placeHolder: 'Select a function or method' })
            .then(selection => {
            if (selection) {
                const selectedFunction = functions.find(f => f.name === selection.label);
                const selectedMethod = methods.find(m => m.name === selection.label);
                let selectedItem = selectedFunction || selectedMethod;
                if (selectedItem) {
                    const line = selectedItem.position.line;
                    const range = new vscode.Range(line, 0, line, editor.document.lineAt(line).text.length);
                    editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
                    editor.selection = new vscode.Selection(range.start, range.end);
                }
            }
        });
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
