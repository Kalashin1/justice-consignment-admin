import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/dashboard/home";
import Login from "../pages/auth/login";
import { SCREENS } from "./constant";
import Register from "../pages/auth/register";
import Shipments from "../pages/dashboard/shipment";
import CreateShipment from "../pages/dashboard/shipment/create";
import EditShipment from "../pages/dashboard/shipment/edit";
import Invoice from "../pages/dashboard/invoice";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: SCREENS.LOGIN,
    element: <Login />,
  },
  {
    path: SCREENS.DASHBOARD,
    element: <Home />,
  },
  {
    path: SCREENS.REGISTER,
    element: <Register />,
  },
  {
    path: SCREENS.SHIPMENTS,
    element: <Shipments />,
  },
  {
    path: SCREENS.CREATE_SHIPMENT,
    element: <CreateShipment />,
  },
  {
    path: SCREENS.EDIT_SHIPMENT(),
    element: <EditShipment />,
  },
  {
    path: SCREENS.INVOICE(),
    element: <Invoice />,
  },
]);

export default router;
