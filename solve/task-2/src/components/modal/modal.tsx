import styles from './modal.module.scss';
import { cross } from '@assets/svg';

interface IModal {
	shouldShow: boolean;
	setShouldShow: (status: boolean) => void;
	children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ shouldShow, setShouldShow, children }) => {
	return (
		<div onClick={() => setShouldShow(false)} className={styles.wrapper}>
			<div onClick={(e) => e.stopPropagation()} className={styles.content}>
				{children}
				<img
					src={cross}
					alt="cross"
					className={styles.cross}
					onClick={() => setShouldShow(false)}
				/>
			</div>
		</div>
	);
};

export default Modal;
