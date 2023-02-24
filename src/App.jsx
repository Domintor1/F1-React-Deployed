import { Suspense, lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

{
  /* Lazy load in router components to load them in only when requested  */
}

const DriverList = lazy(() => import("./DriverList/DriverList"));
const Calendar = lazy(() => import("./Calendar/Calendar"));
const ConstructorStandings = lazy(() =>
  import("./ConstructorStandings/ConstructorStandings")
);
const DriverStandings = lazy(() => import("./DriverStandings/DriverStandings"));
const DStandingsVisualised = lazy(() =>
  import("./DriverStandingsVisualised/DStandingsVisualised")
);
const CStandingsVisualised = lazy(() =>
  import("./ConstructorStandingsVisualised/CStandingsVisualised")
);
const QualifyingPerformace = lazy(() =>
  import("./QualiTimes/QualifyingPerformance")
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading">
                <h2 className="loader">🌀</h2>
              </div>
            }
          >
            <div className="container-responsive">
              <NavBar />
              <div>
                <Routes>
                  <Route path="/" element={<DriverList />} />
                  <Route path="/Calendar" element={<Calendar />} />
                  <Route
                    path="/DriverStandings"
                    element={<DriverStandings />}
                  />
                  <Route
                    path="/ConstructorStandings"
                    element={<ConstructorStandings />}
                  />
                  <Route
                    path="/PoleSitters"
                    element={<QualifyingPerformace />}
                  />
                  <Route
                    path="/DriverStandingsVisualised"
                    element={<DStandingsVisualised />}
                  />
                  <Route
                    path="/ConstructorStandingsVisualised"
                    element={<CStandingsVisualised />}
                  />
                </Routes>
              </div>
            </div>
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
