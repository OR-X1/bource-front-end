

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import SideBar from "../../layouts/SideBar";



import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import moment from 'moment';

import MaterialTable from 'material-table'

import SearchBar from "material-ui-search-bar";

import { CsvBuilder } from 'filefy';


const Stock = () => {

    // const  [data,setData] = useState(''); 
    // const [isloading, setIsLoading] = useState(true);

    const [data, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [rows , setRows ] = useState([]);
    const [searchSymbole , setSearchSymbole ] = useState("");

    
    useEffect( () => {

      setRows([]);
      
        setTimeout(() => {
        // fetch(`${process.env.REACT_APP_API_URL}manager/getAllmanagers`)
        fetch('http://127.0.0.1:8000/api/stock')
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

    const searchbyname = (e) => {
      e.preventDefault();
      
      setIsLoadingsubmit(true);
  
console.log(searchSymbole);

      setDatas([]);
        setRows([]);

          // fetch(`${process.env.REACT_APP_API_URL}manager/getAllmanagers`)
          fetch('http://127.0.0.1:8000/api/search/'+searchSymbole)
          .then(async response =>{
              
              const varr = await response.json()
              
              setDatas(varr);
              setIsLoading(false);
              console.log(searchSymbole);
              console.log(varr);
          }).catch(err=>{
              setIsLoading(false);
              console.log('faild to fetch');
              console.log(searchSymbole);
          })
  
  
  }
  //   useEffect( ()=>{
  //     fetch('http://127.0.0.1:8000/api/watchlist')
  //     .then(response =>response.json())
  //     .then(json => {
  //         const varr =json.data
          
  //         setData(varr)
  //         setIsLoading(false)    
  //     }).catch(err=>{
  //         setIsLoading('faild to fetch')
  //     })
  // },[])
  
  const [note, setNote] = useState([]);
  const [watchlist_id, setWatchlist_id] = useState([]);

  const [isloadingsubmit, setIsLoadingsubmit] = useState(false);

  
  const handleAddToWatchList = (e, symbole) => {
    e.preventDefault();
    setIsLoadingsubmit(true);

    const form_data = {
      symbole : symbole,
      note : note,
      watchlist_id : watchlist_id
        }
    
    console.log(form_data);
      
    axios.post(`http://127.0.0.1:8000/api/liststock`,form_data
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

const navigate = useNavigate();

    const handleRedirection = (e, url) => {
        e.preventDefault();
        
        navigate('/' + url);
    }



const [watchlists, setWatchlist] = useState([]);

const fetchDataWatchList = () => {
  setTimeout(() => {
  fetch('http://127.0.0.1:8000/api/watchlist')
  .then(async response =>{
      
      const varr = await response.json()
      
      setWatchlist(varr);
      // setIsLoading(false);
      console.log(varr);
  }).catch(err=>{
      // setIsLoading(false);
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
      user_id : JSON.parse(localStorage.getItem('auth_user')).id
      
    }
  
  console.log(form_data);
  // setTimeout(() => {
    
  axios.post('http://127.0.0.1:8000/api/watchlist',form_data
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






 

function createData(id, company, symbole, price, preMarket, day, week, month, trimister, years_hight, years_low) {
  return {
    id,
    company, 
    symbole,
    price,
    preMarket,
    day,
    week,
    month,
    trimister,
    years_hight,
    years_low      
  };
}



  // const [rows, setRows] = useState([]);
  useEffect(() => {
    data.map(item => {
      setRows(rows => [...rows, createData(item.id, item.name, item.symbole, item.price, item.premarket, item.day, item.week, item.month, item.trimister, item.yearslow, item.yearshigh)])
    })
  }, [data]);


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'company', numeric: true, disablePadding: false, label: 'Company' },
  { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
  { id: 'pre_market', numeric: false, disablePadding: false, label: 'Pre market' },
  { id: 'day', numeric: false, disablePadding: false, label: 'Day' },
  { id: 'week', numeric: false, disablePadding: false, label: 'Week' },
  { id: 'month', numeric: false, disablePadding: false, label: 'Month' },
  { id: 'trimister', numeric: false, disablePadding: false, label: 'Trimister' },
  { id: 'years_hight', numeric: false, disablePadding: false, label: 'Years hight' },
  { id: 'years_low', numeric: false, disablePadding: false, label: 'Years low' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {/* Nutrition */}
        </Typography>
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};



const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('name');
const [selected, setSelected] = React.useState([]);
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = rows.map((n) => n.company);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

const handleClick = (event, name) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }

  setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};


const isSelected = (company) => selected.indexOf(company) !== -1;

// Avoid a layout jump when reaching the last page with empty rows.
const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    console.log(searchedVal);
    const filteredRows = rows.filter((row) => {
      console.log(row.company);
      return row.company.toLowerCase().includes(searchedVal.toLowerCase());
    });
  setRows(filteredRows);
};

const cancelSearch = () => {
  setSearched("");
  requestSearch(searched);
};






var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}); 


// export to CSV
const exportToCsv = () => {

  var csvBuilder = new CsvBuilder("watchlist.csv")
  .setColumns(headCells.map(col=>col.label))
  .addRows(rows.map(row=>{
    return headCells.map(col=>row[col.id])
    }))
  .exportFile();

  // var csv = [];
  // var csvRow = [];
  // for (var i = 0; i < rows.length; i++) {
  //   for (var key in rows[i]) {
  //     csvRow.push(rows[i][key]);
  //   }
  //   csv.push(csvRow.join(','));
  //   csvRow = [];
  // }
  // var csvString = csv.join('\r\n');
  // var a = document.createElement('a');
  // a.href =
  //   'data:attachment/csv,' +
  //   encodeURIComponent(csvString);
  // a.target = '_blank';
  // a.download = filename;
  // document.body.appendChild(a);
  // a.click();
};


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

                    {/* <a href="#!" className="btn text-secondary ms-2">
                      Add to Watchlist
                    </a> */}

                    <p className="btn btn-gray-theme ms-2" onClick={() => exportToCsv()} >
                      Save Data
                    </p>

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

                        <form onSubmit={(e)=>searchbyname(e)}>
                          <div className="input-group input-group-flush input-group-merge input-group-reverse">
                            <input className="form-control list-search" value={searchSymbole} onChange={e => setSearchSymbole(e.target.value)} type="search" placeholder="Search" />
                            <span className="input-group-text">
                              <i className="fe fe-search"></i>
                            </span>
                          </div>
                        </form>

                      </div>
                     
                   
                    </div>
                  </div>



                  <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        
        <EnhancedTableToolbar numSelected={selected.length} />
        
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {isLoading && <tr className="text-center"><td colspan="11" className="py-5"><p ><Spinner animation="border" /></p></td></tr>}
                
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.company);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.company)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.company}
                    selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        <Link to={`/${row.symbole}`} className="item-name text-reset">{row.company}</Link>
                        </TableCell>
                      <TableCell align="center">{formatter.format(row.price)}</TableCell>
                      <TableCell align="center">{formatter.format(row.preMarket)}</TableCell>
                      <TableCell align="center">{formatter.format(row.day)}</TableCell>
                      <TableCell align="center">{formatter.format(row.week)}</TableCell>
                      <TableCell align="center">{formatter.format(row.month)}</TableCell>
                      <TableCell align="center">{formatter.format(row.trimister)}</TableCell>
                      <TableCell align="center">{formatter.format(row.years_hight)}</TableCell>
                      <TableCell align="center">{formatter.format(row.years_low)}</TableCell>
                      

                      <TableCell align="center">
                        
                      

                      <div className="dropdown">
                              <a className="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fe fe-more-horizontal"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                              <button className="dropdown-item"  data-bs-toggle="modal" data-bs-target={`#exampleWatchlist${row.id}`} data-bs-whatever="@fat">
                                  Add to watchlist
                                </button>
                              </div>
                            </div>

                            <div className="modal fade" id={`exampleWatchlist${row.id}`} tabindex="-1" aria-labelledby={`exampleAddToWatchlist${row.id}`} aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4 className="modal-title" id={`exampleAddToWatchlist${row.id}`}>Add to watchlist</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>

                                    <form onSubmit={(e)=>handleAddToWatchList(e, row.symbole)}>

                                  <div className="modal-body">
                                      <div className="mb-3">
                                        <label  className="col-form-label">Note:</label>
                                        <input type="text" className="form-control"  value={note} onChange={e => setNote(e.target.value)} required/>
                                      </div>
                                      <div className="mb-3">
                                        <label  className="col-form-label">Watchlist:</label>
                                        <select className="form-select mb-3" data-choices value={watchlist_id} onChange={e => setWatchlist_id(e.target.value)} required>
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
                                    <input type="submit" value='Submit'  data-bs-dismiss="modal"  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleRedirection" data-bs-whatever="@fat"  />

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
                                <input type="text" class="form-control"  value={title} onChange={e => setTitle(e.target.value)} id="title" required/>
                              </div>
                              <div class="mb-3">
                                <label for="description" class="col-form-label">Description:</label>
                                <textarea class="form-control" id="description" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                              </div>
                              <div class="mb-3">
                                <label for="note" class="col-form-label">Note:</label>
                                <textarea class="form-control" id="note" value={noteWatchlist} onChange={e => setNoteWatchlist(e.target.value)} required></textarea>
                              </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="submit" class="btn btn-primary">Save</button> */}
                            <input type="submit" value={'Submit'}  data-bs-dismiss="modal" className="btn btn-primary"  />

                          </div>

                            </form>
                        </div>
                      </div>
                    </div>

                            

                          

                          
                      </TableCell>


                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
    </Box>

                  
                  <div className="card-footer border-0 d-flex justify-content-end">

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