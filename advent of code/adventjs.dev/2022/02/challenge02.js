function countHours(year, holidays) {
  let hours = 0;

  holidays.forEach((holiday) => {
    const date = new Date(`${year}/${holiday}`);
    if (Number.isNaN(date.getDay()) || date.getDay() === 6 || date.getDay() === 0) return;
    hours += 2;
  });

  return hours;
}
