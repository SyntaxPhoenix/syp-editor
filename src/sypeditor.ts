import { Editor } from '@tiptap/core'

import { SypEditorButton } from "./items/button/button";
import { SypEditorDropdown } from "./items/dropdown/dropdown";
import { SypEditorGroup } from "./items/group/group";
import { IconManager } from './icons/iconmanager';
import { PresetManager } from './presets/presetmanager';
import { SypEditorSeparator } from "./items/separator/separator";
import { SypEditorConfiguration } from './configuration/configuration';
import { ToolbarItem } from './items/toolbaritem';
import { ElementExtension } from './extensions/elementextension';
import { ConfigurationEntry } from './configuration/configurationentry';
import { DropdownConfigurationEntry } from './items/dropdown/dropdownconfigurationentry';
import { GroupConfigurationEntry } from './items/group/groupconfigurationentry';
import { ButtonConfigurationEntry } from './items/button/buttonconfigurationentry';

export class SypEditor {
    private editor: Editor;
    private configuration: Partial<SypEditorConfiguration>;
    private elements: ToolbarItem[];
    private iconManager: IconManager|null;
    private presetManager: PresetManager|null;
    private extensions: Map<string, ElementExtension>;

    private element: HTMLElement;
    private toolbar: HTMLElement|null;
    private wrapper: HTMLElement|null;
    private content: HTMLElement|null;

    constructor({ element, editor, configuration }: {
        element: HTMLElement;
        editor: Editor;
        configuration: Partial<SypEditorConfiguration>
    }) {
        this.element = element;
        this.editor = editor;
        this.configuration = configuration;
        this.iconManager = null;
        this.presetManager = null;
        this.extensions = new Map<string, ElementExtension>();
        this.toolbar = null;
        this.wrapper = null;
        this.content = null;
        this.elements = [];
        this.initialize();
    }

    private initialize() {
        this.iconManager = new IconManager(this.configuration.settings ? this.configuration.settings.iconAttributes : {}, this.configuration.iconProviders ?? []);
        this.presetManager = new PresetManager(this.configuration.settings ? this.configuration.settings.presetAttributes : {}, this.configuration.presetProviders ?? []);

        for (const elementExtension of this.configuration.elementExtensions ?? []) {
            for (const type of elementExtension.getTypes()) {
                this.extensions.set(type, elementExtension);
            }
        }

        this.createContainerAndMoveElement();
        this.createElementsFromConfiguration();

        this.editor.on('transaction', ({ editor, transaction }) => {
            this.handleUpdate(editor);
        });
    }

    public getIconManager(): IconManager {
        return this.iconManager!;
    }

    private createContainerAndMoveElement() {
        let parent = this.element.parentElement!;

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('syp-editor-wrapper');

        this.toolbar = document.createElement('div');
        this.toolbar.classList.add('syp-editor-toolbar');
        this.wrapper.appendChild(this.toolbar);

        this.content = document.createElement('div');
        this.content.classList.add('syp-editor-content');
        this.wrapper.appendChild(this.content);

        parent.insertBefore(this.wrapper, this.element);
        this.content.appendChild(this.element);
    }

    private createElementsFromConfiguration() {
        if (this.configuration.settings ? this.configuration.settings.presetsEnabled : false) {
            this.configuration.configuration = this.presetManager!.managePresetsInConfiguration(this.configuration.configuration!);
        }

        for (const entry of this.configuration.configuration!) {
            let element = null;
            if (entry.type === 'button' || entry.type == 'separator') {
                element = this.createBaseElements(entry);
            } else if (entry.type == 'group') {
                element = this.createElementsForGroup((entry as GroupConfigurationEntry));
            } else if (entry.type == 'dropdown') {
                element = this.createElementsForDropdown((entry as DropdownConfigurationEntry));
            } else if (this.extensions.has(entry.type)) {
                const extension = this.extensions.get(entry.type);
                element = extension!.createElement(this, this.editor, entry.type, entry);
            } else {
                throw new Error("Only button,separator, group and dropdown-elements are supported!");
            }
            this.elements.push(element!);
            this.toolbar!.appendChild(element!.getElement());
        }
    }

    private createElementsForGroup(entry: GroupConfigurationEntry): ToolbarItem {
        let childElements = [];
        for (let child of entry.elements) {
            if (child.type === 'button' || child.type == 'separator') {
                childElements.push(this.createBaseElements(child));
            } else if (child.type == 'dropdown') {
                childElements.push(this.createElementsForDropdown((child as DropdownConfigurationEntry))); 
            } else if (this.extensions.has(child.type)) {
                const extension = this.extensions.get(child.type);
                if (extension!.supportsGroup(child.type)) {
                    childElements.push(extension!.createElement(this, this.editor, child.type, child));
                } else {
                    throw new Error("The extension for the element '" + child.type + "' does not support that the element can be added to groups");
                }
            } else {
                 throw new Error("Only button,separator and dropdown-elements can be used within a group.");
            }
        }

        let group = new SypEditorGroup(childElements);
        return group;
    }

    private createElementsForDropdown(entry: DropdownConfigurationEntry): ToolbarItem {
        let childElements = [];
        for (let child of entry.elements) {
            if (child.type === 'button' || child.type == 'separator') {
                childElements.push(this.createBaseElements(child));
            } else if (this.extensions.has(child.type)) {
                const extension = this.extensions.get(child.type);
                if (extension!.supportsDropdown(child.type)) {
                    childElements.push(extension!.createElement(this, this.editor, child.type, child));
                } else {
                    throw new Error("The extension for the element '" + child.type + "' does not support that the element can be added to dropdowns");
                }
            } else {
                throw new Error("Only button,separator and dropdown-elements from the basic elements can be used within a group.");
            }
        }

        let dropdown = new SypEditorDropdown(this, entry.text ?? null, entry.icon ?? null, entry.iconProvider ?? null, entry.iconAttributes ?? {}, childElements);
        return dropdown;
    }

    private createBaseElements(entry: ConfigurationEntry): ToolbarItem {
        if (entry.type === 'button') {
            let button = new SypEditorButton(
                this.editor,
                this,
                (entry as ButtonConfigurationEntry).text ?? null,
                (entry as ButtonConfigurationEntry).icon ?? null,
                (entry as ButtonConfigurationEntry).iconProvider ?? null,
                (entry as ButtonConfigurationEntry).iconAttributes ?? {},
                (entry as ButtonConfigurationEntry).name ?? null,
                (entry as ButtonConfigurationEntry).attributes ?? null,
                (entry as ButtonConfigurationEntry).command,
                (entry as ButtonConfigurationEntry).argument ?? {},
                (entry as ButtonConfigurationEntry).disable ?? false
            );
            return button;
        } else if (entry.type == 'separator') {
            let separator = new SypEditorSeparator();
            return separator;
        } else {
            throw new Error("Unknown base-element other than button or separator.");
        }
    }

    private handleUpdate(editor: Editor): void {
        for (const toolbarElement of this.elements) {
            toolbarElement.handleUpdate(editor);
        }
    }
}