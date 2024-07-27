import Layout from "../../components/layout";
import CreateShipmentForm from "./components/create-shipment-form";

const CreateShipment = () => {
  return (
    <Layout>
      <section className="px-8 py-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <CreateShipmentForm />
      </section>
    </Layout>
  );
};

export default CreateShipment;
