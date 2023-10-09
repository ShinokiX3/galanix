import styles from './app.module.scss';
import i_images from '@assets/images';

const images = Object.entries(i_images);

const App = () => {
	console.log(images);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{images.map(([title, src]) => (
					<div className={styles.item}>
						<img key={title} src={src} alt={title} />
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
