import { Editor } from "@tiptap/core";
import { SypEditor } from "../../sypeditor";

export class SypEditorLink {
    private element: HTMLElement|null;
    private editor: Editor;
    private sypEditor: SypEditor;
    private text: string|null;
    private icon: string|null;
    private iconProvider: string|null;
    private iconAttributes: any|null;
    private iconSubmitBtn: string|null;
    private iconProviderSubmitBtn: string|null;
    private iconAttributesSubmitBtn: any|null;
    private iconDeleteBtn: string|null;
    private iconProviderDeleteBtn: string|null;
    private iconAttributesDeleteBtn: any|null;

    constructor(
        editor: Editor,
        sypEditor: SypEditor,
        text: string|null,
        icon: string|null,
        iconProvider: string|null,
        iconAttributes: any|null,
        iconSubmitBtn: string|null,
        iconProviderSubmitBtn: string|null,
        iconAttributesSubmitBtn: any|null,
        iconDeleteBtn: string|null,
        iconProviderDeleteBtn: string|null,
        iconAttributesDeleteBtn: any|null
    ) {
        this.element = null;
        this.editor = editor;
        this.sypEditor = sypEditor;
        this.text = text;
        this.icon = icon;
        this.iconProvider = iconProvider;
        this.iconAttributes = iconAttributes;
        this.iconSubmitBtn = iconSubmitBtn;
        this.iconProviderSubmitBtn = iconProviderSubmitBtn;
        this.iconAttributesSubmitBtn = iconAttributesSubmitBtn;
        this.iconDeleteBtn = iconDeleteBtn;
        this.iconProviderDeleteBtn = iconProviderDeleteBtn;
        this.iconAttributesDeleteBtn = iconAttributesDeleteBtn;
        this.initialize();
    }

    private initialize() {
        this.element = document.createElement('div');
        this.element.classList.add('syp-editor-toolbar-dropdown');

        let dropdownButton = document.createElement('button');
        dropdownButton.classList.add('syp-editor-toolbar-dropdown-toggle');

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
        content.classList.add('syp-editor-toolbar-link-content');
        this.element.appendChild(content);

        let input = document.createElement('input');
        input.type = 'url';
        input.classList.add('syp-editor-toolbar-link-input');
        content.appendChild(input);

        let submitBtn = document.createElement('button');
        submitBtn.classList.add('syp-editor-toolbar-link-submit-btn');
        if (this.iconSubmitBtn !== null && this.iconProviderSubmitBtn !== null) {
            this.sypEditor.getIconManager().addIcon(submitBtn, this.iconProviderSubmitBtn, this.iconSubmitBtn, this.iconAttributesSubmitBtn);
        }
        submitBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (!submitBtn.disabled) {
                // @ts-ignore
                this.editor.chain().focus()['setLink']({ href: input.value }).run();
                input.value = '';
                content.classList.remove('show');
            }
        });
        content.appendChild(submitBtn);

        let divider = document.createElement('div');
        divider.classList.add('syp-editor-toolbar-link-divider');
        content.appendChild(divider);

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('syp-editor-toolbar-link-delete-btn');
        if (this.iconDeleteBtn !== null && this.iconProviderDeleteBtn !== null) {
            this.sypEditor.getIconManager().addIcon(deleteBtn, this.iconProviderDeleteBtn, this.iconDeleteBtn, this.iconAttributesDeleteBtn);
        }
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (!deleteBtn.disabled) {
                // @ts-ignore
                this.editor.chain().focus()['unsetLink'].run();
                content.classList.remove('show');
            }
        });
        content.appendChild(deleteBtn);

        window.addEventListener('click', (event) => {
            let container = this.element!.querySelector('.syp-editor-toolbar-dropdown-content');
            let target = event.target;
            if (target !== null && target instanceof HTMLElement && !target.classList.contains('syp-editor-toolbar-dropdown-toggle') &&
                (target.parentElement === null || !target.parentElement.classList.contains('syp-editor-toolbar-dropdown-toggle')) &&
                event.target !== container &&
                !container!.contains(target)) {
                if (container!.classList.contains('show')) {
                    container!.classList.remove('show');
                }
            }
        });
    }

    public getElement(): HTMLElement {
        return this.element!;
    }

    public isActive(editor: Editor) {
        return editor.isActive('link');
    }

    public handleUpdate(editor: Editor): void {
        let toggleBtn = this.element!.querySelector('.syp-editor-toolbar-dropdown-toggle');
        let deleteBtn = this.element!.querySelector('.syp-editor-toolbar-link-delete-btn');
        let submitBtn = this.element!.querySelector('.syp-editor-toolbar-link-delete-btn');
        let input = this.element!.querySelector('.syp-editor-toolbar-link-input');

        // @ts-ignore
        if (editor.can().chain().focus()['unsetLink']().run()) {
            deleteBtn!.removeAttribute("disabled");
        } else {
            deleteBtn!.setAttribute("disabled", "true");
        }

        // @ts-ignore
        if (editor.can().chain().focus()['setLink']({ href: 'https://test.de' }).run()) {
            submitBtn!.removeAttribute("disabled");
        } else {
            submitBtn!.setAttribute("disabled", "true");
        }

        if (toggleBtn!.classList.contains('is-active')) {
            if (!this.isActive(editor)) {
                toggleBtn!.classList.remove('is-active');
            }
        } else {
            if (this.isActive(editor)) {
                toggleBtn!.classList.add('is-active');
            }
        }

        if (this.isActive(editor)) {
            (input! as HTMLInputElement).value = this.editor.getAttributes('link').href;
        } else {
            (input! as HTMLInputElement).value = '';
        }
    }
}