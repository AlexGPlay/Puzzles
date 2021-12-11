export default function groupBy(collection, it) {
  const group = {};

  collection.forEach((item) => {
    const key = typeof it === "function" ? it(item) : item[it];
    if (!group[key]) group[key] = [item];
    else group[key].push(item);
  });

  return group;
}
