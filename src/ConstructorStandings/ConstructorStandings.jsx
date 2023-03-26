import { useEffect, useState } from "react";
import Pagination from "../Pagination";
// import fetchConstructorStandings from "./fetchConstructorStandings";
import { useQuery } from "@tanstack/react-query";
import fetchConstructorStandings from "../ConstructorStandingsVisualised/fetchConstructorStandings";
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
  "2023",
];

const ConstructorStandings = () => {
  const [year, setYear] = useState(2014);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const constructorList = useQuery(
    ["constructorList", year],
    fetchConstructorStandings
  );

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [year]);

  if (constructorList.isLoading)
    return (
      <div className="loading">
        <h2 className="loader">🌀</h2>
      </div>
    );

  const data =
    constructorList.data.MRData.StandingsTable.StandingsLists[0]
      .ConstructorStandings;

  const filteredData = data.filter((constructor) => {
    return constructor.Constructor.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
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
          <h1>Constructor Standings </h1>

          <div className="search">
            <label htmlFor="search">
              Filter Constructors
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
              id="year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            >
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>

      <TableComponent
        tableData={currentPosts.map((constructor) => ({
          ...constructor,
          constructorName: constructor.Constructor.name,
          constructorNationality: constructor.Constructor.nationality,
        }))}
        th={["Position", "Constructor", "Nationality", "Wins", "Points"]}
        td={[
          "position",
          "constructorName",
          "constructorNationality",
          "wins",
          "points",
        ]}
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

export default ConstructorStandings;
