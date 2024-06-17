/* eslint-disable react/prop-types */
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const Layout = ({
  children
}) => {
  return (
    <div className="main-wrapper main-wrapper-1">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  )
};

export default Layout;