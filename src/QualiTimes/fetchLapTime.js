const fetchLapTime = async ({ queryKey }) => {
  const year = queryKey[1];
  const time = await fetch(
    `https://ergast.com/api/f1/${year}/qualifying/1.json`
  );
  if (!time.ok) {
    throw new Error(`error fetching ${year} pole lap time`);
  }
  return time.json();
};

export default fetchLapTime;
