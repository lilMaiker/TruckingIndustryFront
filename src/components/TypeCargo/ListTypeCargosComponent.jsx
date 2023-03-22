import React, { Component } from "react";
import TypeCargoService from "../../services/TypeCargoService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListTypeCargosComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typecargos: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addTypeCargo = this.addTypeCargo.bind(this);
    this.editTypeCargo = this.editTypeCargo.bind(this);
    this.deleteTypeCargo = this.deleteTypeCargo.bind(this);
  }

  deleteTypeCargo(id) {
    TypeCargoService.deleteTypeCargo(id)
      .then((res) => {
        this.setState({
          typecargos: this.state.typecargos.filter(
            (typecargos) => typecargos.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editTypeCargo(id) {
    this.props.history.push(`/update-typecargo/${id}`);
    window.location.reload();
  }

  addTypeCargo() {
    this.props.history.push("/add-typecargo");
    window.location.reload();
  }

  componentDidMount() {
    TypeCargoService.getTypeCargos()
      .then((res) => {
        this.setState({
          typecargos: res.data,
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
            <h2 class="mb-5">Типы грузов</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addTypeCargo}>
                <i className="fa-solid fa-plus"></i> Добавить Типы грузов
              </button>
            </div>
            <div class="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Название типа груза</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.typecargos.map((typecargos) => (
                    <>
                      <tr key={typecargos.id}>
                        <td> {typecargos.nameTypeCargo} </td>

                        <td>
                          <button
                            onClick={() => this.editTypeCargo(typecargos.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteTypeCargo(typecargos.id)}
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

export default ListTypeCargosComponent;