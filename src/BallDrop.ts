import * as vscode from "vscode";
import { Panel } from "./Panel";

export class BallDrop extends Panel {

    private static getHtml(obj: any) {
        const {stylesheetUri, scriptUri, nonce} = obj;
        return `<!DOCTYPE HTML 5.13.14>
        <html>
        <head>
        <link type="text/css" rel="stylesheet" 
        href="${stylesheetUri}">
        <title>Ball Drop</title>
        </head>
        <body>
        <table>
            <tr>
                <td colspan="2"><h1 style="text-align:center">Ball Drop</h1></td>
                <td><h1>Score: </h1></td>
                <td><h1 id="score">0</h1></td>
            </tr>
        </table>
        <div id="screen" class="screen">
            <div id="ball" class="ball"></div>
            <div id="brick" class="brick"></div>
            <div id="gameover"></div>
        </div>
        <br>
        <div class="box">
        <table>
            <tr>
                <td><button onclick='movedown()'><b>Start Game</b></button></td>
                <td><button id="reset" onclick='reset()'><b>Reset</b></button></td>
            </tr>
        </table>
        </div>
        <script src="${scriptUri}" nonce="${nonce}"></script>
        </body>
        </html>
            `;
    }

    public static createOrShow(extensionUri: vscode.Uri) {
        super.createOrShow(extensionUri, "balldrop-style.css", "BallDrop.js", BallDrop.getHtml);
    }

}