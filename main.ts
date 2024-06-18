import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

const checkboxRegex = /((?:\n|^)\s*)- \[.\]/g;

export default class MyPlugin extends Plugin {
  private _uncheckAll(processSelection=false) {
    const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (activeLeaf instanceof MarkdownView) {
      const editor = activeLeaf.editor;
      const doc = editor.getDoc();
      const cursorPosition = doc.getCursor();
      if (processSelection) {
        const selectedContent = editor.getSelection();
        const updatedContent = selectedContent.replace(checkboxRegex, "$1- [ ]");
        editor.replaceSelection(updatedContent);
        doc.setCursor(cursorPosition);
      } else {
        const entireContent = doc.getValue();
        const updatedContent = entireContent.replace(checkboxRegex, "$1- [ ]");
        doc.setValue(updatedContent);
        doc.setCursor(cursorPosition);
      }
    }
  }

	async onload() {
		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'uncheck-all',
			name: 'Uncheck All Checkboxes in File',
			callback: () => {
        this._uncheckAll();
			},
      editorCallback: (editor: Editor, view: MarkdownView) => {
        this._uncheckAll();
      },
		});
		this.addCommand({
			id: 'uncheck-all-selection',
			name: 'Uncheck All Checkboxes in Selection',
			callback: () => {
        this._uncheckAll(true);
			},
      editorCallback: (editor: Editor, view: MarkdownView) => {
        this._uncheckAll(true);
      },
		});    
	}

	onunload() {

	}
}
