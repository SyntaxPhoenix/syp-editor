import { ConfigurationEntry } from "../../configuration/configurationentry";

export class ButtonConfigurationEntry extends ConfigurationEntry {
    text: string|null;
    icon: string|null;
    iconProvider: string|null;
    iconAttributes: any|null;
    name: string|null;
    attributes: any|null;
    command: string;
    argument: any|null;
    disable: boolean;

    constructor(
        text: string|null,
        icon: string|null,
        iconProvider: string|null,
        iconAttributes: any|null = {},
        name: string|null = null,
        attributes: any|null = null,
        command: string,
        argument: any|null = {},
        disable: boolean = false
    ) {
        super('button');
        this.text = text;
        this.icon = icon;
        this.iconProvider = iconProvider;
        this.iconAttributes = iconAttributes;
        this.name = name;
        this.attributes = attributes;
        this.command = command;
        this.argument = argument;
        this.disable = disable;
    }
}