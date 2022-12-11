function query() {
  let select = null;
  let groupBy = null;
  let orderFn = null;
  let where = [];
  let from = [];
  let having = [];

  const execute = () => {
    let data = [];

    for (let collection of from) {
      if (data.length === 0) {
        data = [...collection];
        continue;
      }

      const newData = [];
      for (let joinedCollection of data) {
        for (let elem of collection) {
          newData.push([joinedCollection, elem]);
        }
      }

      data = newData;
    }

    for (let fns of where) data = data.filter((elem) => fns.some((fn) => fn(elem)));

    if (!!groupBy) {
      const dataStructure = [];
      for (let entry of data) {
        const groups = groupBy.map((group) => group(entry));
        let root = dataStructure;
        for (let group of groups) {
          let newRoot = root.find((elem) => elem?.[0] === group)?.[1];
          if (!newRoot) {
            root.push([group, []]);
            newRoot = root[root.length - 1][1];
          }
          root = newRoot;
        }
        root.push(entry);
      }
      data = dataStructure;
    }

    for (let fns of having) data = data.filter((elem) => fns.some((fn) => fn(elem)));

    if (orderFn) data.sort(orderFn);

    return select ? data.map(select) : data;
  };

  const sqlObject = {
    select: (fields) => {
      if (select !== null) throw new Error("Duplicate SELECT");
      select = fields;
      return sqlObject;
    },
    from: (...collections) => {
      if (from.length !== 0) throw new Error("Duplicate FROM");
      from = collections;
      return sqlObject;
    },
    where: (...fn) => {
      where.push(fn);
      return sqlObject;
    },
    orderBy: (order) => {
      if (orderFn !== null) throw new Error("Duplicate ORDERBY");
      orderFn = order;
      return sqlObject;
    },
    groupBy: (...groups) => {
      if (groupBy !== null) throw new Error("Duplicate GROUPBY");
      groupBy = groups;
      return sqlObject;
    },
    having: (...fn) => {
      having.push(fn);
      return sqlObject;
    },
    execute,
  };

  return sqlObject;
}

////////////
const { deepEqual, throws } = require("chai").assert;

function isEven(number) {
  return number % 2 === 0;
}

function parity(number) {
  return isEven(number) ? "even" : "odd";
}

function isPrime(number) {
  if (number < 2) {
    return false;
  }
  var divisor = 2;
  for (; number % divisor !== 0; divisor++);
  return divisor === number;
}

function prime(number) {
  return isPrime(number) ? "prime" : "divisible";
}

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//SELECT * FROM numbers GROUP BY parity, isPrime
const d1 = query().select().from(numbers).groupBy(parity, prime).execute();
const d2 = [
  [
    "odd",
    [
      ["divisible", [1, 9]],
      ["prime", [3, 5, 7]],
    ],
  ],
  [
    "even",
    [
      ["prime", [2]],
      ["divisible", [4, 6, 8]],
    ],
  ],
];
deepEqual(d1, d2);

function odd(group) {
  return group[0] === "odd";
}

//SELECT * FROM numbers GROUP BY parity HAVING
deepEqual(query().select().from(numbers).groupBy(parity).having(odd).execute(), [
  ["odd", [1, 3, 5, 7, 9]],
]);

function descendentCompare(number1, number2) {
  return number2 - number1;
}

//SELECT * FROM numbers ORDER BY value DESC
deepEqual(
  query().select().from(numbers).orderBy(descendentCompare).execute(),
  [9, 8, 7, 6, 5, 4, 3, 2, 1]
);

function lessThan3(number) {
  return number < 3;
}

function greaterThan4(number) {
  return number > 4;
}

//SELECT * FROM number WHERE number < 3 OR number > 4
deepEqual(
  query().select().from(numbers).where(lessThan3, greaterThan4).execute(),
  [1, 2, 5, 6, 7, 8, 9]
);
