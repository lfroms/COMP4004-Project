export default function createTermName(startDateIso: string, endDateIso: string) {
  const startDate = new Date(Date.parse(startDateIso)).toLocaleString('default', {
    month: 'short',
    year: 'numeric',
  });

  const endDate = new Date(Date.parse(endDateIso)).toLocaleString('default', {
    month: 'short',
    year: 'numeric',
  });

  return `${startDate} - ${endDate}`;
}
