import { Outlet } from 'react-router-dom';
import DashBoardLayout from './components/layout/DashBoardLayout';

const App = () => {
	return (
		<DashBoardLayout>
			<Outlet />
		</DashBoardLayout>
	);
};

export default App;
