import React from 'react';
import axios from 'axios';
import { useState} from 'react';
import {useNavigate} from 'react-router';
import { Navigate } from 'react-router-dom';
import TransactionSubmit from './TransactionSubmit';

function TransactionForm(){

    let navigate= useNavigate();
    const [oneCustomer, setOneCustomer] = useState({
        customerId: 0,
        accountHolderName: "",
        clearBalance: 0,
        transferType: "",
        overdraft: ""
    })

    const [oneReceiver, setOneReceiver] = useState({
        bic: "",
        recInstitutionName:""
    })

    const [receiverName, setReceiverName] = useState([]);

    const [transaction, setTransaction] = useState({
        transactionId: 0,
        transactionAmount: 0,
        transactionTime: "",
        customerIdNumber: 0,
        recInstitutionName: ""
    })

    const [customerError, setCustomerError] = useState(null);
    const [receiverError, setReceiverError] = useState(null);
    const [transactionError, setTransactionError] = useState(null);
    const [receiverNameError, setReceiverNameError] = useState(null);

    const handleOneCustomerData = (evt) =>{
        console.log("lol",evt.target.name,evt.target.value);
        setOneCustomer({
            ...oneCustomer,
            [evt.target.name]: evt.target.value
        });
    }

    const handleOneReceiverData = (evt) =>{
        console.log("handleOneReceiverData",evt.target.name,evt.target.value);
        setOneReceiver({
            ...oneReceiver,
            [evt.target.name]: evt.target.value
        });
    }

    const handleTransactionData = (evt) =>{
       console.log("Get customer Id here",oneCustomer.customerId);
       console.log("Receiver here...",oneReceiver.recInstitutionName);
        console.log("handleTransaction",evt.target.name,evt.target.value);
        setTransaction({
            ...transaction,
            [evt.target.name]: evt.target.value
        });
    }



    const submitGetCustomerById = (evt) =>{
        console.log("submitGetCustomerById");
        axios.get(`http://localhost:8080/customer/getcustomer/${oneCustomer.customerId}`)
        .then((response) =>{
            setOneCustomer(response.data);
            console.log(response);
        }).catch(error =>{
            setCustomerError(error.response.headers["message"]);
            console.log(error.response.headers["message"]);
        })
        evt.preventDefault();        
    }

    const submitGetReceiverByBic = (evt) =>{
        console.log("submitGetByReceiverByBic");
        axios.get(`http://localhost:8080/receiver/getreciverbyid/${oneReceiver.bic}`)
            .then((response) =>{
                setOneReceiver(response.data);
                console.log(response);
            }).catch(error =>{
                setReceiverError(error.response.headers["message"]);
                console.log("error",error);
                console.log("error.message",error.message);
            });
            evt.preventDefault();
    }

    const submitGetReceiverName = (evt) =>{
        console.log("submitGetReceiverName");
        axios.get(`http://localhost:8080/getreceiver/${oneReceiver.receiverName}`)
            .then((response) =>{
                setReceiverName(response.data);
                console.log(response);
            }).catch(error =>{
                setReceiverNameError(error.response.headers["message"]);
            });
            evt.preventDefault();
    }

    const submitPostTransaction = (evt) =>{
        console.log("submitPostTransaction");
        if(oneCustomer.transferType==="Customer Transfer"){
            const headers= {"Content-Type":"application/json"}
            axios.post(`http://localhost:8080/customertransfer/${oneCustomer.customerId}/${oneReceiver.bic}`, JSON.stringify(transaction), {headers})
                .then((response) =>{
                    console.log("transaction",transaction);
                    console.log(oneCustomer.customerId);
                    console.log("response",response);
                    console.log(oneReceiver.recInstitutionName);
                    setTransaction(response.data);
                    // <TransactionSubmit 
                    // transactionId={transaction.transactionId} 
                    // transactionAmount={transaction.transactionAmount}
                    // transactionCustomerId={transaction.customerIdNumber}
                    // transactionReceiverName={transaction.receiverName}
                    // clearBalance={oneCustomer.clearBalance}
                    // />
                    alert("Transaction Performed SuccessFully");
                }).catch(error =>{
                    console.log(error.response.headers["message"]);
                    setTransactionError(error.response.headers["message"]);
                })
        }
        else if(oneCustomer.transferType==="Bank Transfer"){
            const headers= {"Content-Type":"application/json"}
            axios.post(`http://localhost:8080/banktransfer/${oneCustomer.customerId}/${oneReceiver.bic}`, JSON.stringify(transaction), {headers})
                .then((response) =>{
                    console.log("transaction",transaction);
                    console.log(oneCustomer.customerId);
                    console.log("response",response);
                    setTransaction(response.data);
                    alert("Transaction Performed SuccessFully");
                    const newId = response.data.transactionId
                    // navigate("/submit/" + newId);
                }).catch(error =>{
                    console.log(error.response.headers["message"]);
                    setTransactionError(error.response.headers["message"]);
                })
        }
        evt.preventDefault();
    }

    return (
        <div className="row">
            <h1>Make Transfer</h1>
            <form className="needs-validation" onSubmit={submitPostTransaction}>
                <h2>Customer Detalis</h2>
                <form className="needs-validation">
                <div>
                    <label for="name" className="form-label">Enter CustomerId</label>
                    <input type="number" id="customerId" name="customerId" className="form-control" placeholder="Enter 14 digit Customer Id" value={oneCustomer.customerId} onChange ={handleOneCustomerData}/>
                    <label className="text-danger">{customerError}</label>
                </div>
                <fieldset disabled>
                <div> 
                    <label for="name" className="form-label">Account Holder Name</label>
                    <input type="text" id="accountHolderName" name="accountHolderName" className="form-control" value={oneCustomer.accountHolderName} placeholder="Ex: Gouri Priya Ramini" onChange={handleOneCustomerData}/>  
                </div>
                <div> 
                    <label for="disabledTextInput" className="form-label">Clear Balance</label>
                    <input type="text" id="clearBalance" name="clearBalance" className="form-control" value={oneCustomer.clearBalance} placeholder="Available balance" onChange={handleOneCustomerData}/>  
                </div>
                </fieldset>
                <br></br>
                <input type="submit" id="submit" name="submit" className="btn btn-primary mb-3" value="Get Customer" onClick={submitGetCustomerById}/>
                </form>
                
                <h2>Receiver Detalis</h2>
                <form className="needs-validation" >
                <div>
                    <label for="name" className="form-label">Enter BIC</label>
                    <input type="text" id="bic" name="bic" className="form-control" placeholder="Enter BIC code" value={oneReceiver.bic} onChange ={handleOneReceiverData}/>
                    <label className="text-danger" color="red">{receiverError}</label>
                </div>
                <fieldset disabled>
                <div> 
                    <label for="name" className="form-label">Institution Name</label>
                    <input type="text" id="name" className="form-control" value={oneReceiver.recInstitutionName} placeholder="Ex: HDFC Bank" onChange={handleOneReceiverData}/>  
                </div>
                </fieldset>
                <br/>
                <input type="submit" id="submit" name="submit" className="btn btn-primary mb-3" value="Get Receiver" onClick={submitGetReceiverByBic}/>
                <div> 
                    <label for="name" className="form-label">Account Holder Name</label>
                    <input type="text" id="receiverName" name="receiverName" className="form-control" placeholder="Enter Name" value={oneReceiver.receiverName} onChange ={handleOneReceiverData}/>
                    <label className="text-danger" color="red">{receiverNameError}</label>
                </div>
                <br></br>
                <input type="submit" id="submit" name="submit" className="btn btn-primary mb-3" value="Validate Receiver" onClick={submitGetReceiverName}/>
                </form>
                
                <h2>Transaction Details</h2>
                <fieldset disabled>
                <div className="Invisible"> 
                    <label for="name" className="form-label">Customer Id</label>
                    <input type="number" name="customerIdNumber" id="customerIdNumber" className="form-control" value={oneCustomer.customerId} placeholder="Enter customer Id" onChange={handleTransactionData}/>  
                </div>
                <div className="Invisible"> 
                    <label for="name" className="form-label">Receiver Institution Name</label>
                    <input type="text" name="receiverName" id="receiverName" className="form-control" value={oneReceiver.recInstitutionName} placeholder="Enter Institution Name" onChange={handleTransactionData}/>  
                </div>
                </fieldset>
                <div> 
                    <label for="name" className="form-label">Transfer type</label>
                    <select class="form-select" aria-label="Default select example" onChange={handleOneCustomerData} id="transferType" name="transferType">
                        <option selected>Select your Transfer Type</option>
                        <option value={"Customer Transfer"}>Customer Transfer</option>
                        <option value={"Bank Transfer"}>Bank Transfer</option>
                    </select>
                    <label className="text-danger">{transactionError}</label>
                </div>
                <div> 
                    <label for="name" className="form-label">Amount</label>
                    <input type="number" id="transactionAmount" name="transactionAmount" className="form-control" placeholder="Ex:1000" value={transaction.transactionAmount} onChange ={handleTransactionData}/>
                    <label className="text-danger">{transactionError}</label>
                </div>
                <br></br>
                <input type="submit" id="submit" name="submit" className="btn btn-primary mb-3" value="submit"/>
            </form>
            
        </div>
    )
}

export default TransactionForm;





































// const submitPostTransaction2 = (evt) =>{
//     console.log("submitPostTransaction");
//     const headers= {"Content-Type":"application/json"}
//     axios.post(`http://localhost:8080/customertransfer/${oneCustomer.customerId}/${oneReceiver.bic}`, JSON.stringify(transaction), {headers})
//         .then((response) =>{
//             console.log("transaction",transaction);
//             console.log(oneCustomer.customerId);
//             console.log("response",response);
//             setTransaction(response.data);
//             alert("Transaction Performed SuccessFully");
//             const newId = response.data.transactionId
//             // navigate("/submit/" + newId);
//         }).catch(error =>{
//             console.log(error.response.headers["message"]);
//             setTransactionError(error.response.headers["message"]);
//         })
//      evt.preventDefault();

// }