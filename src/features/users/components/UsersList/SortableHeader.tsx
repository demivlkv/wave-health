import type { SortConfig } from '../../users.types';
import { ChevronDown, ChevronUp } from '../../../../components/ui/Icons';

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
			className={`flex items-center space-x-1 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors uppercase tracking-wide text-left ${className}`}
		>
			<span>{children}</span>
			{isActive ? (
				currentSort.direction === 'asc' ? (
					<ChevronUp className='size-3 text-cyan-300' />
				) : (
					<ChevronDown className='size-3 text-cyan-300' />
				)
			) : (
				<ChevronDown className='size-3 text-cyan-300' />
			)}
		</button>
	);
};

export default SortableHeader;
