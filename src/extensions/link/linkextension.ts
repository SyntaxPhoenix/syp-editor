import { SypEditor } from './../../sypeditor';
import { ElementExtension } from "../elementextension";
import { Editor } from '@tiptap/core';
import { ToolbarItem } from '../../items/toolbaritem';
import { SypEditorLink } from './link';

export class SypEditorLinkExtension implements ElementExtension {
    createElement(
        sypEditorWrapper: SypEditor,
        editor: Editor,
        type: string,
        entry: any
    ): ToolbarItem {
        return new SypEditorLink(
            editor,
            sypEditorWrapper,
            entry.text ?? null,
            entry.icon ?? null,
            entry.iconProvider ?? null,
            entry.iconAttributes ?? {},
            entry.iconSubmitBtn ?? null,
            entry.iconProviderSubmitBtn ?? null,
            entry.iconAttributesSubmitBtn ?? {},
            entry.iconDeleteBtn ?? null,
            entry.iconProviderDeleteBtn ?? null,
            entry.iconAttributesDeleteBtn ?? {}
        );
    }

    getTypes(): string[] {
        return ['link'];
    }

    supportsDropdown(type: string): boolean { // Skip type, as it has only has link
        return false;
    }

    supportsGroup(type: string): boolean { // Skip type, as it has only has link
        return true;
    }
}