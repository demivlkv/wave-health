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
					<h2 className='text-2xl font-bold text-white'>{selectedUser.name}</h2>
					<p className='text-slate-400'>@{selectedUser.username}</p>
				</div>
			</div>

			<div className='grid md:grid-cols-2 gap-6'>
				<div className='space-y-4'>
					<div>
						<h3 className='font-medium text-white mb-2'>Contact Information</h3>
						<div className='space-y-2 text-sm'>
							<p>
								<span className='text-slate-400'>Email:</span>{' '}
								<span className='text-slate-200'>{selectedUser.email}</span>
							</p>
							{selectedUser.phone && (
								<p>
									<span className='text-slate-400'>Phone:</span>{' '}
									<span className='text-slate-200'>{selectedUser.phone}</span>
								</p>
							)}
							{selectedUser.website && (
								<p>
									<span className='text-slate-400'>Website:</span>{' '}
									<span className='text-cyan-400 hover:text-cyan-300 cursor-pointer'>
										{selectedUser.website}
									</span>
								</p>
							)}
						</div>
					</div>
				</div>

				<div className='space-y-4'>
					<div>
						<h3 className='font-medium text-white mb-2'>Address</h3>
						<p className='text-sm text-slate-300'>
							{selectedUser.address.suite} {selectedUser.address.street}
							<br />
							{selectedUser.address.city}, {selectedUser.address.zipcode}
						</p>
					</div>

					<div>
						<h3 className='font-medium text-white mb-2'>Company</h3>
						<div className='text-sm'>
							<p className='font-medium text-slate-200'>
								{selectedUser.company.name}
							</p>
							{selectedUser.company.catchPhrase && (
								<p className='text-slate-400'>
									{selectedUser.company.catchPhrase}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};
export default UserModal;
