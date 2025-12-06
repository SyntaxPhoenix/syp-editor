import { ToolbarItem } from "../toolbaritem";
import { Editor } from "@tiptap/core";

export class SypEditorSeparator implements ToolbarItem {
    private element: HTMLElement|null;

    constructor() {
        this.element = null;
        this.initialize();
    }

    private initialize() {
        this.element = document.createElement('div');
        this.element.classList.add('syp-editor-toolbar-separator');
    }

    public getElement(): HTMLElement {
        return this.element!;
    }

    public isActive(editor: Editor): boolean {
        return false;
    }

    public handleUpdate(editor: Editor) {
    }
}