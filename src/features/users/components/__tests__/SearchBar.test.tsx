import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../../../test/utils';
import SearchBar from '../UsersList/SearchBar';

describe('SearchBar', () => {
	const mockOnSearch = vi.fn();
	const mockOnClear = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders search input with placeholder', () => {
		render(
			<SearchBar
				searchTerm=''
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		expect(
			screen.getByPlaceholderText(/search users by name or email/i)
		).toBeInTheDocument();
	});

	it('calls onSearch when typing', () => {
		render(
			<SearchBar
				searchTerm=''
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'john' } });

		expect(mockOnSearch).toHaveBeenCalledWith('john');
	});

	it('shows clear button when search term exists', () => {
		render(
			<SearchBar
				searchTerm='john'
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
	});

	it('calls onClear when clear button is clicked', () => {
		render(
			<SearchBar
				searchTerm='john'
				onSearch={mockOnSearch}
				onClear={mockOnClear}
			/>
		);

		fireEvent.click(screen.getByLabelText(/clear search/i));
		expect(mockOnClear).toHaveBeenCalled();
	});
});
