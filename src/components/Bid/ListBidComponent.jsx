import React, { Component } from "react";
import BidService from "../../services/BidService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListBidComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addBid = this.addBid.bind(this);
    this.editBid = this.editBid.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.getCargo = this.getCargo.bind(this);
  }

  getRoutes(id) {
    this.props.history.push(`/route-bid/${id}`);
    window.location.reload();
  }

  getExpenses(id) {
    this.props.history.push(`/expense-bid/${id}`);
    window.location.reload();
  }

  getCargo(id) {
    this.props.history.push(`/cargo-bid/${id}`);
    window.location.reload();
  }

  deleteBid(id) {
    BidService.deleteBid(id)
      .then((res) => {
        this.setState({
          bid: this.state.bid.filter(
            (bid) => bid.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editBid(id) {
    this.props.history.push(`/update-bid/${id}`);
    window.location.reload();
  }

  addBid() {
    this.props.history.push("/add-bid");
    window.location.reload();
  }


  
  componentDidMount() {
    BidService.getBid()
      .then((res) => {
        this.setState({
          bid: res.data.data,
          loading: true,
          statusCode: res.status,
          isDelete: 0,
          render: true,
        });
      })
      .catch((error) => {
        console.error("Код ошибки " + error.response.status);
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

    if (this.state.statusCode === 200) {
      return (
        <div className="container">
          <header className="jumbotron" style={{ width: '150%', margin: '0 auto', marginLeft: '-25%'  }}>
            <h2 class="mb-5">Заявки</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addBid}>
                <i className="fa-solid fa-plus"></i> Добавить Заявку
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Транспорт</th>
                    <th scope="col">Организация</th>
                    <th scope="col">Сумма фрахта</th>
                    <th scope="col">Валюта</th>
                    <th scope="col">Дата загрузки</th>
                    <th scope="col">Дата разгрузки</th>
                    <th scope="col">Номер акта</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Дата оплаты</th>
                    <th scope="col">Сотрудник</th>
                    <th scope="col" class="w-25">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.bid.map((bid) => (
                    <>
                      <tr key={bid.id}>
                        <td> {bid.id} </td>
                        <td> {bid.cars.trailerNumber} </td>
                        <td> {bid.foundation.nameFoundation} </td>
                        <td> {bid.freightAMount} </td>
                        <td> {bid.currency.currencyCode} </td>
                        <td> {formatDate(bid.dateToLoad)} </td>
                        <td> {formatDate(bid.dateToUnload)} </td>
                        <td> {bid.actAccNumber} </td>
                        <td> {bid.status.nameStatus} </td>
                        <td> {formatDate(bid.payDate)} </td>
                        <td> {bid.employee.surname} {bid.employee.name.charAt(0)}. {bid.employee.patronymic.charAt(0)}.</td>

                        <td>
                          <button
                            onClick={() => this.editBid(bid.id)}
                            className="btn btn-info"><i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteBid(bid.id)}
                            className="btn btn-danger"><i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.getRoutes(bid.id)}
                            className="btn btn-success"><i class="fa-solid fa-route"></i>
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.getExpenses(bid.id)}
                            className="btn btn-warning"><i class="fa-solid fa-wallet"></i>
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.getCargo(bid.id)}
                            className="btn btn-dark"><i class="fa-solid fa-truck-ramp-box"></i>
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

export default ListBidComponent;