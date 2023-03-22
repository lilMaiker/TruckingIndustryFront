import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style.css";
import "./bootstrap.min.css";
import "react-widgets/styles.css";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Auththorization from "./components/Auththorization";

//TypeCargo
import ListTypeCargos from "./components/TypeCargo/ListTypeCargosComponent";
import CreateTypeCargo from "./components/TypeCargo/CreateTypeCargoComponent";
import ViewTypeCargo from "./components/TypeCargo/ViewTypeCargoComponent";
import UpdateTypeCargo from "./components/TypeCargo/UpdateTypeCargoComponent";

//Status
import ListStatusComponent from './components/Status/ListStatusComponent';
import CreateStatusComponent from './components/Status/CreateStatusComponent';
import ViewStatusComponent from './components/Status/ViewStatusComponent';
import UpdateStatusComponent from './components/Status/UpdateStatusComponent';

//Positions
import ListPositionsComponent from './components/Position/ListPositionsComponent';
import CreatePositionComponent from './components/Position/CreatePositionComponent';
import ViewPositionComponent from './components/Position/ViewPositionComponent';
import UpdatePositionComponent from './components/Position/UpdatePositionComponent';

//Currency
import ListCurrencysComponent from './components/Currency/ListCurrencysComponent';
import CreateCurrencyComponent from './components/Currency/CreateCurrencyComponent';
import ViewCurrencyComponent from './components/Currency/ViewCurrencyComponent';
import UpdateCurrencyComponent from './components/Currency/UpdateCurrencyComponent';

//Employee
import ListEmployeesComponent from './components/Employee/ListEmployeesComponent';
import CreateEmployeeComponent from './components/Employee/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/Employee/ViewEmployeeComponent';
import UpdateEmployeeComponent from './components/Employee/UpdateEmployeeComponent';

//Cars
import ListCarComponent from './components/Car/ListCarComponent';
import CreateCarComponent from './components/Car/CreateCarComponent';
import ViewCarComponent from './components/Car/ViewCarComponent';
import UpdateCarComponent from './components/Car/UpdateCarComponent';

//Clients
import ListClientComponent from './components/Client/ListClientComponent';
import CreateClientComponent from './components/Client/CreateClientComponent';
import ViewClientComponent from './components/Client/ViewClientComponent';
import UpdateClientComponent from './components/Client/UpdateClientComponent';

//Foundation
import ListFoundationComponent from './components/Foundation/ListFoundationComponent';
import CreateFoundationComponent from './components/Foundation/CreateFoundationComponent';
import ViewFoundationComponent from './components/Foundation/ViewFoundationComponent';
import UpdateFoundationComponent from './components/Foundation/UpdateFoundationComponent';

//Bid
import ListBidComponent from './components/Bid/ListBidComponent';
import CreateBidComponent from './components/Bid/CreateBidComponent';
import ViewBidComponent from './components/Bid/ViewBidComponent';
import UpdateBidComponent from './components/Bid/UpdateBidComponent';

//Route 
import ListRouteComponent from './components/Route/ListRouteComponent';
import CreateRouteComponent from './components/Route/CreateRouteComponent';
import ViewRouteComponent from './components/Route/ViewRouteComponent';
import UpdateRouteComponent from './components/Route/UpdateRouteComponent';
import ListRoutesForBidComponent from './components/Route/ListRoutesForBidComponent';

//Expense
import ListExpenseComponent from './components/Expense/ListExpenseComponent';
import CreateExpenseComponent from './components/Expense/CreateExpenseComponent';
import ViewExpenseComponent from './components/Expense/ViewExpenseComponent';
import UpdateExpenseComponent from './components/Expense/UpdateExpenseComponent';
import ListExpensesForBidComponent from './components/Expense/ListExpensesForBidComponent';

//Cargo
import ListCargoComponent from './components/Cargo/ListCargoComponent';
import CreateCargoComponent from './components/Cargo/CreateCargoComponent';
import ViewCargoComponent from './components/Cargo/ViewCargoComponent';
import UpdateCargoComponent from './components/Cargo/UpdateCargoComponent';
import ListCargoForBidComponent from './components/Cargo/ListCargoForBidComponent';

//ApplicationRoleUser
import ListApplicationUsersComponent from './components/ApplicationUsers/ListApplicationUsersComponent';
import UpdateAppUserRolesComponent from './components/ApplicationUsers/UpdateAppUserRolesComponent';

