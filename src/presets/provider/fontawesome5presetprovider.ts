import { ConfigurationEntry } from "../../configuration/configurationentry";
import { ButtonConfigurationEntry } from "../../items/button/buttonconfigurationentry";
import { GroupConfigurationEntry } from "../../items/group/groupconfigurationentry";
import { LinkConfigurationEntry } from "../../extensions/link/linkconfigurationentry";
import { DropdownConfigurationEntry } from "../../items/dropdown/dropdownconfigurationentry";
import { PresetProvider } from "../presetprovider";

export class Fontawesome5PresetProvider implements PresetProvider {
    presets: Map<string, ConfigurationEntry>;

    constructor() {
        this.presets = new Map<string, ConfigurationEntry>();
        this.initialize();
    }

    private initialize() {
        this.presets.set('fontawesome5_fontstyle_group', new GroupConfigurationEntry(
            [
                ({
                    type: 'button',
                    icon: 'bold',
                    iconProvider: 'fontawesome5',
                    name: 'bold',
                    command: 'toggleBold',
                    disable: true
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'italic',
                    iconProvider: 'fontawesome5',
                    name: 'italic',
                    command: 'toggleItalic',
                    disable: true
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'strikethrough',
                    iconProvider: 'fontawesome5',
                    name: 'strike',
                    command: 'toggleStrike',
                    disable: true
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'underline',
                    iconProvider: 'fontawesome5',
                    name: 'underline',
                    command: 'toggleUnderline',
                    disable: true
                } as ButtonConfigurationEntry)
            ]
        ));
        this.presets.set('fontawesome5_textalign_group', new GroupConfigurationEntry(
            [
                ({
                    type: 'button',
                    icon: 'align-justify',
                    iconProvider: 'fontawesome5',
                    attributes: { textAlign: 'justify' },
                    command: 'setTextAlign',
                    argument: 'justify'
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'align-left',
                    iconProvider: 'fontawesome5',
                    attributes: { textAlign: 'left' },
                    command: 'setTextAlign',
                    argument: 'left'
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'align-center',
                    iconProvider: 'fontawesome5',
                    attributes: { textAlign: 'center' },
                    command: 'setTextAlign',
                    argument: 'center'
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'align-right',
                    iconProvider: 'fontawesome5',
                    attributes: { textAlign: 'right' },
                    command: 'setTextAlign',
                    argument: 'right'
                } as ButtonConfigurationEntry)
            ]
        ));
        this.presets.set('fontawesome5_link', ({
            type: 'link',
            icon: 'link',
            iconProvider: 'fontawesome5',
            iconSubmitBtn: 'paper-plane',
            iconProviderSubmitBtn: 'fontawesome5',
            iconDeleteBtn: 'trash',
            iconProviderDeleteBtn: 'fontawesome5'
        } as LinkConfigurationEntry));
        this.presets.set('fontawesome5_heading_dropdown', new DropdownConfigurationEntry(
            [
                ({
                    type: 'button',
                    icon: 'h1',
                    iconProvider: 'fontawesome5',
                    text: 'Heading 1',
                    name: 'heading',
                    attributes: { level: 1 },
                    command: 'toggleHeading',
                    argument: { level: 1 }
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'h2',
                    iconProvider: 'fontawesome5',
                    text: 'Heading 2',
                    name: 'heading',
                    attributes: { level: 2 },
                    command: 'toggleHeading',
                    argument: { level: 2 }
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'h3',
                    iconProvider: 'fontawesome5',
                    text: 'Heading 3',
                    name: 'heading',
                    attributes: { level: 3 },
                    command: 'toggleHeading',
                    argument: { level: 3 }
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'h4',
                    iconProvider: 'fontawesome5',
                    text: 'Heading 4',
                    name: 'heading',
                    attributes: { level: 4 },
                    command: 'toggleHeading',
                    argument: { level: 4 }
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    text: 'Heading 5',
                    name: 'heading',
                    attributes: { level: 5 },
                    command: 'toggleHeading',
                    argument: { level: 5 }
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    text: 'Heading 6',
                    name: 'heading',
                    attributes: { level: 6 },
                    command: 'toggleHeading',
                    argument: { level: 6 }
                } as ButtonConfigurationEntry)
            ],
            null,
            'heading',
            'fontawesome5'
        ));
        this.presets.set('fontawesome5_redo_undo_group', new GroupConfigurationEntry(
            [
                ({
                    type: 'button',
                    icon: 'undo',
                    iconProvider: 'fontawesome5',
                    name: 'undo',
                    command: 'undo',
                    disable: true
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'redo',
                    iconProvider: 'fontawesome5',
                    name: 'redo',
                    command: 'redo',
                    disable: true
                } as ButtonConfigurationEntry)
            ]
        ));
        this.presets.set('fontawesome5_list_dropdown', new DropdownConfigurationEntry(
            [
                ({
                    type: 'button',
                    icon: 'list-ol',                                    
                    iconProvider: 'fontawesome5',
                    text: 'Ordered List',
                    name: 'orderedList',
                    command: 'toggleOrderedList'
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'list-ul',
                    iconProvider: 'fontawesome5',
                    text: 'Bullet List',
                    name: 'bulletList',
                    command: 'toggleBulletList',
                } as ButtonConfigurationEntry),
                ({
                    type: 'button',
                    icon: 'tasks',
                    iconProvider: 'fontawesome5',
                    text: 'Task list',
                    name: 'taskList',
                    command: 'toggleTaskList',
                } as ButtonConfigurationEntry)
            ],
            null,
            'list',
            'fontawesome5'
        ));
    }

    public getNames(): string[] {
        return Array.from(this.presets.keys());
    }

    public getPreset(name: string, attributes: any = {}): ConfigurationEntry {
        if (!this.presets.has(name)) {
            throw new Error("Fontawesome 5 has no preset with the name " + name + "! Did you forget to add a preset provider?");
        }

        return this.presets.get(name)!;
    }
}