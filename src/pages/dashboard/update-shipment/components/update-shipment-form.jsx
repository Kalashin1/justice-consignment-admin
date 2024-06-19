import { useNavigate, useParams } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constants";
import { useEffect, useRef, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";

const UpdateShipmentForm = () => {
  const navigate = useNavigate();

  const [shipment, setShipment] = useState();

  const { id } = useParams()



  useEffect(() => {
    const setup = async () => {
      const docRef = doc(db, "packages", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setShipment(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    setup()
  }, [id])

  const updateShipment = async (e, shipment) => {
    e.preventDefault()
    const ref = doc(db, "packages", id);
    await updateDoc(ref, shipment);
  }

  const formRef = useRef(null)
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
                <form ref={formRef} onSubmit={e => updateShipment(e, shipment)}>
                  <div className="d-flex flex-row">
                    <div className="form-group col-4">
                      <label>Sender Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4">
                      <label>Sender Phone</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4">
                      <label>Sender Email</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="form-group col-4">
                      <label>Receiver Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4">
                      <label>Reciever Phone</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-4">
                      <label>Receiver Email</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="d-flex flex-row">
                    <div className="form-group col-6">
                      <label>Package Name</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="form-group col-6">
                      <label>Package Weight</label>
                      <input type="text" className="form-control" />
                    </div>

                  </div>

                  <div className="d-flex flex-row">
                    <div className="form-group col-6">
                      <label>package Description</label>
                      <textarea type="text" className="form-control"></textarea>
                    </div>

                    <div className="form-group col-6">
                      <label>Status</label>
                      <select type="text" className="form-control">
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

export default UpdateShipmentForm;