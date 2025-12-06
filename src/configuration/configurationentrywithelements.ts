import { ConfigurationEntry } from "./configurationentry";

export class ConfigurationEntryWithElements extends ConfigurationEntry {
    elements: ConfigurationEntry[];

    constructor(type: string, elements: ConfigurationEntry[]) {
        super(type);
        this.elements = elements;
    }
}