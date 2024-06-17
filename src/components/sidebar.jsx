import { Link } from "react-router-dom";
import { SCREENS } from "../navigation/constants";

const Sidebar = () => {
  return (
    <div className="main-sidebar sidebar-style-2">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href="index.html"> <img alt="image" src="assets/img/logo.png" className="header-logo" /> <span
            className="logo-name">Otika</span>
          </a>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-header">Main</li>
          <li className="dropdown active">
            <Link to={SCREENS.DASHBOARD} className="nav-link"><i data-feather="monitor"></i><span>Dashboard</span></Link>
          </li>
          <li className="dropdown">
            <Link to={SCREENS.SHIPMENTS} className="nav-link"><i data-feather="monitor"></i><span>Shipments</span></Link>
          </li>
          <li className="dropdown">
            <Link to={SCREENS.CREATE_SHIPMENT} className="nav-link"><i data-feather="monitor"></i><span>Create Shipments</span></Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar;