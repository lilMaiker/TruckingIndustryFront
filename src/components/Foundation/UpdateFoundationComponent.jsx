import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import FoundationService from "../../services/FoundationService";
import Select from "react-select";
import ClientService from "../../services/ClientService";

class UpdateFoundationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsClient: [],
      oIdClient: "",
      oNameClient: "",


id: this.props.match.params.id, errors: null,
      namefoundation: '',
      certificatenumber: '',
      bic: '',
      }

    //Handlers
    this.changeNameFoundationHandler = this.changeNameFoundationHandler.bind(this);
    this.changeCertificateNumberHandler = this.changeCertificateNumberHandler.bind(this);
    this.changeBICHandler = this.changeBICHandler.bind(this);

    //void
    this.updateFoundation = this.updateFoundation.bind(this);
  }

  //#region Handlers For Select

  handleChangeClient(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdClient: e.value, oNameClient: e.label });
  }

  //#endregion

  componentDidMount() {
    //Client
    ClientService.getClient().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.surname + ' ' + d.name + ' ' + d.patronymic,
      }));
      this.setState({ selectOptionsClient: options });
    });

    FoundationService.getFoundationById(this.state.id).then((res) => {
      let foundationjson = res.data;
      this.setState({
        namefoundation: foundationjson.nameFoundation,
        certificatenumber: foundationjson.certificateNumber,
        bic: foundationjson.bic,
        oIdClient: foundationjson.clientId,
        oNameClient: foundationjson.client.surname + ' ' + foundationjson.client.name + ' ' + foundationjson.client.patronymic,
      });
    });}//void Update Foundation
  updateFoundation = (e) => {
    e.preventDefault();
    let foundationjson = {id: this.state.id,
      nameFoundation: this.state.namefoundation,
      certificateNumber: this.state.certificatenumber,
      bic: this.state.bic,
      clientId: this.state.oIdClient,
    };
    console.log("foundationjson => " + JSON.stringify(foundationjson));

    FoundationService.updateFoundation(foundationjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/foundation");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeNameFoundationHandler = (event) => {
    this.setState({ namefoundation: event.target.value });
  };

  changeCertificateNumberHandler = (event) => {
    this.setState({ certificatenumber: event.target.value });
  };

  changeBICHandler = (event) => {
    this.setState({ bic: event.target.value });
  };

  cancel() {
    this.props.history.push("/foundation");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Организации</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Название организации: </label>
                    <input
                      placeholder="Название организации"
                      name="namefoundation"
                      className="form-control"
                      value={this.state.namefoundation}
                      onChange={this.changeNameFoundationHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Номер сертификата: </label>
                    <input
                      placeholder="Номер сертификата"
                      name="certificatenumber"
                      className="form-control"
                      value={this.state.certificatenumber}
                      onChange={this.changeCertificateNumberHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> БИК: </label>
                    <input
                      placeholder="БИК"
                      name="bic"
                      className="form-control"
                      value={this.state.bic}
                      onChange={this.changeBICHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите клиент:
                      <Select
                        placeholder={<div>Выберите клиент</div>}
value={{
                          id: this.state.oIdClient,
                          label: this.state.oNameClient,
                        }}                        options={this.state.selectOptionsClient}
                        onChange={this.handleChangeClient.bind(this)}
                      />
                    </label>
                  </div>



                  <button className="btn btn-success" onClick={this.updateFoundation}>
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

export default UpdateFoundationComponent;