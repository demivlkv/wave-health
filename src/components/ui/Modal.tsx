import type { User } from '../../types/global.types';
import UserAvatar from './UserAvatar';

interface ModalProps {
	selectedUser: User;
	setSelectedUser: (user: User | null) => void;
}

const Modal = ({ selectedUser, setSelectedUser }: ModalProps) => {
	return (
		<section
			className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'
			onClick={() => setSelectedUser(null)}
		>
			<div
				className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='p-6 space-y-6'>
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

					<div className='pt-6 border-t border-gray-200'>
						<button
							onClick={() => setSelectedUser(null)}
							className='w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium'
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Modal;
