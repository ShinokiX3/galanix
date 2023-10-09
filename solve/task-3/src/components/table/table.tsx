import styles from './table.module.scss';
import { IUniversity } from '@/types/university';

// TODO: could define thead and tbody dynamically

interface ITableItem {
	university: IUniversity;
	index: number;
	selected: string[];
	handler: (item: string) => void;
}

const TableItem: React.FC<ITableItem> = ({
	university,
	index,
	selected,
	handler,
}) => {
	return (
		<tr>
			<td>{index + 1}</td>
			<td>{university.name}</td>
			<td>{university.domains}</td>
			<td>{university.country}</td>
			<td>{university.alpha_two_code}</td>
			<td>{university['state-province'] || 'Null'}</td>
			<td>
				<a href={university.web_pages[0]}>{university.web_pages[0]}</a>
			</td>
			<td>
				<input
					type="checkbox"
					onChange={() => handler(university.name)}
					checked={selected.some((s_name) => s_name === university.name)}
				/>
			</td>
		</tr>
	);
};

interface ITable {
	universities: IUniversity[] | [];
	selected: string[];
	handler: (item: string) => void;
}

const headers = [
	'Index',
	'Name',
	'Domains',
	'Country',
	'Aplha two code',
	'State province',
	'Web pages',
	'Save to my list',
];

const Table: React.FC<ITable> = ({ universities, selected, handler }) => {
	return (
		<table className={styles.table}>
			<thead>
				<tr>
					{headers.map((header) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{universities.map((university, index) => (
					<TableItem
						key={university.name}
						university={university}
						index={index}
						selected={selected}
						handler={handler}
					/>
				))}
			</tbody>
		</table>
	);
};

export default Table;
