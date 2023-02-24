const fetchDriverStandings = async ({ queryKey }) => {
  const year = queryKey[1];
  const driverStandings = await fetch(
    `https://ergast.com/api/f1/${year}/driverStandings.json`
  );
  if (!driverStandings.ok) {
    throw new Error(`Error fetching ${year} driver standings`);
  }
  return driverStandings.json();
};

export default fetchDriverStandings;
