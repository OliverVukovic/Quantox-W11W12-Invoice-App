import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import convertDate from "./DayMonthYear";
import Edit from "./Edit";
import Delete from "./Delete";


    const DataList = () => {

        let location = useLocation();
            console.log(location.state);
        const invoice = location.state;

        // const findInvoice = Data.invoices.filter(invoice => invoice.id === invoiceSend.id)
        const [EditInvoice, setEditInvoice] = useState(false);
        const [DeleteInvoice, setDeleteInvoice] = useState(false);

        const navigate = useNavigate();
        function goBack(invoice) {
            navigate(`/`)
        }

        function closeEdit() {
            setEditInvoice(false)
        }

        function closeDelete() {
            setDeleteInvoice(false)
        }

    return (

        <div className="main light-version">
        <div className="column light-version">

                {/* {Data.invoices.map((invoice) => ( */}
            <div key={invoice.id} className="invoice-page"> 
            <div className="client-header">
                <div className="back-btn">
                    <button className="go-back" onClick={()=>{goBack(invoice)}}>
                        <img className="arrow-left" src={require('../assets/icon-arrow-left.svg').default} alt="arrow-left"/>Go back
                    </button>
                </div>
                <div className="btn-up-bar">    
                    <div className="up-bar-left">
                        <p>Status</p>
                        <div className="invoice-status-2">
                            <div className="circle"></div>
                            <p className="letter">{invoice.status}</p>
                        </div>

                    </div>
                    <div className="up-bar-right">

                        <button className="no-color-btn-4" 
                        onClick={()=>setEditInvoice(true)}
                        >Edit</button>

                        <button className="delete-btn" 
                        onClick={()=>setDeleteInvoice(true)}
                        >Delete</button>

                        {
                            EditInvoice?
                            <Edit closeEdit={closeEdit}/>:null
                        }

                        {
                            DeleteInvoice?
                            <Delete closeDelete={closeDelete}/>:null
                        }

                        <button className="violet-btn-3">Mark as Paid</button>
                    </div>
                </div>
            </div>
            <div className="client-section">
                <div className="invoice-data">
                    <div className="inv-data-left">
                        <h4><span>#</span>{invoice.id}</h4>
                        <p>{invoice.description}</p>
                    </div>

                    <div className="inv-data-right">
                        <p>{invoice.street}</p>
                        <p>{invoice.city}</p>
                        <p>{invoice.postCode}</p>
                        <p>{invoice.country}</p>
                    </div>
                </div>
                <div className="sending-data">
                    <div className="date-payment-due">
                        <div>
                            <p>Invoice Data</p>
                            <h4>{convertDate(invoice.createdAt)}</h4>
                        </div>
                        <div>
                            <p>Payment Due</p>
                            <h4>{convertDate(invoice.paymentDue)}</h4>
                        </div>
                    </div>
                    <div className="bill-to">
                        <p>Bill To</p>
                        <h4>{invoice.clientName}</h4>
                        <p>{invoice.clientAddress.street}</p>
                        <p>{invoice.clientAddress.city}</p>
                        <p>{invoice.clientAddress.postCode}</p>
                        <p>{invoice.clientAddress.country}</p>
                    </div>
                    <div className="sent-to">
                        <p>Sent to</p>
                        <h4>{invoice.clientEmail}</h4>
                    </div>
                </div>
                
                {invoice.items.map((item, index) => (
                    <div key={index} className="payment-data"> 
                        <div className="item-list-names">
                            <div className="item-name">
                                <p>Item Name</p>
                                <div className="no-border">
                                <p className="bold-text">{item.name}</p>
                                </div>
                            </div>

                            <div className="quantity">
                                <p>QTY.</p>
                                <div className="no-border">
                                    <p className="bold">{item.quantity}</p>
                                </div>
                            </div>

                            <div className="price">
                                <p>Price</p>
                                <div className="no-border">
                                    <p className="bold">£ {item.price.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="total">
                                <p>Total</p>
                                <div className="no-border">
                                    <p className="bold-text">£ {item.total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}

                <div className="dark-part">
                    <p>Amount Due</p>
                    <h2 className="color-white">£ {invoice.total.toFixed(2)}</h2>
                </div>
                
            </div>
        </div>
                {/* ))} */}
        </div>
        </div>
        );
    }

    export default DataList