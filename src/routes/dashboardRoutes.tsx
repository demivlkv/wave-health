import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
const UsersList = lazy(() => import('../features/users/components/UsersList'));
const AddUser = lazy(() => import('../features/users/components/AddUser'));

const dashboardRoutes: RouteObject[] = [
	{ path: '/', element: <UsersList /> },
	{
		path: '/add-user',
		element: <AddUser />,
	},
];

export default dashboardRoutes;
