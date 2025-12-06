import { ConfigurationEntry } from "../../configuration/configurationentry";

export class LinkConfigurationEntry extends ConfigurationEntry {
    text: string|null;
    icon: string|null;
    iconProvider: string|null;
    iconAttributes: any|null;
    iconSubmitBtn: string|null;
    iconProviderSubmitBtn: string|null;
    iconAttributesSubmitBtn: any|null;
    iconDeleteBtn: string|null;
    iconProviderDeleteBtn: string|null;
    iconAttributesDeleteBtn: any|null;

    constructor(
        text: string|null,
        icon: string|null,
        iconProvider: string|null,
        iconAttributes: any|null = {},
        iconSubmitBtn: string|null,
        iconProviderSubmitBtn: string|null,
        iconAttributesSubmitBtn: any|null = {},
        iconDeleteBtn: string|null,
        iconProviderDeleteBtn: string|null,
        iconAttributesDeleteBtn: any|null = {},
    ) {
        super('link');
        this.text = text;
        this.icon = icon;
        this.iconProvider = iconProvider;
        this.iconAttributes = iconAttributes;
        this.iconSubmitBtn = iconSubmitBtn;
        this.iconProviderSubmitBtn = iconProviderSubmitBtn;
        this.iconAttributesSubmitBtn = iconAttributesSubmitBtn;
        this.iconDeleteBtn = iconDeleteBtn;
        this.iconProviderDeleteBtn = iconProviderDeleteBtn;
        this.iconAttributesDeleteBtn = iconAttributesDeleteBtn;
    }
}