import React from "react";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";

import './App.css';

//import ProtectedRouteAdmin from "./ProtectedRoute/ProtectedRouteAdmin";
import Stock from "./pages/Stock/Index";
import Dashboard from "./pages/Dashboard/Index";

import NotFound from "./pages/NotFound/NotFound";
import Watchlist from "./pages/Watchlist/Index";
import StockItem from "./pages/StockItem/Index";
import StockManager from "./pages/StockManager/Index";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import axios from 'axios';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
// import DataWatchlist from "./components/DataWatchlist";

// require('dotenv').config()
// import axios from "axios";

// axios.defaults.withCredentials = true;
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ?  `Bearer ${token}` : '';
    return config;
});

function App() {
  return (

    <Router>
      <div className="h-screen">
        <Routes>
          <Route  path="/"                                  element={<ProtectedRoute><Stock/></ProtectedRoute>}/>
          {/* <Route  path="/"                                  element={<Stock/>}/> */}
          <Route  path="/:symbole"                                  element={<ProtectedRoute><StockItem/></ProtectedRoute>}/>

          <Route  path="/stock"                                  element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          
          <Route  path="/stockmanager"                                  element={<ProtectedRoute><StockManager/></ProtectedRoute>}/>


          <Route  path="/watchlist"                                  element={<ProtectedRoute><Watchlist/></ProtectedRoute>}/>
          {/* <Route  path="/watchlist:id"                                  element={<DataWatchlist/>}/> */}

          <Route exact path="/login"          element={<Login/>}/> 
           <Route exact path="/register"       element={<Register/>}/> 

          <Route  path="*"                                  element={<NotFound/>}/> 
        </Routes>
      </div>
    </Router>

  );
}

export default App;