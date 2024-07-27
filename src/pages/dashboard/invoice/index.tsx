/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useContext, useEffect, useState } from "react";
import { Shipment } from "../../../types";
import Layout from "../components/layout";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderContext } from "../../../App";
import { db } from "../../../firebase-setting";
import { SCREENS } from "../../../navigation/constant";

import { usePDF } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";

const Invoice = () => {
  const navigate = useNavigate();

  const [shipment, setShipment] = useState<Shipment | null>(null);

  const { id } = useParams();

  const { setIsLoading } = useContext(LoaderContext);

  const {
    // toPDF,
    targetRef,
  } = usePDF({ filename: "page.pdf", page: { format: "A5" } });

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
  });

  useEffect(() => {
    const setup = async () => {
      setIsLoading!(true);
      const docRef = doc(db, "packages", id!);
      const docSnap = await getDoc(docRef);
      setIsLoading!(false);
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

  return (
    <Layout>
      <div className="py-4" ref={targetRef}>
        <div className="px-14 py-6">
          <table className="w-full border-collapse border-spacing-0">
            <tbody>
              <tr>
                <td className="w-full align-top">
                  <div className="text-xl font-bold">UPS Logistics</div>
                  <button
                    onClick={handlePrint}
                    className="px-12 py-1.5 my-2 rounded-md shadow-md bg-purple-600"
                  >
                    <i className="fas fa-print text-white" />
                  </button>
                </td>

                <td className="align-top">
                  <div className="text-sm">
                    <table className="border-collapse border-spacing-0">
                      <tbody>
                        <tr>
                          <td className="border-r pr-4">
                            <div>
                              <p className="whitespace-nowrap text-slate-400 text-right">
                                Date
                              </p>
                              <p className="whitespace-nowrap font-bold text-main text-right">
                                {new Date(shipment?.created_at!).toDateString()}
                              </p>
                            </div>
                          </td>
                          <td className="pl-4">
                            <div>
                              <p className="whitespace-nowrap text-slate-400 text-right">
                                Invoice #
                              </p>
                              <p className="whitespace-nowrap font-bold text-main text-right">
                                {shipment?.trackingNumber}
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-100 px-14 py-6 text-sm">
          <table className="w-full border-collapse border-spacing-0">
            <tbody>
              <tr>
                <td className="w-1/2 align-top">
                  <div className="text-sm text-neutral-600">
                    <p className="font-bold">Sender Details</p>
                    <p>{shipment?.sender_name}</p>
                    <p>Number: {shipment?.sender_phone}</p>

                    <p>{shipment?.sender_address}</p>
                    <p>{shipment?.sender_email}</p>
                  </div>
                </td>
                <td className="w-1/2 align-top text-right">
                  <div className="text-sm text-neutral-600">
                    <p className="font-bold">Receiver Details</p>
                    <p>{shipment?.receiver_name}</p>
                    <p>Number: {shipment?.receiver_phone}</p>

                    <p>{shipment?.receiver_address}</p>
                    <p>{shipment?.receiver_email}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-14 py-10 text-sm text-neutral-700">
          <table className="w-full border-collapse border-spacing-0">
            <thead>
              <tr>
                <td className="border-b-2 border-main pb-3 pl-3 font-bold text-main">
                  #
                </td>
                <td className="border-b-2 border-main pb-3 pl-2 font-bold text-main">
                  Package details
                </td>
                <td className="border-b-2 border-main pb-3 pl-2 font-bold text-main">
                  Item
                </td>
                <td className="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">
                  weight
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b py-3 pl-3">1.</td>
                <td className="border-b py-3 pl-2">
                  {shipment?.package_description}
                </td>
                <td className="border-b py-3 pl-2">{shipment?.package_name}</td>
                <td className="border-b py-3 pl-2 text-center">
                  {shipment?.package_weight}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="px-14 text-sm text-neutral-700">
            <p className="text-main font-bold">PAYMENT DETAILS</p>
            <p className="my-2 p-1">
              Sub total{" "}
              <span className="p-2" contentEditable>
                $0
              </span>
            </p>
            <p className="my-2 p-1">
              Shiping Fee:{" "}
              <span className="p-2" contentEditable>
                $0
              </span>
            </p>
            <p className="my-2 p-1">
              Total:{" "}
              <span className="p-2" contentEditable>
                $0
              </span>
            </p>
            <p>Payment Reference: BRA-{shipment?.trackingNumber}</p>
          </div>

          <div className="flex flex-row">
            <img src="/stamp-1.png" className="h-[210px] w-[250px] mt-8" />
            <img src="/stamp-2.png" width={250} height={250} />
          </div>
        </div>

        <footer className="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
          UPS Logistics
          <span className="text-slate-300 px-2">|</span>
          mobiletracking.co
          <span className="text-slate-300 px-2">|</span>
          +1-202-555-0106
        </footer>
      </div>
    </Layout>
  );
};

export default Invoice;
