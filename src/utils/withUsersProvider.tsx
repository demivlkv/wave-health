import React from 'react';
import { UsersProvider } from '../contexts/UsersContext';

export const withUsersProvider = <P extends object>(
	Component: React.ComponentType<P>
) => {
	const WrappedComponent = (props: P) => (
		<UsersProvider>
			<Component {...props} />
		</UsersProvider>
	);

	// set display name for debugging purposes
	WrappedComponent.displayName = `withUsersProvider(${
		Component.displayName || Component.name
	})`;

	return WrappedComponent;
};
