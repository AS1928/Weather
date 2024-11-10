// Formatter to convert an ISO date string into a human-readable format
// The format includes the full weekday, abbreviated month, and day (e.g., "Saturday, Nov 9")
const dateFormatter = new Intl.DateTimeFormat("en-us", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

/**
 * Function to format an ISO date string into a readable date format.
 * @param isoDate - The ISO date string (e.g., "2024-11-09T14:30:00Z").
 * @returns Formatted date string (e.g., "Saturday, Nov 9").
 */

function getDate(isoDate: string) {
  const date = new Date(isoDate);
  return dateFormatter.format(date);
}

export default getDate;
