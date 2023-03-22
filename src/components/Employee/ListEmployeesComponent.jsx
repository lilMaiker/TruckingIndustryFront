import React, { Component } from "react";
import EmployeeService from "../../services/EmployeeService";
import Alert from "react-bootstrap/Alert";
import HashLoader from "react-spinners/HashLoader";

class ListEmployeesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      loading: false,
      statusCode: "",
      isDelete: "",
      errorMsg: "",
      render: false,
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id)
      .then((res) => {
        this.setState({
          employees: this.state.employees.filter(
            (employees) => employees.id !== id
          ),
          isDelete: 1,
        });
      })
      .catch((error) => {
        this.setState({ isDelete: 2, errorMsg: error });
      });
  }

  editEmployee(id) {
    this.props.history.push(`/update-employee/${id}`);
    window.location.reload();
  }

  addEmployee() {
    this.props.history.push("/add-employee");
    window.location.reload();
  }

  componentDidMount() {
    EmployeeService.getEmployees()
      .then((res) => {
        this.setState({
          employees: res.data,
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
            <h2 class="mb-5">Сотрудники</h2>
            <div className="row">
              <button className="btn btn-primary" onClick={this.addEmployee}>
                <i className="fa-solid fa-plus"></i> Добавить Сотрудники
              </button>
            </div>
            <div className="table-responsive custom-table-responsive">
              <table class="table custom-table">
                <thead>
                  <tr>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Отчество</th>
                    <th scope="col">Сериный номер паспорта</th>
                    <th scope="col">Номер паспорта</th>
                    <th scope="col">Номер телефона</th>
                    <th scope="col">Электронная почта</th>
                    <th scope="col">Должность</th>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map((employees) => (
                    <>
                      <tr key={employees.id}>
                        <td> {employees.surname} </td>
                        <td> {employees.name} </td>
                        <td> {employees.patronymic} </td>
                        <td> {employees.serialNumber} </td>
                        <td> {employees.passportNumber} </td>
                        <td> {employees.phoneNumber} </td>
                        <td> {employees.email} </td>
                        <td> {employees.position.namePosition} </td>
                        <td> {employees.applicationUserId} </td>

                        <td>
                          <button
                            onClick={() => this.editEmployee(employees.id)}
                            className="btn btn-info"
                          >
                            <i className="fa-solid fa-pen-to-square"></i>{" "}
                            Изменить
                          </button>
                          <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => this.deleteEmployee(employees.id)}
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

export default ListEmployeesComponent;