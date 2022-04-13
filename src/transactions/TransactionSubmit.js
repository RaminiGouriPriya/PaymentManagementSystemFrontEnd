import axios from "axios";
import { useEffect,useState } from "react";

function TransactionSubmit (props){
    <h1>Transaction Details</h1>

   
    
    return(
       <div>
            <h4>Transaction Id : {props.transactionId}</h4>
            <h4>Transaction Amount : {props.transactionAmount}</h4>
            <h4>Customer Id: {props.transactionCustomerId}</h4>
            <h4>Receiver Name: {props.transactionReceiverName}</h4>
            <h4>Clear Balance: {props.clearBalance}</h4>
       </div>
    

    );
}
// function TransactionSubmit({transaction}){

//     const[transactionDetails, setTransactionDetails] = useState({
//         transactionId: 0,
//         transactionAmount: 0,
//         transactionTime: "",
//         customerIdNumber: 0,
//         receiverName: ""
//     });


//     const handelTransaction = (evt)=>{
//         setTransactionDetails([
//             ...transaction
//         ])

//     }

//     const getThead = () =>{
//         return <thead className="table-light">
//             <th>
//                 <tr scope="row"> CustomerId </tr>
//                 <tr scope="row"> Transaction Id </tr>
//                 <tr scope="row"> Transaction Amount</tr>
//                 <tr scope="row"> Transaction Time</tr>
//                 <tr scope="row"> Receiver Name</tr>
//             </th>
//         </thead>
//     }

//     const getTransactionTable=()=>{
//         console.log(transactionDetails);
//         const transactionTable =<table className="table">
//             { getThead() }
//             <tbody>
//                 {
                   
//                     <th key={transactionDetails.transactionId}>
//                         <td>{transactionDetails.transactionId}</td>
//                         <td>{transactionDetails.transactionAmount}</td>
//                         <td>{transactionDetails.transactionTime}</td>
//                         <td>{transactionDetails.customerIdNumber}</td>
//                         <td>{transactionDetails.receiverName}</td>

//                     </th>
//                 }
//             </tbody>
//         </table>

//         return transactionTable
//     }

//     return(
//         <div>
//             <h1> Transaction Details </h1>
//             <input type="submit" id="submit" name="submit" className="btn btn-primary mb-3" value="Get Transaction Details" onClick={handelTransaction}/>
//             {getTransactionTable()}
//         </div>
//     )
// }

export default TransactionSubmit;