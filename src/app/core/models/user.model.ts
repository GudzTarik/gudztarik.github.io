export interface UserModel {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	imageUrl: string;
	status: string; // url банки
	requestsAmount: number;
	requests: string;
	role: string;
}

export interface CurrentUserInterface {
	id: string;
	avatarUrl: string;
	firstName: string;
	lastName: string;
	roles: string[];
	status: number;
	justCreated?: boolean;
}

export interface SortPaginationInterface {
	searchTerm?: string;
	sortBy: number;
	sortByDirection: number;
	pageIndex: number;
	pageSize: number;
}
