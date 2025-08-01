import { useLocation, useNavigate } from 'react-router-dom';
import UserAvatar from '../ui/UserAvatar';
import {
	ChevronUp,
	Close,
	Logout,
	Settings,
	User,
	UserPlus,
} from '../ui/Icons';

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
							className={`relative w-full px-4 py-3 flex items-center text-left rounded-md transition-all duration-200
								${
									isActive
										? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white'
										: 'text-slate-300 hover:bg-white/5 hover:text-white'
								}
								${!isExpanded && !isMobile ? 'justify-center' : 'space-x-3'}
							`}
							title={!isExpanded && !isMobile ? item.label : undefined}
							aria-label={item.label}
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
			className={`border-t border-white/10 ${
				isMobile ? 'absolute bottom-0 left-0 right-0' : ''
			}`}
		>
			<button
				type='button'
				className={`
					w-full px-4 py-3 flex items-center hover:bg-white/5 text-slate-300 hover:text-white transition-colors
					${!isExpanded && !isMobile ? 'justify-center' : 'space-x-3'}
				`}
				aria-label='Scroll to Top'
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
					w-full px-4 py-3 flex items-center transition-colors bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white
					${!isExpanded && !isMobile ? 'justify-center' : 'space-x-3'}
				`}
				aria-label='Logout'
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
					z-30 hidden md:flex flex-col h-screen bg-slate-900/95 backdrop-blur-xl border-r border-white/10 font-outfit font-medium transition-all duration-200
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
					{isExpanded && (
						<span className='text-white font-semibold'>Wave Health</span>
					)}
				</section>

				<nav className='flex-1 py-5'>
					<NavigationItems />
				</nav>

				<BottomActions />
			</aside>

			{/* Mobile Sidebar */}
			<aside
				className={`
					z-30 fixed md:hidden left-0 top-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300
					${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
				`}
			>
				<section className='px-4 pt-5 flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<button
							type='button'
							className='size-8 flex items-center justify-center'
							onClick={handleHeaderClick}
						>
							<UserAvatar />
						</button>
						<span className='text-white font-semibold'>Wave Health</span>
					</div>

					{/* Close Button */}
					<button
						type='button'
						onClick={handleHeaderClick}
						className='p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors'
						aria-label='Close navigation menu'
					>
						<Close className='size-5' />
					</button>
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
