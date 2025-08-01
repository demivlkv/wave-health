import { describe, it, expect } from 'vitest';
import { sortUsers, filterUsers } from './helpers';
import type { User } from '../../../types/global.types';
import type { SortConfig } from '../users.types';

const mockUsers: User[] = [
	{
		id: 1,
		name: 'Charlie Brown',
		username: 'charlie',
		email: 'charlie@example.com',
		address: {
			street: '123 Main St',
			suite: 'Apt 1',
			city: 'Boston',
			zipcode: '02101',
			geo: { lat: '0', lng: '0' },
		},
		phone: '555-0001',
		website: 'charlie.com',
		company: {
			name: 'Zebra Corp',
			catchPhrase: 'Last but not least',
			bs: 'business',
		},
	},
	{
		id: 2,
		name: 'Alice Johnson',
		username: 'alice',
		email: 'alice@test.com',
		address: {
			street: '456 Oak Ave',
			suite: 'Suite 2',
			city: 'Austin',
			zipcode: '73301',
			geo: { lat: '0', lng: '0' },
		},
		phone: '555-0002',
		website: 'alice.com',
		company: {
			name: 'Alpha Industries',
			catchPhrase: 'First in everything',
			bs: 'business',
		},
	},
];

describe('sortUsers - Only Test What You Actually Use', () => {
	it('sorts by name ascending', () => {
		const sortConfig: SortConfig = { key: 'name', direction: 'asc' };
		const result = sortUsers(mockUsers, sortConfig);

		expect(result[0].name).toBe('Alice Johnson');
		expect(result[1].name).toBe('Charlie Brown');
	});

	it('sorts by name descending', () => {
		const sortConfig: SortConfig = { key: 'name', direction: 'desc' };
		const result = sortUsers(mockUsers, sortConfig);

		expect(result[0].name).toBe('Charlie Brown');
		expect(result[1].name).toBe('Alice Johnson');
	});

	it('sorts by email ascending', () => {
		const sortConfig: SortConfig = { key: 'email', direction: 'asc' };
		const result = sortUsers(mockUsers, sortConfig);

		expect(result[0].email).toBe('alice@test.com');
		expect(result[1].email).toBe('charlie@example.com');
	});

	it('sorts by city (address.city) ascending', () => {
		const sortConfig: SortConfig = { key: 'address.city', direction: 'asc' };
		const result = sortUsers(mockUsers, sortConfig);

		expect(result[0].address.city).toBe('Austin');
		expect(result[1].address.city).toBe('Boston');
	});

	it('sorts by company name (company.name) ascending', () => {
		const sortConfig: SortConfig = { key: 'company.name', direction: 'asc' };
		const result = sortUsers(mockUsers, sortConfig);

		expect(result[0].company.name).toBe('Alpha Industries');
		expect(result[1].company.name).toBe('Zebra Corp');
	});
});

describe('filterUsers - Search Functionality', () => {
	it('filters by name', () => {
		const result = filterUsers(mockUsers, 'alice');
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('Alice Johnson');
	});

	it('filters by email', () => {
		const result = filterUsers(mockUsers, 'example.com');
		expect(result).toHaveLength(1);
		expect(result[0].email).toBe('charlie@example.com');
	});

	it('returns empty array when no matches', () => {
		const result = filterUsers(mockUsers, 'nonexistent');
		expect(result).toHaveLength(0);
	});
});
