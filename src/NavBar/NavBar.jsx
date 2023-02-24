const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="./">
          <span id="wiki">F1</span> Turbo-Hybrid Era Wiki
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end w-100"
          id="navbarSupportedContent"
        >
          <div className="dropdown">
            <a
              className="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Driver Standings
            </a>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a className="dropdown-item" href="/driverStandings">
                  Standings Table
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/DriverStandingsVisualised">
                  Standings Table Visualised
                </a>
              </li>
            </ul>
          </div>

          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link" href="/calendar">
                Calender
              </a>
            </li>

            <div className="dropdown">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Constuctor Standings
              </a>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="/constructorStandings">
                    Constructors Standings Table
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/ConstructorStandingsVisualised"
                  >
                    Constructors Standings Visualised
                  </a>
                </li>
              </ul>
            </div>

            <li className="nav-item">
              <a className="nav-link" href="/poleSitters">
                Pole Sitters
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
