/**
 * @param {string} agenda
 * @param {string} phone
 * @returns {{ name: string, address: string } | null}
 */
function findInAgenda(agenda, phone) {
  const results = [];

  for (const line of agenda.split("\n")) {
    const phoneNumber = line.match(/\+\d+-\d\d\d-\d\d\d-\d\d\d/)[0];
    if (!phoneNumber.includes(phone)) {
      continue;
    }

    const name = line.match(/<.*>/)[0];
    const address = line.replace(phoneNumber, "").replace(name, "").trim();
    results.push({ name: name.slice(1, -1), address });
  }

  return results.length === 1 ? results[0] : null;
}