import GoogleMapComponent from "./components/GoogleMaps/GoogleMapFunc";
import GoogleMapRouteComponent from "./components/GoogleMaps/GoogleMapFuncRoute";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showDefUserBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.role.includes("Moderator"),
        showAdminBoard: user.role.includes("Administrator"),
        showDefUserBoard: user.role.includes("Viewer"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      showDefUserBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const {
      currentUser,
      showModeratorBoard,
      showAdminBoard,
      showDefUserBoard,
    } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand me-2" href="/">
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Переключатель навигации"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {showDefUserBoard && (
                    <>
                    <ButtonGroup aria-label="CounterParty">
                      <Button
                        size="lg"
                        variant="warning"
                        href="/client"
                      >
                        <i class="fa-solid fa-user"></i> Клиенты
                      </Button>
                      <Button size="lg" variant="warning" href="/foundation">
                        <i class="fa-solid fa-money-check-dollar"></i>{" "}
                        Организации
                      </Button>
                    </ButtonGroup>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                   
                    <ButtonGroup aria-label="Employee">
                      <Button size="lg" variant="info" href="/position">
                        <i class="fa-sharp fa-solid fa-address-card"></i>{" "}
                        Должности
                      </Button>
                     
                      <Button size="lg" variant="info" href="/employee">
                        <i class="fa-solid fa-image-portrait"></i> Сотрудники
                      </Button>
                      <DropdownButton
                        size="lg"
                        variant="secondary"
                        id="dropdown-basic-button"
                        title={
                          <span>
                            <i className="fa-solid fa-bars"></i> Типы
                          </span>
                        }
                      >
                        <Dropdown.Item href="/typecargos">Типы грузов</Dropdown.Item>
                        <Dropdown.Item href="/status">Статусы</Dropdown.Item>
                        <Dropdown.Item href="/currency">Валюты</Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>{" "}
                  </>
                  )}

                  {showModeratorBoard && (
                    <>
                      <ButtonGroup aria-label="CounterParty">
                        <Button
                          size="lg"
                          variant="warning"
                          href="/client"
                        >
                          <i class="fa-solid fa-user"></i> Клиенты
                        </Button>
                        <Button size="lg" variant="warning" href="/foundation">
                          <i class="fa-solid fa-money-check-dollar"></i>{" "}
                          Организации
                        </Button>
                      </ButtonGroup>
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                      <ButtonGroup aria-label="Bids">
                        <Button size="lg" variant="primary" href="/bid">
                          <i class="fa-solid fa-diagram-project"></i> Заявки
                        </Button>
                        <Button size="lg" variant="danger" href="/expense">
                        <i class="fa-solid fa-wallet"></i> Затраты
                        </Button>
                      </ButtonGroup>
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                      <ButtonGroup aria-label="Cars">
                      <Button size="lg" variant="dark" href="/cargo">
                      <i class="fa-solid fa-truck-ramp-box"></i>  Груз
                        </Button>
                        <Button size="lg" variant="dark" href="/car">
                        <i class="fa-solid fa-truck"></i> Транспорт
                        </Button>
                        <Button size="lg" variant="success" href="/route">
                        <i class="fa-solid fa-route"></i> Маршруты
                        </Button>
                        <Button size="lg"variant="success" href="/googlemaps"><i class="fa-solid fa-map-location-dot"></i> Карта
                        </Button>
                      </ButtonGroup>
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                      <ButtonGroup aria-label="Employee">
                        <Button size="lg" variant="info" href="/position">
                          <i class="fa-sharp fa-solid fa-address-card"></i>{" "}
                          Должности
                        </Button>
                       
                        <Button size="lg" variant="info" href="/employee">
                          <i class="fa-solid fa-image-portrait"></i> Сотрудники
                        </Button>
                        <DropdownButton
                          size="lg"
                          variant="secondary"
                          id="dropdown-basic-button"
                          title={
                            <span>
                              <i className="fa-solid fa-bars"></i> Типы
                            </span>
                          }
                        >
                          <Dropdown.Item href="/typecargos">Типы грузов</Dropdown.Item>
                          <Dropdown.Item href="/status">Статусы</Dropdown.Item>
                          <Dropdown.Item href="/currency">Валюты</Dropdown.Item>
                        </DropdownButton>
                      </ButtonGroup>{" "}
                    </>
                  )}

