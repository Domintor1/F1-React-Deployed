import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import fetchDriverList from "./fetchDriverList";
import Pagination from "../Pagination";
import TableComponent from "../Calendar/Table";

const YEARS = [
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

function getAge(date) {
  let formattedDate = date.split("-");
  let birthDate = new Date(
    formattedDate[0],
    formattedDate[1],
    formattedDate[2]
  );
  let currentDate = new Date().getTime();
  let difference = currentDate - birthDate;
  let currentAge = Math.floor(difference / 31557600000);
  return currentAge;
}

function DriverList() {
  const [year, setYear] = useState(2014);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const driverList = useQuery(["driverList", year], fetchDriverList);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    setCurrentPage(1);
  }, [year]);

  if (driverList.isLoading)
    return (
      <div className="loading">
        <h2 className="loader">🌀</h2>
      </div>
    );

  const data = driverList.data.MRData.DriverTable.Drivers;

  const filteredData = data.filter((driverInfo) => {
    const fullName = driverInfo.givenName + " " + driverInfo.familyName;
    return (
      fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      driverInfo.code.toLowerCase().includes(searchValue.toLowerCase()) ||
      driverInfo.nationality
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      getAge(driverInfo.dateOfBirth) < searchValue
    );
  });
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredData.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <div className="form-group input-group-text col-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1> Drivers List Page</h1>
          <span className="search">
            <label htmlFor="search">
              Filter by Name, Code, Nationality and Max Age
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
            Drivers List By Year:
            <select
              data-testid="defaultValTest"
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
              <option />
              {YEARS.map((year) => (
                <option key={year} value={year} defaultValue={year[3]}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>

      <TableComponent
        tableData={currentPosts.map((drivers) => ({
          ...drivers,
          index: data.indexOf(drivers) + 1,
          name: drivers.familyName + " " + drivers.givenName,
          age: getAge(drivers.dateOfBirth),
        }))}
        th={["Driver", "Code", "Name", "Driver Number", "Nationality", "Age"]}
        td={["index", "code", "name", "permanentNumber", "nationality", "age"]}
      />

      <Pagination
        title="tableLength"
        totalPosts={filteredData.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default DriverList;
