import * as vscode from "vscode";
import { Panel } from "./Panel";

export class TextBreakdown extends Panel {

    private static getHtml(obj: any) {

        const {cspSource, stylesheetUri, nonce, scriptUri} = obj;
         
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${cspSource}; ">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="${stylesheetUri}" rel="stylesheet">
            <script nonce="${nonce}"></script>
			</head>
            <body id="target">
                <canvas id="game-canvas" width="700" height="700"></canvas>
            </body>
            <script src="${scriptUri}" nonce="${nonce}"></script>
        </html>`;


    }

    public static createOrShow(extensionUri: vscode.Uri) {
        super.createOrShow(extensionUri, "style.css", "bundle.js", TextBreakdown.getHtml);
    }
}