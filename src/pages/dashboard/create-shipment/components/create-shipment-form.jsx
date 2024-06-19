import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constants";
import { useRef } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config";


const CreateShipmentForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmit = async (e, formRef) => {
    e.preventDefault();
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
      package_description: { value: package_description },
      status: { value: status }
    } = formRef.current;

    const docRef = await addDoc(collection(db, "packages"), {
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
      trackingNumber: Math.floor(Math.random() * 1000000000)
    });

    console.log("data", docRef);
  }


  return (
    <section className="section">
      <div className="section-body">
        <div className="row">
          <div className="col-12">

            <div className="card">
              <div className="card-header">
                <h4>Create Shipment Request</h4>
              </div>
              <div className="card-body">
                <form ref={formRef} onSubmit={e => handleSubmit(e, formRef)}>
                  <div className="d-flex flex-row">
                    <div className="form-group col-4 sm-col-12">
                      <label>Sender Name</label>
                      <input name="sender_name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4 sm-col-12">
                      <label>Sender Phone</label>
                      <input name="sender_phone" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4 sm-col-12">
                      <label>Sender Email</label>
                      <input name="sender_email" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4 sm-col-12">
                      <label>Sender Address</label>
                      <input name="sender_address" type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="form-group col-4 sm-col-12">
                      <label>Receiver Name</label>
                      <input name="receiver_name" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4 sm-col-12">
                      <label>Reciever Phone</label>
                      <input name="receiver_phone" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4 sm-col-12">
                      <label>Receiver Email</label>
                      <input name="receiver_email" type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4 sm-col-12">
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
                        <option>Created</option>
                        <option>Processing</option>
                        <option>In Transit</option>
                        <option>Customs</option>
                        <option>Approved</option>
                        <option>Canceled</option>
                        <option>Available</option>
                        <option>Delivered</option>
                        <option>Dispensed</option>
                        <option>Warehouse</option>
                        <option>On Hold</option>
                        <option>Packaged</option>
                        <option>Pending</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <button onClick={() => navigate(SCREENS.SHIPMENTS)} className="btn btn-success">Create Shipment Request</button>
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