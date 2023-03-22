import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import EmployeeService from "../../services/EmployeeService";
import Select from "react-select";
import PositionService from "../../services/PositionService";
import ApplicationUserService from "../../services/ApplicationUserService";

class UpdateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsPosition: [],
      oIdPosition: "",
      oNamePosition: "",


      selectOptionsApplicationUser: [],
      oIdApplicationUser: "",
      oNameApplicationUser: "",


      id: this.props.match.params.id, errors: null,
      surname: '',
      name: '',
      patronymic: '',
      serialnumber: '',
      passportnumber: Number,
      phonenumber: '',
      email: '',
      }

    //Handlers
    this.changeSurnameHandler = this.changeSurnameHandler.bind(this);
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changePatronymicHandler = this.changePatronymicHandler.bind(this);
    this.changeSerialNumberHandler = this.changeSerialNumberHandler.bind(this);
    this.changePassportNumberHandler = this.changePassportNumberHandler.bind(this);
    this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);

    //void
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  //#region Handlers For Select

  handleChangePosition(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdPosition: e.value, oNamePosition: e.label });
  }

  handleChangeApplicationUser(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdApplicationUser: e.value, oNameApplicationUser: e.label });
  }

  //#endregion

  componentDidMount() {
    //Position
    PositionService.getPositions().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.namePosition,
      }));
      this.setState({ selectOptionsPosition: options });
    });

    //ApplicationUser
    ApplicationUserService.getApplicationUsers().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.userName,
      }));
      this.setState({ selectOptionsApplicationUser: options });
    });

    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      let employeejson = res.data;
      this.setState({
        surname: employeejson.surname,
        name: employeejson.name,
        patronymic: employeejson.patronymic,
        serialnumber: employeejson.serialNumber,
        passportnumber: employeejson.passportNumber,
        phonenumber: employeejson.phoneNumber,
        email: employeejson.email,
        oIdPosition: employeejson.positionId,
        oNamePosition: employeejson.position.namePosition,
        oIdApplicationUser: employeejson.applicationUserId,
        oNameApplicationUser: employeejson.applicationUser.userName,
      });
    });}
    
    //void Update Employee
  updateEmployee = (e) => {
    e.preventDefault();
    let employeejson = {id: this.state.id,
      surname: this.state.surname,
      name: this.state.name,
      patronymic: this.state.patronymic,
      serialNumber: this.state.serialnumber,
      passportNumber: this.state.passportnumber,
      phoneNumber: this.state.phonenumber,
      email: this.state.email,
      positionId: this.state.oIdPosition,
      applicationUserId: this.state.oIdApplicationUser,
    };
    console.log("employeejson => " + JSON.stringify(employeejson));

    EmployeeService.updateEmployee(employeejson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/employee");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeSurnameHandler = (event) => {
    this.setState({ surname: event.target.value });
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changePatronymicHandler = (event) => {
    this.setState({ patronymic: event.target.value });
  };

  changeSerialNumberHandler = (event) => {
    this.setState({ serialnumber: event.target.value });
  };

  changePassportNumberHandler = (event) => {
    this.setState({ passportnumber: event.target.value });
  };

  changePhoneNumberHandler = (event) => {
    this.setState({ phonenumber: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  cancel() {
    this.props.history.push("/employee");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Сотрудники</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Фамилия: </label>
                    <input
                      placeholder="Фамилия"
                      name="surname"
                      className="form-control"
                      value={this.state.surname}
                      onChange={this.changeSurnameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Имя: </label>
                    <input
                      placeholder="Имя"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Отчество: </label>
                    <input
                      placeholder="Отчество"
                      name="patronymic"
                      className="form-control"
                      value={this.state.patronymic}
                      onChange={this.changePatronymicHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Сериный номер паспорта: </label>
                    <input
                      placeholder="Сериный номер паспорта"
                      name="serialnumber"
                      className="form-control"
                      value={this.state.serialnumber}
                      onChange={this.changeSerialNumberHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Номер паспорта\: </label>
                    <input
                      placeholder="Номер паспорта\"
                      name="passportnumber"
                      className="form-control"
                      value={this.state.passportnumber}
                      onChange={this.changePassportNumberHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Номер телефона: </label>
                    <input
                      placeholder="Номер телефона"
                      name="phonenumber"
                      className="form-control"
                      value={this.state.phonenumber}
                      onChange={this.changePhoneNumberHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Электронная почта: </label>
                    <input
                      placeholder="Электронная почта"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите должность:
                      <Select
                        placeholder={<div>Выберите должность</div>}
value={{
                          id: this.state.oIdPosition,
                          label: this.state.oNamePosition,
                        }}                        options={this.state.selectOptionsPosition}
                        onChange={this.handleChangePosition.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите пользователь:
                      <Select
                        placeholder={<div>Выберите пользователь</div>}
value={{
                          id: this.state.oIdApplicationUser,
                          label: this.state.oNameApplicationUser,
                        }}                        options={this.state.selectOptionsApplicationUser}
                        onChange={this.handleChangeApplicationUser.bind(this)}
                      />
                    </label>
                  </div>



                  <button className="btn btn-success" onClick={this.updateEmployee}>
                    <i class="fa-solid fa-floppy-disk"></i> Сохранить
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i class="fa-solid fa-xmark"></i> Закрыть
                  </button>
                </form>  <br></br>
                {this.state.errors && (
                  <div>
                    <Alert variant="danger">
                      <Alert.Heading>
                        Ошибка при редактировании элемента.
                      </Alert.Heading>
                      {Object.keys(this.state.errors).map((key) => (
                        <p>{this.state.errors[key]}</p>
                      ))}
                    </Alert>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateEmployeeComponent;