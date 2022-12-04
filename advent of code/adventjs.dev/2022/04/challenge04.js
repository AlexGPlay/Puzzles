function fitsInOneBox(boxes) {
  boxes.sort((a, b) => a.l + a.w + a.h - (b.l + b.w + b.h));

  for (let i = 0; i < boxes.length - 1; i++) {
    const [box1, box2] = [boxes[i], boxes[i + 1]];
    for (const key of Object.keys(box1)) if (box1[key] >= box2[key]) return false;
  }

  return true;
}
