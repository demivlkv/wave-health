interface ModalProps {
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => (
	<section
		onClick={onClose}
		className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'
	>
		<div
			onClick={(e) => e.stopPropagation()}
			className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl'
		>
			<article className='p-6 space-y-6'>
				{/* Modal body */}
				{children}

				{/* Close button */}
				<div className='pt-6 border-t border-gray-200'>
					<button
						type='button'
						aria-label='Close pop-up modal'
						onClick={onClose}
						className='w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium'
					>
						Close
					</button>
				</div>
			</article>
		</div>
	</section>
);

export default Modal;
