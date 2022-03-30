import React from "react";
// import { Redirect, Route } from "react-router-dom";
import { Navigate, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

function ProtectedRouteAdmin({children}) {
    const token = localStorage.getItem('auth_token');

    var decoded = jwt_decode(token);

    console.log(decoded.role);
    console.log(token);
    console.log(decoded);

    if( decoded.role === "admin")return  children
    return   <Navigate to="/dashboard/admin"/>

}

export default ProtectedRouteAdmin;