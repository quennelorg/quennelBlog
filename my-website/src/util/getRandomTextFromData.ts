export default function getRandomTextFromData(data: []): string {
	try {
		if (data.length > 0) {
			return data[Math.floor(Math.random() * data.length)];
		}
	} catch (e) {
		return '';
	}
}
