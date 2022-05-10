

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import SideBar from "../../layouts/SideBar";
import DataWatchlist from "../../components/DataWatchlist";
import axios from 'axios';


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


const Watchlist = () => {

    // const  [data,setData] = useState(''); 
    // const [isloading, setIsLoading] = useState(true);

    const [dataWatchlist, setDataWatchlist] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [watchlistInfo, setWatchlistInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingWatchlist, setIsLoadingWatchlist] = useState(true);

    
    const fetchDataWatchList = () => {
        setTimeout(() => {
        fetch('http://127.0.0.1:8000/api/watchlist/'+JSON.parse(localStorage.getItem('auth_user')).id)
        .then(async response =>{
            
            const varr = await response.json()
            
            setWatchlist(varr);
            setIsLoadingWatchlist(false);
            console.log(varr);
            // watchList(varr[1].id);
            getOneWatchlist(varr[0].id);
        }).catch(err=>{
            setIsLoadingWatchlist(false);
            console.log('faild to fetch');
        })

        }, 1000);
    }

    useEffect( () => {
      fetchDataWatchList()
  },[]);

  // get one watchlist
  const getOneWatchlist = (id) => {
    console.log("id",id);
    fetch(`http://127.0.0.1:8000/api/watchlistgetone/${id}`)
    .then(async response =>{
      setWatchlistInfo(await response.json());
      // setIsLoading(false);
      console.log(watchlistInfo);
    }).catch(err=>{
      // setIsLoading(false);
      console.log('faild to fetch');
    })
  }




  const [rows , setRows ] = useState([]);

    function watchList(id) {
     
      setIsLoading(true);

      getOneWatchlist(id);
      setRows([]);
    
        setTimeout(() => {
        fetch('http://127.0.0.1:8000/api/liststock/'+ id)
        .then(async response =>{
            
          const varr = await response.json()
          
            console.log(varr);
            setDataWatchlist(varr);
            setIsLoading(false);
            fetchDataWatchList();
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
              user_id : JSON.parse(localStorage.getItem('auth_user')).id
              
            }
          
          console.log(form_data);
          // setTimeout(() => {
            
          axios.post('http://127.0.0.1:8000/api/watchlist',form_data
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
    dataWatchlist.map(item => {
      setRows(rows => [...rows, createData(item.id, item.name, item.symbole, item.price, item.premarket, item.day, item.week, item.month, item.trimister, item.yearslow, item.yearshigh)])
    })
  }, [dataWatchlist]);


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
                <div className="row align-items-center mb-4">
                  <div className="col">

                    <h1 className="header-title  text-truncate">
                      Watchlist
                    </h1>

                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col">

                 {isLoadingWatchlist && <tr className="text-center"><td colspan="11" className="py-5"><p >Loading ...</p></td></tr>}
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
                    <p className="btn btn-gray-theme ms-2" onClick={() => exportToCsv()} >
                      Save Data
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
                <div className="row align-items-center">
                  <div className="col">
                  <p className="text-secondary ms-2">
                      {watchlistInfo.description}
                    </p>
                    <p className="text-dark ms-2">
                      Note : 
                    <span className="text-secondary ms-2">
                      
                      {watchlistInfo.note}
                    </span>
                      </p>
                    
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

                  {/* <MaterialTable
                    title="Employee Data"
                    data={rows}
                    columns={headCells}
                  /> */}


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




    
                  {/* <div className="table">
                    <table id='myTable' className="table table-sm table-hover table-nowrap card-table">
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

export default Watchlist;