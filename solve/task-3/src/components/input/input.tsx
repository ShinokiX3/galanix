import styles from './input.module.scss';
import clsx from 'clsx';
interface IInput {
	value: string;
	setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	ico?: string;
	style?: { [key: string]: string };
}

const Input: React.FC<IInput> = ({
	value,
	setValue,
	placeholder = '',
	ico = '',
	style = {},
}) => {
	return (
		<div className={styles.wrapper}>
			<input
				style={style}
				className={clsx(styles.initial, {
					[styles.p_left]: ico !== '',
				})}
				placeholder={placeholder}
				value={value}
				onChange={setValue}
			/>
			{ico ? <img className={styles.icon} src={ico} alt="input icon" /> : null}
		</div>
	);
};

export default Input;
