import { Link } from "react-router-dom";
import { SCREENS } from "../navigation/constants";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { SidebarControlContext } from "./layout";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate(SCREENS.LOGIN);
  }

  const { toggleSidebar, setToggleSidebar } = useContext(SidebarControlContext)

  return (
    <>
      <div className="navbar-bg"></div>
      <nav className="navbar navbar-expand-lg main-navbar sticky">
        <div className="form-inline mr-auto">
          <ul className="navbar-nav mr-3">
            <li><button style={{ cursor: 'pointer' }} data-toggle="sidebar" className="nav-link nav-link-lg
									collapse-btn"> <i className="fas fa-bars" style={{ color: 'black' }} onClick={() => {
                setToggleSidebar(!toggleSidebar)


              }}></i></button></li>

            <li>
              <form className="form-inline mr-auto">
                <div className="search-element">
                  <input className="form-control" type="search" placeholder="Search" aria-label="Search" data-width="200" />
                  <button className="btn" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav navbar-right">

          <li className="dropdown"><a href="#" data-toggle="dropdown"
            className="nav-link dropdown-toggle nav-link-lg nav-link-user"> <img alt="image" src="/assets/img/user.png"
              className="user-img-radious-style" /> <span className="d-sm-none d-lg-inline-block"></span></a>
            <div className="dropdown-menu dropdown-menu-right pullDown">
              <div className="dropdown-title">Hello Admin</div>
              <Link to={SCREENS.SHIPMENTS} className="dropdown-item has-icon"> <i className="fas fa-bolt"></i>
                Shipments
              </Link> <Link to={SCREENS.CREATE_SHIPMENT} className="dropdown-item has-icon"> <i className="fas fa-plus"></i>
                Create Shipment
              </Link>
              <div className="dropdown-divider"></div>
              <a onClick={handleLogout} href="#" className="dropdown-item has-icon text-danger"> <i className="fas fa-sign-out-alt"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;