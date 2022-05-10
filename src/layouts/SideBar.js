
import { useEffect, useState } from 'react';
import {  useNavigate, NavLink as Link } from 'react-router-dom';
import axios from 'axios';




const SideBar = () => {

  let navigate= useNavigate();
  const handleLogout = (e) =>{
      e.preventDefault();
      axios.post('http://localhost:8000/api/logout').then(response => {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
          navigate('/login')
          }).catch(error =>{
              console.log('error');  
          })
    
  }

    return (
<div className="navbar navbar-vertical fixed-start navbar-expand-md  bg-white">
        <nav className="navbar navbar-vertical w-100 fixed-start navbar-expand-md bg-white border-0 shadow" id="sidebar">
      <div className="container-fluid align-items-center">
    
        {/* <!-- Toggler --> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
          </span>
        </button>
    
        {/* <!-- Brand --> */}
        <a className="navbar-brand" href="index.html">
          <img src="/logo.png" className="navbar-brand-img mx-auto" alt="Brand Bourse" />
        </a>
       
    
        <div className="collapse navbar-collapse " id="sidebarCollapse">
    
    
          {/* <!-- Navigation --> */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#">
                <i className="fe fe-bell"></i> Alert
              </a>
            </li>
            <li className="nav-item">
              <Link to="/" 
                className={({ isActive }) =>
                  isActive ? 'nav-link text-secondary active' : 'nav-link text-secondary '
              }
              >
                <i className="fe fe-trending-up"></i> Stock
              </Link>
            </li>

          </ul>
    
          {/* <!-- my operations --> */}
          <hr className="navbar-divider my-3"></hr>
    
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/stockmanager" 
              className={({ isActive }) =>
                  isActive ? 'nav-link text-secondary active' : 'nav-link text-secondary '
              }>
                <i className="fe fe-briefcase"></i> Stock Manager
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/watchlist" 
                className={({ isActive }) =>
                    isActive ? 'nav-link text-secondary active' : 'nav-link text-secondary '
                }
              >
                <i className="fe fe-eye"></i> Watchlist
              </Link>
            </li>

          </ul>

          <hr className="navbar-divider my-3"></hr>
    
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-secondary " href="#">
                <i className="fe fe-settings"></i> Parametre
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link text-secondary " href="#">
                <i className="fe fe-more-horizontal"></i> More
              </a>
            </li> */}

          </ul>
    
           <div className="mt-auto">
           <hr className="navbar-divider my-3"></hr>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link text-danger " href="#" onClick={handleLogout}>
                    <i className="fe fe-log-out"></i> Logout
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link text-secondary " href="#">
                    <i className="fe fe-more-horizontal"></i> More
                  </a>
                </li> */}

              </ul>

            </div> 
    
    
        </div> 
    
      </div>
    </nav>
    
</div>

    );
}

export default SideBar;

