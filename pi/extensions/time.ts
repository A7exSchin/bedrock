const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

function pad(n: number): string {
	return String(n).padStart(2, "0");
}

/** Format a local timezone offset like "UTC+02:00". */
export function formatTimezone(date: Date): string {
	const offsetMinutes = -date.getTimezoneOffset();
	const sign = offsetMinutes >= 0 ? "+" : "-";
	const abs = Math.abs(offsetMinutes);
	return `UTC${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

/**
 * Format a timestamp like "Tuesday, 7.7.2026, 14:32 (UTC+02:00)" —
 * dotted day.month.year (as the author writes dates), local time, with the
 * local UTC offset appended so the model can reason across timezones.
 */
export function formatTimestamp(date: Date): string {
	const weekday = WEEKDAYS[date.getDay()];
	const day = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
	return `${weekday}, ${day}, ${time} (${formatTimezone(date)})`;
}
