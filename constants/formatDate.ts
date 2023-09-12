// pass the date as argument
export function formatMonthAndYear(
	dateString: string,
	yearOnly: boolean = false
): string | null {
	//split the date
	const dateParts = dateString.split("-");
	if (dateParts.length !== 3) {
		// Invalid date format
		return null;
	}
	// extract month and year
	const month = parseInt(dateParts[1]);
	const year = parseInt(dateParts[0]);

	if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
		// Invalid month or year
		return null;
	}

	// Create an array of month names
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const formattedMonth = monthNames[month - 1];
	if (yearOnly) {
		return `${year}`;
	}
	return `${formattedMonth} ${year}`;
}

export function formatHoursAndMinutes(minutes: number): string {
	if (minutes < 0) {
		return "Invalid input";
	}

	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	const hoursText = hours > 0 ? `${hours}h` : "";
	const minutesText = remainingMinutes > 0 ? `${remainingMinutes}m` : "";

	if (hoursText && minutesText) {
		return `${hoursText} ${minutesText}`;
	} else {
		return hoursText || minutesText || "0m"; // Return '0m' if no hours or minutes
	}
}
