
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";



const SideBar = () => {



    return (
<div className="navbar navbar-vertical fixed-start navbar-expand-md bg-white">
        <nav className="navbar navbar-vertical fixed-start navbar-expand-md bg-white border-0 shadow" id="sidebar">
      <div className="container-fluid align-items-center">
    
        {/* <!-- Toggler --> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
    
        {/* <!-- Brand --> */}
        <a className="navbar-brand" href="index.html">
          <img src="/logo.png" className="navbar-brand-img mx-auto" alt="Brand Bourse" />
        </a>
    
    
        <div className="collapse navbar-collapse " id="sidebarCollapse">
    
    
          {/* <!-- Navigation --> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-secondary" href="widgets.html">
                <i className="fe fe-bell"></i> Alert
              </a>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link text-secondary ">
                <i className="fe fe-trending-up"></i> Stock
              </Link>
            </li>

          </ul>
    
          {/* <!-- my operations --> */}
          <hr className="navbar-divider my-3"></hr>
    
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/stockmanager" className="nav-link text-secondary active" href="widgets.html">
                <i className="fe fe-briefcase"></i> Stock Manager
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/watchlist" className="nav-link text-secondary" href="widgets.html">
                <i className="fe fe-eye"></i> Watchlist
              </Link>
            </li>

          </ul>

          <hr className="navbar-divider my-3"></hr>
    
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-secondary " href="widgets.html">
                <i className="fe fe-settings"></i> Parametre
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link text-secondary " href="widgets.html">
                <i className="fe fe-more-horizontal"></i> More
              </a>
            </li> */}

          </ul>
    
           {/* <div className="mt-auto"></div>  */}
    
    
        </div> 
    
      </div>
    </nav>
    
</div>

    );
}

export default SideBar;

