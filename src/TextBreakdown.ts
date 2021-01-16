import * as vscode from "vscode";
import { Panel } from "./Panel";

export class TextBreakdown extends Panel {
    public static createOrShow(extensionUri: vscode.Uri) {
        super.createOrShow(extensionUri, "style.css", "bundle.js");
    }
}