import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../../../test/utils';
import AddUserForm from '../AddUser/AddUserForm';

describe('AddUserForm', () => {
	const mockOnSubmit = vi.fn();
	const mockOnCancel = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders all form fields', () => {
		render(
			<AddUserForm
				onSubmit={mockOnSubmit}
				onCancel={mockOnCancel}
			/>
		);

		expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
	});

	it('shows validation errors for required fields', async () => {
		render(
			<AddUserForm
				onSubmit={mockOnSubmit}
				onCancel={mockOnCancel}
			/>
		);

		fireEvent.click(screen.getByText(/create user/i));

		await waitFor(() => {
			expect(
				screen.getByText(/please fix the following errors/i)
			).toBeInTheDocument();
		});
	});

	it('calls onSubmit with valid form data', async () => {
		render(
			<AddUserForm
				onSubmit={mockOnSubmit}
				onCancel={mockOnCancel}
			/>
		);

		// Fill required fields
		fireEvent.change(screen.getByLabelText(/full name/i), {
			target: { value: 'John Doe' },
		});
		fireEvent.change(screen.getByLabelText(/username/i), {
			target: { value: 'johndoe' },
		});
		fireEvent.change(screen.getByLabelText(/email address/i), {
			target: { value: 'john@example.com' },
		});
		fireEvent.change(screen.getByLabelText(/city/i), {
			target: { value: 'New York' },
		});
		fireEvent.change(screen.getByLabelText(/company name/i), {
			target: { value: 'Acme Corp' },
		});

		fireEvent.click(screen.getByText(/create user/i));

		await waitFor(() => {
			expect(mockOnSubmit).toHaveBeenCalledWith(
				expect.objectContaining({
					name: 'John Doe',
					username: 'johndoe',
					email: 'john@example.com',
					address: expect.objectContaining({
						city: 'New York',
					}),
					company: expect.objectContaining({
						name: 'Acme Corp',
					}),
				})
			);
		});
	});

	it('calls onCancel when cancel button is clicked', () => {
		render(
			<AddUserForm
				onSubmit={mockOnSubmit}
				onCancel={mockOnCancel}
			/>
		);

		fireEvent.click(screen.getByText(/cancel/i));
		expect(mockOnCancel).toHaveBeenCalled();
	});
});
