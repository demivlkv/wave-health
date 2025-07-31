import { useLocation, useNavigate } from 'react-router-dom';
import UserAvatar from '../ui/UserAvatar';
import { ChevronUp, Logout, Settings, User, UserPlus } from '../ui/Icons';

interface SidebarProps {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (open: boolean) => void;
	isExpanded: boolean;
	setIsExpanded: (expanded: boolean) => void;
}

const Sidebar = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	isExpanded,
	setIsExpanded,
}: SidebarProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const menuItems = [
		{ id: 'users', label: 'Users', url: '/', icon: User },
		{ id: 'add-user', label: 'Add User', url: '/add-user', icon: UserPlus },
		{ id: 'settings', label: 'Settings', url: '/settings', icon: Settings },
	];

	const isActiveRoute = (url: string) => {
		if (url === '/') {
			return location.pathname === '/';
		}
		return location.pathname.startsWith(url);
	};

	return (
		<>
			{/* Desktop Sidebar */}
			<aside
				className={`
          hidden lg:flex flex-col h-screen bg-white border-r border-gray-200 font-outfit font-medium transition-all duration-200 z-30
          ${isExpanded ? 'w-64' : 'w-16'}
        `}
			>
				{/* Expand/Collapse Button */}
				<section className='px-4 pt-5 inline-flex items-center gap-4'>
					<button
						type='button'
						className='size-8 flex items-center justify-center'
						onClick={() => setIsExpanded(!isExpanded)}
					>
						<UserAvatar />
					</button>
					{isExpanded ? <span className=''>Wave Health</span> : null}
				</section>

				{/* Navigation */}
				<nav className='flex-1 py-5'>
					<ul className='space-y-1'>
						{menuItems.map((item) => {
							const Icon = item.icon;
							const isActive = isActiveRoute(item.url);
							return (
								<li
									key={item.id}
									className='px-2'
								>
									<button
										type='button'
										onClick={() => navigate(item.url)}
										className={`
                      w-full flex items-center px-4 py-3 text-left rounded-md transition-all duration-200 relative
                      ${
												isActive
													? 'bg-primary-light text-white'
													: 'text-gray-600 hover:bg-secondary-light/30 hover:text-gray-900'
											}
                      ${!isExpanded ? 'justify-center' : 'space-x-3'}
                    `}
										title={!isExpanded ? item.label : undefined}
									>
										<Icon className='flex-shrink-0 size-5' />
										<span
											className={`transition-all duration-200 overflow-hidden whitespace-nowrap ${
												isExpanded ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0'
											}`}
										>
											{item.label}
										</span>
									</button>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* Scroll to Top & Logout */}
				<div className='border-t border-gray-200'>
					<button
						className={`
              w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors
              ${!isExpanded ? 'justify-center' : 'space-x-3'}
            `}
						title={!isExpanded ? 'Scroll to Top' : undefined}
					>
						<div className='w-5 h-5 flex items-center justify-center'>
							<ChevronUp />
						</div>
						<span
							className={`transition-all duration-200 overflow-hidden whitespace-nowrap ${
								isExpanded ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0'
							}`}
						>
							Scroll to Top
						</span>
					</button>

					<button
						type='button'
						className={`
              w-full flex items-center px-4 py-3 bg-primary-light hover:bg-gray-800 text-white transition-colors
              ${!isExpanded ? 'justify-center' : 'space-x-3'}
            `}
						title={!isExpanded ? 'Logout' : undefined}
					>
						<div className='size-5 flex items-center justify-center'>
							<Logout />
						</div>
						<span
							className={`transition-all duration-200 overflow-hidden whitespace-nowrap ${
								isExpanded ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0'
							}`}
						>
							Logout
						</span>
					</button>
				</div>
			</aside>

			{/* Mobile Sidebar */}
			<aside
				className={`
        lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-30
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
			>
				{/* Expand/Collapse Button */}
				<div className='p-4'>
					<button
						className='size-8 flex items-center justify-center'
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<UserAvatar />
					</button>
				</div>

				{/* Navigation */}
				<nav className='py-4'>
					<ul className='space-y-1'>
						{menuItems.map((item) => {
							const Icon = item.icon;
							const isActive = isActiveRoute(item.url);
							return (
								<li key={item.id}>
									<button
										type='button'
										aria-label={item.label}
										onClick={() => {
											navigate(item.url);
											setIsMobileMenuOpen(false);
										}}
										className={`
                      w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors relative
                      ${
												isActive
													? 'bg-blue-50 text-blue-600 border-r-2 border-blue-500'
													: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
											}
                    `}
									>
										<Icon className='size-5' />
										<span>{item.label}</span>
									</button>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* Scroll to Top & Logout */}
				<div className='absolute bottom-0 left-0 right-0 border-t border-gray-200'>
					<button className='w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors'>
						<ChevronUp />
						<span>Scroll to Top</span>
					</button>

					<button className='w-full flex items-center space-x-3 px-4 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors'>
						<Logout />
						<span>Logout</span>
					</button>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
