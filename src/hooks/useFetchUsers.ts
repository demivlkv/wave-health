import { useEffect, useState } from 'react';
import type { User } from '../types/global.types';

export const useFetchUsers = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const getUsersApi = import.meta.env.VITE_GET_USERS_API;

				if (!getUsersApi) {
					throw new Error('API URL not found in environment variables');
				}

				const response = await fetch(getUsersApi);

				if (!response.ok) {
					throw new Error(`HTTP error status: ${response.status}`);
				}

				const data = await response.json();
				setUsers(data);
			} catch (error: unknown) {
				setError(
					error instanceof Error
						? error.message
						: 'An unexpected error occurred'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	return { users, loading, error };
};
