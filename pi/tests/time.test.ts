import { describe, it, expect } from "vitest";
import { formatTimestamp, formatTimezone } from "../extensions/time.js";

describe("formatTimestamp", () => {
	it("formats weekday, dotted date, time and timezone", () => {
		// Constructed from local components so the test is timezone-independent.
		const date = new Date(2026, 6, 7, 14, 32); // July 7, 2026, 14:32 local
		expect(formatTimestamp(date)).toBe(`Tuesday, 7.7.2026, 14:32 (${formatTimezone(date)})`);
	});

	it("zero-pads hours, minutes and single-digit days/months", () => {
		const date = new Date(2026, 0, 5, 3, 4); // January 5, 2026, 03:04 local — a Monday
		expect(formatTimestamp(date)).toBe(`Monday, 5.1.2026, 03:04 (${formatTimezone(date)})`);
	});

	it("handles year rollover dates", () => {
		const date = new Date(2027, 11, 31, 23, 59); // December 31, 2027 — a Friday
		expect(formatTimestamp(date)).toBe(`Friday, 31.12.2027, 23:59 (${formatTimezone(date)})`);
	});
});

describe("formatTimezone", () => {
	it("renders the local offset with sign, hours and minutes", () => {
		const date = new Date(2026, 6, 7, 14, 32);
		const offsetMinutes = -date.getTimezoneOffset();
		const sign = offsetMinutes >= 0 ? "+" : "-";
		const abs = Math.abs(offsetMinutes);
		const expected = `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
		expect(formatTimezone(date)).toBe(expected);
	});
});
