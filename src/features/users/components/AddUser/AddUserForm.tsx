import { useMemo, useState } from 'react';
import type { AddUserFormData } from '../../users.types';
import type { FormErrors } from '../../../../types/global.types';
import { Alert, Close, User, UserPlus } from '../../../../components/ui/Icons';
import { InputField } from '../../../../components/ui/Form';
import { ValidationSchema } from './ValidationSchema';

interface AddUserFormProps {
	onSubmit: (user: AddUserFormData) => void;
	onCancel: () => void;
	isSubmitting?: boolean;
}

const AddUserForm = ({
	onSubmit,
	onCancel,
	isSubmitting = false,
}: AddUserFormProps) => {
	const [formData, setFormData] = useState<AddUserFormData>({
		name: '',
		username: '',
		email: '',
		phone: '',
		website: '',
		address: {
			street: '',
			suite: '',
			city: '',
			zipcode: '',
		},
		company: {
			name: '',
			catchPhrase: '',
		},
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
	const [isValidating, setIsValidating] = useState<boolean>(false);

	const handleFieldChange = (name: string, value: string) => {
		// handle nested properties
		if (name.includes('.')) {
			const [parent, child] = name.split('.');

			// type-safe nested property updates
			if (parent === 'address') {
				setFormData((prev) => ({
					...prev,
					address: {
						...prev.address,
						[child]: value,
					},
				}));
			} else if (parent === 'company') {
				setFormData((prev) => ({
					...prev,
					company: {
						...prev.company,
						[child]: value,
					},
				}));
			}
		} else {
			// direct property update with proper typing
			setFormData(
				(prev) =>
					({
						...prev,
						[name]: value,
					} as AddUserFormData)
			);
		}

		// clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: '' }));
		}

		// mark field as touched
		setTouched((prev) => ({ ...prev, [name]: true }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsValidating(true);

		// validate form
		const validationErrors = ValidationSchema.validateForm(formData);
		setErrors(validationErrors);

		// mark all fields as touched
		const allFields = [
			'name',
			'username',
			'email',
			'phone',
			'website',
			'address.street',
			'address.suite',
			'address.city',
			'address.zipcode',
			'company.name',
			'company.catchPhrase',
		];
		const touchedFields = allFields.reduce(
			(acc, field) => ({ ...acc, [field]: true }),
			{}
		);
		setTouched(touchedFields);

		setIsValidating(false);

		// submit form if no errors
		if (Object.keys(validationErrors).length === 0) {
			onSubmit(formData);
		} else {
			// focus first error field
			const firstErrorField = Object.keys(validationErrors)[0];
			const element = document.getElementById(`field-${firstErrorField}`);
			element?.focus();
		}
	};

	const handleReset = () => {
		setFormData({
			name: '',
			username: '',
			email: '',
			phone: '',
			website: '',
			address: { street: '', suite: '', city: '', zipcode: '' },
			company: { name: '', catchPhrase: '' },
		});
		setErrors({});
		setTouched({});
	};

	const hasErrors = Object.keys(errors).length > 0;
	const hasUnsavedChanges = useMemo(() => {
		// Check primitive string fields
		const primitiveFields: (keyof AddUserFormData)[] = [
			'name',
			'username',
			'email',
			'phone',
			'website',
		];
		const hasPrimitiveChanges = primitiveFields.some((field) => {
			const value = formData[field];
			return typeof value === 'string' && value.trim().length > 0;
		});

		// Check nested address fields
		const hasAddressChanges = Object.values(formData.address).some(
			(value) => typeof value === 'string' && value.trim().length > 0
		);

		// Check nested company fields
		const hasCompanyChanges = Object.values(formData.company).some(
			(value) => typeof value === 'string' && value.trim().length > 0
		);

		return hasPrimitiveChanges || hasAddressChanges || hasCompanyChanges;
	}, [formData]);

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header */}
			<div className='mb-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl'>
				<section className='px-6 py-4 border-b border-white/10'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg shadow-lg shadow-indigo-500/25'>
								<User className='w-6 h-6 text-white' />
							</div>
							<div className='space-y-1'>
								<h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent'>
									Add New User
								</h1>
								<p className='text-sm text-slate-400'>
									Create a new user profile with complete information
								</p>
							</div>
						</div>

						{hasUnsavedChanges && (
							<div className='flex items-center text-amber-400 text-sm'>
								<Alert className='w-4 h-4 mr-1' />
								Unsaved changes
							</div>
						)}
					</div>
				</section>

				{/* Form */}
				<form
					onSubmit={handleSubmit}
					className='p-6 space-y-8'
				>
					{/* Personal Information */}
					<section>
						<h2 className='text-lg font-semibold text-white mb-4 flex items-center gap-3'>
							<div className='size-2 bg-indigo-500 rounded-full'></div>
							Personal Information
						</h2>
						<fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<InputField
								label='Full Name'
								name='name'
								value={formData.name}
								onChange={handleFieldChange}
								error={touched.name ? errors.name : undefined}
								required
								placeholder='e.g., John Doe'
							/>
							<InputField
								label='Username'
								name='username'
								value={formData.username}
								onChange={handleFieldChange}
								error={touched.username ? errors.username : undefined}
								required
								placeholder='e.g., johndoe'
							/>
						</fieldset>
					</section>

					{/* Contact Information */}
					<section>
						<h2 className='text-lg font-semibold text-white mb-4 flex items-center gap-3'>
							<div className='size-2 bg-cyan-400 rounded-full'></div>
							Contact Information
						</h2>
						<fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<InputField
								label='Email Address'
								name='email'
								type='email'
								value={formData.email}
								onChange={handleFieldChange}
								error={touched.email ? errors.email : undefined}
								required
								placeholder='e.g., john@example.com'
							/>
							<InputField
								label='Phone Number'
								name='phone'
								type='tel'
								value={formData.phone}
								onChange={handleFieldChange}
								error={touched.phone ? errors.phone : undefined}
								placeholder='e.g., +1 (555) 123-4567'
							/>
						</fieldset>
						<fieldset className='mt-6'>
							<InputField
								label='Website'
								name='website'
								type='url'
								value={formData.website}
								onChange={handleFieldChange}
								error={touched.website ? errors.website : undefined}
								placeholder='e.g., www.johndoe.com'
							/>
						</fieldset>
					</section>

					{/* Address Information */}
					<section>
						<h2 className='text-lg font-semibold text-white mb-4 flex items-center gap-3'>
							<div className='size-2 bg-indigo-400 rounded-full'></div>
							Address Information
						</h2>
						<fieldset className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<InputField
								label='Street Address'
								name='address.street'
								value={formData.address.street}
								onChange={handleFieldChange}
								error={
									touched['address.street']
										? errors['address.street']
										: undefined
								}
								placeholder='e.g., 123 Main Street'
							/>
							<InputField
								label='Suite/Unit'
								name='address.suite'
								value={formData.address.suite}
								onChange={handleFieldChange}
								error={
									touched['address.suite'] ? errors['address.suite'] : undefined
								}
								placeholder='e.g., Apt 4B, Suite 200'
							/>
							<InputField
								label='City'
								name='address.city'
								value={formData.address.city}
								onChange={handleFieldChange}
								error={
									touched['address.city'] ? errors['address.city'] : undefined
								}
								required
								placeholder='e.g., New York'
							/>
							<InputField
								label='ZIP Code'
								name='address.zipcode'
								value={formData.address.zipcode}
								onChange={handleFieldChange}
								error={
									touched['address.zipcode']
										? errors['address.zipcode']
										: undefined
								}
								placeholder='e.g., 10001'
							/>
						</fieldset>
					</section>

					{/* Company Information */}
					<section>
						<h2 className='text-lg font-semibold text-white mb-4 flex items-center gap-3'>
							<div className='size-2 bg-cyan-200 rounded-full'></div>
							Company Information
						</h2>
						<fieldset className='space-y-6'>
							<InputField
								label='Company Name'
								name='company.name'
								value={formData.company.name}
								onChange={handleFieldChange}
								error={
									touched['company.name'] ? errors['company.name'] : undefined
								}
								required
								placeholder='e.g., Acme Corporation'
							/>
							<InputField
								label='Company Slogan'
								name='company.catchPhrase'
								value={formData.company.catchPhrase}
								onChange={handleFieldChange}
								error={
									touched['company.catchPhrase']
										? errors['company.catchPhrase']
										: undefined
								}
								placeholder='e.g., Innovation at its finest'
							/>
						</fieldset>
					</section>

					{/* Form Actions */}
					<div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10'>
						<button
							type='submit'
							disabled={isSubmitting || isValidating}
							className='px-6 py-3 flex-1 sm:flex-none inline-flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 rounded-lg text-white font-medium focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
						>
							{isSubmitting ? (
								<>
									<div className='animate-spin size-5 border-b-2 border-white rounded-full'></div>
									Creating User...
								</>
							) : (
								<>
									<UserPlus className='size-4' />
									Create User
								</>
							)}
						</button>

						<button
							type='button'
							onClick={handleReset}
							disabled={isSubmitting || !hasUnsavedChanges}
							className='px-4 py-3 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-lg text-slate-300 font-medium focus:ring-2 focus:ring-slate-500/30 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
						>
							<Close className='size-4' />
							Reset
						</button>

						<button
							type='button'
							onClick={onCancel}
							disabled={isSubmitting}
							className='px-4 py-3 inline-flex items-center justify-center hover:bg-white/5 border border-white/20 rounded-lg text-slate-300 font-medium focus:ring-2 focus:ring-slate-500/30 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
						>
							Cancel
						</button>
					</div>

					{/* Error Summary */}
					{hasErrors && Object.keys(touched).length > 0 && (
						<div className='bg-red-900/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm'>
							<div className='flex items-start'>
								<Alert className='size-5 mt-0.5 mr-3 flex-shrink-0 text-red-400' />
								<div className='space-y-1'>
									<h3 className='text-sm text-red-300 font-medium'>
										Please fix the following errors:
									</h3>
									<ul className='text-red-400 text-sm space-y-1'>
										{Object.entries(errors).map(([field, error]) => (
											<li key={field}>• {error}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default AddUserForm;
