import { ConfigurationEntry } from "../../configuration/configurationentry";
import { ConfigurationEntryWithElements } from "../../configuration/configurationentrywithelements";

export class DropdownConfigurationEntry extends ConfigurationEntryWithElements {
    text: string|null;
    icon: string|null;
    iconProvider: string|null;
    iconAttributes: any|null;

    constructor(
        elements: ConfigurationEntry[],
        text: string|null = null,
        icon: string|null = null,
        iconProvider: string|null = null,
        iconAttributes: any|null = {}
    ) {
        super('dropdown', elements);
        this.text = text;
        this.icon = icon;
        this.iconProvider = iconProvider;
        this.iconAttributes = iconAttributes;
    }
}