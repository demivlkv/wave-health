import type { User } from '../../types/global.types';

export interface SortConfig {
	key: keyof User | 'address.city' | 'company.name';
	direction: 'asc' | 'desc';
}
