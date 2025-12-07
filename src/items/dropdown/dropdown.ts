import { IconProvider } from './../../icons/iconprovider';
import { ToolbarItem } from "../toolbaritem";
import { Editor } from '@tiptap/core';
import { SypEditor } from '../../sypeditor';
import { SypEditorSeparator } from '../separator/separator';

export class SypEditorDropdown implements ToolbarItem {
    private sypEditor: SypEditor;
    private text: string|null;
    private icon: string|null;
    private iconProvider: string|null;
    private iconAttributes: any|null;
    private elements: ToolbarItem[];
    private element: HTMLElement|null;

    constructor(
        sypEditor: SypEditor,
        text: string|null,
        icon: string|null,
        iconProvider: string|null,
        iconAttributes: any|null = {},
        elements: ToolbarItem[]
    ) {
        this.sypEditor = sypEditor;
        this.text = text;
        this.icon = icon;
        this.iconProvider = iconProvider;
        this.iconAttributes = iconAttributes;
        this.elements = elements;
        this.element = null;
        this.initialize();
    }

    private initialize() {
        this.element = document.createElement('div');
        this.element.classList.add('syp-editor-toolbar-dropdown');

        let dropdownButton = document.createElement('button');
        dropdownButton.classList.add('syp-editor-toolbar-dropdown-toggle');
        dropdownButton.classList.add('syp-editor-toolbar-dropdown-caret');

        if (this.icon !== null && this.iconProvider !== null) {
            this.sypEditor.getIconManager().addIcon(dropdownButton, this.iconProvider, this.icon, this.iconAttributes);
        }
        if (this.text !== null) {
            let textNode = document.createElement('span');
            if (this.icon !== null) {
                textNode.classList.add('ms-2');
            }
            textNode.innerText = this.text;
            dropdownButton.appendChild(textNode);
        }

        dropdownButton.addEventListener('click', (event) => {
            event.preventDefault();
            let container = this.element!.querySelector('.syp-editor-toolbar-dropdown-content');
            container!.classList.toggle('show');
        });
        this.element.appendChild(dropdownButton);

        let content = document.createElement('div');
        content.classList.add('syp-editor-toolbar-dropdown-content');
        this.element.appendChild(content);

        for (const child of this.elements) {
            content.appendChild(child.getElement());
        }

        window.addEventListener('click', (event) => {
            let target = event.target;
            if (target === null || !(target instanceof HTMLElement)) {
                return;
            }

            if (!target.classList.contains('syp-editor-toolbar-dropdown-toggle') &&
                (target.parentElement === null || !target.parentElement.classList.contains('syp-editor-toolbar-dropdown-toggle'))) {
                let container = this.element!.querySelector('.syp-editor-toolbar-dropdown-content');
                if (container !== null && container.classList.contains('show')) {
                    container.classList.remove('show');
                }
            }
        });
    }

    public getElement() {
        return this.element!;
    }

    public getChildElements() {
        return this.elements;
    }

    public isActive(editor: Editor): boolean {
        let active = false;
        for (const groupElement of this.elements) {
            if (!(groupElement instanceof SypEditorSeparator)) {
                if (groupElement.isActive(editor)) {
                    active = true;
                }
            }
        }

        return active;
    }

    public handleUpdate(editor: Editor) {
        let active = false;
        for (const groupElement of this.elements) {
            if (!(groupElement instanceof SypEditorSeparator)) {
                groupElement.handleUpdate(editor);
                if (groupElement.isActive(editor)) {
                    active = true;
                }
            }
        }

        let button = this.element!.querySelector('.syp-editor-toolbar-dropdown-toggle');
        if (active) {
            button!.classList.add('is-active');
        } else {
            button!.classList.remove('is-active');
        }
    }
}