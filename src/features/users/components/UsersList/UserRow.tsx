import type { User } from '../../../../types/global.types';
import UserAvatar from '../../../../components/ui/UserAvatar';
import { ChevronUp } from '../../../../components/ui/Icons';

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
			className='py-6 px-5 md:py-4 md:px-6 group grid grid-cols-12 items-center gap-4 hover:bg-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-inset cursor-pointer'
		>
			{/* Name Column */}
			<div className='col-span-5 md:col-span-4 flex items-center space-x-3'>
				<UserAvatar name={user.name} />
				<div className='min-w-0 flex-1'>
					<h3 className='text-sm font-medium text-white truncate group-hover:text-cyan-300 transition-colors'>
						{user.name}
					</h3>
					<p className='text-xs text-slate-400 truncate'>@{user.username}</p>
				</div>
			</div>

			{/* Email Column */}
			<div className='col-span-6 md:col-span-3'>
				<p className='text-sm text-slate-300 truncate group-hover:text-slate-200 transition-colors'>
					{user.email}
				</p>
			</div>

			{/* City Column */}
			<div className='col-span-2 hidden md:block'>
				<p className='text-sm text-slate-300 truncate group-hover:text-slate-200 transition-colors'>
					{user.address.city}
				</p>
			</div>

			{/* Company Column */}
			<div className='col-span-2 hidden md:block'>
				<p className='text-sm text-slate-300 truncate group-hover:text-slate-200 transition-colors'>
					{user.company.name}
				</p>
			</div>

			{/* Action Column */}
			<div className='col-span-1 flex justify-end text-slate-500 group-hover:text-cyan-400 transition-colors'>
				<ChevronUp className='size-5 rotate-90 group-hover:scale-110 transition-transform duration-200' />
			</div>
		</article>
	);
};
export default UserRow;
