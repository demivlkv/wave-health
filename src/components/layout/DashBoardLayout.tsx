import { useState } from 'react';
import Container from './Container';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);

	return (
		<div className='h-screen flex overflow-hidden'>
			<Sidebar
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
				isExpanded={isSidebarExpanded}
				setIsExpanded={setIsSidebarExpanded}
			/>
			<div className='flex-1 flex flex-col min-h-0'>
				<Header
					isMobileMenuOpen={isMobileMenuOpen}
					setIsMobileMenuOpen={setIsMobileMenuOpen}
					isSidebarExpanded={isSidebarExpanded}
					setIsSidebarExpanded={setIsSidebarExpanded}
				/>
				<Container>
					<main>{children}</main>
				</Container>
				<Footer />
			</div>
		</div>
	);
};
export default DashboardLayout;
