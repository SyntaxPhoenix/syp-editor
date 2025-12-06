import { IconProvider } from "./iconprovider";
import { Fontawesome5IconProvider } from "./provider/fontawesome5iconprovider";

export class IconManager {
    private attributes: any;
    private iconProviders: IconProvider[];
    private iconProvider: Map<string, IconProvider>;

    constructor(attributes: any, iconProviders: IconProvider[]) {
        this.attributes = attributes;
        this.iconProviders = iconProviders;
        this.iconProvider = new Map<string, IconProvider>();
        this.initialize();
    }

    private initialize() {
        this.iconProvider.set('fontawesome5', new Fontawesome5IconProvider());
        for (const iconProvider of this.iconProviders) {
            this.iconProvider.set(iconProvider.getName(), iconProvider);
        }
    }

    public addIcon(element: HTMLElement, provider: string, icon: string, attributes: any): void {
        if (!this.iconProvider.has(provider)) {
            throw new Error("SYP-Editor has no icon-provider for " + provider + "!");
        }

        let allAttributes = {};
        Object.assign(allAttributes, this.attributes);
        Object.assign(allAttributes, attributes);

        this.iconProvider.get(provider)!.addIcon(element, icon, allAttributes);
    }
}