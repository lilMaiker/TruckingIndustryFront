import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import ClientService from "../../services/ClientService";

class UpdateClientComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.updateClient = this.updateClient.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    ClientService.getClientById(this.state.id).then((res) => {
      let clientjson = res.data;
      this.setState({
        surname: clientjson.surname,
        name: clientjson.name,
        patronymic: clientjson.patronymic,
        serialnumber: clientjson.serialNumber,
        passportnumber: clientjson.passportNumber,
        phonenumber: clientjson.phoneNumber,
        email: clientjson.email,
      });
    });}//void Update Client
  updateClient = (e) => {
    e.preventDefault();
    let clientjson = {id: this.state.id,
      surname: this.state.surname,
      name: this.state.name,
      patronymic: this.state.patronymic,
      serialNumber: this.state.serialnumber,
      passportNumber: this.state.passportnumber,
      phoneNumber: this.state.phonenumber,
      email: this.state.email,
    };
    console.log("clientjson => " + JSON.stringify(clientjson));

    ClientService.updateClient(clientjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/client");
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
    this.props.history.push("/client");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Клиенты</h3>
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
                    <label> Серийный номер паспорта: </label>
                    <input
                      placeholder="Серийный номер паспорта"
                      name="serialnumber"
                      className="form-control"
                      value={this.state.serialnumber}
                      onChange={this.changeSerialNumberHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Номер паспорта: </label>
                    <input
                      placeholder="Номер паспорта"
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



                  <button className="btn btn-success" onClick={this.updateClient}>
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

export default UpdateClientComponent;