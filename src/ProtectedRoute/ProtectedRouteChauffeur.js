import React from "react";
// import { Redirect, Route } from "react-router-dom";
import { Navigate, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

function ProtectedRouteChauffeur({children}) {
    const token = localStorage.getItem('auth_token');

    var decoded = jwt_decode(token);

    console.log(token);
    console.log(decoded);
    
    if( decoded.role === "chauffeur")return   children
    return  <Navigate to="/dashboard/chauffeur"/>

}

export default ProtectedRouteChauffeur;