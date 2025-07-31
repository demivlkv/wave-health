import { ChevronsRight } from '../ui/Icons';

interface HeaderProps {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (open: boolean) => void;
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: (expanded: boolean) => void;
}

const Header = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	isSidebarExpanded,
	setIsSidebarExpanded,
}: HeaderProps) => {
	const toggleSidebar = () => {
		if (window.innerWidth < 1024) {
			setIsMobileMenuOpen(!isMobileMenuOpen); // toggle mobile menu
		} else {
			setIsSidebarExpanded(!isSidebarExpanded); // toggle sidebar
		}
	};

	return (
		<header className='sticky top-0 z-10 px-4 lg:px-6 py-4 bg-white border-b border-gray-200'>
			<div className='flex items-center justify-between gap-4'>
				<button
					type='button'
					aria-label='Toggle Sidebar Navigation'
					onClick={toggleSidebar}
					className='p-2 bg-primary hover:bg-primary-dark rounded-md text-white transition-all duration-300 ease-in-out'
				>
					<ChevronsRight
						className={`size-6 ${isSidebarExpanded ? 'rotate-180' : ''}`}
					/>
				</button>
			</div>
		</header>
	);
};
export default Header;
