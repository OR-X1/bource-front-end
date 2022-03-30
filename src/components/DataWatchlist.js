import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


const DataWatchlist = (props) => {

    const Watchlist = props.dataWatchlist;
    const isLoading = props.dataLoading;
    return (

        <tbody className="list fs-base">
      
      {isLoading && <tr className="text-center"><td colspan="11" className="py-5"><p ><Spinner animation="border" /></p></td></tr>}
                    {Watchlist.map((item)=>(
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
                            </div> <Link className="item-name text-reset"  to={`/stock/${item.symbole}`} >{item.name}</Link>

                          </td>
                          <td className="text-center">

                            <span className="item-industry">{item.price}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.preMarket}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.price}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.price}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.preMarket_Yesterday}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.open_Yesterday}</span>

                          </td>
                          <td className="text-center">

                            <span className="item-location">{item.close_Yesterday}</span>

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
                     
    );
}

export default DataWatchlist;