import { useState } from 'react';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

	return (
		<div className='h-screen flex'>
			<Sidebar
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
				isExpanded={isSidebarExpanded}
				setIsExpanded={setIsSidebarExpanded}
			/>
			<div className='flex-1 flex flex-col'>
				<Header
					isMobileMenuOpen={isMobileMenuOpen}
					setIsMobileMenuOpen={setIsMobileMenuOpen}
					isSidebarExpanded={isSidebarExpanded}
					setIsSidebarExpanded={setIsSidebarExpanded}
				/>
				<Container>
					<main className='flex-1 overflow-auto'>{children}</main>
				</Container>
				<Footer />
			</div>
		</div>
	);
};
export default DashBoardLayout;