{showAdminBoard && (<div> <Button size="lg" variant="light" href="/users">
                        <i class="fa-solid fa-users"></i> Пользователи
                        </Button></div>)}

                  {/* {currentUser && (
          <li className="nav-item">
            <Link to={"/user"} className="nav-link">Панель пользователя</Link>
          </li>)} */}
                </ul>

                {currentUser ? (
                  <div className="d-flex align-items-center">
                    <Link
                      to={"/profile"}
                      className="nav-link btn btn-info px-3 me-2"
                    >
                      <button type="submit">{currentUser.username}</button>
                    </Link>
                    <Link
                      to={"/login"}
                      className="nav-link btn btn-primary me-3"
                    >
                      <button type="submit" to="/login" onClick={this.logOut}>
                        Выйти
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <Link
                      to={"/login"}
                      className="nav-link btn btn-info px-3 me-2"
                    >
                      <button type="submit">Войти</button>
                    </Link>
                    <Link
                      to={"/register"}
                      className="nav-link btn btn-primary me-3"
                    >
                      <button type="submit">Регистрация</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
          <div>
            <Switch>
              <Route path="/googlemaps" component={GoogleMapComponent}></Route>
              <Route path="/googleroute/:original&:dest" component={GoogleMapRouteComponent}></Route>
            </Switch>
          </div>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/auth" component={Auththorization}></Route>

              <Route path="/typecargos" component={ListTypeCargos}></Route>
              <Route path="/add-typecargo" component={CreateTypeCargo}></Route>
              <Route path="/update-typecargo/:id" component={UpdateTypeCargo}></Route>

             
              <Route path="/status" component = {ListStatusComponent}></Route>
              <Route path="/add-status" component = {CreateStatusComponent}></Route>
              <Route path="/update-status/:id" component = {UpdateStatusComponent}></Route>
              <Route path="/view-status/:id" component = {ViewStatusComponent}></Route>

              <Route path="/position" component = {ListPositionsComponent}></Route>
              <Route path="/add-position" component = {CreatePositionComponent}></Route>
              <Route path="/update-position/:id" component = {UpdatePositionComponent}></Route>
              <Route path="/view-position/:id" component = {ViewPositionComponent}></Route>

              <Route path="/currency" component = {ListCurrencysComponent}></Route>
              <Route path="/add-currency" component = {CreateCurrencyComponent}></Route>
              <Route path="/update-currency/:id" component = {UpdateCurrencyComponent}></Route>
              <Route path="/view-currency/:id" component = {ViewCurrencyComponent}></Route>

              <Route path="/employee" component = {ListEmployeesComponent}></Route>
              <Route path="/add-employee" component = {CreateEmployeeComponent}></Route>
              <Route path="/update-employee/:id" component = {UpdateEmployeeComponent}></Route>
              <Route path="/view-employee/:id" component = {ViewEmployeeComponent}></Route>

              <Route path="/car" component = {ListCarComponent}></Route>
              <Route path="/add-car" component = {CreateCarComponent}></Route>
              <Route path="/update-car/:id" component = {UpdateCarComponent}></Route>
              <Route path="/view-car/:id" component = {ViewCarComponent}></Route>

              <Route path="/client" component = {ListClientComponent}></Route>
              <Route path="/add-client" component = {CreateClientComponent}></Route>
              <Route path="/update-client/:id" component = {UpdateClientComponent}></Route>
              <Route path="/view-client/:id" component = {ViewClientComponent}></Route>


              <Route path="/foundation" component = {ListFoundationComponent}></Route>
              <Route path="/add-foundation" component = {CreateFoundationComponent}></Route>
              <Route path="/update-foundation/:id" component = {UpdateFoundationComponent}></Route>
              <Route path="/view-foundation/:id" component = {ViewFoundationComponent}></Route>

              <Route path="/bid" component = {ListBidComponent}></Route>
              <Route path="/add-bid" component = {CreateBidComponent}></Route>
              <Route path="/update-bid/:id" component = {UpdateBidComponent}></Route>
              <Route path="/view-bid/:id" component = {ViewBidComponent}></Route>

              <Route path="/route" component = {ListRouteComponent}></Route>
              <Route path="/add-route" component = {CreateRouteComponent}></Route>
              <Route path="/update-route/:id" component = {UpdateRouteComponent}></Route>
              <Route path="/view-route/:id" component = {ViewRouteComponent}></Route>
              <Route path="/route-bid/:id" component = {ListRoutesForBidComponent}></Route>

              <Route path="/expense" component = {ListExpenseComponent}></Route>
              <Route path="/add-expense" component = {CreateExpenseComponent}></Route>
              <Route path="/update-expense/:id" component = {UpdateExpenseComponent}></Route>
              <Route path="/view-expense/:id" component = {ViewExpenseComponent}></Route>
              <Route path="/expense-bid/:id" component = {ListExpensesForBidComponent}></Route>

              <Route path="/cargo" component = {ListCargoComponent}></Route>
              <Route path="/add-cargo" component = {CreateCargoComponent}></Route>
              <Route path="/update-cargo/:id" component = {UpdateCargoComponent}></Route>
              <Route path="/view-cargo/:id" component = {ViewCargoComponent}></Route>
              <Route path="/cargo-bid/:id" component = {ListCargoForBidComponent}></Route>

              <Route path="/users" component = {ListApplicationUsersComponent}></Route>
              <Route path="/update-roleuser/:id" component = {UpdateAppUserRolesComponent}></Route>

            </Switch>
          </div>
         
          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
