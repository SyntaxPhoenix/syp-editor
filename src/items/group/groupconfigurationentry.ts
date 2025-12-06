import { ConfigurationEntry } from "../../configuration/configurationentry";
import { ConfigurationEntryWithElements } from "../../configuration/configurationentrywithelements";

export class GroupConfigurationEntry extends ConfigurationEntryWithElements {
    constructor(elements: ConfigurationEntry[]) {
        super('group', elements);
    }
}