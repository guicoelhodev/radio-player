export function getTimeFormat(totalSeconds: number): {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
} {
	const days = Math.floor(totalSeconds / (24 * 60 * 60));
	const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return {
		days: days.toString().padStart(2, '0'),
		hours: hours.toString().padStart(2, '0'),
		minutes: minutes.toString().padStart(2, '0'),
		seconds: seconds.toString().padStart(2, '0')
	};
}
