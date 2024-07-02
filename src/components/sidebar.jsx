import { Link } from "react-router-dom";
import { SCREENS } from "../navigation/constants";
import { useContext } from "react";
import { SidebarControlContext } from "./layout";

const Sidebar = () => {
  const {
    toggleSidebar, setToggleSidebar
  } = useContext(SidebarControlContext)

  return (
    <div className="main-sidebar sidebar-style-2" id="sidebar">
      <aside id="sidebar-wrapper">
        <div className="sidebar-brand">
          <a href="index.html"> <img alt="image" src="/assets/img/logo.png" className="header-logo" /> <span
            className="logo-name">Otika</span>
          </a>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-header">Main</li>
          <li className="dropdown active">
            <Link to={SCREENS.DASHBOARD} className="nav-link"><i className="fas fa-home"></i>{(<span>Dashboard</span>)}</Link>
          </li>
          <li className="dropdown">
            <Link to={SCREENS.SHIPMENTS} className="nav-link"><i className="fas fa-ship"></i><span>Shipments</span></Link>
          </li>
          <li className="dropdown">
            <Link to={SCREENS.CREATE_SHIPMENT} className="nav-link"><i className="fas fa-plus"></i><span>Create Shipments</span></Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar;