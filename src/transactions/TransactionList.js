import axios from "axios";
import { useEffect,useState } from "react";


function TransactionList(){
    const[transaction, setTransaction] = useState([]);
    const[customer, setCustomer] = useState([]);

    useEffect(() =>{
        console.log("In useEffect");
        axios.get("http://localhost:8080/getalltransactions")
        .then(res =>{
            setTransaction(res.data)
        })
        .catch(err => console.log(err));
    }, [])

    const getThead = () =>{
        return <thead className="table-light">
            <tr>
                <th scope="col">Transaction Id</th>
                <th scope="col">Transaction Amount</th>
                <th scope="col">Transaction Date</th>
                <th scope="col">Customer Id Number</th>
                <th scope="col">Rec Institution Name</th>
            </tr>
        </thead>
    }

    const getTransactionTable=()=>{
        const transactionTable =<table className="table">
            { getThead() }
            <tbody>
                {
                    transaction.map(t =>{
                        return <tr key={t.transactionId}>
                            <td>{t.transactionId}</td>
                            <td>{t.transactionAmount}</td>
                            <td>{t.transactionTime}</td>
                            <td>{t.customerIdNumber}</td>
                            <td>{t.recInstitutionName}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>

        return transactionTable
    }

    return(
        <div>
            <h3>List of Transactions</h3>
            {getTransactionTable()}
        </div>
    )
}

export default TransactionList;