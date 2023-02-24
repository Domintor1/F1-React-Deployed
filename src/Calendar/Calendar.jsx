import { useEffect, useState } from "react";
import fetchCalendar from "./fetchCalendar";
import Pagination from "../Pagination";
import { useQuery } from "@tanstack/react-query";
import TableComponent from "./Table";

const years = [
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];

const circuitObj = "Circuit";
const circuitName = "circuitName";

function formatedDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}

const Calendar = () => {
  const [year, setYear] = useState(2014);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const calendar = useQuery(["calendar", year], fetchCalendar);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [year]);

  if (calendar.isLoading)
    return (
      <div className="loading">
        <h2 className="loader">🌀</h2>
      </div>
    );

  const data = calendar.data.MRData.RaceTable.Races;
  const filteredData = data.filter((race) => {
    const fullRaceName = race.raceName;
    return (
      (race.round.includes(searchValue) &&
        race.round.length === searchValue.length) ||
      fullRaceName.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div className="form-group input-group-text">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1>Calendar Page</h1>
          <div className="search">
            <label htmlFor="search">
              Filter by Round or Race Name
              <input
                type="search"
                name="search"
                placeholder="Filter"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </label>
          </div>

          <label htmlFor="year">
            {" "}
            Select Year:
            <select
              data-id="year"
              name="year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              onBlur={(e) => {
                setYear(e.target.value);
              }}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>

      <TableComponent
        tableData={currentPosts.map((races) => ({
          ...races,
          date: formatedDate(races.date),
          locality: races.Circuit.Location.locality,
          circuitName: races.Circuit.circuitName,
        }))}
        th={["Round", "Date", "Race Name", "Circuit Name", "Location"]}
        td={["round", "date", "raceName", "circuitName", "locality"]}
      />
      <Pagination
        totalPosts={filteredData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Calendar;
