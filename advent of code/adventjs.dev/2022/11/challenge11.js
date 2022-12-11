function getCompleted(part, total) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);

  const convertTime = (time) => {
    const [hour, minute, seconds] = time.split(":");
    return parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(seconds);
  };

  const doneTime = convertTime(part);
  const totalTime = convertTime(total);

  const fraction = [doneTime / gcd(doneTime, totalTime), totalTime / gcd(doneTime, totalTime)];

  return fraction.join("/");
}

console.log(getCompleted("01:00:00", "03:00:00")); // '1/3'
console.log(getCompleted("02:00:00", "04:00:00")); // '1/2'
console.log(getCompleted("01:00:00", "01:00:00")); // '1/1'
console.log(getCompleted("00:10:00", "01:00:00")); // '1/6'
console.log(getCompleted("01:10:10", "03:30:30")); // '1/3'
console.log(getCompleted("03:30:30", "05:50:50")); // '3/5'
