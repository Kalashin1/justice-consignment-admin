import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/dashboard";
import Login from "../pages/auth";
import { SCREENS } from './constants'
import Shipments from "../pages/dashboard/shipments";
import CreateShipment from "../pages/dashboard/create-shipment";
import UpdateShipment from "../pages/dashboard/update-shipment";
import Invoice from "../pages/dashboard/shipments/invoice";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />
  },
  {
    element: <Home />,
    path: SCREENS.DASHBOARD
  },
  {
    element: <Shipments />,
    path: SCREENS.SHIPMENTS
  },
  {
    element: <CreateShipment />,
    path: SCREENS.CREATE_SHIPMENT
  },
  {
    element: <UpdateShipment />,
    path: SCREENS.EDIT_SHIPMENT()
  },
  {
    element: <Invoice />,
    path: SCREENS.INVOICE()
  },
])

export default router;