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




import CheckboxTreeComponent from './components/Tree/CheckboxTreeComponent';

//ApplicationRoleUser
import ListApplicationUsersComponent from './components/ApplicationUsers/ListApplicationUsersComponent';
import UpdateAppUserRolesComponent from './components/ApplicationUsers/UpdateAppUserRolesComponent';

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
                    <ButtonGroup aria-label="bids">
                      <Button
                        size="lg"
                        variant="warning"
                        href="/bidUser"><i class="fa-solid fa-bars"></i> Мои заявки
                      </Button>
                      <Button
                        size="lg"
                        variant="success"
                        href="/bidOpenUser"><i class="fa-solid fa-unlock"></i> Открытые заявки
                      </Button>
                      <Button
                        size="lg"
                        variant="danger"
                        href="/bidCloseUser"><i class="fa-solid fa-lock"></i> Закрытые заявки
                      </Button>
                    </ButtonGroup>
                  </>
                  )}

                  {showModeratorBoard && (
                    <>
                      <ButtonGroup aria-label="CounterParty">
                        <Button
                          size="lg"
                          variant="warning"
                          href="/project"
                        >
                       <i class="fa-solid fa-list-check"></i> Проекты
                        </Button>
                      </ButtonGroup>
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                      <ButtonGroup aria-label="Bids">
                        <Button size="lg" variant="primary" href="/bid">
                        <i class="fa-solid fa-solid fa-border-all"></i> Все заявки
                        </Button>
                        <Button size="lg" variant="danger" href="/closebid">
                        <i class="fa-solid fa-circle-xmark"></i> Закрытые заявки
                        </Button>
                        <Button size="lg" variant="success" href="/openbid">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Открытые заявки
                        </Button>
                      </ButtonGroup>
                      <div>&nbsp;</div>
                      <div>&nbsp;</div>
                      <ButtonGroup aria-label="Employee">
                        <Button size="lg" variant="info" href="/configuration">
                        <i class="fa-solid fa-desktop"></i>{" "}
                          Конфигурация
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
                              <i className="fa-solid fa-bars"></i> Справочники
                            </span>
                          }
                        >
                          <Dropdown.Item href="/typeproject">Типы проектов</Dropdown.Item>
                          <Dropdown.Item href="/typepriority">Приоритеты</Dropdown.Item>
                          <Dropdown.Item href="/typecriticality">Критичность</Dropdown.Item>
                          <Dropdown.Item href="/status">Статусы</Dropdown.Item>
                          <Dropdown.Item href="/typedisk">Типы диска</Dropdown.Item>
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

                    <button
                      type="button"
                      className="nav-link btn btn-success px-3 me-2"
                      onClick={() => {
                        window.location.href = '/profile';
                      }}
                    ><i class="fa-solid fa-user"></i> Профиль</button>

                    <button
                      type="button"
                      className="nav-link btn btn-danger px-3 me-2"
                      onClick={() => {
                        this.logOut();
                        window.location.href = '/login';
                      }}
                    ><i class="fa-solid fa-arrow-right-from-bracket"></i> Выход</button>

                  
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <button
                      type="button"
                      className="nav-link btn btn-success px-3 me-2"
                      onClick={() => {
                        window.location.href = '/login';
                      }}
                    >Войти</button>
                    <button
                      type="button"
                      className="nav-link btn btn-danger px-3 me-2"
                      onClick={() => {
                        window.location.href = '/register';
                      }}
                    >
                      Регистрация
                    </button>
                  </div>)}
              </div>
            </div>
          </nav>
        
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

           
         
              <Route path="/users" component = {ListApplicationUsersComponent}></Route>
              <Route path="/update-roleuser/:id" component = {UpdateAppUserRolesComponent}></Route>

              <Route path="/tree" component = {CheckboxTreeComponent}></Route>

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
