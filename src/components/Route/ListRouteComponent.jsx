import React, { Component } from "react";
import RouteService from "../../services/RouteService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListRouteComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addRoute = this.addRoute.bind(this);
    this.editRoute = this.editRoute.bind(this);
    this.deleteRoute = this.deleteRoute.bind(this);
    this.viewMap = this.viewMap.bind(this);
  }

  viewMap(original, dest) {
    this.props.history.push(`/googleroute/${original}&${dest}`);
    window.location.reload();
  }

  deleteRoute(id) {
    RouteService.deleteRoute(id)
      .then((res) => {
        this.setState({
          route: this.state.route.filter(
            (route) => route.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editRoute(id) {
    this.props.history.push(`/update-route/${id}`);
    window.location.reload();
  }

  addRoute() {
    this.props.history.push("/add-route");
    window.location.reload();
  }

  componentDidMount() {
    RouteService.getRoute()
      .then((res) => {
        this.setState({
          route: res.data,
          loading: true,
          statusCode: res.status,
          isDelete: 0,
          render: true,
        });
      })
      .catch((error) => {
        this.setState({ loading: false, statusCode: error.response.status });
      });
  }

  render() {
    if (
      !this.state.render &&
      !this.state.loading &&
      this.state.statusCode !== 401
    ) {
      return (
        <div
          style={{
            position: "fixed",
            bottom: 450,
            right: 1000,
            margin: "auto",
          }}
        >
          <HashLoader color={"#fff"} size={250} />
        </div>
      );
    }

    if (!this.state.loading && this.state.statusCode === 401) {
      return (
        <Alert variant="danger">
          <Alert.Heading>
            У вас нет прав для просмотра этой страницы.
          </Alert.Heading>
          <p>Возможно, возникли проблемы на стороне сервера.</p>
          <hr />
          <p className="mb-0">Обратитесь к администратору.</p>
        </Alert>
      );
    }
//class="w-25"
    if (this.state.statusCode === 200) {
      return (
        <div className="container">
          <header className="jumbotron">
            <h2 class="mb-5">Маршруты</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addRoute}>
                <i className="fa-solid fa-plus"></i> Добавить Маршрут
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col" >Пункт А</th>
                    <th scope="col">Пункт Б</th>
                    <th scope="col" >№ Заявки</th> 
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.route.map((route) => (
                    <>
                      <tr key={route.id}>
                        <td> {route.pointA} </td>
                        <td> {route.pointB} </td>
                        <td> {route.bidsId} </td>

                        <td>
                          <button
                            onClick={() => this.viewMap(route.pointA, route.pointB)}
                            className="btn btn-success"><i class="fa-solid fa-route"></i> Отобразить
                          </button>
                          <button
                           style={{ marginLeft: "10px" }}
                            onClick={() => this.editRoute(route.id)}
                            className="btn btn-info"><i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteRoute(route.id)}
                            className="btn btn-danger"><i className="fa-solid fa-trash"></i> Удалить
                          </button>
                        </td>
                      </tr>
                      <tr class="spacer">
                        <td colspan="100"></td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>

              {this.state.isDelete === 1 && (
                <div>
                  {" "}
                  <Alert variant="success">
                    <Alert.Heading>Удаление прошло успешно.</Alert.Heading>
                    <p>Если возникнут проблемы обращайтесь к администратору!</p>
                  </Alert>
                </div>
              )}

              {this.state.isDelete === 2 && (
                <div>
                  {" "}
                  <Alert variant="danger">
                    <Alert.Heading>Возникла ошибка при удалении.</Alert.Heading>
                    <p></p>
                  </Alert>
                </div>
              )}
            </div>
          </header>
        </div>
      );
    }
  }
}

export default ListRouteComponent;