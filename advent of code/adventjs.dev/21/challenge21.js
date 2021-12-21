export default function canCarry(capacity, trip) {
  const intervals = [];

  for (let i = 0; i < trip.length; i++) {
    const [load, startPoint, endPoint] = trip[i];

    for (let i = startPoint; i < endPoint; i++) {
      if (!intervals[i]) intervals[i] = 0;
      intervals[i] += load;
      if (intervals[i] > capacity) return false;
    }
  }

  return true;
}
