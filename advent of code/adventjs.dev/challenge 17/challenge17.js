export default function countPackages(carriers, carrierID) {
  const parsedCarriers = {};

  carriers.forEach(([carrierId, dailyPackages, subCarriers]) => {
    parsedCarriers[carrierId] = {
      dailyPackages: dailyPackages,
      subCarriers: subCarriers,
    };
  });

  let totalPackages = 0;
  const toCheckCarriers = [carrierID];

  while (toCheckCarriers.length > 0) {
    const carrierId = toCheckCarriers.pop();
    const carrier = parsedCarriers[carrierId];

    totalPackages += carrier.dailyPackages;
    toCheckCarriers.push(...carrier.subCarriers);
  }

  return totalPackages;
}
