import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import fetchRacebyRaceData from "./fetchRacebyRaceData";
import BarChartOptions from "../ConstructorStandingsVisualised/BarChartInfo";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import PieChartOptions from "./PieChartInfo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

const DStandingsVisualised = () => {
  const [year, setYear] = useState(2014);
  const raceData = useQuery(["race-data", year], fetchRacebyRaceData);
  const [searchValue, setSearchValue] = useState("");
  const [showBarChart, setShowBarChart] = useState(true);
  const [showPieChart, setShowPieChart] = useState(false);

  const handleBarChart = () => {
    setShowPieChart(false);
    setShowBarChart(true);
  };

  const handlePieChart = () => {
    setShowBarChart(false);
    setShowPieChart(true);
  };

  if (raceData.isLoading)
    return (
      <div className="loading">
        <h2 className="loader">🌀</h2>
      </div>
    );

  const data =
    raceData.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

  const filteredData = data.filter((drivers) => {
    const fullName = drivers.Driver.givenName + " " + drivers.Driver.familyName;
    return (
      drivers.Driver.familyName
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      drivers.Driver.givenName
        .toLowerCase()
        .includes(searchValue.toLowerCase()) ||
      fullName.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const labels = filteredData.map((driver) => {
    return driver.Driver.familyName;
  });

  const barData = {
    labels,
    datasets: [
      {
        label: "Drivers Points",
        data: filteredData.map((results) => {
          return results.points;
        }),
        maxBarThickness: 50,
        borderWidth: 5,
        borderColor: "black",
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: `Points in ${year} Season`,
        data: filteredData.map((driver) => {
          let test = driver.points;
          return test;
        }),
        backgroundColor: [
          "rgba(255,0,0)",
          "rgba(255,127,0)",
          "rgba(35,98,143)",
          "rgba(106,255,0)",
          "rgba(0,234,255)",
          "rgba(143,35,35)",
          "rgba(0,149,255)",
          "rgba(0,64,255)",
          "rgba(170,0,255)",
          "rgba(0,0,0)",
          "rgba(79,143,35)",
          "rgba(115,115,115)",
          "rgba(143,106,35)",
        ],
        borderWidth: 1,
        borderColor: "black",
      },
    ],
  };

  return (
    <div>
      <div className="form-group input-group-text">
        {/* Get form data and update table according to filters */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1> Driver Standings Graphs</h1>
          <div className="search">
            <label htmlFor="search">
              Filter Drivers
              <input
                type="search"
                name="search"
                value={searchValue}
                placeholder="Filter"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </label>
          </div>

          <div className="year">
            <label htmlFor="year">
              Select Year:
              <select
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
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
      </div>

      <div className="chart-container">
        <button
          className="chartBtn"
          onClick={handleBarChart}
          data-testid="testingChart"
        >
          Bar Chart
        </button>
        <button
          className="chartBtn"
          onClick={handlePieChart}
          data-testid="pieBtnTest"
        >
          Pie Chart
        </button>
        {showBarChart && <Bar options={BarChartOptions} data={barData} />}
        {showPieChart && <Pie options={PieChartOptions} data={pieData} />}
      </div>
    </div>
  );
};

export default DStandingsVisualised;
