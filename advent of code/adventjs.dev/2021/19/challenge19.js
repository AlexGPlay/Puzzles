export default function learn(time, courses) {
  let coursesTaken = [];
  let timeForCoursesTaken = 0;

  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      const neededTime = courses[i] + courses[j];
      if (neededTime > time) continue;
      if (neededTime === time) return [i, j];
      if (neededTime > timeForCoursesTaken) {
        coursesTaken = [i, j];
        timeForCoursesTaken = neededTime;
      }
    }
  }

  return coursesTaken.length === 0 ? null : coursesTaken;
}
