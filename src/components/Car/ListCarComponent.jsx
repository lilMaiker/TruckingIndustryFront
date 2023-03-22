import React, { Component } from "react";
import CarService from "../../services/CarService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListCarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addCar = this.addCar.bind(this);
    this.editCar = this.editCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
  }

  deleteCar(id) {
    CarService.deleteCar(id)
      .then((res) => {
        this.setState({
          car: this.state.car.filter(
            (car) => car.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editCar(id) {
    this.props.history.push(`/update-car/${id}`);
    window.location.reload();
  }

  addCar() {
    this.props.history.push("/add-car");
    window.location.reload();
  }

  componentDidMount() {
    CarService.getCar()
      .then((res) => {
        this.setState({
          car: res.data,
          loading: true,
          statusCode: res.status,
          isDelete: 0,
          render: true,
        });
      })
      .catch((error) => {
        this.setState({ loading: false, statusCode: error.response.status });
        console.log(this.state.statusCode)
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
          <header className="jumbotron" style={{ width: '150%', margin: '0 auto', marginLeft: '-25%'  }}>
            <h2 class="mb-5">Транспорт</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addCar}>
                <i className="fa-solid fa-plus"></i> Добавить Транспорт
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Фирменный прицеп</th>
                    <th scope="col">Номер трейлера</th>
                    <th scope="col">Дата тех. обслуживания</th>
                    <th scope="col">Макс. вес, кг.</th>
                    <th scope="col">Открытый борт</th>
                    <th scope="col">Холодильник</th>
                    <th scope="col">Тент</th>
                    <th scope="col">Гидроборт</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.car.map((car) => (
                    <>
                      <tr key={car.id}>
                        <td> {car.brandTrailer} </td>
                        <td> {car.trailerNumber} </td>
                        <td> {formatDate(car.lastDateTechnicalInspection)} </td>
                        <td> {car.maxWeight} </td>
                        <td> {car.withOpenSide ? (<span>Присутствует</span>) : (<span>Отсутствует</span>)}</td>
                        <td> {car.withRefrigerator ? (<span>Присутствует</span>) : (<span>Отсутствует</span>)} </td>
                        <td> {car.withTent ? (<span>Присутствует</span>) : (<span>Отсутствует</span>)} </td>
                        <td> {car.withHydroboard ? (<span>Присутствует</span>) : (<span>Отсутствует</span>)} </td>

                        <td>
                          <button
                            onClick={() => this.editCar(car.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteCar(car.id)}
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

function formatDate(string){
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString([],options);
}

export default ListCarComponent;