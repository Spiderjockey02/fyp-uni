import { User } from '@/types';

export function formatViews(n: number) {
	if (n < 1e3) return n;
	if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
	if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
	if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
	if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
}

export function concatNames(user: User | undefined) {
	return `${user?.firstName} ${user?.lastName}`;
}

export function msToTime(duration: number) {
	let seconds = parseInt(`${(duration / 1000) % 60}`, 10);
	let minutes = parseInt(`${(duration / (1000 * 60)) % 60}`, 10);
	let hours = parseInt(`${(duration / (1000 * 60 * 60))}`, 10);

	hours = hours < 10 ? Number('0' + hours) : hours;
	minutes = minutes < 10 ? Number('0' + minutes) : minutes;
	seconds = seconds < 10 ? Number('0' + seconds) : seconds;

	if (hours == 0) {
		return minutes + ':' + seconds;
	} else {
		return hours + ':' + minutes + ':' + seconds;
	}
}