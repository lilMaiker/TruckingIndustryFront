import React, { Component } from "react";
import FoundationService from "../../services/FoundationService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListFoundationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foundation: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addFoundation = this.addFoundation.bind(this);
    this.editFoundation = this.editFoundation.bind(this);
    this.deleteFoundation = this.deleteFoundation.bind(this);
  }

  deleteFoundation(id) {
    FoundationService.deleteFoundation(id)
      .then((res) => {
        this.setState({
          foundation: this.state.foundation.filter(
            (foundation) => foundation.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editFoundation(id) {
    this.props.history.push(`/update-foundation/${id}`);
    window.location.reload();
  }

  addFoundation() {
    this.props.history.push("/add-foundation");
    window.location.reload();
  }

  componentDidMount() {
    FoundationService.getFoundation()
      .then((res) => {
        this.setState({
          foundation: res.data,
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
            <h2 class="mb-5">Организации</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addFoundation}>
                <i className="fa-solid fa-plus"></i> Добавить Организацию
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Название организации</th>
                    <th scope="col">Номер сертификата</th>
                    <th scope="col">БИК</th>
                    <th scope="col">Клиент</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.foundation.map((foundation) => (
                    <>
                      <tr key={foundation.id}>
                        <td> {foundation.nameFoundation} </td>
                        <td> {foundation.certificateNumber} </td>
                        <td> {foundation.bic} </td>
                        <td> {foundation.client.surname} {foundation.client.name.charAt(0)}. {foundation.client.patronymic.charAt(0)}.</td>

                        <td>
                          <button
                            onClick={() => this.editFoundation(foundation.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteFoundation(foundation.id)}
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

export default ListFoundationComponent;