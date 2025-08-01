import type { User } from '../../../../types/global.types';
import UserAvatar from '../../../../components/ui/UserAvatar';
import Modal from '../../../../components/ui/Modal';

interface UserModalProps {
	selectedUser: User;
	setSelectedUser: (user: User | null) => void;
}

const UserModal = ({ selectedUser, setSelectedUser }: UserModalProps) => {
	const handleCloseUserModal = () => setSelectedUser(null);

	return (
		<Modal onClose={handleCloseUserModal}>
			<div className='flex items-center space-x-4'>
				<UserAvatar name={selectedUser.name} />
				<div>
					<h2 className='text-2xl font-bold text-gray-900'>
						{selectedUser.name}
					</h2>
					<p className='text-gray-500'>@{selectedUser.username}</p>
				</div>
			</div>

			<div className='grid md:grid-cols-2 gap-6'>
				<div className='space-y-4'>
					<div>
						<h3 className='font-medium text-gray-900 mb-2'>
							Contact Information
						</h3>
						<div className='space-y-2 text-sm'>
							<p>
								<span className='text-gray-500'>Email:</span>{' '}
								{selectedUser.email}
							</p>
							<p>
								<span className='text-gray-500'>Phone:</span>{' '}
								{selectedUser.phone}
							</p>
							<p>
								<span className='text-gray-500'>Website:</span>{' '}
								{selectedUser.website}
							</p>
						</div>
					</div>
				</div>

				<div className='space-y-4'>
					<div>
						<h3 className='font-medium text-gray-900 mb-2'>Address</h3>
						<p className='text-sm text-gray-600'>
							{selectedUser.address.suite} {selectedUser.address.street}
							<br />
							{selectedUser.address.city}, {selectedUser.address.zipcode}
						</p>
					</div>

					<div>
						<h3 className='font-medium text-gray-900 mb-2'>Company</h3>
						<div className='text-sm'>
							<p className='font-medium'>{selectedUser.company.name}</p>
							<p className='text-gray-500'>
								{selectedUser.company.catchPhrase}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
export default UserModal;
