import React from "react";
// import { Redirect, Route } from "react-router-dom";
import { Navigate, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

function ProtectedRouteManager({children}) {
    const token = localStorage.getItem('auth_token');

    var decoded = jwt_decode(token);

    console.log(token);
    console.log(decoded.role);
    
    if( decoded.role === "manager")return  children
    return   <Navigate to="/dashboard/manager"/>

}

export default ProtectedRouteManager;