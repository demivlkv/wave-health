import { Close, Search } from '../../../../components/ui/Icons';

interface SearchBarProps {
	searchTerm: string;
	onSearch: (term: string) => void;
	onClear: () => void;
}

const SearchBar = ({ searchTerm, onSearch, onClear }: SearchBarProps) => (
	<div className='relative w-full max-w-md'>
		<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
			<Search className='size-5 text-gray-400' />
		</div>
		<input
			id='users-list-search-bar'
			type='text'
			value={searchTerm}
			placeholder='Search users by name or email...'
			aria-label='Search users by name or email'
			onChange={(e) => onSearch(e.target.value)}
			className='block w-full px-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm'
		/>
		{searchTerm && (
			<button
				id='clear-search-btn'
				type='button'
				aria-label='Clear search'
				onClick={onClear}
				className='absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors'
			>
				<Close className='size-4 text-gray-400' />
			</button>
		)}
	</div>
);

export default SearchBar;
