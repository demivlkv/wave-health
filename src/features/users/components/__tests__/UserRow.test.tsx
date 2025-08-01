import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../../test/utils';
import UserRow from '../UsersList/UserRow';
import { type User } from '../../../../types/global.types';

const mockUser: User = {
	id: 1,
	name: 'John Doe',
	username: 'johndoe',
	email: 'john@example.com',
	address: {
		street: '123 Main St',
		suite: 'Apt 1',
		city: 'New York',
		zipcode: '10001',
		geo: { lat: '0', lng: '0' },
	},
	phone: '555-1234',
	website: 'john.com',
	company: {
		name: 'Acme Corp',
		catchPhrase: 'We do things',
		bs: 'business',
	},
};

describe('UserRow', () => {
	const mockOnViewDetails = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders user information correctly', () => {
		render(
			<UserRow
				user={mockUser}
				onViewDetails={mockOnViewDetails}
			/>
		);

		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('@johndoe')).toBeInTheDocument();
		expect(screen.getByText('john@example.com')).toBeInTheDocument();
	});

	it('calls onViewDetails when clicked', () => {
		render(
			<UserRow
				user={mockUser}
				onViewDetails={mockOnViewDetails}
			/>
		);

		fireEvent.click(screen.getByRole('button'));
		expect(mockOnViewDetails).toHaveBeenCalledWith(mockUser);
	});

	it('calls onViewDetails when Enter key is pressed', () => {
		render(
			<UserRow
				user={mockUser}
				onViewDetails={mockOnViewDetails}
			/>
		);

		const button = screen.getByRole('button');
		fireEvent.keyDown(button, { key: 'Enter' });
		expect(mockOnViewDetails).toHaveBeenCalledWith(mockUser);
	});

	it('has proper accessibility attributes', () => {
		render(
			<UserRow
				user={mockUser}
				onViewDetails={mockOnViewDetails}
			/>
		);

		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('aria-label', 'View details for John Doe');
		expect(button).toHaveAttribute('tabIndex', '0');
	});
});
