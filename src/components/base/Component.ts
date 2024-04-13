export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	setText(element: HTMLElement | Element, value: unknown) {
		if (element) element.textContent = String(value);
	}

	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	protected toggleClass(element: HTMLElement | null, className: string, condition: boolean) {
		if (element) {
			if (condition) {
				element.classList.add(className);
			} else {
				element.classList.remove(className);
			}
		}
	}
	

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) element.alt = alt;
        }
    }

	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}