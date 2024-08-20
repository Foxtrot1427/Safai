export function getYearsSince(dateString: string) {
  const startDate = new Date(dateString);
  const today = new Date();

  let yearsDifference = today.getFullYear() - startDate.getFullYear();

  const monthDifference = today.getMonth() - startDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < startDate.getDate())
  ) {
    yearsDifference--;
  }

  return yearsDifference;
}
