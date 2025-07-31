import { useFetchUsers } from '../../../hooks/useFetchUsers';

const UsersList = () => {
	const { users, loading, error } = useFetchUsers();

	if (loading) {
		return <span>Loading users...</span>;
	}

	if (error) {
		return <span>{error}</span>;
	}

	return (
		<>
			<h1>Users List</h1>
			<ul className='list-none flex flex-col gap-4'>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</>
	);
};
export default UsersList;
