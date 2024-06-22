import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constants";
import { useContext, useRef } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { LoaderContext } from "../../../../components/layout";


const CreateShipmentForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const { setIsLoading } = useContext(LoaderContext)

  const handleSubmit = async (e, formRef) => {
    e.preventDefault();
    setIsLoading(true)
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
        status: { value: status }
      } = formRef.current;

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
        created_at: new Date().getTime()
      });
      setIsLoading(false)
      navigate(SCREENS.SHIPMENTS)

    } catch (error) {
      alert("Error creating shipment");
      console.log(error)
    }
  }


  return (
    <section className="section">
      <div className="section-body">
        <div className="row">
          <div className="col-12">

            <div className="card" style={{ overflow: 'auto' }}>
              <div className="card-header">
                <h4>Create Shipment Request</h4>
              </div>
              <div className="card-body">
                <form ref={formRef} onSubmit={e => handleSubmit(e, formRef)}>
                  <div className="d-flex flex-row">
                    <div className="form-group col-3 sm-col-12">
                      <label>Sender Name</label>
                      <input name="sender_name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Sender Phone</label>
                      <input name="sender_phone" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Sender Email</label>
                      <input name="sender_email" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Sender Address</label>
                      <input name="sender_address" type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="form-group col-3 sm-col-12">
                      <label>Receiver Name</label>
                      <input name="receiver_name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Reciever Phone</label>
                      <input name="receiver_phone" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Receiver Email</label>
                      <input name="receiver_email" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-3 sm-col-12">
                      <label>Receiver Address</label>
                      <input name="receiver_address" type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="form-group col-6 sm-col-12">
                      <label>Package Name</label>
                      <input name="package_name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-6 sm-col-12">
                      <label>Package Weight</label>
                      <input name="package_weight" type="text" className="form-control" />
                    </div>

                  </div>

                  <div className="d-flex flex-row">
                    <div className="form-group col-6 sm-col-12">
                      <label>package Description</label>
                      <textarea name="package_description" type="text" className="form-control"></textarea>
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

                  <div className="d-flex flex-row">
                    <div className="form-group col-6 sm-col-12">
                      <label>Current Location</label>
                      <input name="current_location" type="text" className="form-control" />
                    </div>
                  </div>

                  <div>
                    <button type="submit" className="btn btn-success">Create Shipment Request</button>
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

export default CreateShipmentForm;