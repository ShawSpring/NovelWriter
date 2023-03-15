import { StatusBarItem, window, Disposable, TextDocument, StatusBarAlignment } from 'vscode'
export class CharacterCounter {
    private _statusBarItem: StatusBarItem | undefined

    public updateCharacterCount() {
        // Create as needed
        if (!this._statusBarItem) {
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left)
        }

        // Get the current text editor
        let editor = window.activeTextEditor
        if (!editor) {
            this._statusBarItem.hide()
            return
        }

        let doc = editor.document
        // Only update status if an plaintext file
        if (doc.languageId === 'plaintext') {
            let charCount = this._getCharacterCount(doc)

            // Update the status bar
            // this._statusBarItem.text =
            //     charCount !== 1 ? `$(pencil) ${charCount} Chars` : '$(pencil) 1 char'
            this._statusBarItem.text = `$(pencil)` + this.numberFormat(charCount)
            this._statusBarItem.show()
        } else {
            this._statusBarItem.hide()
        }
    }

    public _getCharacterCount(doc: TextDocument): number {
        let docContent = doc.getText()
        /* 中文计数(带标点符号) */
        return docContent.replace(/\s+/g, '').length

        /* flowing is counter for English words */
        // Parse out unwanted whitespace so the split is accurate
        // docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ')
        // docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '')

        // let wordCount = 0
        // if (docContent != '') {
        //     wordCount = docContent.split(' ').length
        // }
        // return wordCount
    }

    public dispose() {
        this._statusBarItem?.dispose()
    }
    public numberFormat(n: number) {
        let wan = n / 10000
        if (wan >= 1) {
            return `字数:${wan.toFixed(0)}万${n % 10000 > 0 ? n % 10000 : ''}`
        } else {
            return `字数:${n}`
        }
    }
}

export class CharacterCounterController {
    private _wordCounter: CharacterCounter
    private _disposable: Disposable

    constructor(wordCounter: CharacterCounter) {
        this._wordCounter = wordCounter
        this._wordCounter.updateCharacterCount()

        // subscribe to selection change and editor activation events
        let subscriptions: Disposable[] = []
        window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions)
        window.onDidChangeActiveTextEditor(this._onEvent, this, subscriptions)

        // create a combined disposable from both event subscriptions
        this._disposable = Disposable.from(...subscriptions)
    }

    private _onEvent() {
        this._wordCounter.updateCharacterCount()
    }

    public dispose() {
        this._disposable.dispose()
    }
}
