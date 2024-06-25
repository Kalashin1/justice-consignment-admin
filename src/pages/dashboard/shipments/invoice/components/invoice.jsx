import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { LoaderContext } from "../../../../../components/layout";
import { doc, getDoc } from 'firebase/firestore';
import { SCREENS } from "../../../../../navigation/constants";
import { db } from "../../../../../firebase-config";
import { usePDF } from 'react-to-pdf';
import { QRCodeSVG } from 'qrcode.react';

const ShipmentInvoice = () => {
  const [shipment, setShipment] = useState();

  const { id } = useParams()

  const navigate = useNavigate();

  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf', page: { format: 'A5' } });

  useEffect(() => {
    const setup = async () => {
      3
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
  }, [id]);

  return (
    <section className="section">
      <div className="section-body">
        <button onClick={() => {
          toPDF()
        }} className="my-4 btn btn-warning btn-icon icon-left"><i className="fas fa-download"></i> Download</button>
        <div className="invoice" ref={targetRef}>
          <div className="invoice-print">
            <div className="row">
              <div className="col-12">
                <div className="invoice-title">
                  <h2>Invoice</h2>
                  <div className="invoice-number">Order #{shipment?.trackingNumber}</div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                </div>
                <hr />
                <div className="row d-flex justify-between" style={{ alignItems: 'center' }}>
                  <div className="col-md-6">
                    <address>
                      <strong>Billed To:</strong><br />
                      {shipment?.sender_name}<br />
                      {shipment?.sender_address}<br />

                    </address>
                  </div>
                  <div className="col-md-6 text-md-right">
                    <address>
                      <strong>Shipped To:</strong><br />
                      {shipment?.receiver_name}<br />
                      {shipment?.receiver_address}
                    </address>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <address>
                      <strong className="mb-2">Payment Method:</strong><br />
                      <img src="/assets/img/cards/visa.png" className="mr-1" alt="visa" />
                      <img src="/assets/img/cards/jcb.png" className="mr-1" alt="jcb" />
                      <img src="/assets/img/cards/mastercard.png" className="mr-1" alt="mastercard" />
                      <img src="/assets/img/cards/paypal.png" className="mr-1" alt="paypal" />
                    </address>
                  </div>
                  <div className="col-md-6 text-md-right">
                    <address>
                      <strong>Order Date:</strong><br />
                      {shipment?.created_at ? new Date(shipment?.created_at).toDateString() : new Date().toDateString()}<br /><br />
                    </address>
                  </div>
                  <div className="p-4">
                    <QRCodeSVG value={`https://www.servicecargo.org?tracking=${shipment?.trackingNumber}`} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="section-title">Order Summary</div>
                <p className="section-lead">All items here cannot be deleted.</p>
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-md">
                    <tr>
                      <th data-width="40">#</th>
                      <th>Item</th>
                      <th className="text-center">Weight</th>
                      <th className="text-center">Description</th>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>{shipment?.package_name}</td>
                      <td>{shipment?.package_weight}</td>
                      <td className="text-center">{shipment?.description}</td>

                    </tr>

                  </table>
                </div>

                <div className="row mt-4 d-flex">

                  <div className="col-8 d-flex justify-between" style={{ alignItems: 'center' }}>
                    <img src="/stamp-1.png" width={250} height={210} />
                    <img src="/stamp-2.png" width={250} height={250} />
                  </div>
                  <div className="text-right col-4">
                    <div className="invoice-detail-item">
                      <div className="invoice-detail-name">Subtotal</div>
                      <div className="invoice-detail-value" contentEditable>$0</div>
                    </div>
                    <div className="invoice-detail-item">
                      <div className="invoice-detail-name">Shipping</div>
                      <div className="invoice-detail-value" contentEditable>$0</div>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="invoice-detail-item">
                      <div className="invoice-detail-name">Total</div>
                      <div className="invoice-detail-value invoice-detail-value-lg" contentEditable>$0</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ShipmentInvoice;