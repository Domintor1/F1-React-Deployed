const fetchDriverList = async ({ queryKey }) => {
  const year = queryKey[1];
  const driverList = await fetch(
    `https://ergast.com/api/f1/${year}/drivers.json`
  );

  if (!driverList.ok) {
    throw new Error(`Error fetching ${year} driverList `);
  }
  return driverList.json();
};

export default fetchDriverList;
