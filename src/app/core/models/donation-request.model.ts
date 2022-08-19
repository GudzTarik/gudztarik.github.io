import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

export enum DonationRequestType {
	Supplies,
	Money
}

export enum DonationRequestStatus {
	None = 0,
	New = 1,
	InProgress = 2,
	NotApproved = 4,
	Pending = 8,
	Closed = 16,
	Done = 32,
	Expired = 64
}

export interface DonationRequest {
	donationRequestId: string;
	name: string;
	description: string;
	deadline: Date | string;
	imageUrl: string;
	paymentInfo: string; // url банки
	requestType: DonationRequestType;
	amount: number;
	collected: number;
	createdBy: unknown;
	contactInfo: unknown;
	items: DonationItem[];
	notes: RequestNote[];
	requestStatus: DonationRequestStatus;
	createdOn: Date | string;
	isActive: boolean;
}

export interface RequestNote {
	note: string;
	createdBy: unknown;
}

export class RequestNoteForm extends FormGroup {
	constructor(note: RequestNote | null = null) {
		super({
			note: new FormControl(note?.note || null, Validators.required),
			createdBy: new FormControl(note?.createdBy || null, Validators.required)
		});
	}
}

export class DonationRequestForm extends FormGroup {
	constructor(request: DonationRequest | null = null) {
		super({
			donationRequestId: new FormControl(request?.donationRequestId || null),
			name: new FormControl(request?.name || null),
			description: new FormControl(request?.description || null),
			deadline: new FormControl(request?.deadline || null),
			imageUrl: new FormControl(request?.imageUrl || null),
			paymentInfo: new FormControl(request?.paymentInfo || null),
			requestType: new FormControl(request?.requestType ?? DonationRequestType.Supplies),
			createdBy: new FormControl(request?.createdBy || null),
			contactInfo: new FormControl(request?.contactInfo || null),
			requestStatus: new FormControl(request?.requestStatus ?? null),
			notes: new FormArray([]),
			items: new FormArray([]),
			amount: new FormControl(request?.amount ?? null),
			collected: new FormControl(request?.collected ?? 0)
		});

		if (request) {
			request.notes.map(note => (this.get('notes') as FormArray).push(new RequestNoteForm(note)));
			request.items.map(item => (this.get('items') as FormArray).push(new DonationItemForm(item)));
		}
	}
}

export interface DonationItem {
	name: string;
	description: string;
	amount: number;
	collected: number;
}

export class DonationItemForm extends FormGroup {
	constructor(item: DonationItem | null = null) {
		super({
			name: new FormControl(item?.name || null),
			description: new FormControl(item?.description || null),
			amount: new FormControl(item?.amount ?? null),
			collected: new FormControl(item?.collected ?? 0)
		});
	}
}
