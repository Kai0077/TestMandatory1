/**
 * Generates a random birthdate as a string in YYYY-MM-DD format.
 * The generated date will be between 50 years ago and today.
 *
 * @returns {string} A random date string (YYYY-MM-DD) within the last 50 years.
 */

function createDate(): string {
  const now = new Date();
  const oldest = new Date();
  oldest.setFullYear(now.getFullYear() - 50);

  const start = oldest.getTime();
  const end = now.getTime();

  const randomTime = start + Math.random() * (end - start);
  const date = new Date(randomTime);

  return date.toISOString().split("T")[0];
}

/**
 * Validates whether the given date string represents a realistic birthdate.
 * A valid date must:
 * - Be a non-null, correctly formatted date string.
 * - Not be in the future.
 * - Not be older than 50 years from today.
 *
 * @param dateString - The date string to validate (in YYYY-MM-DD format or any valid date string).
 * @returns {boolean} True if the date is valid, false otherwise.
 */

function validateDate(dateString: string | null): boolean {
  if (!dateString) return false;

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;

  const now = new Date();
  const oldest = new Date();
  oldest.setFullYear(now.getFullYear() - 50);

  return date >= oldest && date <= now;
}

export { createDate, validateDate };