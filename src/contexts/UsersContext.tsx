/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useEffect } from 'react';
import type { User } from '../types/global.types';

interface UsersState {
	users: User[];
	loading: boolean;
	error: string | null;
	lastFetched: number | null;
}

type UsersAction =
	| { type: 'FETCH_START' }
	| { type: 'FETCH_SUCCESS'; payload: User[] }
	| { type: 'FETCH_ERROR'; payload: string }
	| { type: 'ADD_USER'; payload: User }
	| { type: 'UPDATE_USER'; payload: User }
	| { type: 'DELETE_USER'; payload: number }
	| { type: 'CLEAR_ERROR' };

export interface UsersContextType extends UsersState {
	addUser: (userData: Omit<User, 'id'>) => void;
	updateUser: (user: User) => void;
	deleteUser: (id: number) => void;
	refetchUsers: () => void;
	clearError: () => void;
}

const initialState: UsersState = {
	users: [],
	loading: false,
	error: null,
	lastFetched: null,
};

const usersReducer = (state: UsersState, action: UsersAction): UsersState => {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...state,
				loading: true,
				error: null,
			};

		case 'FETCH_SUCCESS':
			return {
				...state,
				loading: false,
				users: action.payload,
				error: null,
				lastFetched: Date.now(),
			};

		case 'FETCH_ERROR':
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case 'ADD_USER':
			return {
				...state,
				users: [...state.users, action.payload],
			};

		case 'UPDATE_USER':
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.payload.id ? action.payload : user
				),
			};

		case 'DELETE_USER':
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.payload),
			};

		case 'CLEAR_ERROR':
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};

export const UsersContext = createContext<UsersContextType | undefined>(
	undefined
);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(usersReducer, initialState);

	const fetchUsers = async () => {
		// skip if data is fresh (less than 10 minutes old)
		const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
		if (state.lastFetched && Date.now() - state.lastFetched < CACHE_DURATION) {
			return;
		}

		dispatch({ type: 'FETCH_START' });

		try {
			const getUsersApi = import.meta.env.VITE_GET_USERS_API;
			const response = await fetch(getUsersApi);
			if (!response.ok) {
				throw new Error(`Failed to fetch users: ${response.status}`);
			}

			const users = await response.json();
			dispatch({ type: 'FETCH_SUCCESS', payload: users });
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to fetch users';
			dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
		}
	};

	// auto-fetch on mount
	useEffect(() => {
		fetchUsers();
	}, []);

	const contextValue: UsersContextType = {
		...state,

		addUser: (userData: Omit<User, 'id'>) => {
			// generate new ID
			const newId = Math.max(...state.users.map((u) => u.id), 0) + 1;
			const newUser: User = {
				...userData,
				id: newId,
			};
			dispatch({ type: 'ADD_USER', payload: newUser });
		},

		updateUser: (user: User) => {
			dispatch({ type: 'UPDATE_USER', payload: user });
		},

		deleteUser: (id: number) => {
			dispatch({ type: 'DELETE_USER', payload: id });
		},

		refetchUsers: fetchUsers,

		clearError: () => {
			dispatch({ type: 'CLEAR_ERROR' });
		},
	};

	return (
		<UsersContext.Provider value={contextValue}>
			{children}
		</UsersContext.Provider>
	);
};
