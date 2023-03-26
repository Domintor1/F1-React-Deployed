import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchConstructorStandings from "../ConstructorStandingsVisualised/fetchConstructorStandings";
import BarChartOptions from "./BarChartInfo";
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

const CStandingsVisualised = () => {
  const [year, setYear] = useState(2014);
  const constructorList = useQuery(
    ["constructorList", year],
    fetchConstructorStandings
  );
  const [searchValue, setSearchValue] = useState("");
  const [showBarChart, setShowBarChart] = useState(true);
  const [showPieChart, setShowPieChart] = useState(false);

  const handleBarChart = () => {
    setShowBarChart(true);
    setShowPieChart(false);
  };

  const handlePieChart = () => {
    setShowPieChart(true);
    setShowBarChart(false);
  };

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

  const labels = filteredData.map((constructor) => {
    return constructor.Constructor.name;
  });

  const barData = {
    labels,
    datasets: [
      {
        label: `Constructor points in ${year} season`,
        data: filteredData.map((points) => {
          return points.points;
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
        label: `Constructor points in ${year} Season`,
        data: filteredData.map((points) => {
          return points.points;
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
          "rgba(79,143,35)",
        ],
        borderWidth: 1,
        borderColor: "black",
      },
    ],
  };

  return (
    <div>
      <div className="form-group input-group-text">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1>Team Standings Graphs</h1>
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

export default CStandingsVisualised;
