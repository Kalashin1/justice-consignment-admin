import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";

import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../navigation/constant";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <i className="fas fa-bars" />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:w-3/12" side="left">
        <SheetHeader>
          <SheetTitle>Cypher</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-gray-700 mt-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(SCREENS.DASHBOARD)}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <i className="fas fa-house-user" />
            </div>
            Dashboard
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(SCREENS.CREATE_SHIPMENT)}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <i className="fa-solid fa-square-plus"></i>
            </div>
            Create Shipment
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => navigate(SCREENS.SHIPMENTS)}
            className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
          >
            <div className="grid place-items-center mr-4">
              <i className="fa-solid fa-seedling"></i>
            </div>
            Shipments
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
