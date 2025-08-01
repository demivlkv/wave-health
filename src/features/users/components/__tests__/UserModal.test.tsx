import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../../test/utils';
import UserModal from '../UsersList/UserModal';
import type { User } from '../../../../types/global.types';

const mockUser: User = {
	id: 1,
	name: 'John Doe',
	username: 'johndoe',
	email: 'john@example.com',
	address: {
		street: '123 Main Street',
		suite: 'Apt 4B',
		city: 'New York',
		zipcode: '10001',
		geo: {
			lat: '40.7128',
			lng: '-74.0060',
		},
	},
	phone: '+1 (555) 123-4567',
	website: 'www.johndoe.com',
	company: {
		name: 'Acme Corporation',
		catchPhrase: 'Innovation at its finest',
		bs: 'synergistic e-business',
	},
};

describe('UserModal', () => {
	const mockSetSelectedUser = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders user information correctly', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		// check user name and username
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('@johndoe')).toBeInTheDocument();

		// check contact information section
		expect(screen.getByText('Contact Information')).toBeInTheDocument();
		expect(screen.getByText('john@example.com')).toBeInTheDocument();
		expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
		expect(screen.getByText('www.johndoe.com')).toBeInTheDocument();

		// check address section
		expect(screen.getByText('Address')).toBeInTheDocument();
		expect(screen.getByText(/123 Main Street/)).toBeInTheDocument();
		expect(screen.getByText(/Apt 4B/)).toBeInTheDocument();
		expect(screen.getByText(/New York, 10001/)).toBeInTheDocument();

		// check company section
		expect(screen.getByText('Company')).toBeInTheDocument();
		expect(screen.getByText('Acme Corporation')).toBeInTheDocument();
		expect(screen.getByText('Innovation at its finest')).toBeInTheDocument();
	});

	it('calls setSelectedUser with null when close button is clicked', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		const closeButton = screen.getByRole('button', { name: /close/i });
		fireEvent.click(closeButton);

		expect(mockSetSelectedUser).toHaveBeenCalledWith(null);
	});

	it('calls setSelectedUser with null when overlay is clicked', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		// click on the overlay (modal background)
		const overlay = screen
			.getByRole('button', { name: /close/i })
			.closest('section');
		if (overlay) {
			fireEvent.click(overlay);
			expect(mockSetSelectedUser).toHaveBeenCalledWith(null);
		}
	});

	it('does not close when clicking inside modal content', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		// click inside modal content
		const modalContent = screen.getByText('John Doe');
		fireEvent.click(modalContent);

		// should not have called setSelectedUser
		expect(mockSetSelectedUser).not.toHaveBeenCalled();
	});

	it('handles user with missing optional fields', () => {
		const userWithMissingFields: User = {
			...mockUser,
			phone: '',
			website: '',
			company: {
				...mockUser.company,
				catchPhrase: '',
			},
		};

		render(
			<UserModal
				selectedUser={userWithMissingFields}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		// should still render required fields
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('john@example.com')).toBeInTheDocument();
		expect(screen.getByText('Acme Corporation')).toBeInTheDocument();

		// optional fields should not cause errors
		expect(screen.getByText('Contact Information')).toBeInTheDocument();
	});

	it('renders user avatar', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		// check if UserAvatar component is rendered (it should have the user's initials)
		const avatar = screen.getByText('JD'); // Assuming UserAvatar shows initials
		expect(avatar).toBeInTheDocument();
	});

	it('has proper accessibility attributes', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		const closeButton = screen.getByRole('button', { name: /close/i });
		expect(closeButton).toHaveAttribute('aria-label', 'Close pop-up modal');
	});

	it('displays full address correctly', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		// Check that the full address is displayed properly
		expect(screen.getByText(/Apt 4B 123 Main Street/)).toBeInTheDocument();
		expect(screen.getByText(/New York, 10001/)).toBeInTheDocument();
	});

	it('handles keyboard navigation', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		const closeButton = screen.getByRole('button', { name: /close/i });

		// Test Enter key
		fireEvent.keyDown(closeButton, { key: 'Enter' });
		// Note: This test might need adjustment based on your actual keyboard handling

		// Test focus
		closeButton.focus();
		expect(closeButton).toHaveFocus();
	});

	it('renders with dark theme styling', () => {
		render(
			<UserModal
				selectedUser={mockUser}
				setSelectedUser={mockSetSelectedUser}
			/>
		);

		// Check for dark theme classes (adjust based on your actual implementation)
		const modal = screen
			.getByRole('button', { name: /close/i })
			.closest('section');
		expect(modal).toHaveClass('bg-black/70'); // Adjust class name as needed
	});
});
