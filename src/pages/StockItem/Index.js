

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, Navigate, Redirect, useNavigate, useParams } from 'react-router-dom';
import { AdvancedChart } from "react-tradingview-embed";

import {Helmet} from "react-helmet";

import SideBar from "../../layouts/SideBar";


const StockItem = () => {

  const navigate = useNavigate();

  let { symbole } = useParams();
    console.log(symbole);
    // const  [data,setData] = useState(''); 
    // const [isloading, setIsLoading] = useState(true);
    const [symboleId,setSymboleId] = useState(symbole);
    const [data, setDatas] = useState([]);
    const [dataNews, setDataNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingNews, setIsLoadingNews] = useState(true);


    useEffect( () => {
      fetchData()
  },[]);
  console.log("symbole  : "+ symbole);


  useEffect( () => {
    fetch('https://newsapi.org/v2/everything?q='+symbole+'&from=2022-04-17&sortBy=popularity&apiKey=bf1bf708d8d440b494f4aec9a13f4619')
    .then(response => response.json())
    .then(data => {
      console.log("google news  : "+data.articles);
      setDataNews(data.articles);
      setIsLoadingNews(false);
    })
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


      
  const [note, setNote] = useState([]);
  const [watchlist_id, setWatchlist_id] = useState([]);


  
  const handleAddToWatchList = e => {
    e.preventDefault();
    setIsLoadingsubmit(true);

    const form_data = {
      symbole : symbole,
    note : note,
    watchlist_id : watchlist_id
        }
    
    console.log(form_data);
      
    axios.post(`https://bourse.toolkech.com/api/liststock`,form_data
        ).then(response => {
            if(response){
                console.log('good')
                    setIsLoadingsubmit(false);
                    // fetchDataWatchList()
                    //fetchData();
                    //console.log(response.data.stockmanager);

            }else{
                setIsLoadingsubmit(false);
                console.log("add failed !!");
            }
                    
        }).catch(error =>{
            
            
            console.log("error : "+error);
        }
        )

}

// const navigate = useNavigate();

    const handleRedirection = (e, url) => {
        e.preventDefault();
        
        navigate('/' + url);
    }

const [watchlists, setWatchlist] = useState([]);

const fetchDataWatchList = () => {
  setTimeout(() => {
  fetch('https://bourse.toolkech.com/api/watchlist')
  .then(async response =>{
      
      const varr = await response.json()
      
      setWatchlist(varr);
      setIsLoading(false);
      console.log(varr);
  }).catch(err=>{
      setIsLoading(false);
      console.log('faild to fetch');
  })

  }, 1000);
}

useEffect( () => {
fetchDataWatchList()
},[]);

    


const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [noteWatchlist, setNoteWatchlist] = useState("");

const [isloadingsubmitWatchlist, setIsLoadingsubmitWatchlist] = useState(false);


const handleCraeteWatchlist = e => {
  e.preventDefault();
  setIsLoadingsubmit(true);

  const form_data = {
    title: title,
      description: description,
      note: noteWatchlist,
      user_id : 2
      
    }
  
  console.log(form_data);
  // setTimeout(() => {
    
  axios.post('https://bourse.toolkech.com/api/watchlist',form_data
      ).then(response => {
          // console.log(response);
          if(response){
              console.log('good')
                  setIsLoadingsubmitWatchlist(false);
                  fetchDataWatchList()
                  console.log(response.watchlist);
                  // setTitle = "";
                  // setDescription = "";
                  // setNoteWatchlist = "";
          }else{
              setIsLoadingsubmitWatchlist(false);
          }
                  
      }).catch(error =>{
          
          
          console.log("error : "+error);
      }
      )
  // }, 1000);

}


var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
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
          <div className="col-11 container">

            <div className="header">
              <div className="header-body border-0">
                <div className="row align-items-center">
                  <div className="col">

                    <h1 className="header-title  text-truncate">
                      Stock
                    </h1>

                  </div>
                  <div className="col-auto">

                    <p className="btn text-secondary ms-2 my-0" data-bs-toggle="modal" data-bs-target="#exampleWatchlist" data-bs-whatever="@fat" >
                      Add to Watchlist
                    </p>
                    
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

                    <div className="modal fade" id={`exampleWatchlist`} tabindex="-1" aria-labelledby={`exampleAddToWatchlist`} aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4 className="modal-title" id={`exampleAddToWatchlist`}>Add to watchlist</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>

                                    <form onSubmit={handleAddToWatchList}>

                                  <div className="modal-body">
                                      <div className="mb-3">
                                        <label  className="col-form-label">Note:</label>
                                        <input type="text" className="form-control"  value={note} onChange={e => setNote(e.target.value)} />
                                      </div>
                                      <div className="mb-3">
                                        <label  className="col-form-label">Watchlist:</label>
                                        <select className="form-select mb-3" data-choices value={watchlist_id} onChange={e => setWatchlist_id(e.target.value)}>
                                        <option disabled>Chose whatchlist</option>
                                        {watchlists.map((watchlist, index) => (
                                          <option key={index} value={watchlist.id}>{watchlist.title}</option>
                                        ))}
                                      </select>
                                      </div>
                                      
                                  </div>

                                  <p className="btn text-secondary ms-2"  data-bs-toggle="modal" data-bs-target="#exampleCreateWatchlist" data-bs-whatever="@fat">
                      Create new watchlist
                    </p>
                    

                    
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/* <input type="submit" value={isloadingsubmit ? 'loading...' : 'Submit'} data-bs-dismiss="modal" disabled={isloadingsubmit} className="btn btn-primary"  /> */}
                                    <input type="submit" value='Submit'  data-bs-dismiss="modal"  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleRedirection" data-bs-whatever="@fat"   />

                                  </div>

                                    </form>
                                </div>
                              </div>
                            </div>

                            <div className="modal fade" id="exampleRedirection" tabindex="-1" aria-labelledby="exampleModalRedirection" aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4 className="modal-title" id="exampleModalRedirection">You want to go to the watchlist page</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>

                                    <form onSubmit={(e) => handleRedirection(e, "watchlist")}>

                                        <div className="modal-footer">
                                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                          {/* <button type="submit" className="btn btn-primary">Save</button> */}
                                          <input type="submit" value={'Submit'} data-bs-dismiss="modal"  className="btn btn-primary"  />

                                        </div>

                                    </form>
                                </div>
                              </div>
                            </div>

                  </div>
                </div>
             
              </div>
            </div>

            <div class="modal fade" id="exampleCreateWatchlist" tabindex="-1" aria-labelledby="exampleModalCreateWatchlist" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title" id="exampleModalCreateWatchlist">Create new watchlist</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>

                            <form onSubmit={handleCraeteWatchlist}>

                          <div class="modal-body">
                              <div class="mb-3">
                                <label for="title" class="col-form-label">Title:</label>
                                <input type="text" class="form-control"  value={title} onChange={e => setTitle(e.target.value)} id="title"/>
                              </div>
                              <div class="mb-3">
                                <label for="description" class="col-form-label">Description:</label>
                                <textarea class="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                              </div>
                              <div class="mb-3">
                                <label for="note" class="col-form-label">Note:</label>
                                <textarea class="form-control" id="note" value={noteWatchlist} onChange={e => setNoteWatchlist(e.target.value)}></textarea>
                              </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="submit" class="btn btn-primary">Save</button> */}
                            <input type="submit" value={isloadingsubmitWatchlist ? 'loading...' : 'Submit'} disabled={isloadingsubmitWatchlist} data-bs-dismiss="modal" className="btn btn-primary"  />

                          </div>

                            </form>
                        </div>
                      </div>
                    </div>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="companiesListPane" role="tabpanel" aria-labelledby="companiesListTab">

                  <div className="row">
                    <div className="col-12">
                    <div class="row align-items-center">
                    {/* <div class="col-auto">

                      <div class="avatar">
                        <img class="avatar-img rounded-circle" src={data.logo} alt="..."/>
                      </div>

                    </div> */}
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
                    <div className="col-4 px-3">
                        <div class="col-12">

                        <div class="card py-3">
                          <div class="card-body">
                            <div class="row align-items-center gx-0">
                              <div class="col">

                                <h3 class="text-uppercase text-muted mb-2">
                                {data.symbole}

                                </h3>

                                <span class="h1 mb-0">
                                  {/* ${data.price} */}
                                  {formatter.format(data.price)}
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
                    </div>
                    <div className="col-8  px-4">
                      <div className="card">
                      <div className="row ">
                      <div class="col-12 col-lg-4 col-xl-4 ">

                          <div class=" py-3">
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
                              </div>

                            </div>
                          </div>

                          </div>
                          <div class="col-12 col-lg-4 col-xl-4">

                          <div class=" py-3">
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
                              </div> 

                            </div>
                          </div>

                          </div>
                          <div class="col-12 col-lg-4 col-xl-4">

                            <div class=" py-3">
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
                                </div>

                              </div>
                            </div>

                          </div>
                      </div>
                      </div>
                    </div>
                    
                    
                    
                  </div>
                  <div className="mb-5">
                  <AdvancedChart widgetProps={{"theme": "light", "symbol": `${symboleId}`}} />
                  </div>
                  
                  {/* make card for dataNews */}
                  <div className="row">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-header">
                          <h1 className="card-title">News</h1>
                        </div>

                        <div className="row">
                          {dataNews.map((item, index) => (

                          <div class="card mb-3   col-lg-6 col-sm-12" key={index}>
                            <div class="row g-0">
                              
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h4 class="card-title newstitle">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                              {item.title}
                                    </a>
                                  </h4>
                                  
                                  <p class="card-text newsDescription">{item.description}</p>
                                  <p class="card-text d-flex justify-content-between">
                                    <small class="text-muted">{item.publishedAt}</small>
                                    <span class="text-muted"><a href={item.url}>See more</a></span>
                                  </p>
                                </div>
                              </div>
                              <div class="col-md-4 py-3">
                                <img src={item.urlToImage} class="img-fluid rounded newimage" alt="..."/>
                              </div>
                            </div>
                          </div>
                          ))}

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