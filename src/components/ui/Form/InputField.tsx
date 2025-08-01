import type { InputFieldProps } from '../../../types/global.types';
import { Alert } from '../Icons';

const InputField = ({
	label,
	name,
	value,
	onChange,
	error,
	type = 'text',
	required = false,
	placeholder,
	disabled = false,
}: InputFieldProps) => {
	const fieldId = `field-${name}`;
	const errorId = `error-${name}`;

	return (
		<div className='space-y-1'>
			<label
				htmlFor={fieldId}
				className='block text-sm text-slate-200 font-semibold'
			>
				{label}
				{!required && (
					<span className='ml-1 text-slate-400 font-normal'>(optional)</span>
				)}
			</label>

			<input
				id={fieldId}
				type={type}
				value={value}
				onChange={(e) => onChange(name, e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				aria-invalid={error ? 'true' : 'false'}
				aria-describedby={error ? errorId : undefined}
				className={`w-full px-3 py-2 bg-white/5 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-white placeholder-slate-400
          ${
						error
							? 'border-red-500/60 bg-red-900/10'
							: 'border-white/10 hover:border-white/20'
					}
          ${disabled ? 'bg-slate-800/50 cursor-not-allowed opacity-50' : ''}`}
			/>

			{error && (
				<p
					id={errorId}
					className='mt-1 flex items-center gap-1 text-sm text-red-400 font-medium'
					role='alert'
				>
					<Alert className='size-4' />
					{error}
				</p>
			)}
		</div>
	);
};

export default InputField;
