import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement } from 'react';
import { useUsers } from './useUsers';
import { UsersProvider } from '../contexts/UsersContext';

// mock fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('useUsers', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('fetches users on mount', async () => {
		const mockUsers = [
			{
				id: 1,
				name: 'John Doe',
				username: 'johndoe',
				email: 'john@example.com',
				address: {
					city: 'New York',
					street: '123 Main',
					suite: 'Apt 1',
					zipcode: '10001',
					geo: { lat: '0', lng: '0' },
				},
				company: {
					name: 'Acme Corp',
					catchPhrase: 'We do things',
					bs: 'business',
				},
				phone: '555-1234',
				website: 'john.com',
			},
		];

		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => mockUsers,
		});

		const wrapper = ({ children }: { children: React.ReactNode }) =>
			createElement(UsersProvider, null, children);

		const { result } = renderHook(() => useUsers(), { wrapper });

		expect(result.current.loading).toBe(true);

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.users).toEqual(mockUsers);
		});
	});

	it('handles fetch error', async () => {
		mockFetch.mockRejectedValueOnce(new Error('Network error'));

		const wrapper = ({ children }: { children: React.ReactNode }) =>
			createElement(UsersProvider, null, children);

		const { result } = renderHook(() => useUsers(), { wrapper });

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe('Network error');
		});
	});
});
