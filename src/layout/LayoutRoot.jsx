import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

const LayoutRoot = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default LayoutRoot;