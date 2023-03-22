import React, { Component } from "react";
import CargoService from "../../services/CargoService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListCargoForBidComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
        id: this.props.match.params.id,
      cargo: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
      sortColumn: "nameCargo",
      sortDirection: "asc",
    };
    this.addCargo = this.addCargo.bind(this);
    this.editCargo = this.editCargo.bind(this);
    this.deleteCargo = this.deleteCargo.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  deleteCargo(id) {
    CargoService.deleteCargo(id)
      .then((res) => {
        this.setState({
          cargo: this.state.cargo.filter(
            (cargo) => cargo.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editCargo(id) {
    this.props.history.push(`/update-cargo/${id}`);
    window.location.reload();
  }

  addCargo() {
    this.props.history.push("/add-cargo");
    window.location.reload();
  }

  componentDidMount() {
    CargoService.getCargoByIdBid(this.state.id)
      .then((res) => {
        this.setState({
          cargo: res.data,
          loading: true,
          statusCode: res.status,
          isDelete: 0,
          render: true,
          sortColumn: "nameCargo",
        sortDirection: "asc"
        });
      })
      .catch((error) => {
        console.error("Код ошибки " + error.response.status);
        this.setState({ loading: false, statusCode: error.response.status });
      });
  }

  handleSort(column) {
    if (column === this.state.sortColumn) {
      // если пользователь щелкнул на уже выбранном столбце, измените направление сортировки
      this.setState({
        sortDirection: this.state.sortDirection === "asc" ? "desc" : "asc",
      }, () => this.sortCargo()); // вызовите sortCargo() после установки состояния
    } else {
      // если пользователь щелкнул на другом столбце, установите его в качестве текущего столбца сортировки
      this.setState({
        sortColumn: column,
        sortDirection: "asc",
      }, () => this.sortCargo()); // вызовите sortCargo() после установки состояния
    }
  }
  

    sortCargo() {
        const { cargo, sortColumn, sortDirection } = this.state;
        // создайте копию массива грузов и отсортируйте его в соответствии с выбранным столбцом и направлением сортировки
const sortedCargo = [...cargo].sort((a, b) => {
    if (sortColumn === "nameCargo") {
    return sortDirection === "asc"
    ? a.nameCargo.localeCompare(b.nameCargo)
    : b.nameCargo.localeCompare(a.nameCargo);
    } else if (sortColumn === "typeCargo.nameTypeCargo") {
    return sortDirection === "asc"
    ? a.typeCargo.nameTypeCargo.localeCompare(b.typeCargo.nameTypeCargo)
    : b.typeCargo.nameTypeCargo.localeCompare(a.typeCargo.nameTypeCargo);
    } else if (sortColumn === "weightCargo") {
    return sortDirection === "asc"
    ? a.weightCargo - b.weightCargo
    : b.weightCargo - a.weightCargo;
    } else if (sortColumn === "bidsId") {
    return sortDirection === "asc"
    ? a.bidsId - b.bidsId
    : b.bidsId - a.bidsId;
    } else {
    return 0;
    }
    });

    // обновите состояние компонента с отсортированным массивом грузов
this.setState({
    cargo: sortedCargo,
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

    if (this.state.statusCode === 200) {
      return (
        <div className="container">
          <header className="jumbotron">
            <h2 class="mb-5">Груз по заявке №{this.state.id}</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addCargo}>
                <i className="fa-solid fa-plus"></i> Добавить Груз
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                  <th onClick={() => this.handleSort("nameCargo")}>Название груза</th>
                  <th onClick={() => this.handleSort("weightCargo")}>Вес, кг</th>
                    <th onClick={() => this.handleSort("nameTypeCargo")}>Тип Груза</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cargo.map((cargo) => (
                    <>
                      <tr key={cargo.id}>
                        <td> {cargo.nameCargo} </td>
                        <td> {cargo.weightCargo} </td>
                        <td> {cargo.typeCargo.nameTypeCargo} </td>

                        <td>
                          <button
                            onClick={() => this.editCargo(cargo.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteCargo(cargo.id)}
                            className="btn btn-danger"
                          >
                            <i className="fa-solid fa-trash"></i> Удалить
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

export default ListCargoForBidComponent;