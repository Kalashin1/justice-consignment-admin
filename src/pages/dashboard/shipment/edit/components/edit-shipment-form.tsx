import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase-setting";
import { useNavigate, useParams } from "react-router-dom";
import { SCREENS } from "../../../../../navigation/constant";
import { LoaderContext } from "../../../../../App";
import Input from "../../../../../components/ui/input";
import Select from "react-select";
import Textarea from "../../../../../components/ui/text-area";
import { Shipment } from "../../../../../types";

const EditShipmentForm = () => {
  const navigate = useNavigate();

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [status, setStatus] = useState("");

  const { id } = useParams();

  const { setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    const setup = async () => {
      // setIsLoading(true)
      const docRef = doc(db, "packages", id!);
      const docSnap = await getDoc(docRef);
      // setIsLoading(false)
      if (docSnap.exists()) {
        const data = {
          id: docSnap.id,
          ...docSnap.data(),
        } as unknown as Shipment;
        setShipment(data);
      } else {
        alert("No such document!");
        navigate(SCREENS.SHIPMENTS, {
          replace: true,
        });
      }
    };

    setup();
  }, [id, navigate]);

  const updateShipment = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading!(true);

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
        package_name: { value: package_name },
        package_weight: { value: package_weight },
        current_location: { value: current_location },
        package_description: { value: package_description },
      } = formRef.current!;

      const ref = doc(db, "packages", id!);

      await updateDoc(ref, {
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
        current_location,
        package_weight,
        status,
      });
      setIsLoading!(false);
      navigate(SCREENS.SHIPMENTS);
    } catch (error) {
      setIsLoading!(false);
      alert("error updating document");
    }
  };

  return (
    <form
      onSubmit={updateShipment}
      className="form bg-white p-6 my-10 relative w-full"
      ref={formRef}
    >
      <h3 className="text-2xl text-gray-900 font-semibold my-4">
        Edit Shipment
      </h3>
      <p className="text-gray-600 mb-2"> Update Shipment for a user</p>
      <div className="flex lg:space-x-5 mt-3 flex-col justify-center items-center">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 space-x-4 w-full">
          <Input
            placeholder="sender_name"
            name="sender_name"
            defaultValue={shipment?.sender_name}
          />
          <Input
            name="sender_phone"
            placeholder="sender phone"
            type="text"
            defaultValue={shipment?.sender_name}
          />
          <Input
            name="sender_email"
            placeholder="sener email"
            defaultValue={shipment?.sender_email}
          />
          <Input
            name="sender_address"
            placeholder="sender address"
            type="text"
            defaultValue={shipment?.sender_address}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-4 w-full">
          <Input
            name="receiver_name"
            type="text"
            placeholder="Receiver name"
            defaultValue={shipment?.receiver_name}
          />

          <Input
            name="receiver_phone"
            type="text"
            defaultValue={shipment?.receiver_phone}
            placeholder="Receiver phone number"
          />

          <Input
            name="receiver_email"
            type="email"
            defaultValue={shipment?.receiver_email}
            placeholder="Receiver email"
          />
          <Input
            name="receiver_address"
            type="text"
            defaultValue={shipment?.receiver_address}
            placeholder="Receiver Address"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 space-x-4 w-full">
          <Input
            name="package_name"
            type="text"
            defaultValue={shipment?.package_name}
            placeholder="Package Name"
          />
          <Input
            name="package_weight"
            type="text"
            defaultValue={shipment?.package_weight}
            placeholder="Package Weight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 space-x-4 w-full">
          <Textarea
            name="package_description"
            placeholder="Package Description"
            defaultValue={shipment?.package_description}
          />

          <Select
            defaultValue={{ label: shipment?.status, value: shipment?.status }}
            // name="status"
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
              {
                value: "arrived",
                label: "Arrived",
              },
              {
                value: "pickup",
                label: "Pickup",
              },
            ]}
            onChange={(v) => setStatus(v?.value as string)}
          />
        </div>
        <div className="w-full px-2">
          <Input
            name="current_location"
            defaultValue={shipment?.current_location}
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

export default EditShipmentForm;
