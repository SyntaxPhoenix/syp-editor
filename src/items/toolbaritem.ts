import { Editor } from "@tiptap/core";

export interface ToolbarItem {
    getElement(): HTMLElement;
    isActive(editor: Editor): boolean;
    handleUpdate(editor: Editor): void
}