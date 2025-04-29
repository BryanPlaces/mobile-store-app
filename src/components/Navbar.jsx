import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ShopingCartIcon from "./icons/ShoppingCartIcon";

const NavbarComponent = () => {

  const { productsCartCount } = useCart();

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          MOBILE STORE
        </NavLink>

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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/" 
                end
                style={({ isActive }) => ({ 
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? 'black' : 'inherit'
                })}
              >
                Home
              </NavLink>
            </li>
          </ul>
          <div className="buttons">
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







      </div>
    </nav>
  );
}

export default NavbarComponent;