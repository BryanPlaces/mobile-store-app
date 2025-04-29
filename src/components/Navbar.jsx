import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ShopingCartIcon from "./icons/ShoppingCartIcon";

const BreadcrumbComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const productName = location.state?.productName;

  return (
    <ol className="breadcrumb mx-auto mb-2 mb-lg-0">
      <li className="breadcrumb-item">
        <NavLink to='/' className="breadcrumb-link" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </NavLink>
      </li>
      {
        pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={routeTo} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
              <span className="breadcrumb-current">{isLast && productName ? productName : path}</span>
            </li>
          )
        })
      }
    </ol>
  )
}

const NavbarComponent = () => {

  const { productsCartCount } = useCart();

  return (
    <nav className="navbar bg-white py-3 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          MOBILE STORE
        </NavLink>
          
        <div className="d-none d-md-flex mx-auto">
          <BreadcrumbComponent />
        </div>

        <div className="buttons ms-auto">
          <NavLink to="/cart">
            <button className="btn btn-outline-dark">
              <ShopingCartIcon /> 
              <span className="badge bg-danger" style={{fontSize: '10px'}}>
                {productsCartCount}
              </span>
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavbarComponent;