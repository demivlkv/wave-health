import { useMemo, useState } from 'react';
import { useFetchUsers } from '../../../../hooks/useFetchUsers';
import type { User } from '../../../../types/global.types';
import type { SortConfig } from '../../users.types';
import SortableHeader from './SortableHeader';
import UserRow from './UserRow';
import UserModal from './UserModal';
import SearchBar from './SearchBar';

const UsersList = () => {
	const { users, loading, error } = useFetchUsers();

	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'name',
		direction: 'asc',
	});
	const [currentPage, setCurrentPage] = useState<number>(1);
	const usersPerPage = 10;

	const sortedUsers = useMemo(() => {
		return [...users].sort((a, b) => {
			const getValue = (user: User): string => {
				switch (sortConfig.key) {
					case 'name':
						return user.name;
					case 'email':
						return user.email;
					case 'address.city':
						return user.address.city;
					case 'company.name':
						return user.company.name;
					default:
						return '';
				}
			};

			const aValue = getValue(a);
			const bValue = getValue(b);

			const comparison = aValue.localeCompare(bValue, undefined, {
				numeric: true,
				sensitivity: 'base',
			});

			return sortConfig.direction === 'asc' ? comparison : -comparison;
		});
	}, [users, sortConfig]);

	// pagination calculations
	const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
	const startIndex = (currentPage - 1) * usersPerPage;
	const currentUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);

	// reset to first page when search term changes
	const handleSearch = (term: string) => {
		setSearchTerm(term);
		setCurrentPage(1); // reset pagination when searching
	};

	const handleClearSearch = () => {
		setSearchTerm('');
		setCurrentPage(1);
	};

	const handleSort = (key: SortConfig['key']) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
		}));
	};

	const handleViewDetails = (user: User) => {
		setSelectedUser(user);
	};

	if (loading) {
		return (
			<div className='flex flex-col items-center gap-4 justify-center py-12'>
				<div className='animate-spin size-8 border-b-2 border-primary rounded-full'></div>
				<span className='ml-3 text-gray-600'>Loading users...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700'>
				<strong>Error:</strong> {error}
			</div>
		);
	}

	return (
		<>
			<h1 className='mb-4'>Users List</h1>
			<section className='my-4 flex justify-between items-center gap-4'>
				<p className='text-sm text-gray-500 mt-1'>
					{searchTerm ? (
						<>
							Page {currentPage} of {totalPages} • {sortedUsers.length} result
							{sortedUsers.length !== 1 ? 's' : ''}
						</>
					) : (
						<>
							Page {currentPage} of {totalPages} • {sortedUsers.length} total
							users
						</>
					)}
				</p>

				<SearchBar
					searchTerm={searchTerm}
					onSearch={handleSearch}
					onClear={handleClearSearch}
				/>
			</section>

			<section>
				{/* Table Header */}
				<div className='px-6 py-4 border-y border-gray-200 bg-gray-50'>
					<div className='grid grid-cols-12 gap-4 items-center'>
						{/* Name Header */}
						<div className='col-span-4'>
							<SortableHeader
								column='name'
								currentSort={sortConfig}
								onSort={handleSort}
							>
								Name
							</SortableHeader>
						</div>

						{/* Email Header */}
						<div className='col-span-3'>
							<SortableHeader
								column='email'
								currentSort={sortConfig}
								onSort={handleSort}
							>
								Email
							</SortableHeader>
						</div>

						{/* City Header */}
						<div className='col-span-2 hidden md:block'>
							<SortableHeader
								column='address.city'
								currentSort={sortConfig}
								onSort={handleSort}
							>
								City
							</SortableHeader>
						</div>

						{/* Company Header */}
						<div className='col-span-2 hidden lg:block'>
							<SortableHeader
								column='company.name'
								currentSort={sortConfig}
								onSort={handleSort}
							>
								Company
							</SortableHeader>
						</div>

						{/* Action Header */}
						<div className='col-span-1 flex justify-end'>
							<span className='sr-only text-xs font-medium text-gray-500 uppercase tracking-wide'>
								Action
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Users List */}
			<section className='list-none flex flex-col gap-4'>
				{currentUsers.map((user) => (
					<UserRow
						key={user.id}
						user={user}
						onViewDetails={handleViewDetails}
					/>
				))}
			</section>

			{/* Pagination Footer */}
			<section className='px-6 py-4 bg-gray-50 border-y border-gray-200'>
				<div className='flex items-center justify-between gap-4'>
					<div className='flex items-center gap-2'>
						<button
							type='button'
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className='px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							Previous
						</button>
						<button
							type='button'
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className='px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							Next
						</button>
					</div>

					<p className='text-sm text-gray-600'>
						Showing {startIndex + 1}-
						{Math.min(startIndex + usersPerPage, sortedUsers.length)} of{' '}
						{sortedUsers.length} users
					</p>
				</div>
			</section>

			{/* User Details Modal */}
			{selectedUser && (
				<UserModal
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
				/>
			)}
		</>
	);
};
export default UsersList;
