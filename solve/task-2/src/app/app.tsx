import styles from './app.module.scss';
import i_images from '@assets/images';
import { cross } from '@assets/svg';

import { useEffect, useState } from 'react';
import { getLocaleDate } from '@/utils/getLocaleDate';
import { createPortal } from 'react-dom';
import Modal from '@/components/modal/modal';
import Button from '@/components/button/button';

const e_images = Object.entries(i_images);

interface IItem {
	title: string;
	src: string;
	handleImage: (title: string, src: string) => void;
	handleCross: (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>,
		title: string
	) => void;
}

type TImage = [string, string];

const Item: React.FC<IItem> = ({ title, src, handleImage, handleCross }) => {
	return (
		<div className={styles.item} onClick={() => handleImage(title, src)}>
			<img className={styles.image} src={src} alt={title} />
			<img
				className={styles.cross}
				src={cross}
				alt="cross"
				onClick={(e) => handleCross(e, title)}
			/>
		</div>
	);
};

const App = () => {
	const [images, setImages] = useState<TImage[]>([]);
	const [image, setImage] = useState<{ title: string; src: string }>({
		title: '',
		src: '',
	});
	const [shouldShow, setShouldShow] = useState<boolean>(false);

	useEffect(() => {
		const l_images = localStorage.getItem('images');
		if (!l_images) setImages(e_images);
		else setImages(JSON.parse(l_images));
	}, []);

	useEffect(() => {
		if (images.length > 0)
			localStorage.setItem('images', JSON.stringify(images));
	}, [images]);

	const handleModalImage = (title: string, src: string) => {
		setImage({ title, src });
		setShouldShow(true);
	};

	const handleRemoveImage = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>,
		title: string
	) => {
		e.stopPropagation();
		const newImages = images.filter(
			([previousTitle, _]) => previousTitle !== title
		);
		setImages(newImages);
	};

	const handleRestoreImages = () => setImages(e_images);

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
							handleCross={handleRemoveImage}
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
			<div className={styles.controls}>
				<Button message="Восстановить" handler={handleRestoreImages} />
			</div>
		</>
	);
};

export default App;
