export default function daysToXmas(date) {
  const parsedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const xmasDay = new Date(2021, 11, 25);

  return (xmasDay - parsedDate) / (1000 * 60 * 60 * 24);
}
