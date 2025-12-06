import { Editor } from "@tiptap/core";
import { SypEditor } from "../sypeditor";
import { ToolbarItem } from "../items/toolbaritem";

export interface ElementExtension {
    createElement(sypEditorWrapper: SypEditor, editor: Editor, type: string, entry: any): ToolbarItem
    getTypes(): string[];
    supportsDropdown(type: string): boolean;
    supportsGroup(type: string): boolean;
}