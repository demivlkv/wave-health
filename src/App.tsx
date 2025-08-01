import { Outlet } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import { UsersProvider } from './contexts/UsersContext';

const App = () => {
	return (
		<UsersProvider>
			<DashboardLayout>
				<Outlet />
			</DashboardLayout>
		</UsersProvider>
	);
};

export default App;
