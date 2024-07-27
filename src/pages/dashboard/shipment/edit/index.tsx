import Layout from "../../components/layout";
import EditShipmentForm from "./components/edit-shipment-form";

const EditShipment = () => {
  return (
    <Layout>
      <section className="px-8 py-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <EditShipmentForm />
      </section>
    </Layout>
  );
};

export default EditShipment;
