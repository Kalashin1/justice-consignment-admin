import { FormEvent, useContext, useEffect, useRef } from "react";
import { query, collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../../../firebase-setting";
import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../../../navigation/constant";
import { LoaderContext } from "../../../../../App";
import Input from "../../../../../components/ui/input";
import Select from "react-select";
import Textarea from "../../../../../components/ui/text-area";

const CreateShiptmentForm = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoaderContext);

  const formRef = useRef<HTMLFormElement | null>(null);

  const createShipment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const {
        sender_name: { value: sender_name },
        sender_email: { value: sender_email },
        sender_phone: { value: sender_phone },
        sender_address: { value: sender_address },
        receiver_name: { value: receiver_name },
        receiver_phone: { value: receiver_phone },
        receiver_email: { value: receiver_email },
        receiver_address: { value: receiver_address },
        current_location: { value: current_location },
        package_name: { value: package_name },
        package_weight: { value: package_weight },
        package_description: { value: package_description },
        status: { value: status },
      } = formRef.current!;

      await addDoc(collection(db, "packages"), {
        sender_name,
        sender_email,
        sender_phone,
        sender_address,
        receiver_name,
        receiver_email,
        receiver_phone,
        receiver_address,
        package_name,
        package_description,
        package_weight,
        status,
        current_location,
        trackingNumber: Math.floor(Math.random() * 1000000000),
        created_at: new Date().getTime(),
      });
      setIsLoading!(false);
      alert("Shipment added");
      navigate(SCREENS.SHIPMENTS);
    } catch (error) {
      alert("error creating Shipment");
      console.log(error);
    }
  };

  useEffect(() => {
    const set_up = async () => {
      const q = await query(collection(db, "shipments"));

      const docSnap = await getDocs(q);

      const _shipments = docSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as [];

      console.log(_shipments);
    };

    set_up();
  }, []);

  return (
    <form
      onSubmit={createShipment}
      ref={formRef}
      className="form bg-white p-6 my-10 relative w-full"
    >
      <h3 className="text-2xl text-gray-900 font-semibold my-4">
        Create Shipments
      </h3>
      <p className="text-gray-600 mb-2"> Register a new Shipment for a user</p>
      <div className="flex lg:space-x-5 mt-3 flex-col justify-center items-center">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 space-x-4 px-2 w-full">
          <Input placeholder="sender_name" name="sender_name" />
          <Input name="sender_phone" placeholder="sender phone" type="text" />
          <Input name="sender_email" placeholder="sener email" />
          <Input
            name="sender_address"
            placeholder="sender address"
            type="text"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-4 w-full">
          <Input name="receiver_name" type="text" placeholder="Receiver name" />

          <Input
            name="receiver_phone"
            type="text"
            placeholder="Receiver phone number"
          />

          <Input
            name="receiver_email"
            type="email"
            placeholder="Receiver email"
          />
          <Input
            name="receiver_address"
            type="text"
            placeholder="Receiver Address"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 space-x-4 w-full">
          <Input name="package_name" type="text" placeholder="Package Name" />
          <Input
            name="package_weight"
            type="text"
            placeholder="Package Weight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 space-x-4 w-full">
          <Textarea
            name="package_description"
            placeholder="Package Description"
          />

          <Select
            name="status"
            options={[
              {
                value: "processing",
                label: "Processing",
              },
              {
                value: "in-transit",
                label: "In Transit",
              },
              {
                value: "in-transit",
                label: "Canceled",
              },
              {
                value: "delivered",
                label: "Delivered",
              },
              {
                value: "dispensed",
                label: "Dispensed",
              },
            ]}
          />
        </div>
        <div className="w-full px-2">
          <Input
            name="current_location"
            placeholder="Current Location"
            type="text"
          />
        </div>
      </div>

      <input
        type="submit"
        value="Submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3 cursor-pointer"
      />
    </form>
  );
};

export default CreateShiptmentForm;
