import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import ExpenseService from "../../services/ExpenseService";
import DatePicker from "react-widgets/DatePicker";
import Select from "react-select";
import CurrencyService from "../../services/CurrencyService";
import BidService from "../../services/BidService";

class UpdateExpenseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsCurrency: [],
      oIdCurrency: "",
      oNameCurrency: "",

      selectOptionsBid: [],
      oIdBid: "",
      oNameBid: "",

      id: this.props.match.params.id, 
      errors: null,
      nameexpense: '',
      amount: Number,
      datetransfer: new Date(),
      commnet: '',
      }

    //Handlers
    this.changeNameExpenseHandler = this.changeNameExpenseHandler.bind(this);
    this.changeAmountHandler = this.changeAmountHandler.bind(this);
    this.changeCommnetHandler = this.changeCommnetHandler.bind(this);

    //void
    this.updateExpense = this.updateExpense.bind(this);
  }

  //#region Handlers For Select

  handleChangeCurrency(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdCurrency: e.value, oNameCurrency: e.label });
  }

  handleChangeBid(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdBid: e.value, oNameBid: e.label });
  }

  //#endregion

  componentDidMount() {
    //Currency
    CurrencyService.getCurrencys().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.currencyCode,
      }));
      this.setState({ selectOptionsCurrency: options });
    });

    //Bid
    BidService.getBid().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.id,
      }));
      this.setState({ selectOptionsBid: options });
    });

    ExpenseService.getExpenseById(this.state.id).then((res) => {
      let expensejson = res.data;
      this.setState({
        nameexpense: expensejson.nameExpense,
        amount: expensejson.amount,
        oIdCurrency: expensejson.currencyId,
        oNameCurrency: expensejson.currency.currencyCode,
        datetransfer: new Date(expensejson.dateTransfer),
        commnet: expensejson.commnet,
        oIdBid: expensejson.bidsId,
        oNameBid: expensejson.bidsId,
      });
    });}//void Update Expense
  updateExpense = (e) => {
    e.preventDefault();
    let expensejson = {id: this.state.id,
      nameExpense: this.state.nameexpense,
      amount: this.state.amount,
      currencyId: this.state.oIdCurrency,
      dateTransfer: this.state.datetransfer,
      commnet: this.state.commnet,
      bidsId: this.state.oIdBid ,
    };
    console.log("expensejson => " + JSON.stringify(expensejson));

    ExpenseService.updateExpense(expensejson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/expense");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeNameExpenseHandler = (event) => {
    this.setState({ nameexpense: event.target.value });
  };

  changeAmountHandler = (event) => {
    this.setState({ amount: event.target.value });
  };

  changeCommnetHandler = (event) => {
    this.setState({ commnet: event.target.value });
  };

  cancel() {
    this.props.history.push("/expense");
    window.location.reload();
  }

  handleChangeDateTransfer = (datetransfer) => {
    this.setState({
      datetransfer,
    });
  };

  render() {
    const { datetransfer } = this.state;

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Затраты</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Название затраты: </label>
                    <input
                      placeholder="Название затраты"
                      name="nameexpense"
                      className="form-control"
                      value={this.state.nameexpense}
                      onChange={this.changeNameExpenseHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Сумма: </label>
                    <input
                      placeholder="Сумма"
                      name="amount"
                      className="form-control"
                      value={this.state.amount}
                      onChange={this.changeAmountHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите валюта:
                      <Select
                        placeholder={<div>Выберите валюта</div>}
value={{
                          id: this.state.oIdCurrency,
                          label: this.state.oNameCurrency,
                        }}                        options={this.state.selectOptionsCurrency}
                        onChange={this.handleChangeCurrency.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label> Дата перевода: </label>
                    <button></button>
                    <DatePicker
    defaultValue={new Date()}
    onChange={this.handleChangeDateTransfer}
    value={datetransfer}/>
                  </div>

                  <div className="form-group">
                    <label> Комментарий: </label>
                    <input
                      placeholder="Комментарий"
                      name="commnet"
                      className="form-control"
                      value={this.state.commnet}
                      onChange={this.changeCommnetHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите заявка:
                      <Select
                        placeholder={<div>Выберите заявка</div>} value={{
                          id: this.state.oIdBid,
                          label: this.state.oNameBid,
                        }}                        options={this.state.selectOptionsBid}
                        onChange={this.handleChangeBid.bind(this)}
                      />
                    </label>
                  </div>



                  <button className="btn btn-success" onClick={this.updateExpense}>
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

export default UpdateExpenseComponent;