import React from "react";
// import { Redirect, Route } from "react-router-dom";
import { Navigate, Route } from "react-router-dom";


function ProtectedRoute({children}) {
    const token = localStorage.getItem('auth_token');


    if( token)return  children
    return   <Navigate to="/login"/>

}

export default ProtectedRoute;