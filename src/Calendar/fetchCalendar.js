const fetchCalendar = async ({ queryKey }) => {
  const year = queryKey[1];
  const calendar = await fetch(`https://ergast.com/api/f1/${year}.json`);
  if (!calendar.ok) {
    throw new Error(`Error fetching ${year} calendar `);
  }
  return calendar.json();
};

export default fetchCalendar;
