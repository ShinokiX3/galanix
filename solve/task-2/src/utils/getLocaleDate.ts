interface IOptions {
	[key: string]: string;
}

const defaultOptions: IOptions = {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
};

export const getLocaleDate = (
	date: Date = new Date(),
	locale: string = 'ru-RU',
	options: IOptions = defaultOptions
) => date.toLocaleString(locale, options);
