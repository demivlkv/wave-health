import type { User } from '../../types/global.types';

export interface SortConfig {
	key: keyof User | 'address.city' | 'company.name';
	direction: 'asc' | 'desc';
}

export interface AddUserFormData {
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
	};
	company: {
		name: string;
		catchPhrase: string;
	};
}
