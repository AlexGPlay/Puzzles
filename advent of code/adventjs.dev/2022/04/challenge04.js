function fitsInOneBox(boxes) {
  boxes.sort((a, b) => a.l + a.w + a.h - (b.l + b.w + b.h));

  for (let i = 0; i < boxes.length - 1; i++) {
    const [box1, box2] = [boxes[i], boxes[i + 1]];
    if (box1.l >= box2.l || box1.w >= box2.w || box1.h >= box2.h) return false;
  }

  return true;
}
