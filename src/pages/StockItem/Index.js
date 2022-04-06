

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, Navigate, Redirect, useNavigate, useParams } from 'react-router-dom';
 
import SideBar from "../../layouts/SideBar";


const StockItem = () => {

  const navigate = useNavigate();

  let { symbole } = useParams();
    console.log(symbole);
    // const  [data,setData] = useState(''); 
    // const [isloading, setIsLoading] = useState(true);

    const [data, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect( () => {
      fetchData()
  },[]);
    
  const fetchData = () => {
        setTimeout(() => {
        // fetch(`${process.env.REACT_APP_API_URL}manager/getAllmanagers`)
        fetch(`https://bourse.toolkech.com/api/stock/${symbole}`)
        .then(async response =>{
            
            const varr = await response.json()
            
            setDatas(varr);
            setIsLoading(false);
            console.log(varr);
        }).catch(err=>{
            setIsLoading(false);
            console.log('faild to fetch');
        })

        }, 1000);
    };


    const [operation, setOperation] = useState([]);
    const [size, setSize] = useState([]);
    const [open, setOpen] = useState([]);

    const [isloadingsubmit, setIsLoadingsubmit] = useState(false);


    const handleSubmit = e => {
        e.preventDefault();
        setIsLoadingsubmit(true);

        const form_data = {
            symbole: symbole,
            operation: operation,
            size: size,
            open: open,
            user_id: 2
            }
        
        console.log(form_data);
          
        axios.post('https://bourse.toolkech.com/api/stockmanager',form_data
            ).then(response => {
                if(response){
                    console.log('good')
                        setIsLoadingsubmit(false);
                        console.log(response.data.stockmanager);
                        // navigate('/stockmanager');
                        
                }else{
                    setIsLoadingsubmit(false);
                }
                        
            }).catch(error =>{
                
                console.log("error : "+error);
            }
            )

    }
    

  //   useEffect( ()=>{
  //     fetch('https://bourse.toolkech.com/api/watchlist')
  //     .then(response =>response.json())
  //     .then(json => {
  //         const varr =json.data
          
  //         setData(varr)
  //         setIsLoading(false)    
  //     }).catch(err=>{
  //         setIsLoading('faild to fetch')
  //     })
  // },[])

    return (
<div className="flex h-full">
    
    <SideBar></SideBar>

    <div className="main-content">


      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">

            <div className="header">
              <div className="header-body border-0">
                <div className="row align-items-center">
                  <div className="col">

                    <h1 className="header-title  text-truncate">
                      Stock
                    </h1>

                  </div>
                  <div className="col-auto">

                    <a href="#!" className="btn text-secondary ms-2">
                      Add to Watchlist
                    </a>
                    
                    <p className="btn text-secondary ms-2 my-0"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">
                      Add new Operation
                    </p>

                    <a href="#!" className="btn btn-gray-theme ms-2">
                      Save Data
                    </a>


                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title" id="exampleModalLabel">Create new watchlist</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>

                            <form onSubmit={handleSubmit}>

                          <div class="modal-body">
                              
                              <div class="mb-3">
                                <label for="operation" class="col-form-label">Operation:</label>
                                <select class="form-select mb-3" data-choices value={operation} onChange={e => setOperation(e.target.value)}>
                                  <option disabled>Chose your operation</option>
                                  <option>Sell</option>
                                  <option>Buy</option>
                                </select>
                              </div>
                              <div class="mb-3">
                                <label for="size" class="col-form-label">Size:</label>
                                <input type="text" class="form-control"  value={size} onChange={e => setSize(e.target.value)} id="size"/>
                              </div>
                              <div class="mb-3">
                                <label for="open" class="col-form-label">Open:</label>
                                <input type="text" class="form-control"  value={open} onChange={e => setOpen(e.target.value)} id="open"/>
                              </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="submit" class="btn btn-primary">Save</button> */}
                            <input type="submit" value={isloadingsubmit ? 'loading...' : 'Submit'} disabled={isloadingsubmit} className="btn btn-primary"  />

                          </div>

                            </form>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
             
              </div>
            </div>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="companiesListPane" role="tabpanel" aria-labelledby="companiesListTab">

                  <div className="row">
                    <div className="col-12">
                    <div class="row align-items-center">
                    <div class="col-auto">

                      <div class="avatar">
                        <img class="avatar-img rounded-circle" src={data.logo} alt="..."/>
                      </div>

                    </div>
                    <div class="col ms-n2">

                      <h1 class="mb-1">
                      {data.name}
                      </h1>

                      <small class="text-muted">
                      {data.symbole}
                      </small>

                    </div>
                  </div>
                    </div>
                  </div>
                  <div class="row my-5">
          <div class="col-12 col-lg-3 col-xl-3">

            <div class="card">
              <div class="card-body">
                <div class="row align-items-center gx-0">
                  <div class="col">

                    <h3 class="text-uppercase text-muted mb-2">
                    {data.symbole}
                    </h3>

                    <span class="h1 mb-0">
                      ${data.price}
                    </span>

                    <span class="badge bg-success-soft mt-n1">
                      +3.5%
                    </span>

                  </div>
                  <div class="col-auto">

                    {/* <span class="h2 fe fe-dollar-sign text-muted mb-0"></span> */}

                  </div>
                </div> 

              </div>
            </div>

          </div>
          <div class="col-12 col-lg-3 col-xl-3">

            <div class="card">
              <div class="card-body">
                <div class="row align-items-center gx-0">
                  <div class="col">

                    <h6 class="text-uppercase text-muted mb-2">
                    Pre-Market
                    </h6>

                    <span class="h1 mb-0">
                    ${data.preMarket}
                    </span>

                  </div>
                  <div class="col-auto">

                    <span class="h2 fe fe-briefcase text-muted mb-0"></span>

                  </div>
                </div>

              </div>
            </div>

          </div>
          <div class="col-12 col-lg-3 col-xl-3">

            <div class="card">
              <div class="card-body">
                <div class="row align-items-center gx-0">
                  <div class="col">

                    <h6 class="text-uppercase text-muted mb-2">
                    Previous close
                    </h6>

                    <span class="h1 mb-0">
                      ${data.close}
                    </span>

                    <span class="badge bg-success-soft mt-n1">
                      +3.5%
                    </span>

                  </div>
                  <div class="col-auto">

                    <span class="h2 fe fe-dollar-sign text-muted mb-0"></span>

                  </div>
                </div> 

              </div>
            </div>

          </div>
          <div class="col-12 col-lg-3 col-xl-3">

            <div class="card">
              <div class="card-body">
                <div class="row align-items-center gx-0">
                  <div class="col">

                    <h6 class="text-uppercase text-muted mb-2">
                      Close
                    </h6>

                    <span class="h1 mb-0">
                      ${data.close}
                    </span>

                  </div>
                  <div class="col-auto">

                    <span class="h2 fe fe-briefcase text-muted mb-0"></span>

                  </div>
                </div>

              </div>
            </div>

          </div>
          
        </div>
                {/* <div className="card" data-list='{"valueNames": ["item-company", "item-price", "item-pre-market", "item-day", "item-week", "item-trimister", "item-year-high", "item-year-low"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}' id="companiesList">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">

                        <form>
                          <div className="input-group input-group-flush input-group-merge input-group-reverse">
                            <input className="form-control list-search" type="search" placeholder="Search" />
                            <span className="input-group-text">
                              <i className="fe fe-search"></i>
                            </span>
                          </div>
                        </form>

                      </div>
                     
                   
                    </div>
                  </div>
                  <div className="table">
                    <table className="table table-sm table-hover table-nowrap card-table">
                      <thead>
                        <tr>
                          <th>

                            <div className="form-check mb-n2">
                              <input className="form-check-input list-checkbox-all" type="checkbox" id="listCheckboxAll" />
                              <label className="form-check-label" for="listCheckboxAll"></label>
                            </div>

                          </th>
                          <th>
                            <a className="list-sort text-muted" data-sort="item-company" href="#">Company</a>
                          </th>
                          <th  className="text-center">
                            <a className="list-sort text-muted" data-sort="item-price" href="#">Price</a>
                          </th>
                          <th  className="text-center">
                            <a className="list-sort text-muted" data-sort="item-pre-market" href="#">Pre market</a>
                          </th>
                          <th  className="text-center">
                            <a className="list-sort text-muted" data-sort="item-day" href="#">Day</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-week" href="#">Week</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-month" href="#">Month</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-trimister" href="#">Trimister</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-year-high" href="#">52 week high</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-year-low" href="#">52 week low</a>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list fs-base">
      
                      {isLoading && <tr className="text-center"><td colspan="11" className="py-5"><p ><Spinner animation="border" /></p></td></tr>}
                    {data.map((item)=>(
                        <tr key={item._id}>
                          <td>

                            <div className="form-check">
                              <input className="form-check-input list-checkbox" type="checkbox" id="listCheckboxOne" />
                              <label className="form-check-label" for="listCheckboxOne"></label>
                            </div>

                          </td>
                          <td>

                            <div className="avatar avatar-xs align-middle me-2">
                              <img className="avatar-img rounded-circle" src={item.logo} alt="..." />
                            </div> <Link className="item-name text-reset" to={`/${item.symbole}`}>{item.name}</Link>

                          </td>
                          <td className="text-center">

                            <span className="item-industry">{item.price}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.premarket}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.yearslow}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.yearslow}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.yearslow}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.yearslow}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.yearshigh}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.yearslow}</span>

                          </td>
                          <td className="text-end">

                            <div className="dropdown">
                              <a className="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fe fe-more-horizontal"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a href="#!" className="dropdown-item">
                                  Action
                                </a>
                                <a href="#!" className="dropdown-item">
                                  Another action
                                </a>
                                <a href="#!" className="dropdown-item">
                                  Something else here
                                </a>
                              </div>
                            </div>

                          </td>
                        </tr>
                    ))}

                      </tbody>
                    </table>
                  </div>
                  <div className="card-footer d-flex justify-content-end">

                    <ul className="list-pagination-prev pagination pagination-tabs card-pagination">
                      <li className="page-item">
                        <a className="page-link ps-0 pe-4 " href="#">
                          <i className="fe fe-arrow-left me-1"></i> Previous
                        </a>
                      </li>
                    </ul>

                    <ul className="list-pagination pagination pagination-tabs card-pagination"></ul>

                    <ul className="list-pagination-next pagination pagination-tabs card-pagination">
                      <li className="page-item">
                        <a className="page-link ps-4 pe-0 " href="#">
                          Next <i className="fe fe-arrow-right ms-1"></i>
                        </a>
                      </li>
                    </ul>

                  </div>
                </div> */}

              </div>
             
            </div>
            {/* <!-- TradingView Widget BEGIN --> */}
           {/* <div>
           <div class="tradingview-widget-container">
              <div id="tradingview_4554e"></div>
              <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
              
            </div>
           </div> */}
            {/* <!-- TradingView Widget END --> */}

          </div>
        </div> 
      </div>

    </div> 

</div>
    );
}

export default StockItem;