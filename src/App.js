import{
  Routes,
  Route
} from "react-router-dom";

import Home from "./common/Home";
import Navbar from "./common/Navbar";
import DashBoard from "./transactions/DashBoard";
import TransactionForm from "./transactions/TransactionForm";
import TransactionList from "./transactions/TransactionList";
import TransactionSubmit from "./transactions/TransactionSubmit";


function App() {
  return (
    <div className="container">
      <Navbar />
      <br/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<TransactionList />}/>
        <Route path="/transactionform" element={<TransactionForm/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
  
      </Routes>
    </div>
  );
}

export default App;
