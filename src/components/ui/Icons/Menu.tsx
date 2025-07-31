import type { IconProps } from './types';

const Menu = ({ className }: IconProps) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'
		className={className}
	>
		<path d='M4 12h16' />
		<path d='M4 18h16' />
		<path d='M4 6h16' />
	</svg>
);
export default Menu;
