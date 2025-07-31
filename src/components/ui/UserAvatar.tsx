import { User } from './Icons';

interface UserAvatarProps {
	name?: string;
}

const UserAvatar = ({ name }: UserAvatarProps) => {
	const getInitials = () => {
		if (name) {
			return name
				.split(' ')
				.map((n) => n[0])
				.join('')
				.toUpperCase()
				.slice(0, 2);
		}
		return <User className='text-white' />;
	};

	const avatarColors = [
		'bg-gradient-to-br from-blue-500 to-blue-700',
		'bg-gradient-to-br from-purple-500 to-purple-700',
		'bg-gradient-to-br from-green-500 to-green-700',
		'bg-gradient-to-br from-orange-500 to-orange-700',
		'bg-gradient-to-br from-pink-500 to-pink-700',
		'bg-gradient-to-br from-indigo-500 to-indigo-700',
		'bg-gradient-to-br from-red-500 to-red-700',
		'bg-gradient-to-br from-teal-500 to-teal-700',
	];

	const colorIndex = (name || '').length % avatarColors.length;
	const colorClass = avatarColors[colorIndex];

	return (
		<div
			className={`size-10 p-2 flex justify-center items-center ${
				name
					? colorClass
					: 'bg-gradient-to-br from-secondary via-blue-800 to-primary'
			} rounded-full text-white font-outfit font-medium`}
		>
			{name ? getInitials() : <User />}
		</div>
	);
};
export default UserAvatar;
