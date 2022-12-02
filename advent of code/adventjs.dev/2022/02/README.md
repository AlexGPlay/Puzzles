A millionaire has bought a social network and it doesn't bring good news. He has announced that each time a working day is lost due to a holiday, it will have to be compensated with two extra hours another day of the same year.

Obviously the people who work in the company have not made the slightest joke and are preparing a program that tells them the number of extra hours they would do in the year if the new rule were applied.

Since it is office work, their working hours are from Monday to Friday. So you only have to worry about the holidays that fall on those days.

Given a year and an array with the dates of the holidays, return the number of extra hours that would be done that year:

```
const year = 2022
const holidays = ['01/06', '04/01', '12/25'] // format MM/DD

// 01/06 is January 6, a Friday. Count.
// 04/01 is April 1, a Saturday. Do not count.
// 12/25 is December 25, a Monday. Count.
```

countHours(year, holidays) // 2 days -> 4 extra hours in the year
