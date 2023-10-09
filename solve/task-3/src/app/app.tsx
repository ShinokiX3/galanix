import styles from './app.module.scss';
import { useEffect, useState } from 'react';

import Input from '@/components/input/input';
import Button from '@/components/button/button';

import { magnifying } from '@/assets/images';
import UniversityService from '@/services/UniversityService';

const App = () => {
	const [country, setCountry] = useState<string>('');
	const [offset, setOffset] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);

	const fetchUniversities = async (country: string) => {
		const universities = await UniversityService.getByQueries(
			country,
			offset,
			limit
		);
		console.log(universities);
	};

	return (
		<div>
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
				<Button message="Send" handler={() => fetchUniversities(country)} />
				<Button
					message="Reset"
					handler={() => {
						console.log('not submit');
					}}
				/>
			</form>
		</div>
	);
};

export default App;
