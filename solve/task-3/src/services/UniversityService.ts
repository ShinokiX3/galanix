import { IUniversity } from '@/types/university';

class UniversityDomainsAPI {
	BASE_URL = 'http://universities.hipolabs.com';

	async getByQueries(
		country: string,
		offset: number = 10,
		limit: number = 20
	): Promise<IUniversity[] | undefined> {
		try {
			return await fetch(
				`${this.BASE_URL}/search?country=${country}&offset=${offset}&limit=${limit}`
			).then((data) => data.json());
		} catch (error) {
			console.error;
		}
	}
}

export default new UniversityDomainsAPI();
