

import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import SideBar from "../../layouts/SideBar";
import DataWatchlist from "../../components/DataWatchlist";
import axios from 'axios';


const Watchlist = () => {

    // const  [data,setData] = useState(''); 
    // const [isloading, setIsLoading] = useState(true);

    const [dataWatchlist, setDataWatchlist] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
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

    function watchList(id) {
     
      
        setTimeout(() => {
        fetch('https://bourse.toolkech.com/api/liststock/'+ id)
        .then(async response =>{
            
            const varr = await response.json()
            
            setDataWatchlist(varr);
            setIsLoading(false);
            console.log(varr);
        }).catch(err=>{
            setIsLoading(false);
            console.log('faild to fetch');
        })
  
        }, 1000);
    // },[]);
    }


      const [title, setTitle] = useState([]);
      const [description, setDescription] = useState([]);
      const [note, setNote] = useState([]);

      const [isloadingsubmit, setIsLoadingsubmit] = useState(false);


      const handleSubmit = e => {
          e.preventDefault();
          setIsLoadingsubmit(true);

          const form_data = {
            title: title,
              description: description,
              note: note,
              user_id : 2
              
            }
          
          console.log(form_data);
          // setTimeout(() => {
            
          axios.post('https://bourse.toolkech.com/api/watchlist',form_data
              ).then(response => {
                  // console.log(response);
                  if(response){
                      console.log('good')
                          setIsLoadingsubmit(false);
                          // fetchDataWatchList()
                          console.log(response.watchlist);
                  }else{
                      setIsLoadingsubmit(false);
                  }
                          
              }).catch(error =>{
                  
                  
                  console.log("error : "+error);
              }
              )
          // }, 1000);

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
                <div className="row align-items-center mb-4">
                  <div className="col">

                    <h1 className="header-title  text-truncate">
                      Watchlist
                    </h1>

                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col">

                 {isLoading && <tr className="text-center"><td colspan="11" className="py-5"><p >Loading ...</p></td></tr>}
                     {watchlist.map((item)=>(
                  <p onClick={() => watchList(item.id)} key={item.id} className="btn text-secondary ms-2 py-0 p-3 border border-1 rounded-pill ">
                      {item.title}
                    </p>
                  ))}
                  </div>
                  <div className="col-auto">

                    <p className="btn text-secondary ms-2"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">
                      Create new watchlist
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
                                <label for="title" class="col-form-label">Title:</label>
                                <input type="text" class="form-control"  value={title} onChange={e => setTitle(e.target.value)} id="title"/>
                              </div>
                              <div class="mb-3">
                                <label for="description" class="col-form-label">Description:</label>
                                <textarea class="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                              </div>
                              <div class="mb-3">
                                <label for="note" class="col-form-label">Note:</label>
                                <textarea class="form-control" id="note" value={note} onChange={e => setNote(e.target.value)}></textarea>
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

                      
                      <DataWatchlist dataWatchlist={dataWatchlist} dataLoading={isLoading}></DataWatchlist>


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

export default Watchlist;