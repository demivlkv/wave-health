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

	const handleNavigation = (url: string) => {
		navigate(url);
		setIsMobileMenuOpen(false);
	};

	const handleHeaderClick = () => {
		if (window.innerWidth >= 1024) {
			setIsExpanded(!isExpanded);
		} else {
			setIsMobileMenuOpen(false);
		}
	};

	const NavigationItems = ({ isMobile = false }: { isMobile?: boolean }) => (
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
							onClick={() => handleNavigation(item.url)}
							className={`relative w-full flex items-center px-4 py-3 text-left rounded-md transition-all duration-200
								${
									isActive
										? 'bg-primary text-white'
										: 'text-gray-600 hover:bg-secondary/30 hover:text-gray-900'
								}
								${!isExpanded && !isMobile ? 'justify-center' : 'space-x-3'}
							`}
							title={!isExpanded && !isMobile ? item.label : undefined}
							aria-label={isMobile ? item.label : undefined}
						>
							<Icon className='flex-shrink-0 size-5' />
							<span
								className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
									isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
								}`}
							>
								{item.label}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	);

	const BottomActions = ({ isMobile = false }: { isMobile?: boolean }) => (
		<section
			className={`border-t border-gray-200 ${
				isMobile ? 'absolute bottom-0 left-0 right-0' : ''
			}`}
		>
			<button
				type='button'
				className={`
					w-full flex items-center px-4 py-3 hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors
					${!isExpanded && !isMobile ? 'justify-center' : 'space-x-3'}
				`}
				title={!isExpanded && !isMobile ? 'Scroll to Top' : undefined}
			>
				<div className='size-5 flex items-center justify-center'>
					<ChevronUp />
				</div>
				<span
					className={
						isMobile
							? ''
							: `overflow-hidden whitespace-nowrap transition-all duration-200 ${
									isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
							  }`
					}
				>
					Scroll to Top
				</span>
			</button>

			<button
				type='button'
				className={`
					w-full flex items-center px-4 py-3 transition-colors bg-primary hover:bg-gray-800 text-white
					${!isExpanded && !isMobile ? 'justify-center' : ''}
				`}
				title={!isExpanded && !isMobile ? 'Logout' : undefined}
			>
				<div className='size-5 flex items-center justify-center'>
					<Logout />
				</div>
				<span
					className={
						isMobile
							? ''
							: `transition-all duration-200 overflow-hidden whitespace-nowrap ${
									isExpanded ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0'
							  }`
					}
				>
					Logout
				</span>
			</button>
		</section>
	);

	return (
		<>
			{/* Desktop Sidebar */}
			<aside
				className={`
					z-30 hidden md:flex flex-col h-screen bg-white border-r border-gray-200 font-outfit font-medium transition-all duration-200
					${isExpanded ? 'w-64' : 'w-16'}
				`}
			>
				<section className='px-4 pt-5 inline-flex items-center gap-4'>
					<button
						type='button'
						className='size-8 flex items-center justify-center'
						onClick={handleHeaderClick}
					>
						<UserAvatar />
					</button>
					{isExpanded && <span>Wave Health</span>}
				</section>

				<nav className='flex-1 py-5'>
					<NavigationItems />
				</nav>

				<BottomActions />
			</aside>

			{/* Mobile Sidebar */}
			<aside
				className={`
					z-30 fixed md:hidden left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300
					${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
				`}
			>
				<section className='px-4 pt-5 inline-flex items-center gap-4'>
					<button
						type='button'
						aria-label='Close Menu'
						onClick={handleHeaderClick}
						className='size-8 flex items-center justify-center'
					>
						<UserAvatar />
					</button>
					{isMobileMenuOpen && <span>Wave Health</span>}
				</section>

				<nav className='py-4'>
					<NavigationItems isMobile />
				</nav>

				<BottomActions isMobile />
			</aside>
		</>
	);
};

export default Sidebar;
