import { useContext, useEffect, useState } from "react";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import { useNavigate, Link } from "react-router-dom";
import { SCREENS } from "../../../../navigation/constants";
import { LoaderContext } from "../../../../components/layout";

const ShipmentTable = () => {
  const [shipments, setShipments] = useState([]);

  const getShipments = async () => {
    const q = query(collection(db, "packages"));
    const querySnapshot = await getDocs(q);
    const _shipments = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setShipments(_shipments);
  }

  const navigate = useNavigate();

  useEffect(() => {
    const setUp = async () => {
      await getShipments();
    }

    setUp();
  }, [])

  const { setIsLoading } = useContext(LoaderContext);

  const deleteShipment = async (id) => {
    if (confirm('are you sure you want to delete this shipment request?')) {
      setIsLoading(true)
      await deleteDoc(doc(db, "packages", id));
      alert('Shipment deleted');
      await getShipments()
      setIsLoading(false);
    }
  }
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>Shipments Table</h4>
            <div className="card-header-form">
              <form>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Search" />
                  <div className="input-group-btn">
                    <button className="btn btn-primary"><i className="fas fa-search"></i></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped">
                <tr>
                  <th className="text-center">
                    <div className="custom-checkbox custom-checkbox-table custom-control">
                      <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad"
                        className="custom-control-input" id="checkbox-all" />
                      <label htmlFor="checkbox-all" className="custom-control-label">&nbsp;</label>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Weight</th>
                  <th>Status</th>
                  <th>Sender Name</th>
                  <th>Sender Phone</th>
                  <th>Sender Email</th>
                  <th>Receiver Name</th>
                  <th>Receiver Phone</th>
                  <th>Receiver Email</th>
                  <th>Action</th>
                </tr>
                {shipments?.map((shipment, index) => (
                  <tr key={index}>
                    <td className="p-0 text-center">
                      <div className="custom-checkbox custom-control">
                        <input type="checkbox" data-checkboxes="mygroup" className="custom-control-input"
                          id="checkbox-1" />
                        <label htmlFor="checkbox-1" className="custom-control-label">&nbsp;</label>
                      </div>
                    </td>
                    <td>
                      <Link to={SCREENS.INVOICE(shipment.id)}>
                        {shipment.package_name ?? 'Royal Gold'}
                      </Link>
                    </td>
                    <td>{shipment.package_weight ?? '32kg'}</td>
                    <td className="align-middle">
                      <div className="badge">
                        {shipment.status}
                      </div>
                    </td>
                    <td>
                      {shipment.sender_name ?? 'John Doe'}
                    </td>
                    <td>{shipment.sender_phone ?? '0123456789'}</td>
                    <td>{shipment.email}</td>
                    <td>{shipment.receiver_name ?? 'John Doe'}</td>
                    <td>{shipment.receiver_phone ?? '0123456789'}</td>
                    <td>{shipment.email}</td>
                    <td className="d-flex justify-between p-2">
                      <button className="btn btn-primary mr-2" onClick={() => navigate(SCREENS.EDIT_SHIPMENT(shipment.id))}><i className="fas fa-edit" /></button>
                      <button className="btn btn-danger" onClick={() => deleteShipment(shipment.id)}><i className="fas fa-trash" /></button></td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTable;