import React, { useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom"; 
import convertDate from "./DayMonthYear"; 
import { createInvoice } from "./DataServis";


export default function New(props) {

    let invoice = useLocation().state;

    const [terms, setTerms] = useState(false)
    const [arrow,setArrow] = useState(true)

    function openTerms() {
        setTerms(true);
        setArrow(false)
        if (terms) {
            setArrow(true)
            setTerms(false)
        }
    }

    // --------------- 
// const names = document.getElementsByClassName('input-new-item-name') 
// const prices = document.getElementsByClassName('input-new-item-price') 
// const quantities = document.getElementsByClassName('input-new-item-qty') 
// const totals = document.getElementsByClassName('total-new-item') 
// const newItems = [] 
// for(let i = 0; i < names.length; i++)  
//     newItems.push({ 
//         name: names[i].value, 
//         price: parseFloat(prices[i].value), 
//         quantity: parseFloat(quantities[i].value), 
//         total: parseFloat(totals[i].value) 
//     }) 
// let total = 0 
// newItems.forEach((element) => { 
//     total += element.quantity * element.price 
// }) 

// const newElement = { 
//     clientAddress: { 
//         city: document.getElementById("bill-to-city-input").value, 
//         country: document.getElementById("bill-to-country-input").value, 
//         postCode: document.getElementById("bill-to-post-code-input").value, 
//         street: document.getElementById("bill-to-street-address-input").value 
//     }, 
//     clientEmail: document.getElementById("clients-email-input").value, 
//     clientName: document.getElementById("clients-name-input").value, 
//     createdAt: document.getElementById("invoice-date-input").innerText, 
//     description: document.getElementById("project-description-input").value, 
//     id: newId, 
//     items: newItems, 
//     paymentDue: addDays(new Date(document.getElementById("invoice-date-input").innerText), parseInt(document.getElementById("payment-terms-input").value)), 
//     paymentTerms: document.getElementById("payment-terms-input").value, 
//     senderAddress: { 
//         city: document.getElementById("bill-from-city-input").value, 
//         country: document.getElementById("bill-from-country-input").value, 
//         postCode: document.getElementById("bill-from-post-code-input").value, 
//         street: document.getElementById("bill-from-street-address-input").value 
//     }, 
//     status: "draft", 
//     total: total 
// } 

// const currentInvoices = window.localStorage.getItem("invoices") 
// let newInvoices = undefined 
// if (currentInvoices === "" || currentInvoices === "[]")  
//    newInvoices = [newElement] 
// else { 
//     newInvoices = JSON.parse(currentInvoices) 
//     newInvoices.push(newElement) 
//  } 

// window.localStorage.setItem("invoices", JSON.stringify(newInvoices)) 
// props.updateInvoices(newInvoices) 
// } ----- 


const randomId = () => {
    const newLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const newNumber = "0123456789"
    let resultLetters = ""
    let resultNumbers = ""
    let randomId = ""

    for (let i = 0; i < 2; i++) {
        let randomLetter = Math.floor(Math.random() * newLetter.length);
        resultLetters = resultLetters + newLetter.charAt(randomLetter);
    }
    for (let i = 0; i < 4; i++) {
        let randomNumber = Math.floor(Math.random() * newNumber.length);
        resultNumbers = resultNumbers + newNumber.charAt(randomNumber);
    }

    randomId = resultLetters + resultNumbers
    return randomId;
}




let newId = randomId();
const [itemStatus, setItemStatus] = useState("pending")

const [senderAddress, setSenderAddress] = useState("") 
const [senderCity, setSenderCity] = useState("") 
const [senderPostCode, setSenderPostCode] = useState("") 
const [senderCountry, setSenderCountry] = useState("") 

const [clientName, setClientName] = useState("") 
const [clientEmail, setClientEmail] = useState("") 
const [clientAddress, setClientAddress] = useState("") 
const [clientCity, setClientCity] = useState("") 
const [clientPostCode, setClientPostCode] = useState("") 
const [clientCountry, setclientCountry] = useState("") 

const [invoiceDate, setInvoiceDate] = useState("") 
// const [paymentTerms, setPaymentTerms] = useState("") 

const [projectDescription, setProjectDescription] = useState("") 

const [itemName, setItemName] = useState("") 
const [itemQuantity, setItemQuantity] = useState("") 
const [itemPrice, setItemPrice] = useState("") 
const [itemTotal, setItemTotal] = useState(itemQuantity * itemPrice) 

    useEffect(() => { 

    console.log(senderAddress, senderCity, senderPostCode, senderCountry, clientName, clientEmail, clientAddress,  
        clientCity, clientPostCode, clientCountry, projectDescription, itemName, itemQuantity, itemPrice); 
    }, [senderAddress, senderCity, senderPostCode, senderCountry, clientName, clientEmail, clientAddress,  
        clientCity, clientPostCode, clientCountry, projectDescription, itemName, itemQuantity, itemPrice]) 

    function createNewInvoice() { 
        console.log("Dobro je... radi!") 
        createInvoice({
            id : newId,
            createdAt : invoiceDate,
            // paymentDue :
            description : projectDescription,
            // paymentTerms :
            clientName : clientName,
            clientEmail : clientEmail,
            status : itemStatus,

            senderAddress : {
                street : senderAddress,
                city : senderCity,
                postCode : senderPostCode,
                country : senderCountry,
            },
            clientAddress : {
                street : clientAddress,
                city : clientCity,
                postCode : clientPostCode,
                country : clientCountry,
            },
            // total : invoice.total,
            item : {
                name : itemName,
                quantity : itemQuantity,
                price : itemPrice,
                total : itemTotal,
            }

        })
    } 


    return (
        <div className="new light-version">

            <div className="left-side">
                <div className="headline-left">
                    <h1 className="invoices">New Invoice</h1>
                </div>

                <div className="bill-form">
                    <p className="violet-text">Bill From</p>
                    <p>Street Address</p>
                    <div className="light-border">
                        <input className="bold-text" type="text" defaultValue={(invoice) ? invoice.senderAddress.street : senderAddress} onChange={(e) => setSenderAddress(e.target.value)}/> 
                    </div>
                    
                    <div className="adress">

                        <div className="city">
                            <p>City</p>
                            <div className="light-border">
                                <input className="bold-text" type="text" defaultValue={(invoice) ? invoice.senderAddress.city : senderCity} onChange={(e) => setSenderCity(e.target.value)}/>                             </div>
                        </div>

                        <div className="postcode">
                            <p>Post Code</p>
                            <div className="light-border">
                                <input className="bold-text" type="text" defaultValue={(invoice) ? invoice.senderAddress.postCode : senderPostCode} onChange={(e) => setSenderPostCode(e.target.value)}/> 
                            </div>
                        </div>

                        <div className="country">
                            <p>Country</p>
                            <div className="light-border">
                                <input className="bold-text" type="text" defaultValue={(invoice) ? invoice.senderAddress.country : senderCountry} onChange={(e) => setSenderCountry(e.target.value)}/> 
                            </div>
                        </div>

                    </div>

                    <p className="violet-text">Bill To</p>
                    <p>Client's Name</p>
                    <div className="light-border">
                        <input className="bold-text" type="text" defaultValue={(invoice) ? invoice.clientName : clientName} onChange={(e) => setClientName(e.target.value)}/>
                    </div>

                    <p>Client's Email</p>
                    <div className="light-border">
                        <input className="bold-text" type="email" defaultValue={(invoice) ? invoice.clientEmail : clientEmail} onChange={(e) => setClientEmail(e.target.value)}/> 
                    </div>

                    <p>Street Adress</p>
                    <div className="light-border">
                        <input className="bold-text" type="text" defaultValue={(invoice) ? invoice.clientAddress.street : clientAddress} onChange={(e) => setClientAddress(e.target.value)}/> 
                    </div>

                    <div className="adress">

                        <div className="city">
                            <p>City</p>
                            <div className="light-border">
                                <input className="bold-text" type="text"/>
                            </div>
                        </div>

                        <div className="postcode">
                            <p>Post Code</p>
                            <div className="light-border">
                                <input className="bold-text" type="text"/>
                            </div>
                        </div>

                        <div className="country">
                            <p>Country</p>
                            <div className="light-border">
                                <input className="bold-text" type="text"/>
                            </div>
                        </div>
                        
                    </div>

                    <div className="invoice-date">
                        <div className="date">
                            <p>Invoice Date</p>
                            <div className="light-border">
                            <input className="bold-text" type="date" defaultValue={(invoice) ? invoice.createdAt : invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)}/> 
                                {/* <img className="calendar" src={require('../assets/icon-calendar.svg').default} alt="calendar"/> */}
                            </div>
                        </div>

                        <div className="date">
                        <p>Payment Terms</p>
                        <div onClick={openTerms} className="light-border pay-terms">
                        <p className="bold-text">Net  Days</p>
                            {arrow ?
                            <img className="arrow down" src={require('../assets/icon-arrow-down.svg').default} alt="arrow-down"/>
                            : <img className="arrow down up" src={require('../assets/icon-arrow-down.svg').default} alt="arrow-down"/>
                            }

                        </div>
                        { 
                                terms ?
                                
                            <div className="filter-2">
                        
                                <label className="container-1">
                                <p className="bold-text">Net 1 Day</p>
                                </label>
                                <label className="container-1">
                                <p className="bold-text">Net 7 Days</p>
                                </label>
                                <label className="container-1">
                                <p className="bold-text">Net 14 Days</p>
                                </label>
                                <label className="container-1">
                                <p className="bold-text">Net 30 Days</p>
                                </label>
                            
                            </div>

                                :null

                            }
                    </div>
                </div>

                    <p>Project Description</p>
                    <div className="light-border">
                        <input className="bold-text" type="text" defaultValue={(invoice) ? invoice.description : projectDescription} onChange={(e) => setProjectDescription(e.target.value)}/> 
                    </div>

                    <h3 className="gray">Item List</h3>

                    <div className="item-list-names">
                        
                        <div className="item-name">
                            <p>Item Name</p>
                            <div className="light-border">
                                <input className="bold" type="text"/>
                                {/* <input className="bold-text" type="text" defaultValue={(invoice) ? item.name : itemName} onChange={(e) => setItemName(e.target.value)}/>  */}
                            </div>
                        </div>

                        <div className="quantity">
                            <p>Qty.</p>
                            <div className="light-border">
                                <input className="bold" type="text"/>
                                {/* <input className="bold-text" type="number" defaultValue={(invoice) ? item.quantity : itemQuantity} onChange={(e) => setItemQuantity(e.target.value)}/>  */}
                            </div>
                        </div>

                        <div className="price">
                            <p>Price</p>
                            <div className="light-border">
                                <input className="bold" type="text"/>
                                {/* <input className="bold-text" type="number" defaultValue={(invoice) ? item.price.toFixed(2) : itemPrice} onChange={(e) => setItemPrice(e.target.value)}/>  */}
                            </div>
                        </div>

                        <div className="total">
                            <p>Total</p>
                            <div className="no-border">
                                <input className="bold" type="text"/>
                                {/* <input className="bold-text" type="text" defaultValue={(item.quantity * item.price).toFixed(2)}/>  */}
                            </div>
                        </div>

                        <img className="trash" src={require('../assets/icon-delete.svg').default} alt="delete"/>

                    </div>

                    <button className="no-color-btn-2">+ Add New Item</button>

                </div>

                <div className="buttons-down">

                    <button className="no-color-btn-3"
                        onClick={props.closeNew}
                    >Discard</button>

                    <div className="buttons-right">
                        <button className="draft-btn">Save as Draft</button>
                        
                        <button className="violet-btn-2" onClick={(e)=>{
                                e.preventDefault() 
                                createNewInvoice(invoice)
                        }}>Save & Send</button>
                    </div>

                </div>
                
            </div>
        
        </div>
    );
}


