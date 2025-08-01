const Footer = () => {
	const getCurrentYear = new Date().getFullYear();

	return (
		<footer className='py-2.5 flex flex-col items-center justify-center gap-0.5 bg-slate-800/50 backdrop-blur-sm border-t border-white/10 text-xs md:text-sm text-slate-300'>
			<p>&copy; {getCurrentYear} All rights reserved.</p>
			<p>
				Made by{' '}
				<a
					href='https://demihayashi.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='text-cyan-400 hover:text-cyan-300 hover:underline transition-colors'
				>
					Demi Hayashi
				</a>
				.
			</p>
		</footer>
	);
};
export default Footer;
