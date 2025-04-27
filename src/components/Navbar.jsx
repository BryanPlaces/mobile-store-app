import { NavLink } from "react-router-dom";

const NavbarComponent = () => {

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          MOBILE STORE
        </NavLink>
      </div>
    </nav>
  );
}

export default NavbarComponent;