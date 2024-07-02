/* eslint-disable react/prop-types */
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Loader from "./loader";
import { createContext, useState } from "react";

export const LoaderContext = createContext({})
export const SidebarControlContext = createContext({})

const Layout = ({
  children
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);

  if (isLoading) return <Loader />
  else return (
    <SidebarControlContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
      <LoaderContext.Provider value={{
        isLoading,
        setIsLoading
      }}>
        <div className="main-wrapper main-wrapper-1">
          <Navbar />
          <Sidebar />
          <div className="main-content">
            {children}
          </div>
        </div>
      </LoaderContext.Provider>
    </SidebarControlContext.Provider>
  )
};

export default Layout;