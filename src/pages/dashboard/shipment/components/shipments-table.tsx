/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FC, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Shipment } from "../../../../types";
import { LoaderContext } from "../../../../App";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-setting";
import { SCREENS } from "../../../../navigation/constant";
import { Link, useNavigate } from "react-router-dom";

const ShipmentTable: FC<{
  shipments: Shipment[];
  getShipments: () => Promise<void>;
}> = ({ shipments, getShipments }) => {
  const { setIsLoading } = useContext(LoaderContext);

  const navigate = useNavigate();

  const deleteShipment = async (id: string) => {
    if (confirm("are you sure you want to delete this shipment request?")) {
      setIsLoading!(true);
      await deleteDoc(doc(db, "packages", id));
      alert("Shipment deleted");
      await getShipments();
      setIsLoading!(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Table className="py-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sender Name</TableHead>
            <TableHead>Sender Phone</TableHead>
            <TableHead>Receiver Name</TableHead>
            <TableHead>Tracking Number</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments &&
            shipments.map((shipment: any, index: number) => (
              <TableRow className={`bg-gray-50`} key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <Link to={SCREENS.INVOICE(shipment.id)}>
                    {shipment.package_name ?? "Royal Gold"}
                  </Link>
                </TableCell>
                <TableCell>{shipment.package_weight ?? "32kg"}</TableCell>
                <TableCell className="align-middle">
                  <div className="badge">{shipment.status}</div>
                </TableCell>
                <TableCell>{shipment.sender_name ?? "John Doe"}</TableCell>
                <TableCell>{shipment.sender_phone ?? "0123456789"}</TableCell>
                <TableCell>{shipment.receiver_name ?? "John Doe"}</TableCell>
                <TableCell>{shipment.trackingNumber}</TableCell>

                <TableCell>
                  <div className="flex justify-between items-center">
                    <button
                      className="cursor-pointer flex items-center justify-center h-8 w-8 shadow-md rounded-full bg-blue-500"
                      onClick={() =>
                        navigate(SCREENS.EDIT_SHIPMENT(shipment.id))
                      }
                    >
                      <i className="fas fa-edit text-white" />
                    </button>
                    <span
                      className="cursor-pointer ml-2 flex items-center justify-center h-8 w-8 shadow-md bg-red-500 rounded-full"
                      onClick={() => {
                        deleteShipment(shipment.id);
                      }}
                    >
                      <i className="fas fa-trash text-white" />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShipmentTable;
