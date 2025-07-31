import { Outlet } from 'react-router-dom';
import DashboardLayout from './components/layout/DashBoardLayout';

const App = () => {
	return (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	);
};

export default App;
