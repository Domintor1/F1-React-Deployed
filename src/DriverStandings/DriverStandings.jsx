import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { useQuery } from "@tanstack/react-query";
import fetchDriverStandings from "./fetchDriverStandings";
import TableComponent from "../Calendar/Table";

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
];

const DriverStandings = () => {
  const [year, setYear] = useState(2014);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const getDriverStandings = useQuery(
    ["driverStandings", year],
    fetchDriverStandings
  );
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [year]);

  if (getDriverStandings.isLoading)
    return (
      <div className="loading">
        <h2 className="loader">🌀</h2>
      </div>
    );

  const data =
    getDriverStandings.data.MRData.StandingsTable.StandingsLists[0]
      .DriverStandings;

  const filteredData = data.filter((search) => {
    const fullName = search.Driver.givenName + " " + search.Driver.familyName;
    return (
      fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      search.Constructors[0].name
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);
  console.log(currentPosts);

  return (
    <div>
      <div className="form-group input-group-text">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1>Driver Standing Page</h1>
          <div className="search">
            <label htmlFor="search">
              {" "}
              Filter by Driver or Constructor
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
            Select Year:
            <select
              name="year"
              data-id="year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              onBlur={(e) => {
                setYear(e.target.value);
              }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>

      <TableComponent
        tableData={currentPosts.map((driver) => ({
          ...driver,
          name: driver.Driver.givenName + " " + driver.Driver.familyName,
          constructor: driver.Constructors[0].name,
        }))}
        th={["Position", "Driver", "Constructor", "Wins", "Points"]}
        td={["position", "name", "constructor", "wins", "points"]}
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

export default DriverStandings;
