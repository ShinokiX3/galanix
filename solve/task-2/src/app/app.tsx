import styles from './app.module.scss';
import i_images from '@assets/images';

import { useEffect, useState } from 'react';
import { getLocaleDate } from '@/utils/getLocaleDate';
import { createPortal } from 'react-dom';
import Modal from '@/components/modal/modal';

const images = Object.entries(i_images);

interface IItem {
	title: string;
	src: string;
	handleImage: (title: string, src: string) => void;
	handleCross: () => void;
}

const Item: React.FC<IItem> = ({ title, src, handleImage, handleCross }) => {
	return (
		<div className={styles.item} onClick={() => handleImage(title, src)}>
			<img src={src} alt={title} />
		</div>
	);
};

const App = () => {
	const [image, setImage] = useState<{ title: string; src: string }>({
		title: '',
		src: '',
	});
	const [shouldShow, setShouldShow] = useState<boolean>(false);

	const handleModalImage = (title: string, src: string) => {
		setImage({ title, src });
		setShouldShow(true);
	};

	return (
		<>
			<div className={styles.header}>
				<p>Images {images.length}</p>
				<p>Date {getLocaleDate()}</p>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					{images.map(([title, src]) => (
						<Item
							key={title}
							title={title}
							src={src}
							handleImage={handleModalImage}
							handleCross={() => {}}
						/>
					))}
				</div>
			</div>
			{shouldShow
				? createPortal(
						<Modal shouldShow={shouldShow} setShouldShow={setShouldShow}>
							<img src={image.src} alt={image.title} />
						</Modal>,
						document.body
				  )
				: null}
		</>
	);
};

export default App;
