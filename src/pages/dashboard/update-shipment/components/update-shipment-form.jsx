import { useNavigate, useParams } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constants";
import { useContext, useEffect, useRef, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { LoaderContext } from "../../../../components/layout";

const UpdateShipmentForm = () => {
  const navigate = useNavigate();

  const [shipment, setShipment] = useState();

  const { id } = useParams()

  const { setIsLoading } = useContext(LoaderContext);



  useEffect(() => {
    const setup = async () => {
      // setIsLoading(true)
      const docRef = doc(db, "packages", id);
      const docSnap = await getDoc(docRef);
      // setIsLoading(false)
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setShipment(docSnap.data());
      } else {
        alert("No such document!");
        navigate(SCREENS.SHIPMENTS, {
          replace: true
        })
      }
    }

    setup()
  }, [id])

  const updateShipment = async (e, formRef) => {
    e.preventDefault();
    setIsLoading(true);

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
        status: { value: status }
      } = formRef.current;

      const ref = doc(db, "packages", id);

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
      setIsLoading(false);
      navigate(SCREENS.SHIPMENTS);
    } catch (error) {
      setIsLoading(false)
      alert('error updating document')
    }
  }

  const formRef = useRef(null)
  return (
    <section className="section">
      <div className="section-body">
        <div className="row">
          <div className="col-12">

            <div className="card">
              <div className="card-header">
                <h4>Update Shipment Request {shipment?.trackingNumber}</h4>
              </div>
              <div className="card-body">
                <form ref={formRef} onSubmit={e => updateShipment(e, formRef)}>
                  <div className="d-flex flex-row">
                    <div className="form-group col-3 sm-col-12">
                      <label>Sender Name</label>
                      <input defaultValue={shipment?.sender_name} name="sender_name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Sender Phone</label>
                      <input name="sender_phone" defaultValue={shipment?.sender_phone} type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Sender Email</label>
                      <input name="sender_email" defaultValue={shipment?.sender_email} type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Sender Address</label>
                      <input name="sender_address" defaultValue={shipment?.sender_address} type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="form-group col-3 sm-col-12">
                      <label>Receiver Name</label>
                      <input name="receiver_name" defaultValue={shipment?.receiver_name} type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Reciever Phone</label>
                      <input name="receiver_phone" defaultValue={shipment?.receiver_phone} type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Receiver Email</label>
                      <input name="receiver_email" defaultValue={shipment?.receiver_email} type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Receiver Address</label>
                      <input name="receiver_address" defaultValue={shipment?.receiver_address} type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="form-group col-6 sm-col-12">
                      <label>Package Name</label>
                      <input name="package_name" defaultValue={shipment?.package_name} type="text" className="form-control" />
                    </div>
                    <div className="form-group col-6 sm-col-12">
                      <label>Package Weight</label>
                      <input name="package_weight" defaultValue={shipment?.package_weight} type="text" className="form-control" />
                    </div>

                  </div>

                  <div className="d-flex flex-row">
                    <div className="form-group col-6 sm-col-12">
                      <label>Current Location</label>
                      <input defaultValue={shipment?.current_location} name="current_location" type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="d-flex flex-row">
                    <div className="form-group col-6 sm-col-12">
                      <label>package Description</label>
                      <textarea name="package_description" defaultValue={shipment?.package_description} type="text" className="form-control"></textarea>
                    </div>

                    <div className="form-group col-6 sm-col-12">
                      <label>Status</label>
                      <select name="status" type="text" className="form-control">
                        <option value="processing">Processing</option>
                        <option value="in-transit">In Transit</option>
                        <option value="canceled">Canceled</option>
                        <option value="delivered">Delivered</option>
                        <option value="dispensed">Dispensed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-success">Update Shipment Request</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpdateShipmentForm;