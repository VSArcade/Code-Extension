import { Func } from "mocha";
import * as vscode from "vscode";

export class Panel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: Panel | undefined;

    public static readonly viewType = "hello";

    private readonly _styleUri: string;
    private readonly _scriptUri: string;
    private readonly _getHtml: ((arg: any) => string);
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    // creating or showing the panel
    public static createOrShow(extensionUri: vscode.Uri, styleUri: string, scriptUri: string, getHtml: ((arg: any) => string)) {
        // is there an active text editor going on rn?
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        if (Panel.currentPanel) {
            Panel.currentPanel._panel.reveal(column);
            Panel.currentPanel._update();
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            Panel.viewType,
            "VSArcade - Breakout",
            column || vscode.ViewColumn.One,
            {
                // Enable javascript in the webview
                enableScripts: true,

                // And restrict the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, "media"),
                    vscode.Uri.joinPath(extensionUri, "out"),
                ],
            }
        );

        Panel.currentPanel = new Panel(panel, extensionUri, styleUri, scriptUri, getHtml);
    }

    public refactor(msg: Object) {
        this._panel.webview.postMessage(msg);
    }

    // killing the panel
    public static kill() {
        Panel.currentPanel?.dispose();
        Panel.currentPanel = undefined;
    }

    // when doing a new one
    public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, styleUri: string, scriptUri: string, getHtml: (arg: any) => string) {
        Panel.currentPanel = new Panel(panel, extensionUri, styleUri, scriptUri, getHtml);
    }

    public constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, styleUri: string, scriptUri: string, getHtml: (arg: any) => string) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._styleUri = styleUri;
        this._scriptUri = scriptUri;
        this._getHtml = getHtml;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    }

    // function that cleans up resources and closes the panel
    public dispose() {
        Panel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    // what to do to update the view
    private async _update() {
        // sets a webview
        const webview = this._panel.webview;

        // sets the html of the webview
        this._panel.webview.html = this._getHtmlForWebview(webview);

        // on receiving a message --- don't know what this is yet, does something
        webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
            }
        });
    }

    //   so this here gets the actual files it needs for the extension
    private _getHtmlForWebview(webview: vscode.Webview) {

        const scriptUri = webview.asWebviewUri( 
            vscode.Uri.joinPath(this._extensionUri, "out", this._scriptUri)
        );

        const stylesheetUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "out", this._styleUri)
        );

        const nonce = getNonce(); // creates a unique id

        const html = this._getHtml({
            cspSource: webview.cspSource,
            stylesheetUri,
            nonce,
            scriptUri
        });

        return html;
        // the following is an html element which is essentially the web view itself
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}