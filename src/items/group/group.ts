import { ToolbarItem } from "../toolbaritem";
import { SypEditorSeparator } from "../separator/separator";
import { Editor } from "@tiptap/core";

export class SypEditorGroup implements ToolbarItem {
    private elements: ToolbarItem[];
    private element: HTMLElement|null;

    constructor(elements: ToolbarItem[]) {
        this.elements = elements;
        this.element = null;
        this.initialize();
    }

    private initialize() {
        this.element = document.createElement('div');
        this.element.classList.add('syp-editor-toolbar-group');
        for (const child of this.elements) {
            this.element.appendChild(child.getElement());
        }
    }

    public getElement() {
        return this.element!;
    }

    public getChildElements() {
        return this.elements;
    }

    public isActive(editor: Editor): boolean {
        return false;
    }

    public handleUpdate(editor: Editor) {
        for (const groupElement of this.elements) {
            if (!(groupElement instanceof SypEditorSeparator)) {
                groupElement.handleUpdate(editor);
            }
        }
    }
}