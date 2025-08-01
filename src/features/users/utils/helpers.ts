import type { User } from '../../../types/global.types';
import type { SortConfig } from '../users.types';

// filter users via searchbar
export const filterUsers = (users: User[], searchTerm: string): User[] => {
	if (!searchTerm.trim()) return users;

	const lowercaseSearch = searchTerm.toLowerCase().trim();

	return users.filter(
		(user) =>
			user.name.toLowerCase().includes(lowercaseSearch) ||
			user.email.toLowerCase().includes(lowercaseSearch)
	);
};

// sort all users
export const sortUsers = (users: User[], sortConfig: SortConfig): User[] => {
	return [...users].sort((a, b) => {
		const getValue = (user: User): string => {
			switch (sortConfig.key) {
				case 'name':
					return user.name;
				case 'email':
					return user.email;
				case 'address.city':
					return user.address.city;
				case 'company.name':
					return user.company.name;
				default:
					return '';
			}
		};

		const aValue = getValue(a);
		const bValue = getValue(b);

		const comparison = aValue.localeCompare(bValue, undefined, {
			numeric: true,
			sensitivity: 'base',
		});

		return sortConfig.direction === 'asc' ? comparison : -comparison;
	});
};
