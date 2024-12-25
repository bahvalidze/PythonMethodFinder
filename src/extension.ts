import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.findMethods', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('Open a Python file to search for methods!');
            return;
        }

        const text = editor.document.getText();
        
        const functionRegex = /def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
        const methodsRegex = /def\s+([a-zA-Z_][a-zA0-9_]*)\s*\(self/g;

        const functions: { name: string, position: vscode.Position }[] = [];
        const methods: { name: string, position: vscode.Position }[] = [];
        let match;

        while ((match = functionRegex.exec(text)) !== null) {
            const position = editor.document.positionAt(match.index);
            if (match[0].includes('self')) {
                methods.push({ name: match[1], position });
            } else {
                functions.push({ name: match[1], position });
            }
        }

        if (functions.length === 0 && methods.length === 0) {
            vscode.window.showInformationMessage('No methods or functions found!');
            return;
        }

        const items: vscode.QuickPickItem[] = [];

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

export function deactivate() {}
