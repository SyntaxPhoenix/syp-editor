import { Editor, ChainedCommands } from "@tiptap/core";
import { SypEditor } from "../../sypeditor";
import { ToolbarItem } from "../toolbaritem";

export class SypEditorButton implements ToolbarItem {
    private editor: Editor;
    private sypEditor: SypEditor;
    private text: string|null;
    private icon: string|null;
    private iconProvider: string|null;
    private iconAttributes: any|null;
    private name: string|null;
    private attributes: any|null;
    private command: string;
    private argument: any[];
    private disable: boolean;
    private element: HTMLElement|null;

    constructor(
        editor: Editor,
        sypEditor: SypEditor,
        text: string|null,
        icon: string|null,
        iconProvider: string|null,
        iconAttributes: any|null = {},
        name: string|null = null,
        attributes: any|null = null,
        command: string,
        argument: any[] = [],
        disable: boolean = false
    ) {
        this.element = null;
        this.editor = editor;
        this.sypEditor = sypEditor;
        this.text = text;
        this.icon = icon;
        this.iconProvider = iconProvider;
        this.iconAttributes = iconAttributes;
        this.name = name;
        this.attributes = attributes;
        this.command = command;
        this.argument = argument;
        this.disable = disable;
        this.initialize();
    }

    private initialize() {
        this.element = document.createElement('button');
        this.element.classList.add('syp-editor-toolbar-item');

        if (this.icon !== null && this.iconProvider !== null) {
            this.sypEditor.getIconManager().addIcon(this.element, this.iconProvider, this.icon, this.iconAttributes);
        }
        if (this.text !== null) {
            let textNode = document.createElement('span');
            if (this.icon !== null) {
                textNode.classList.add('ms-2');
            }
            textNode.innerText = this.text;
            this.element.appendChild(textNode);
        }

        this.element.addEventListener('click', (event) => {
            event.preventDefault();

            // @ts-ignore
            this.editor.chain().focus()[this.command](this.argument).run();
        });
    }

    public getElement(): HTMLElement {
        return this.element!;
    }

    public isActive(editor: Editor): boolean {
        if (this.name !== null && this.attributes === null) {
            return editor.isActive(this.name);
        } else if (this.name === null && this.attributes !== null) {
            return editor.isActive(this.attributes);
        } else if (this.name !== null && this.attributes !== null)  {
            return editor.isActive(this.name, this.attributes);
        }
        return false;
    }

    public handleUpdate(editor: Editor): void {
        if (this.disable) {
            // @ts-ignore
            if (editor.can().chain().focus()[this.command](this.argument).run()) {
                this.element!.removeAttribute("disabled");
            } else {
                this.element!.setAttribute("disabled", "true");
            }
        }
        if (this.element!.classList.contains('is-active')) {
            if (!this.isActive(editor)) {
                this.element!.classList.remove('is-active');
            }
        } else {
            if (this.isActive(editor)) {
                this.element!.classList.add('is-active');
            }
        }
    }
}