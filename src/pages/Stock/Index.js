

import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SideBar from "../../layouts/SideBar";


const Stock = () => {

    // const  [data,setData] = useState(''); 
    // const [isloading, setIsLoading] = useState(true);

    const [data, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect( () => {
        setTimeout(() => {
        // fetch(`${process.env.REACT_APP_API_URL}manager/getAllmanagers`)
        fetch('https://bourse.toolkech.com/api/stock')
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
    },[]);
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

                    <a href="#!" className="btn btn-gray-theme ms-2">
                      Save Data
                    </a>

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
                            </div> <Link to={`/stock/${item.symbole}`} className="item-name text-reset">{item.name}</Link>

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

export default Stock;