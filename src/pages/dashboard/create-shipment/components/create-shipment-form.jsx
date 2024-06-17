import { useNavigate } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constants";

const CreateShipmentForm = () => {
  const navigate = useNavigate();
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
                <form>
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

export default CreateShipmentForm;