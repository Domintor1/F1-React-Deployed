const fetchRacebyRaceData = async ({ queryKey }) => {
  const year = queryKey[1];
  const raceData = await fetch(
    `https://ergast.com/api/f1/${year}/driverStandings.json`
  );
  if (!raceData.ok) {
    throw new Error(`Error fetching ${year} racedata.`);
  }
  return raceData.json();
};

export default fetchRacebyRaceData;
