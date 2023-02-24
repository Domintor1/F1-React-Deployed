const fetchConstructorStandings = async ({ queryKey }) => {
  let year = queryKey[1];

  const standings = await fetch(
    `https://ergast.com/api/f1/${year}/constructorStandings.json`
  );

  if (!standings.ok) {
    throw new Error(`Error fetching constructor standings from ${year}`);
  }

  return standings.json();
};

export default fetchConstructorStandings;
