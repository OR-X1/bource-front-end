

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import SideBar from "../../layouts/SideBar";


const StockManager = () => {

    // const  [data,setData] = useState(''); 
    // const [isloading, setIsLoading] = useState(true);

    const [data, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingClose, setIsLoadingClose] = useState(true);

    
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
            console.log(varr);


        }).catch(err=>{
            setIsLoading(false);
            console.log('faild to fetch');
        })

        }, 1000);
    };

    
    const [symboleID, setSymboleId] = useState("");
    const [symbole, setSymbole] = useState("");
    const [operation, setOperation] = useState("");
    const [size, setSize] = useState("");
    const [open, setOpen] = useState("");
    const [close, setClose] = useState("");

    const [note, setNote] = useState("");
    const [watchlist_id, setWatchlist_id] = useState("");


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
          
        axios.post('https://bourse.toolkech.com/api/stockmanager', form_data
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

    const navigate = useNavigate();

    const handleRedirection = (e, url) => {
        e.preventDefault();
        
        navigate('/' + url);
    }

    

    const handleCloseAction = (e, id) => {
      e.preventDefault();
      setIsLoadingsubmit(true);

      const form_data = {
        close: close,
          }
      
      console.log(form_data);
      console.log(" id : "+id +" close : " + close);
        
      axios.put(`https://bourse.toolkech.com/api/stockmanageraddclose/${id}`,form_data
          ).then(response => {
              if(response){
                  console.log('good')
                      setIsLoadingsubmit(false);
                      // fetchDataWatchList()
                      fetchData();
                      //console.log(response.data.stockmanager);

              }else{
                  setIsLoadingsubmit(false);
                  console.log("update failed !!");
              }
                      
          }).catch(error =>{
              
              
              console.log("error : "+error);
          }
          )

  }

  const handleAddToWatchList = (e, symbole) => {
    e.preventDefault();
    setIsLoadingsubmit(true);

    const form_data = {
      symbole : symbole,
    note : note,
    watchlist_id : watchlist_id
        }
    
    console.log(form_data);
    console.log(" id : "+symbole +" close : " + close);
      
    axios.post(`https://bourse.toolkech.com/api/liststock`,form_data
        ).then(response => {
            if(response){
                console.log('good')
                    setIsLoadingsubmit(false);
                    // fetchDataWatchList()
                    fetchData();
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



const [title, setTitle] = useState([]);
const [description, setDescription] = useState([]);
const [noteWatchlist, setNoteWatchlist] = useState([]);

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

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Create new watchlist</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>

                            <form onSubmit={handleSubmit}>

                                <div className="modal-body">
                                    <div className="mb-3">
                                      <label for="symbole" className="col-form-label">Symbole:</label>
                                      <input type="text" className="form-control"  value={symbole} onChange={e => setSymbole(e.target.value)} id="symbole"/>
                                    </div>
                                    <div className="mb-3">
                                      <label for="operation" className="col-form-label">Operation:</label>
                                      <select className="form-select mb-3" data-choices value={operation} onChange={e => setOperation(e.target.value)}>
                                        <option disabled>Chose your operation</option>
                                        <option>Sell</option>
                                        <option>Buy</option>
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                      <label for="size" className="col-form-label">Size:</label>
                                      <input type="text" className="form-control"  value={size} onChange={e => setSize(e.target.value)} id="size"/>
                                    </div>
                                    <div className="mb-3">
                                      <label for="open" className="col-form-label">Open:</label>
                                      <input type="text" className="form-control"  value={open} onChange={e => setOpen(e.target.value)} id="open"/>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                  {/* <button type="submit" className="btn btn-primary">Save</button> */}
                                  <input type="submit" value={'Submit'} data-bs-dismiss="modal" className="btn btn-primary" />

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
                        <tr key={item.id}>
                          <td>

                            <div className="form-check">
                              <input className="form-check-input list-checkbox" type="checkbox" id="listCheckboxOne" />
                              <label className="form-check-label" for="listCheckboxOne"></label>
                            </div>

                          </td>
                          <td>

                            {/* <div className="avatar avatar-xs align-middle me-2">
                            </div>  */}
                            <Link to={`/${item.symbole}`} className="item-name text-reset">{item.symbole}</Link>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.operation}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.created_at.substring(0,10)}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-industry">{formatter.format(item.size)}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{formatter.format(item.size)}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{formatter.format(item.amount_open)}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{formatter.format(item.close)}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{formatter.format(item.amount_close)}</span>

                          </td>
                          <td className="text-center">

                            {/* <span className={`item-location ${item.pnl > 0 ? "text-succes" : "text-danger"}`}>{item.pnl}</span> */}
                            <span className={`item-location ${item.pnl > 0 ? 'text-success' : 'text-danger'}`}>{item.pnl}</span>

                          </td>
                          <td className="text-end">

                            <div className="dropdown">
                              <a className="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fe fe-more-horizontal"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <button className="dropdown-item"  data-bs-toggle="modal" data-bs-target={`#exampleModalClose${item.id}`} data-bs-whatever="@fat">
                                  Add close action
                                </button>
                                <button className="dropdown-item"  data-bs-toggle="modal" data-bs-target={`#exampleWatchlist${item.id}`} data-bs-whatever="@fat">
                                  Add to watchlist
                                </button>
                              </div>
                            </div>

                            <div className="modal fade" id={`exampleModalClose${item.id}`} tabindex="-1" aria-labelledby={`exampleModalLabelClose${item.id}`} aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4 className="modal-title" id={`exampleModalLabelClose${item.id}`}>Add close action</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>

                                    <form onSubmit={(e)=>handleCloseAction(e, item.id)}>

                                  <div className="modal-body">
                                      <div className="mb-3">
                                        <label  className="col-form-label">Close:</label>
                                        <input type="text" className="form-control"  value={close} onChange={e => setClose(e.target.value)} />
                                      </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/* <input type="submit" value={isloadingsubmit ? 'loading...' : 'Submit'} data-bs-dismiss="modal" disabled={isloadingsubmit} className="btn btn-primary"  /> */}
                                    <input type="submit" value='Submit' data-bs-dismiss="modal"  className="btn btn-primary"  />

                                  </div>

                                    </form>
                                </div>
                              </div>
                            </div>

                            <div className="modal fade" id={`exampleWatchlist${item.id}`} tabindex="-1" aria-labelledby={`exampleAddToWatchlist${item.id}`} aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4 className="modal-title" id={`exampleAddToWatchlist${item.id}`}>Add to watchlist</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>

                                    <form onSubmit={(e)=>handleAddToWatchList(e, item.symbole)}>

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
                                      <p className="btn text-secondary ms-2"  data-bs-toggle="modal" data-bs-target="#exampleCreateWatchlist" data-bs-whatever="@fat">
                                        Create new watchlist
                                      </p>
                                  </div>
                                  <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/* <input type="submit" value={isloadingsubmit ? 'loading...' : 'Submit'} data-bs-dismiss="modal" disabled={isloadingsubmit} className="btn btn-primary"  /> */}
                                    <input type="submit" value='Submit' data-bs-dismiss="modal"  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleRedirection" data-bs-whatever="@fat" />

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