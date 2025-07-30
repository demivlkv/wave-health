import { Link, Outlet } from 'react-router-dom';
import Button from './components/Button';

const App = () => {
	return (
		<main className='flex flex-col justify-center items-center gap-4'>
			<Outlet />
			<Button type='primary'>
				<Link to='/'>Users List</Link>
			</Button>
			<Button type='secondary'>
				<Link to='/add-user'>Add User</Link>
			</Button>
			<Button type='tertiary'>Test Two</Button>
		</main>
	);
};

export default App;
