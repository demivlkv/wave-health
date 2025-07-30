type ButtonType = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
	type: ButtonType;
	className?: string;
	children: React.ReactNode;
}

const Button = ({ type, className, children }: ButtonProps) => {
	let bgColor = '';
	let textColor = '';

	switch (type) {
		case 'primary':
			bgColor = 'bg-[#1a41ca] hover:bg-[#14214d]';
			textColor = 'text-white';
			break;
		case 'secondary':
			bgColor = 'bg-[#7beac1] hover:bg-[#1a41ca]';
			textColor = 'text-[#14214d] hover:text-white';
			break;
		case 'tertiary':
			bgColor = 'border-2 border-[#1a41ca] hover:border-[#14214d]';
			textColor = 'text-[#1a41ca] hover:text-[#14214d]';
			break;
	}

	return (
		<button
			type='button'
			className={`px-2.5 py-1.5 ${bgColor} ${textColor} ${className} rounded-md font-semibold transition-all ease-in-out duration-300`}
		>
			{children}
		</button>
	);
};
export default Button;
