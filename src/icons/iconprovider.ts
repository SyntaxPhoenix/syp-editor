export interface IconProvider {
    getName(): string
    addIcon(element: HTMLElement, icon: string, attributes: any): void
}