import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import BidService from "../../services/BidService";
import DatePicker from "react-widgets/DatePicker";
import Select from "react-select";
import CarService from "../../services/CarService";
import FoundationService from "../../services/FoundationService";
import CurrencyService from "../../services/CurrencyService";
import StatusService from "../../services/StatusService";
import EmployeeService from "../../services/EmployeeService";

class CreateBidComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsCar: [],
      oIdCar: "",
      oNameCar: "",

      selectOptionsFoundation: [],
      oIdFoundation: "",
      oNameFoundation: "",

      selectOptionsCurrency: [],
      oIdCurrency: "",
      oNameCurrency: "",

      selectOptionsStatus: [],
      oIdStatus: "",
      oNameStatus: "",

      selectOptionsEmployee: [],
      oIdEmployee: "",
      oNameEmployee: "",

      id: this.props.match.params.id, errors: null,
      freightamount: Number,
      datetoload: new Date(),
      datetounload: new Date(),
      actaccnumber: '',
      paydate: new Date(),
      }

    //Handlers
    this.changeFreightAMountHandler = this.changeFreightAMountHandler.bind(this);
    this.changeActAccNumberHandler = this.changeActAccNumberHandler.bind(this);

    //void
    this.saveBid = this.saveBid.bind(this);
  }

  //#region Handlers For Select

  handleChangeCar(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdCar: e.value, oNameCar: e.label });
  }

  handleChangeFoundation(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdFoundation: e.value, oNameFoundation: e.label });
  }

  handleChangeCurrency(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdCurrency: e.value, oNameCurrency: e.label });
  }

  handleChangeStatus(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdStatus: e.value, oNameStatus: e.label });
  }

  handleChangeEmployee(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdEmployee: e.value, oNameEmployee: e.label });
  }

  //#endregion
  componentDidMount() {
    //Car
    CarService.getCar().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.trailerNumber,
      }));
      this.setState({ selectOptionsCar: options });
    });

    //Foundation
    FoundationService.getFoundation().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.nameFoundation,
      }));
      this.setState({ selectOptionsFoundation: options });
    });

    //Currency
    CurrencyService.getCurrencys().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.nameCurrency,
      }));
      this.setState({ selectOptionsCurrency: options });
    });

    //Status
    StatusService.getStatus().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.nameStatus,
      }));
      this.setState({ selectOptionsStatus: options });
    });

    //Employee
    EmployeeService.getEmployees().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.surname + ' ' + d.name + ' ' + d.patronymic,
      }));
      this.setState({ selectOptionsEmployee: options });
    });

    }//void Save Bid
  saveBid = (e) => {
    e.preventDefault();
    let bidjson = {
        carsId: this.state.oIdCar,
        foundationId: this.state.oIdFoundation,
      freightamount: this.state.freightamount,
      currencyId: this.state.oIdCurrency,
      datetoload: this.state.datetoload,
      datetounload: this.state.datetounload,
      actaccnumber: this.state.actaccnumber,
      statusId: this.state.oIdStatus,
      paydate: this.state.paydate,
      employeeId: this.state.oIdEmployee,
    };
    console.log("bidjson => " + JSON.stringify(bidjson));

    BidService.createBid(bidjson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/bid");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changeFreightAMountHandler = (event) => {
    this.setState({ freightamount: event.target.value });
  };

  changeActAccNumberHandler = (event) => {
    this.setState({ actaccnumber: event.target.value });
  };

  cancel() {
    this.props.history.push("/bid");
    window.location.reload();
  }

  handleChangeDateToLoad = (datetoload) => {
    this.setState({
      datetoload,
    });
  };

  handleChangeDateToUnload = (datetounload) => {
    this.setState({
      datetounload,
    });
  };

  handleChangePayDate = (paydate) => {
    this.setState({
      paydate,
    });
  };



  render() {
    const { datetoload, datetounload, paydate } = this.state;
    
    return (
    <div>
    <br />
    <div className="container">
    <div className="row">
    <div className="card col-md-8 offset-md-2">
    <div className="card-body">
    <form>
    <div className="form-row">
    <div className="form-group col-md-6">
    <label>Выберите транспорт:</label>
    <Select
    placeholder={<div>Выберите транспорт</div>}
    options={this.state.selectOptionsCar}
    onChange={this.handleChangeCar.bind(this)}
    />
    </div>
    <div className="form-group col-md-6">
    <label>Выберите организацию:</label>
    <Select
    placeholder={<div>Выберите организацию</div>}
    options={this.state.selectOptionsFoundation}
    onChange={this.handleChangeFoundation.bind(this)}
    />
    </div>
    </div>
    <div className="form-row">
              <div className="form-group col-md-6">
                <label>Сумма фрахта:</label>
                <input
                  placeholder="Сумма фрахта"
                  name="freightamount"
                  className="form-control"
                  value={this.state.freightamount}
                  onChange={this.changeFreightAMountHandler}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Выберите валюту:</label>
                <Select
                  placeholder={<div>Выберите валюту</div>}
                  options={this.state.selectOptionsCurrency}
                  onChange={this.handleChangeCurrency.bind(this)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Дата загрузки:</label>
                <DatePicker
                defaultValue={new Date()}
                selected={datetoload}
                onChange={this.handleChangeDateToLoad}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Дата разгрузки:</label>
                <DatePicker
                 defaultValue={new Date()}
                 selected={datetounload}
                 onChange={this.handleChangeDateToUnload}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Номер акта:</label>
                <input
                  placeholder="Номер акта"
                  name="actaccnumber"
                  className="form-control"
                  value={this.state.actaccnumber}
                  onChange={this.changeActAccNumberHandler}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Выберите статус:</label>
                <Select
                  placeholder={<div>Выберите статус</div>}
                  options={this.state.selectOptionsStatus}
                  onChange={this.handleChangeStatus.bind(this)}
                />
              </div>
              </div>

                  <div className="form-group">
                    <label> Дата оплаты: </label>
                    <DatePicker
                     defaultValue={new Date()}
                     selected={paydate}
                     onChange={this.handleChangePayDate}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите сотрудник:
                      <Select
                        placeholder={<div>Выберите сотрудник</div>}
                        options={this.state.selectOptionsEmployee}
                        onChange={this.handleChangeEmployee.bind(this)}
                      />
                    </label>
                  </div>



                  <button className="btn btn-success" onClick={this.saveBid}>
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
                        Ошибка при добавлении элемента.
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

export default CreateBidComponent;