import styles from './app.module.scss';
import { useEffect, useState } from 'react';
import { Button, Input, Table } from '@/components';

import UniversityService from '@/services/UniversityService';

import { IUniversity } from '@/types/university';
import { magnifying } from '@/assets/images';

const App = () => {
	const [country, setCountry] = useState<string>('');
	const [universities, setUniversities] = useState<IUniversity[]>([]);

	const [selected, setSelected] = useState<string[]>([]);

	const [offset, setOffset] = useState<number>(0);
	const [limit] = useState<number>(10);

	const fetchUniversities = async (country: string) => {
		return await UniversityService.getByQueries(country, offset, limit);
	};

	useEffect(() => {
		(async () => {
			const selected = localStorage.getItem('selected');
			const country = localStorage.getItem('country');

			if (selected) setSelected(JSON.parse(selected));
			if (country) {
				setCountry(country);
				setUniversities(await fetchUniversities(country));
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (universities.length > 0) {
				const response = await fetchUniversities(country);
				setUniversities([...universities, ...response]);
			}
		})();
	}, [offset]);

	useEffect(() => {
		if (selected.length > 0)
			localStorage.setItem('selected', JSON.stringify(selected));
	}, [selected]);

	// TODO: could use react context or redux

	const handleCheckbox = (name: string) => {
		setSelected((prev) =>
			prev.some((p_name) => p_name === name)
				? prev.filter((s_name) => s_name !== name)
				: [...prev, name]
		);
	};

	const send = async () => {
		setUniversities(await fetchUniversities(country));
		localStorage.setItem('country', country);
	};

	const reset = () => {
		setUniversities([]);
		setCountry('');
		setOffset(0);
		localStorage.setItem('country', '');
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<p>Selected quantity: {selected.length}</p>
			</div>
			<form
				className={styles.form}
				onSubmit={(e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) =>
					e.preventDefault()
				}
			>
				<Input
					value={country}
					setValue={(e) => setCountry(e.target.value)}
					placeholder="Input your country..."
					ico={magnifying}
				/>
				<Button message="Send" handler={send} />
				<Button message="Reset" handler={reset} />
			</form>
			{universities.length > 0 ? (
				<>
					<Table
						universities={universities}
						selected={selected}
						handler={handleCheckbox}
					/>
					<Button
						message="Load more..."
						handler={() => setOffset(() => offset + limit)}
					/>
				</>
			) : null}
		</div>
	);
};

export default App;
