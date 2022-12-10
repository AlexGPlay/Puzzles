function countTime(leds) {
  let i = 0;
  let array = [...leds];

  while (array.some((led) => led === 0)) {
    array = array.map((light, idx) => (light === 0 ? (array.at(idx - 1) === 0 ? 0 : 1) : 1));
    i++;
  }

  return i * 7;
}
