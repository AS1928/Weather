// Formatter to convert an ISO date string into a human-readable time format
// The format includes 2-digit hour, minute, and AM/PM notation (e.g., "2:30 PM")
const timeFormatter = new Intl.DateTimeFormat("en-us", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});


/**
 * Function to format an ISO date string into a readable time format.
 * @param isoDate - The ISO date string (e.g., "2024-11-09T14:30:00Z").
 * @returns Formatted time string (e.g., "2:30 PM").
 */
function getTime(isoDate: string) {
  const date = new Date(isoDate);
  return timeFormatter.format(date);
}

export default getTime;
