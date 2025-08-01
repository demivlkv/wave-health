export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: UserAddress;
	phone: string;
	website: string;
	company: UserCompany;
}

export interface UserAddress {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: UserGeo;
}

interface UserGeo {
	lat: string;
	lng: string;
}

interface UserCompany {
	name: string;
	catchPhrase: string;
	bs: string;
}

export interface FormErrors {
	[key: string]: string;
}

export interface InputFieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (name: string, value: string) => void;
	error?: string;
	type?: 'text' | 'email' | 'tel' | 'url';
	required?: boolean;
	placeholder?: string;
	disabled?: boolean;
}
