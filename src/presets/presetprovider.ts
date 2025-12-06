import { ConfigurationEntry } from "../configuration/configurationentry";

export interface PresetProvider {
    getNames(): string[];
    getPreset(name: string, attributes: any): ConfigurationEntry
}