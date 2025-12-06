import { IconProvider } from "../iconprovider";

export class Fontawesome5IconProvider implements IconProvider {
    public getName() {
        return 'fontawesome5';
    }

    public addIcon(element: HTMLElement, icon: string, attributes: any): void {
        let iconElement = document.createElement('i');
        iconElement.classList.add('fa-' + icon);
        iconElement.classList.add(attributes.class ?? 'fas');
        iconElement.ariaHidden = 'true';
        element.appendChild(iconElement);
    }
}