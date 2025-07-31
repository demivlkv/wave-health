import { User } from './Icons';

const UserAvatar = () => {
	return (
		<div className='p-2 flex justify-center items-center bg-gradient-to-br from-primary-dark via-blue-800 to-primary-light rounded-full'>
			<User className='text-white' />
		</div>
	);
};
export default UserAvatar;
