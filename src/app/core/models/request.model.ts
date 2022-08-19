import {DonationItem, DonationRequestStatus, DonationRequestType} from '@core/models/donation-request.model';

export interface RequestModel {
	name: string;
	description: string;
	amount: number;
	deadline: Date | string;
	imageUrl: string;
	paymentInfo: string; // url банки
	requestType: DonationRequestType;
	createdBy: unknown;
	contactInfo: unknown;
	items: DonationItem[];
	notes: string[];
	requestStatus: DonationRequestStatus;
	collected: number;
	subscribed: boolean;
}
