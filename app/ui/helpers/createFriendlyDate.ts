export default function createFriendlyDate(dateIso: string) {
  const formattedDate = new Date(Date.parse(dateIso)).toLocaleString('default', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    weekday: 'long',
  });

  return formattedDate;
}
