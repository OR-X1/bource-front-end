import React from "react";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";

import './App.css';

//import ProtectedRouteAdmin from "./ProtectedRoute/ProtectedRouteAdmin";
import Stock from "./pages/Stock/Index";
import Dashboard from "./pages/Dashboard/Index";

import NotFound from "./pages/NotFound/NotFound";
import Watchlist from "./pages/Watchlist/Index";
import StockItem from "./pages/StockItem/Index";
// import DataWatchlist from "./components/DataWatchlist";

// require('dotenv').config()
// import axios from "axios";

// axios.defaults.withCredentials = true;


function App() {
  return (

    <Router>
      <div className="h-screen">
        <Routes>
          {/* <Route  path="/"                                  element={<ProtectedRouteAdmin><DashAdmin/></ProtectedRouteAdmin>}/> */}
          <Route  path="/"                                  element={<Dashboard/>}/>
          <Route  path="/stock"                                  element={<Stock/>}/>
          <Route  path="/stock/:symbole"                                  element={<StockItem/>}/>


          <Route  path="/watchlist"                                  element={<Watchlist/>}/>
          {/* <Route  path="/watchlist:id"                                  element={<DataWatchlist/>}/> */}

          <Route  path="*"                                  element={<NotFound/>}/> 
        </Routes>
      </div>
    </Router>

  );
}

export default App;