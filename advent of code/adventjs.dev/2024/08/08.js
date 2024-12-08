function drawRace(indices, length) {
  const track = Array(length).fill("~");
  const race = [];

  for (let i = 0; i < indices.length; i++) {
    const displacement = indices.length - i - 1;
    const newTrack = indices[i] === 0 ? track : track.with(indices[i], "r");
    race.push(`${" ".repeat(displacement)}${newTrack.join("")} /${i + 1}`);
  }

  return race.join("\n");
}

console.log(drawRace([0, 5, -3], 10));
