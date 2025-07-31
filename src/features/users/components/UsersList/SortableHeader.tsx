import { ChevronDown, ChevronUp } from '../../../../components/ui/Icons';
import type { SortConfig } from '../../users.types';

interface SortableHeaderProps {
	column: SortConfig['key'];
	currentSort: SortConfig;
	onSort: (key: SortConfig['key']) => void;
	children: React.ReactNode;
	className?: string;
}

const SortableHeader = ({
	column,
	currentSort,
	onSort,
	children,
	className = '',
}: SortableHeaderProps) => {
	const isActive = currentSort.key === column;

	return (
		<button
			type='button'
			id={`sort-${column}-btn`}
			aria-label={`Sort by ${column}`}
			onClick={() => onSort(column)}
			className={`flex items-center space-x-1 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors uppercase tracking-wide text-left ${className}`}
		>
			<span>{children}</span>
			{isActive ? (
				currentSort.direction === 'asc' ? (
					<ChevronUp className='size-3' />
				) : (
					<ChevronDown className='size-3' />
				)
			) : (
				<ChevronDown className='size-3 opacity-30' />
			)}
		</button>
	);
};

export default SortableHeader;
