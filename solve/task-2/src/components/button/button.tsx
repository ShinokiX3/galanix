import styles from './button.module.scss';

interface IButton {
	message: string;
	handler: () => void;
	style?: CSSStyleSheet;
}

const Button: React.FC<IButton> = ({ message, handler, style = {} }) => {
	return (
		<button style={style} className={styles.initial} onClick={handler}>
			{message}
		</button>
	);
};

export default Button;
