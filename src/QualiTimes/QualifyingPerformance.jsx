import { useState, useEffect } from "react";
import Pagination from "../Pagination";
import { useQuery } from "@tanstack/react-query";
import fetchLapTime from "./fetchLapTime";
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

const QualifyingPerformace = () => {
  const [year, setYear] = useState(2014);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const lapTime = useQuery(["getLapTime", year], fetchLapTime);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [year, searchValue]);

  if (lapTime.isLoading) {
    return (
      <div className="loading">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const data = lapTime.data.MRData.RaceTable.Races;

  const filteredData = data.filter((round) => {
    return (
      (round.round.includes(searchValue) &&
        round.round.length === searchValue.length) ||
      round.QualifyingResults[0].Constructor.name
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  });

  console.log(data[0]);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div className="form-group input-group-text col-sm">
        <form>
          <h1> Pole Sitters Page</h1>
          <span className="search">
            <label htmlFor="search">
              Filter by Round
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
          </span>

          <label htmlFor="year">
            {" "}
            Select Year:
            <select
              data-testid="qualiYear"
              name="year"
              id="year"
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
        tableData={currentPosts.map((pole) => ({
          ...pole,
          driverName:
            pole.QualifyingResults[0].Driver.givenName +
            " " +
            pole.QualifyingResults[0].Driver.familyName,
          constructorName: pole.QualifyingResults[0].Constructor.name,
          Q3Time: pole.QualifyingResults[0].Q3,
        }))}
        th={["Round", "Circuit", "Driver", "Constructor", "Q3 Pole Time"]}
        td={["round", "raceName", "driverName", "constructorName", "Q3Time"]}
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

export default QualifyingPerformace;
