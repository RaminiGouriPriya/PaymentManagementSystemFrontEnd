import axios from "axios";
import { useEffect,useState } from "react";


function DashBoard(){
   
    const getThead = () =>{
        return <thead className="table">
            <tr>
                <th scope="col-auto">Transaction Id</th>
                
            </tr>
        </thead>
    }

    const getTransactionTable=()=>{
        const transactionTable =<table className="table">
            { getThead() }
            <tbody>
                {
                    <tr scope="col-auto">
                    <tr>
                        <td>ABHYUDAYA CO-OPERATIVE BANK LTD.</td><br/>
                    </tr>
                    <tr>
                        <td>AB BANK LIMITED</td>
                    </tr>
                    <tr>
                        <td>HDFC BANK LIMITED</td>
                        </tr>
                        <tr>
                            <td>ABU DHABI COMMERCIAL BANK</td>
                        </tr>
                        <tr>
                            <td>ALLAHABAD BANK</td>
                        </tr>
                        </tr>  
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

export default DashBoard;