import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { lazy } from 'react';
const App = lazy(() => import('../App'));
import dashboardRoutes from './dashboardRoutes';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		children: [...dashboardRoutes],
	},
];

const router = createBrowserRouter(routes, {
	basename: '/wave-health',
	future: {
		v7_relativeSplatPath: true,
		v7_fetcherPersist: true,
		v7_normalizeFormMethod: true,
		v7_partialHydration: true,
		v7_skipActionErrorRevalidation: true,
	},
});

export default router;
