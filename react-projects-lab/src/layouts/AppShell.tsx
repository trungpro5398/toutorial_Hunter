import { Link, NavLink, Outlet } from "react-router-dom";

export function AppShell() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            R
          </span>
          <span>
            <strong>React Projects Lab</strong>
            <small>10 small web projects</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/">Projects</NavLink>
          <NavLink to="/projects/snake-game">Snake Game</NavLink>
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>
    </div>
  );
}
