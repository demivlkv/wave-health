import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../../test/utils';
import UsersList from '../UsersList';
import * as useUsersHook from '../../../../hooks/useUsers';

// mock the useUsers hook
vi.mock('../../../../hooks/useUsers');
const mockUseUsers = vi.mocked(useUsersHook.useUsers);

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
		company: { name: 'Acme Corp', catchPhrase: 'We do things', bs: 'business' },
		phone: '555-1234',
		website: 'john.com',
	},
	{
		id: 2,
		name: 'Jane Smith',
		username: 'janesmith',
		email: 'jane@example.com',
		address: {
			city: 'Los Angeles',
			street: '456 Oak',
			suite: 'Suite 2',
			zipcode: '90210',
			geo: { lat: '0', lng: '0' },
		},
		company: { name: 'Tech Inc', catchPhrase: 'Innovation', bs: 'tech' },
		phone: '555-5678',
		website: 'jane.com',
	},
];

describe('UsersList', () => {
	beforeEach(() => {
		mockUseUsers.mockReturnValue({
			users: mockUsers,
			loading: false,
			error: null,
			clearError: vi.fn(),
			addUser: vi.fn(),
			lastFetched: null,
		});
	});

	it('renders users list', () => {
		render(<UsersList />);

		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('Jane Smith')).toBeInTheDocument();
	});

	it('filters users by search term', async () => {
		render(<UsersList />);

		const searchInput = screen.getByPlaceholderText(/search users/i);
		fireEvent.change(searchInput, { target: { value: 'john' } });

		await waitFor(() => {
			expect(screen.getByText('John Doe')).toBeInTheDocument();
			expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
		});
	});

	it('shows loading state', () => {
		mockUseUsers.mockReturnValue({
			users: [],
			loading: true,
			error: null,
			clearError: vi.fn(),
			addUser: vi.fn(),
			lastFetched: null,
		});

		render(<UsersList />);
		expect(screen.getByText(/loading users/i)).toBeInTheDocument();
	});

	it('shows error state', () => {
		mockUseUsers.mockReturnValue({
			users: [],
			loading: false,
			error: 'Failed to fetch users',
			clearError: vi.fn(),
			addUser: vi.fn(),
			lastFetched: null,
		});

		render(<UsersList />);
		expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
	});

	it('opens modal when user row is clicked', async () => {
		render(<UsersList />);

		fireEvent.click(screen.getByText('John Doe'));

		await waitFor(() => {
			expect(screen.getByText('Contact Information')).toBeInTheDocument();
		});
	});
});
