import styles from './app.module.scss';
import { useEffect, useState } from 'react';

import Input from '@/components/input/input';
import Button from '@/components/button/button';

import { magnifying } from '@/assets/images';
import UniversityService from '@/services/UniversityService';
import { IUniversity } from '@/types/university';

interface ITable {
	universities: IUniversity[] | [];
}

const Table: React.FC<ITable> = ({ universities }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Index</th>
					<th>Name</th>
					<th>Domains</th>
					<th>Country</th>
					<th>Aplha two code</th>
					<th>State province</th>
					<th>Web pages</th>
				</tr>
			</thead>
			<tbody>
				{universities.map((university, index) => (
					<tr key={university.name}>
						<td>{index + 1}</td>
						<td>{university.name}</td>
						<td>{university.domains}</td>
						<td>{university.country}</td>
						<td>{university.alpha_two_code}</td>
						<td>{university['state-province'] || 'Null'}</td>
						<td>
							<a href={university.web_pages[0]}>{university.web_pages[0]}</a>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

const App = () => {
	const [country, setCountry] = useState<string>('');
	const [offset, setOffset] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [universities, setUniversities] = useState<IUniversity[]>([]);

	const fetchUniversities = async (country: string) => {
		return await UniversityService.getByQueries(country, offset, limit);
	};

	const resetUniversities = () => {
		setUniversities([]);
		setCountry('');
		setOffset(0);
	};

	useEffect(() => {
		(async () => {
			if (universities.length > 0) {
				const response = await fetchUniversities(country);
				setUniversities([...universities, ...response]);
			}
		})();
	}, [offset]);

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
				<Button
					message="Send"
					handler={async () =>
						setUniversities(await fetchUniversities(country))
					}
				/>
				<Button message="Reset" handler={() => resetUniversities()} />
			</form>
			{universities.length > 0 ? (
				<>
					<Table universities={universities} />
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
