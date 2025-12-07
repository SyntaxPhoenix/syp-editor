import { PresetProvider } from "./presetprovider";
import { Fontawesome5PresetProvider } from "./provider/fontawesome5presetprovider";
import { ConfigurationEntry } from "../configuration/configurationentry";
import { ConfigurationEntryWithElements } from "../configuration/configurationentrywithelements";
import { PresetConfigurationEntry } from "./presetconfigurationentry";

export class PresetManager {
    readonly attributes: any;
    presetProviders: PresetProvider[];
    presets: Map<string, PresetProvider>;

    constructor(attributes: any, presetProviders: PresetProvider[]) {
        this.attributes = attributes;
        this.presetProviders = presetProviders;
        this.presets = new Map<string, PresetProvider>();
        this.initialize();
    }

    private initialize() {
        this.presetProviders.push(new Fontawesome5PresetProvider());

        for (const presetProvider of this.presetProviders) {
            for (const presetName of presetProvider.getNames()) {
                this.presets.set(presetName, presetProvider);
            }
        }
    }

    public managePresetsInConfiguration(configuration: ConfigurationEntry[]) {
        let newConfiguration = this.renewItems(configuration);
        return newConfiguration;
    }

    private renewItems(items: ConfigurationEntry[]) {
        let newItems = [];
        for (let item of items) {
            if (item.type !== 'preset') {
                if (Object.hasOwn(item, 'elements')) {
                    (item as ConfigurationEntryWithElements).elements = this.renewItems((item as ConfigurationEntryWithElements).elements);
                }
                newItems.push(item);
            } else {
                const itemNew = this.getPreset((item as PresetConfigurationEntry).name, (item as PresetConfigurationEntry).attributes ?? {});
                newItems.push(itemNew);
            }
        }
        return newItems;
    }

    public getPreset(name: string, attributes: any = {}): ConfigurationEntry {
        if (!this.presets.has(name)) {
            throw new Error("SYP-Editor has no preset with the name " + name + "! Did you forget to add a preset provider?");
        }

        let allAttributes = {};
        Object.assign(allAttributes, this.attributes);
        Object.assign(allAttributes, attributes);

        return this.presets.get(name)!.getPreset(name, allAttributes);
    }
}