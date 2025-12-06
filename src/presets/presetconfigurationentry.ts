export abstract class PresetConfigurationEntry {
    readonly type: string;
    readonly name: string;
    readonly attributes: any;

    constructor(type: string, name: string, attributes: any = {}) {
        this.type = type;
        this.name = name;
        this.attributes = attributes;
    }
}