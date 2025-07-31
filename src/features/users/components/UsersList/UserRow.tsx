import { ChevronUp } from '../../../../components/ui/Icons';
import UserAvatar from '../../../../components/ui/UserAvatar';
import type { User } from '../../../../types/global.types';

interface UserRowProps {
	user: User;
	onViewDetails: (user: User) => void;
}

const UserRow = ({ user, onViewDetails }: UserRowProps) => {
	const handleClick = () => {
		onViewDetails(user);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onViewDetails(user);
		}
	};

	return (
		<article
			role='button'
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			aria-label={`View details for ${user.name}`}
			className='grid grid-cols-12 gap-4 items-center py-4 px-6 hover:bg-gray-50 transition-colors border-b border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset cursor-pointer'
		>
			{/* Name Column */}
			<div className='col-span-4 flex items-center space-x-3'>
				<UserAvatar name={user.name} />
				<div className='min-w-0 flex-1'>
					<h3 className='text-sm font-medium text-gray-900 truncate'>
						{user.name}
					</h3>
					<p className='text-xs text-gray-500 truncate'>@{user.username}</p>
				</div>
			</div>

			{/* Email Column */}
			<div className='col-span-3'>
				<p className='text-sm text-gray-600 truncate'>{user.email}</p>
			</div>

			{/* City Column */}
			<div className='col-span-2 hidden md:block'>
				<p className='text-sm text-gray-600 truncate'>{user.address.city}</p>
			</div>

			{/* Company Column */}
			<div className='col-span-2 hidden lg:block'>
				<p className='text-sm text-gray-600 truncate'>{user.company.name}</p>
			</div>

			{/* Action Column */}

			<div className='col-span-1 flex justify-end text-gray-400 group-hover:text-primary transition-colors'>
				<ChevronUp className='size-5 rotate-90' />
			</div>
		</article>
	);
};
export default UserRow;
