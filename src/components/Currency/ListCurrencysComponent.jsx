import React, { Component } from "react";
import CurrencyService from "../../services/CurrencyService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListCurrencysComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencys: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addCurrency = this.addCurrency.bind(this);
    this.editCurrency = this.editCurrency.bind(this);
    this.deleteCurrency = this.deleteCurrency.bind(this);
  }

  deleteCurrency(id) {
    CurrencyService.deleteCurrency(id)
      .then((res) => {
        this.setState({
          currencys: this.state.currencys.filter(
            (currencys) => currencys.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editCurrency(id) {
    this.props.history.push(`/update-currency/${id}`);
    window.location.reload();
  }

  addCurrency() {
    this.props.history.push("/add-currency");
    window.location.reload();
  }

  componentDidMount() {
    CurrencyService.getCurrencys()
      .then((res) => {
        this.setState({
          currencys: res.data,
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
          <header className="jumbotron">
            <h2 class="mb-5">Валюты</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addCurrency}>
                <i className="fa-solid fa-plus"></i> Добавить Валюты
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Название валюты</th>
                    <th scope="col">Код валюты</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.currencys.map((currencys) => (
                    <>
                      <tr key={currencys.id}>
                        <td> {currencys.nameCurrency} </td>
                        <td> {currencys.currencyCode} </td>

                        <td>
                          <button
                            onClick={() => this.editCurrency(currencys.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteCurrency(currencys.id)}
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

export default ListCurrencysComponent;