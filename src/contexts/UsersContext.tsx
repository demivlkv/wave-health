/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useEffect } from 'react';
import type { User } from '../types/global.types';

interface UsersState {
	users: User[];
	loading: boolean;
	error: string | null;
	lastFetched: number | null;
}

// all possible actions that can update user state
type UsersAction =
	| { type: 'FETCH_START' } // start loading users from api
	| { type: 'FETCH_SUCCESS'; payload: User[] } // successfully loaded users
	| { type: 'FETCH_ERROR'; payload: string } // error occurred during fetch
	| { type: 'ADD_USER'; payload: User } // add new user locally
	| { type: 'CLEAR_ERROR' }; // reset error state

export interface UsersContextType extends UsersState {
	addUser: (userData: Omit<User, 'id'>) => void; // add user without id (auto-generated)
	clearError: () => void;
}

const initialState: UsersState = {
	users: [],
	loading: false,
	error: null,
	lastFetched: null,
};

// handle users state updates
const usersReducer = (state: UsersState, action: UsersAction): UsersState => {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...state,
				loading: true,
				error: null,
			};

		case 'FETCH_SUCCESS':
			// users loaded successfully & update cache timestamp
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
			// add new user to existing list (local only)
			return {
				...state,
				users: [...state.users, action.payload],
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
			return; // use cached data
		}

		dispatch({ type: 'FETCH_START' }); // start loading state

		try {
			const getUsersApi = import.meta.env.VITE_GET_USERS_API;
			const response = await fetch(getUsersApi);
			if (!response.ok) {
				throw new Error(`Failed to fetch users: ${response.status}`);
			}

			// parse json & update state
			const users = await response.json();
			dispatch({ type: 'FETCH_SUCCESS', payload: users });
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to fetch users';
			dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
		}
	};

	// auto-fetch users once on mount
	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// create context value with state and actions
	const contextValue: UsersContextType = {
		...state,

		addUser: (userData: Omit<User, 'id'>) => {
			// generate new id by finding max existing id + 1
			const newId = Math.max(...state.users.map((u) => u.id), 0) + 1;
			const newUser: User = {
				...userData,
				id: newId,
			};
			dispatch({ type: 'ADD_USER', payload: newUser });
		},

		clearError: () => {
			dispatch({ type: 'CLEAR_ERROR' });
		},
	};

	// provide context value to all child components
	return (
		<UsersContext.Provider value={contextValue}>
			{children}
		</UsersContext.Provider>
	);
};
