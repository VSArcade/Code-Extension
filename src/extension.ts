import * as vscode from 'vscode';
import { TextBreakdown } from './TextBreakdown';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('vsarcade.textBreakdown', () => {

			TextBreakdown.createOrShow(context.extensionUri);

			const currentEditor = vscode.window.activeTextEditor;
			let code = [];

			if (currentEditor) {
				const document = currentEditor.document;
				
				const endLine = document.lineCount;
				for (let i = 0; i < endLine; i++) {
					code.push(document.lineAt(i).text);
				}
			}

			TextBreakdown.currentPanel?.refactor({
				eventType: 'init',
				eventInfo: {
					gameType: 'breakout',
					styles: {
						background: ''
					},
					code: code
				}
			});

		})
	);

}

export function deactivate() { }
