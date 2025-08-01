import { Close, Search } from '../../../../components/ui/Icons';

interface SearchBarProps {
	searchTerm: string;
	onSearch: (term: string) => void;
	onClear: () => void;
}

const SearchBar = ({ searchTerm, onSearch, onClear }: SearchBarProps) => (
	<div className='relative w-full max-w-md'>
		<div className='absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
			<Search className='size-5 text-indigo-400' />
		</div>
		<input
			id='users-list-search-bar'
			type='text'
			value={searchTerm}
			placeholder='Search users by name or email...'
			aria-label='Search users by name or email'
			onChange={(e) => onSearch(e.target.value)}
			className='block w-full px-10 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg outline-0 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-white placeholder:text-slate-400 transition-all duration-200'
		/>
		{searchTerm && (
			<button
				id='clear-search-btn'
				type='button'
				aria-label='Clear search'
				onClick={onClear}
				className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors'
			>
				<Close className='size-4' />
			</button>
		)}
	</div>
);

export default SearchBar;
