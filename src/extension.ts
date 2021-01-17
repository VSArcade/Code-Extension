import { strict } from 'assert';
import * as vscode from 'vscode';
import { BallDrop } from './BallDrop';
import { TextBreakdown } from './TextBreakdown';

export function activate(context: vscode.ExtensionContext) {

	function getCode() {
		const currentEditor = vscode.window.activeTextEditor;
		let code = [];

		if (currentEditor) {
			const document = currentEditor.document;

			const endLine = document.lineCount;
			for (let i = 0; i < endLine; i++) {
				code.push(document.lineAt(i).text);
			}
		}

		return code;

	}

	context.subscriptions.push(
		vscode.commands.registerCommand('vsarcade.textBreakdown', () => {

			const currentEditor = vscode.window.activeTextEditor;
			if(!currentEditor) {
				vscode.window.showInformationMessage("Must have an active text editor to play VS Arcade Textbreakdown!");
				return;
			}

			TextBreakdown.createOrShow(context.extensionUri);

			let code = getCode();

			TextBreakdown.currentPanel?.refactor({
				eventType: 'init',
				eventInfo: {
					gameType: 'breakout',
					styles: {
						background: ''
					},
					code
				}
			});

		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vsarcade.balldrop', () => {

			vscode.window.showInformationMessage("This command is still in its beta, non-functional screen");
			return;

			BallDrop.createOrShow(context.extensionUri);

			let code = getCode();
			BallDrop.currentPanel?.refactor({ code });
		})
	);

}

export function deactivate() { }
