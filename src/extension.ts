// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'

import { CharacterCounter, CharacterCounterController } from './CharacterCounter'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "novelwriter" is now active!')

    let characterCounter = new CharacterCounter()
    let CounterController = new CharacterCounterController(characterCounter)

    ctx.subscriptions.push(CounterController)
    ctx.subscriptions.push(characterCounter)
}

// This method is called when your extension is deactivated
export function deactivate() {}
