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
		<header className='sticky top-0 z-10 px-4 lg:px-6 py-4 bg-slate-900/75 backdrop-blur-xl border-b border-white/10'>
			<div className='flex items-center justify-between gap-4'>
				<button
					type='button'
					aria-label='Toggle Sidebar Navigation'
					onClick={toggleSidebar}
					className='p-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 rounded-md text-white transition-all duration-200 shadow-lg shadow-indigo-500/25'
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
