export class SypEditorSettings {
    readonly presetsEnabled: boolean;
    readonly iconAttributes: any;
    readonly presetAttributes: any;

    constructor(
        presetsEnabled: boolean = false,
        iconAttributes: any = {},
        presetAttributes: any = {}
    ) {
        this.presetsEnabled = presetsEnabled;
        this.iconAttributes = iconAttributes;
        this.presetAttributes = presetAttributes;
    }
}