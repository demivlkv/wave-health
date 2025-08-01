interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => (
	<section
		onClick={onClose}
		className='fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50'
	>
		<div
			onClick={(e) => e.stopPropagation()}
			className='bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50'
		>
			<article className='p-6 space-y-6'>
				{/* Modal body */}
				{children}

				{/* Close button */}
				<div className='pt-6 border-t border-white/10'>
					<button
						type='button'
						aria-label='Close pop-up modal'
						onClick={onClose}
						className='w-full px-4 py-2 bg-white/10 text-slate-200 rounded-lg hover:bg-white/20 transition-colors font-medium focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 focus:ring-offset-slate-900'
					>
						Close
					</button>
				</div>
			</article>
		</div>
	</section>
);

export default Modal;
