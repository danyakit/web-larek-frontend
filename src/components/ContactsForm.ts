import { IContactsFormView, TContactsActions, TContactsForm } from '../types';
import { IEvents } from './base/Events';
import { Form } from './common/Form';

export class ContactsForm extends Form<TContactsForm> implements IContactsFormView {
	protected _close: HTMLElement;

	constructor(
		container: HTMLFormElement,
		events: IEvents,
		actions: TContactsActions
	) {
		super(container, events);

		if (actions.onSubmit) {
            this.container.addEventListener('submit', (event) => {
                event.preventDefault(); 
                actions.onSubmit(); 
            });
        }
		this.valid = false;
	}

	get phone() {
		return this.container.phone.value;
	}

	set phone(value: string) {
		this.container.phone.value = value;
	}

	get email() {
		return this.container.email.value;
	}

	set email(value: string) {
		this.container.email.value = value;
	}

	setNextToggle(state: boolean) {
		this.valid = state;
	}
}