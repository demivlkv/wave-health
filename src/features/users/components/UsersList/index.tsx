import { useMemo, useState } from 'react';

import { useUsers } from '../../../../hooks/useUsers';
import type { User as UserType } from '../../../../types/global.types';
import type { SortConfig } from '../../users.types';
import { filterUsers, sortUsers } from '../../utils/helpers';

import SortableHeader from './SortableHeader';
import UserRow from './UserRow';
import UserModal from './UserModal';
import SearchBar from './SearchBar';
import { Search, User } from '../../../../components/ui/Icons';

const UsersList = () => {
	const { users, loading, error, clearError } = useUsers();

	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'name',
		direction: 'asc',
	});
	const [currentPage, setCurrentPage] = useState<number>(1);
	const usersPerPage = 10;

	// filter users based on search term
	const filteredUsers = useMemo(() => {
		return filterUsers(users, searchTerm);
	}, [users, searchTerm]);

	// sort the filtered users
	const sortedUsers = useMemo(() => {
		return sortUsers(filteredUsers, sortConfig);
	}, [filteredUsers, sortConfig]);

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

	const handleViewDetails = (user: UserType) => {
		setSelectedUser(user);
	};

	if (loading) {
		return (
			<div className='max-w-6xl mx-auto'>
				<div className='mb-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl'>
					<div className='flex flex-col items-center gap-4 justify-center py-12'>
						<div className='animate-spin size-8 border-b-2 border-indigo-500 rounded-full'></div>
						<span className='text-slate-300'>Loading users...</span>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='max-w-6xl mx-auto'>
				<div className='mb-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-6'>
					<div className='bg-red-900/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm'>
						<div className='flex items-center justify-between'>
							<div className='text-red-300'>
								<strong>Error:</strong> {error}
							</div>
							<button
								type='button'
								onClick={clearError}
								aria-label='Dismiss error message'
								className='text-red-400 hover:text-red-300 underline transition-colors'
							>
								Dismiss
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-6xl mx-auto'>
			{/* Main Card Container */}
			<div className='mb-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl'>
				{/* Header Section */}
				<section className='px-6 py-4 border-b border-white/10'>
					<div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg shadow-lg shadow-indigo-500/25'>
								<User className='size-6 text-white' />
							</div>
							<div className='space-y-1'>
								<h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>
									Users List
								</h1>
								<p className='text-sm text-slate-400'>
									{searchTerm ? (
										<>
											Page {currentPage} of {totalPages} • {sortedUsers.length}{' '}
											result
											{sortedUsers.length !== 1 ? 's' : ''}
										</>
									) : (
										<>
											Page {currentPage} of {totalPages} • {sortedUsers.length}{' '}
											total users
										</>
									)}
								</p>
							</div>
						</div>

						<SearchBar
							searchTerm={searchTerm}
							onSearch={handleSearch}
							onClear={handleClearSearch}
						/>
					</div>
				</section>

				{/* Table Section */}
				<section>
					{/* Table Header */}
					<article className='px-6 py-4 bg-slate-800/50 backdrop-blur-sm border-b border-white/10'>
						<div className='grid grid-cols-12 gap-4 items-center'>
							<div className='col-span-5 md:col-span-4'>
								<SortableHeader
									column='name'
									currentSort={sortConfig}
									onSort={handleSort}
								>
									Name
								</SortableHeader>
							</div>
							<div className='col-span-6 md:col-span-3'>
								<SortableHeader
									column='email'
									currentSort={sortConfig}
									onSort={handleSort}
								>
									Email
								</SortableHeader>
							</div>
							<div className='col-span-2 hidden md:block'>
								<SortableHeader
									column='address.city'
									currentSort={sortConfig}
									onSort={handleSort}
								>
									City
								</SortableHeader>
							</div>
							<div className='col-span-2 hidden lg:block'>
								<SortableHeader
									column='company.name'
									currentSort={sortConfig}
									onSort={handleSort}
								>
									Company
								</SortableHeader>
							</div>
							<div className='col-span-1 flex justify-end'>
								<span className='sr-only text-xs font-medium text-slate-400 uppercase tracking-wide'>
									Action
								</span>
							</div>
						</div>
					</article>

					{/* Users List or Empty State */}
					<article className='min-h-[400px]'>
						{currentUsers.length > 0 ? (
							<div className='divide-y divide-white/10'>
								{currentUsers.map((user) => (
									<UserRow
										key={user.id}
										user={user}
										onViewDetails={handleViewDetails}
									/>
								))}
							</div>
						) : (
							<div className='py-16 text-slate-300 text-center'>
								{searchTerm ? (
									<div className='flex flex-col justify-center items-center gap-4'>
										<div className='p-4 bg-slate-800/50 rounded-full'>
											<Search className='size-12 text-slate-400' />
										</div>
										<div className='space-y-2'>
											<p className='text-xl font-semibold text-slate-200'>
												No users found
											</p>
											<p className='text-sm text-slate-400'>
												Try adjusting your search terms or{' '}
												<button
													onClick={handleClearSearch}
													className='text-cyan-400 hover:text-cyan-300 hover:underline transition-colors font-medium'
												>
													clear the search
												</button>
											</p>
										</div>
									</div>
								) : (
									<div className='flex flex-col justify-center items-center gap-4'>
										<div className='p-4 bg-slate-800/50 rounded-full'>
											<User className='size-12 text-slate-400' />
										</div>
										<p className='text-xl font-semibold text-slate-200'>
											No users available
										</p>
									</div>
								)}
							</div>
						)}
					</article>
				</section>

				{/* Pagination Footer */}
				{sortedUsers.length > 0 && (
					<section className='px-6 py-4 bg-slate-800/50 backdrop-blur-sm border-t border-white/10 rounded-b-lg'>
						<div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
							<p className='text-sm text-slate-300 order-2 sm:order-1'>
								Showing {startIndex + 1}-
								{Math.min(startIndex + usersPerPage, sortedUsers.length)} of{' '}
								{sortedUsers.length} users
							</p>

							<div className='flex items-center gap-2 order-1 sm:order-2'>
								<button
									type='button'
									onClick={() =>
										setCurrentPage((prev) => Math.max(prev - 1, 1))
									}
									disabled={currentPage === 1}
									className='px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium'
								>
									Previous
								</button>

								{/* Page indicator */}
								<span className='px-3 py-2 text-sm text-slate-300 font-medium'>
									{currentPage} of {totalPages}
								</span>

								<button
									type='button'
									onClick={() =>
										setCurrentPage((prev) => Math.min(prev + 1, totalPages))
									}
									disabled={currentPage === totalPages}
									className='px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg shadow-indigo-500/25'
								>
									Next
								</button>
							</div>
						</div>
					</section>
				)}
			</div>

			{/* User Details Modal */}
			{selectedUser && (
				<UserModal
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
				/>
			)}
		</div>
	);
};

export default UsersList;
