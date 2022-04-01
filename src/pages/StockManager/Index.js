

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import SideBar from "../../layouts/SideBar";


const StockManager = () => {

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
        fetch('https://bourse.toolkech.com/api/stockmanager')
        .then(async response =>{
            
            const varr = await response.json()
            
            setDatas(varr);
            setIsLoading(false);
            console.log(varr[0].created_at);
            //console.log(format(varr[0].created_at, 'yyyy/MM/dd kk:mm:ss'));
            console.log(format(varr[0].created_at, 'yyyy-MM-dd'))


        }).catch(err=>{
            setIsLoading(false);
            console.log('faild to fetch');
        })

        }, 1000);
    };

    
    const [symbole, setSymbole] = useState([]);
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
                        // fetchDataWatchList()
                        fetchData();
                        console.log(response.data.stockmanager);

                }else{
                    setIsLoadingsubmit(false);
                }
                        
            }).catch(error =>{
                
                
                console.log("error : "+error);
            }
            )

    }

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
                      Stock Manager
                    </h1>

                  </div>
                  <div className="col-auto">
                      
                    <p className="btn text-secondary ms-2"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">
                      Add new Operation
                    </p>

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
                                <label for="symbole" class="col-form-label">Symbole:</label>
                                <input type="text" class="form-control"  value={symbole} onChange={e => setSymbole(e.target.value)} id="symbole"/>
                              </div>
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
                            <input type="submit" value={isloadingsubmit ? 'loading...' : 'Submit'} data-bs-dismiss="modal" disabled={isloadingsubmit} className="btn btn-primary"  />

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

                <div className="card" data-list='{"valueNames": ["item-company", "item-price", "item-pre-market", "item-day", "item-week", "item-trimister", "item-year-high", "item-year-low"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}' id="companiesList">
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
                  <div className="table-responsive ">
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
                            <a className="list-sort text-muted" data-sort="item-company" href="#">symbole</a>
                          </th>
                          <th  className="text-center">
                            <a className="list-sort text-muted" data-sort="item-price" href="#">operation</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-week" href="#">Date</a>
                          </th>
                          <th  className="text-center">
                            <a className="list-sort text-muted" data-sort="item-pre-market" href="#">size</a>
                          </th>
                          <th  className="text-center">
                            <a className="list-sort text-muted" data-sort="item-day" href="#">open</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-month" href="#">Amount Open</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-trimister" href="#">Close</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-year-high" href="#">Amount Close</a>
                          </th>
                          <th   className="text-center">
                            <a className="list-sort text-muted" data-sort="item-year-low" href="#">PNL</a>
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
                            </div> <Link to={`/${item.symbole}`} className="item-name text-reset">{item.symbole}</Link>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.operation}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.created_at.substring(0,10)}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-industry">{item.size}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.open}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.size * item.open}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location"></span>

                          </td>
                          <td className="text-center">

                            <span className="item-location"></span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.size * item.open}</span>

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
                </div>

              </div>
             
            </div>

          </div>
        </div> 
      </div>

    </div> 

</div>
    );
}

export default StockManager;