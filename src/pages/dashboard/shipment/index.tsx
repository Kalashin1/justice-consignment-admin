import { useEffect, useState } from "react";
import Layout from "../components/layout";
import ShipmentTable from "./components/shipments-table";
import { Shipment } from "../../../types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase-setting";

const Shipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  const fetchShipments = async () => {
    const shipmentsQuery = query(
      collection(db, "packages"),
      orderBy("created_at", "desc")
    );
    const shipmentsDocs = await getDocs(shipmentsQuery);
    const shipments = shipmentsDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as Shipment[];
    console.log("shipments", shipments);
    setShipments(shipments);
  };

  useEffect(() => {
    const set_up = async () => {
      await fetchShipments();
    };

    set_up();
  }, []);
  return (
    <Layout>
      <div className="px-12 py-8">
        <h3 className="text-2xl font-bold">Your Investments</h3>
      </div>
      <section className="px-12 py-6 h-screen">
        <div className="bg-white">
          <ShipmentTable shipments={shipments} getShipments={fetchShipments} />
        </div>
      </section>
    </Layout>
  );
};

export default Shipments;
