/* eslint-disable react-refresh/only-export-components */
import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from '../contexts/UsersContext';

// custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<BrowserRouter>
			<UsersProvider>{children}</UsersProvider>
		</BrowserRouter>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
