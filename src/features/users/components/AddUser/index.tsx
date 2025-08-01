import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AddUserFormData } from '../../users.types';
import type { User } from '../../../../types/global.types';
import { useUsers } from '../../../../hooks/useUsers';
import AddUserForm from './AddUserForm';

const AddUser = () => {
	const navigate = useNavigate();
	const { addUser } = useUsers();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const handleSubmit = async (formData: AddUserFormData) => {
		setIsSubmitting(true);
		setSubmitError(null);

		try {
			// simulate API delay for better UX demonstration
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// transform form data to User format
			const userData: Omit<User, 'id'> = {
				...formData,
				address: {
					...formData.address,
					geo: {
						lat: '0',
						lng: '0',
					},
				},
				company: {
					...formData.company,
					bs: 'business services', // default value
				},
			};

			addUser(userData);

			// navigate back to users list
			navigate('/');
		} catch (error) {
			setSubmitError(
				error instanceof Error ? error.message : 'Failed to add user'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCancel = () => {
		navigate('/');
	};

	return (
		<section>
			{submitError && (
				<div className='mb-4 bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-red-300 backdrop-blur-sm'>
					<strong>Error:</strong> {submitError}
				</div>
			)}

			<AddUserForm
				onSubmit={handleSubmit}
				onCancel={handleCancel}
				isSubmitting={isSubmitting}
			/>
		</section>
	);
};

export default AddUser;
