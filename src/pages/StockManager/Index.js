

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {EnhancedTable} from '../../components/EnhancedTable'

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

import SearchBar from "material-ui-search-bar";


import { CsvBuilder } from 'filefy';




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
        fetch('https://bourse.toolkech.com/api/stockmanager/'+JSON.parse(localStorage.getItem('auth_user')).id)
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
            user_id: JSON.parse(localStorage.getItem('auth_user')).id
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
      user_id : JSON.parse(localStorage.getItem('auth_user')).id
      
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






function createData(id, symbole, operation, date, size, open, amount_open, close, amount_close, pnl) {
  return {
    id,
    symbole,
    operation,
    date,
    size,
    open,
    amount_open,
    close,
    amount_close,
    pnl      
  };
}
const [rows , setRows ] = useState([])
  // const [rows, setRows] = useState([]);
  useEffect(() => {
    data.map((item) => {
      setRows(rows => [...rows, createData(item.id,item.symbole, item.operation, item.date, item.size, item.open, item.amount_open, item.close, item.amount_close, item.pnl)]);
      // setRows([...rows,createData(item.symbole, item.operation, item.date, item.size, item.open, item.amount_open, item.close, item.amount_close, item.pnl)])
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
  { id: 'symbole', numeric: true, disablePadding: false, label: 'Symbole' },
  { id: 'operation', numeric: false, disablePadding: false, label: 'Operation' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
  { id: 'open', numeric: false, disablePadding: false, label: 'Open' },
  { id: 'amount_open', numeric: false, disablePadding: false, label: 'Amount Open' },
  { id: 'close', numeric: false, disablePadding: false, label: 'Close' },
  { id: 'amount_close', numeric: false, disablePadding: false, label: 'Amount Close' },
  { id: 'pnl', numeric: false, disablePadding: false, label: 'Pnl' },
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
const [orderBy, setOrderBy] = React.useState('symbole');
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
    const newSelecteds = rows.map((n) => n.symbole);
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



const isSelected = (symbole) => selected.indexOf(symbole) !== -1;

// Avoid a layout jump when reaching the last page with empty rows.
const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      console.log(row.symbole);
      return row.symbole.toLowerCase().includes(searchedVal.toLowerCase());
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

  var csvBuilder = new CsvBuilder("Stock Manager.csv")
  .setColumns(headCells.map(col=>col.label))
  .addRows(rows.map(row=>{
    return headCells.map(col=>row[col.id])
    }))
  .exportFile();
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
                      Stock Manager
                    </h1>

                  </div>
                  <div className="col-auto">
                      
                    <p className="btn text-secondary ms-2"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">
                      Add new Operation
                    </p>

                    <p className="btn btn-gray-theme ms-2" onClick={() => exportToCsv()} >
                      Save Data
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
                  <div className="card-header p-0">
                    <div className="row align-items-center">
                      <div className="col">

                      <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />

                      </div>
                     
                   
                    </div>
                  </div>
                  {/* <EnhancedTable /> */}
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
                  const isItemSelected = isSelected(row.symbole);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.symbole)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
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
                        <Link to={`/${row.symbole}`} className="item-name text-reset">{row.symbole}</Link>
                      </TableCell>
                      <TableCell align="center">{row.operation}</TableCell>
                      <TableCell align="center">{moment(row.created_at).format('D/MM/YYYY')}</TableCell>
                      <TableCell align="center">{formatter.format(row.size)}</TableCell>
                      <TableCell align="center">{formatter.format(row.open)}</TableCell>
                      <TableCell align="center">{formatter.format(row.amount_open)}</TableCell>
                      <TableCell align="center">{formatter.format(row.close)}</TableCell>
                      <TableCell align="center">{formatter.format(row.amount_close)}</TableCell>
                      <TableCell align="center">
                        <span className={`item-location ${row.pnl > 0 ? 'text-success' : 'text-danger'}`}>{formatter.format(row.pnl)}</span>
                      </TableCell>
                      <TableCell align="center">
                        

                      <div className="dropdown">
                              <a className="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fe fe-more-horizontal"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <button className="dropdown-item"  data-bs-toggle="modal" data-bs-target={`#exampleModalClose${row.id}`} data-bs-whatever="@fat">
                                  Add close action
                                </button>
                                <button className="dropdown-item"  data-bs-toggle="modal" data-bs-target={`#exampleWatchlist${row.id}`} data-bs-whatever="@fat">
                                  Add to watchlist
                                </button>
                              </div>
                            </div>

                            <div className="modal fade" id={`exampleModalClose${row.id}`} tabindex="-1" aria-labelledby={`exampleModalLabelClose${row.id}`} aria-hidden="true">
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h4 className="modal-title" id={`exampleModalLabelClose${row.id}`}>Add close action</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>

                                    <form onSubmit={(e)=>handleCloseAction(e, row.id)}>

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

                          
                      </TableCell>


                    </TableRow>
                  );
                })}
              
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
                  {/* <div className="table-responsive ">
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

                            <span className="item-location">{formatter.format(item.open)}</span>

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
                  </div> */}
                  {/* <div className="card-footer d-flex justify-content-end">

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

                  </div> */}
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