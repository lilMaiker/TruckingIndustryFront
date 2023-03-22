import React, { Component } from "react";
import ClientService from "../../services/ClientService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListClientComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addClient = this.addClient.bind(this);
    this.editClient = this.editClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
  }

  deleteClient(id) {
    ClientService.deleteClient(id)
      .then((res) => {
        this.setState({
          client: this.state.client.filter(
            (client) => client.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editClient(id) {
    this.props.history.push(`/update-client/${id}`);
    window.location.reload();
  }

  addClient() {
    this.props.history.push("/add-client");
    window.location.reload();
  }

  componentDidMount() {
    ClientService.getClient()
      .then((res) => {
        this.setState({
          client: res.data,
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
            <h2 class="mb-5">Клиенты</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addClient}>
                <i className="fa-solid fa-plus"></i> Добавить Клиента
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Отчество</th>
                    <th scope="col">Серийный номер паспорта</th>
                    <th scope="col">Номер паспорта</th>
                    <th scope="col">Номер телефона</th>
                    <th scope="col">Электронная почта</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.client.map((client) => (
                    <>
                      <tr key={client.id}>
                        <td> {client.surname} </td>
                        <td> {client.name} </td>
                        <td> {client.patronymic} </td>
                        <td> {client.serialNumber} </td>
                        <td> {client.passportNumber} </td>
                        <td> {client.phoneNumber} </td>
                        <td> {client.email} </td>

                        <td>
                          <button
                            onClick={() => this.editClient(client.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteClient(client.id)}
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

export default ListClientComponent;