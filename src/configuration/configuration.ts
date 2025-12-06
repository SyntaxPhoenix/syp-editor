import { ConfigurationEntry } from "./configurationentry";
import { SypEditorSettings } from "./settings";
import { PresetProvider } from "../presets/presetprovider";
import { IconProvider } from "../icons/iconprovider";
import { ElementExtension } from "../extensions/elementextension";

export class SypEditorConfiguration {
    configuration: ConfigurationEntry[];
    readonly settings: Partial<SypEditorSettings>;
    readonly presetProviders: PresetProvider[];
    readonly iconProviders: IconProvider[];
    readonly elementExtensions: ElementExtension[];

    constructor({ configuration, settings = {}, presetProviders = [], iconProviders = [], elementExtensions = [] }: {
        configuration: ConfigurationEntry[],
        settings: Partial<SypEditorSettings>
        presetProviders: PresetProvider[],
        iconProviders: IconProvider[],
        elementExtensions: ElementExtension[]
    }) {
        this.configuration = configuration ?? [];
        this.settings = settings ?? new SypEditorSettings();
        this.presetProviders = presetProviders;
        this.iconProviders = iconProviders;
        this.elementExtensions = elementExtensions;
    }
}