
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from "./Components/Register.js";
import HomePage from "./Components/Home.js";
import Login from "./Components/Login.js";
import Owner from "./Components/Owner.js";
import Market from "./Components/Market.js";
import LastPage from "./Components/LastPage.js"
import BillDetails from "./Components/BillDetails.js";
import PriceChange from "./Components/PriceChange.js";
function App(){
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/Register" Component={Register}/>
      <Route path="/Login" Component={Login} />
      <Route path="/Owner" Component={Owner} />
      <Route path="/Market"   Component={Market} />
      <Route path="/last" Component={LastPage} />
      <Route path="/BillDetails" Component={BillDetails} />
      <Route path="/PriceChange" Component={PriceChange} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
