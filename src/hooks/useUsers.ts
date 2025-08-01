import { useContext } from 'react';
import { UsersContext, type UsersContextType } from '../contexts/UsersContext';

export const useUsers = (): UsersContextType => {
	const context = useContext(UsersContext);
	if (context === undefined) {
		throw new Error('useUsers must be used within a UsersProvider');
	}
	return context;
};
