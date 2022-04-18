import { Link } from "react-router-dom";
import NavBar from "../../layouts/NavBar";
import SideBar from "../../layouts/SideBar";


const Dashboard = () => {

    return (
<div className="flex h-full">
    
    <SideBar></SideBar>

    <div class="main-content">


      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">

            <div class="header">
              <div class="header-body border-0">
                <div class="row align-items-center">
                  <div class="col">

                    <h1 class="header-title  text-truncate">
                      Stock
                    </h1>

                  </div>
                  <div class="col-auto">

                    <a href="#!" class="btn text-secondary ms-2">
                      Add to Watchlist
                    </a>

                    <a href="#!" class="btn btn-gray-theme ms-2">
                      Save Data
                    </a>

                  </div>
                </div>
             
              </div>
            </div>

            <div class="tab-content">
              <div class="tab-pane fade show active" id="companiesListPane" role="tabpanel" aria-labelledby="companiesListTab">

                <div class="card" data-list='{"valueNames": ["item-name", "item-industry", "item-location", "item-owner", "item-created"], "page": 10, "pagination": {"paginationClass": "list-pagination"}}' id="companiesList">
                  <div class="card-header">
                    <div class="row align-items-center">
                      <div class="col">

                        <form>
                          <div class="input-group input-group-flush input-group-merge input-group-reverse">
                            <input class="form-control list-search" type="search" placeholder="Search" />
                            <span class="input-group-text">
                              <i class="fe fe-search"></i>
                            </span>
                          </div>
                        </form>

                      </div>
                     
                   
                    </div> 
                  </div>
                  <div class="table-responsive ">
                    <table class="table table-sm table-hover table-nowrap card-table">
                      <thead>
                        <tr>
                          <th>

                            <div class="form-check mb-n2">
                              <input class="form-check-input list-checkbox-all" type="checkbox" id="listCheckboxAll"/>
                              <label class="form-check-label" for="listCheckboxAll"></label>
                            </div>

                          </th>
                          <th>
                            <a class="list-sort text-muted" data-sort="item-name" href="#">Company</a>
                          </th>
                          <th  class="text-center">
                            <a class="list-sort text-muted" data-sort="item-industry" href="#">Price</a>
                          </th>
                          <th  class="text-center">
                            <a class="list-sort text-muted" data-sort="item-location" href="#">Pre market</a>
                          </th>
                          <th  class="text-center">
                            <a class="list-sort text-muted" data-sort="item-owner" href="#">Day</a>
                          </th>
                          <th   class="text-center">
                            <a class="list-sort text-muted" data-sort="item-created" href="#">Week</a>
                          </th>
                          <th   class="text-center">
                            <a class="list-sort text-muted" data-sort="item-created" href="#">Month</a>
                          </th>
                          <th   class="text-center">
                            <a class="list-sort text-muted" data-sort="item-created" href="#">Trimister</a>
                          </th>
                          <th   class="text-center">
                            <a class="list-sort text-muted" data-sort="item-created" href="#">52 week high</a>
                          </th>
                          <th   class="text-center">
                            <a class="list-sort text-muted" data-sort="item-created" href="#">52 week low</a>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="list fs-base">

                        <tr>
                          <td>

                            <div class="form-check">
                              <input class="form-check-input list-checkbox" type="checkbox" id="listCheckboxOne"/>
                              <label class="form-check-label" for="listCheckboxOne"></label>
                            </div>

                          </td>
                          <td>

                            {/* <div class="avatar avatar-xs align-middle me-2">
                              <img class="avatar-img rounded-circle" src="assets/img/avatars/teams/team-logo-1.jpg" alt="..."/>
                            </div>  */}
                            <a class="item-name text-reset" href="team-overview.html">Launchday</a>

                          </td>
                          <td class="text-center">

                            <span class="item-industry">$ 122.29</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-end">

                            <div class="dropdown">
                              <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fe fe-more-horizontal"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a href="#!" class="dropdown-item">
                                  Action
                                </a>
                                <a href="#!" class="dropdown-item">
                                  Another action
                                </a>
                                <a href="#!" class="dropdown-item">
                                  Something else here
                                </a>
                              </div>
                            </div>

                          </td>
                        </tr>
                        <tr>
                          <td>

                            <div class="form-check">
                              <input class="form-check-input list-checkbox" type="checkbox" id="listCheckboxTwo"/>
                              <label class="form-check-label" for="listCheckboxTwo"></label>
                            </div>

                          </td>
                          <td>

                            <div class="avatar avatar-xs align-middle me-2">
                              <img class="avatar-img rounded-circle" src="assets/img/avatars/teams/team-logo-1.jpg" alt="..."/>
                            </div> <a class="item-name text-reset" href="team-overview.html">Launchday</a>

                          </td>
                          <td class="text-center">

                            <span class="item-industry">$ 122.29</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-end">

                            <div class="dropdown">
                              <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fe fe-more-horizontal"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a href="#!" class="dropdown-item">
                                  Action
                                </a>
                                <a href="#!" class="dropdown-item">
                                  Another action
                                </a>
                                <a href="#!" class="dropdown-item">
                                  Something else here
                                </a>
                              </div>
                            </div>

                          </td>
                        </tr>
                        <tr>
                          <td>

                            <div class="form-check">
                              <input class="form-check-input list-checkbox" type="checkbox" id="listCheckboxOne"/>
                              <label class="form-check-label" for="listCheckboxOne"></label>
                            </div>

                          </td>
                          <td>

                            <div class="avatar avatar-xs align-middle me-2">
                              <img class="avatar-img rounded-circle" src="assets/img/avatars/teams/team-logo-1.jpg" alt="..."/>
                            </div> <a class="item-name text-reset" href="team-overview.html">Launchday</a>

                          </td>
                          <td class="text-center">

                            <span class="item-industry">$ 122.29</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-center">

                            <span class="item-location">$ 112</span>

                          </td>
                          <td class="text-end">

                            <div class="dropdown">
                              <a class="dropdown-ellipses dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fe fe-more-horizontal"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a href="#!" class="dropdown-item">
                                  Action
                                </a>
                                <a href="#!" class="dropdown-item">
                                  Another action
                                </a>
                                <a href="#!" class="dropdown-item">
                                  Something else here
                                </a>
                              </div>
                            </div>

                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <div class="card-footer d-flex justify-content-end">

                    <ul class="list-pagination-prev pagination pagination-tabs card-pagination">
                      <li class="page-item">
                        <a class="page-link ps-0 pe-4 " href="#">
                          <i class="fe fe-arrow-left me-1"></i> Previous
                        </a>
                      </li>
                    </ul>

                    <ul class="list-pagination pagination pagination-tabs card-pagination"></ul>

                    <ul class="list-pagination-next pagination pagination-tabs card-pagination">
                      <li class="page-item">
                        <a class="page-link ps-4 pe-0 " href="#">
                          Next <i class="fe fe-arrow-right ms-1"></i>
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

export default Dashboard;