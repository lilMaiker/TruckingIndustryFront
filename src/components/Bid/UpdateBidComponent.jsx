import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import BidService from "../../services/BidService";
import DatePicker from "react-widgets/DatePicker";
import Select from "react-select";
import CarService from "../../services/CarService";
import FoundationService from "../../services/FoundationService";
import CurrencyService from "../../services/CurrencyService";
import StatusService from "../../services/StatusService";
import EmployeeService from "../../services/EmployeeService";

class UpdateBidComponent extends Component {
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


      id: this.props.match.params.id, 
      errors: null,
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
    this.updateBid = this.updateBid.bind(this);
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

    BidService.getBidById(this.state.id).then((res) => {
      let bidjson = res.data.data;
      this.setState({
        oIdCar: bidjson.carsId,
        oNameCar: bidjson.cars.brandTrailer,
        oIdFoundation: bidjson.foundationId,
        oNameFoundation: bidjson.foundation.nameFoundation,
        freightamount: bidjson.freightAMount,
        oIdCurrency: bidjson.currencyId,
        oNameCurrency: bidjson.currency.currencyCode,
        datetoload: new Date(bidjson.dateToLoad),
        datetounload: new Date(bidjson.dateToUnload),
        actaccnumber: bidjson.actAccNumber,
        oIdStatus: bidjson.statusId,
        oNameStatus: bidjson.status.nameStatus,
        paydate: new Date(bidjson.payDate),
        oIdEmployee: bidjson.employeeId,
        oNameEmployee: bidjson.employee.surname + ' ' + bidjson.employee.name + ' ' + bidjson.employee.patronymic,
      });
    });}//void Update Bid
  updateBid = (e) => {
    e.preventDefault();
    let bidjson = {id: this.state.id,
        carsId: this.state.oIdCar,
        foundationId: this.state.oIdFoundation,
      freightAMount: this.state.freightamount,
      currencyId: this.state.oIdCurrency,
      dateToLoad: this.state.datetoload,
      dateToUnload: this.state.datetounload,
      actAccNumber: this.state.actaccnumber,
      statusId: this.state.oIdStatus,
      payDate: this.state.paydate,
      employeeId: this.state.oIdEmployee ,
    };
    console.log("bidjson => " + JSON.stringify(bidjson));

    BidService.updateBid(bidjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/bid");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
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
    const { datetoload } = this.state;
    const { datetounload } = this.state;
    const { paydate } = this.state;

    return (

      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br />
              <h3 className="text-center">Редактирование Заявки</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Выберите транспорт:</label>
                    <Select
                      placeholder={<div>Выберите транспорт</div>}
                      value={{id: this.state.oIdCar, label: this.state.oNameCar}}
                      options={this.state.selectOptionsCar}
                      onChange={this.handleChangeCar.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Выберите организацию:</label>
                    <Select
                      placeholder={<div>Выберите организацию</div>}
                      value={{id: this.state.oIdFoundation, label: this.state.oNameFoundation}}
                      options={this.state.selectOptionsFoundation}
                      onChange={this.handleChangeFoundation.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Сумма фрахта:</label>
                    <input
                      placeholder="Сумма фрахта"
                      name="freightamount"
                      className="form-control"
                      value={this.state.freightamount}
                      onChange={this.changeFreightAMountHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Выберите валюту:</label>
                    <Select
                      placeholder={<div>Выберите валюту</div>}
                      value={{id: this.state.oIdCurrency, label: this.state.oNameCurrency}}
                      options={this.state.selectOptionsCurrency}
                      onChange={this.handleChangeCurrency.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Дата загрузки:</label>
                    <button></button>
                    <DatePicker
                      defaultValue={new Date()}
                      onChange={this.handleChangeDateToLoad}
                      value={datetoload}
                    />
                  </div>
                  <div className="form-group">
                    <label>Дата разгрузки:</label>
                    <button></button>
                    <DatePicker
                      defaultValue={new Date()}
                      onChange={this.handleChangeDateToUnload}
                      value={datetounload}
                    />
                  </div>
                  <div className="form-group">
                    <label>Номер акта:</label>
                    <input
                      placeholder="Номер акта"
                      name="actaccnumber"
                      className="form-control"
                      value={this.state.actaccnumber}
                      onChange={this.changeActAccNumberHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Выберите статус:</label>
                    <Select
                      placeholder={<div>Выберите статус</div>}
                      value={{id: this.state.oIdStatus, label: this.state.oNameStatus}}
                      options={this.state.selectOptionsStatus}
                      onChange={this.handleChangeStatus.bind(this)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Дата оплаты:</label>
                    <DatePicker
                      defaultValue={new Date()}
                      onChange={this.handleChangePayDate}
                      value={paydate}
                    />  </div>

                  <div className="form-group">
                    <label>
                      Выберите сотрудник:
                      <Select
                        placeholder={<div>Выберите сотрудник</div>}
value={{
                          id: this.state.oIdEmployee,
                          label: this.state.oNameEmployee,
                        }}                        options={this.state.selectOptionsEmployee}
                        onChange={this.handleChangeEmployee.bind(this)}
                      />
                    </label>
                  </div>



                  <button className="btn btn-success" onClick={this.updateBid}>
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

export default UpdateBidComponent;