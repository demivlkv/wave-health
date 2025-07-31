const Footer = () => {
	const getCurrentYear = new Date().getFullYear();

	return (
		<footer className='py-2.5 flex flex-col items-center justify-center gap-0.5 bg-blue-200 text-xs md:text-sm'>
			<p>&copy; {getCurrentYear} All rights reserved.</p>
			<p>
				Made by{' '}
				<a
					href='https://demihayashi.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='text-primary-light hover:underline'
				>
					Demi Hayashi
				</a>
				.
			</p>
		</footer>
	);
};
export default Footer;
