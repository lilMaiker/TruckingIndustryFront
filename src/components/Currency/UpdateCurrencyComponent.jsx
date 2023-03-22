import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import CurrencyService from "../../services/CurrencyService";

class UpdateCurrencyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
id: this.props.match.params.id, errors: null,
      namecurrency: '',
      currencycode: '',
      }

    //Handlers
    this.changeNameCurrencyHandler = this.changeNameCurrencyHandler.bind(this);
    this.changeCurrencyCodeHandler = this.changeCurrencyCodeHandler.bind(this);

    //void
    this.updateCurrency = this.updateCurrency.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    CurrencyService.getCurrencyById(this.state.id).then((res) => {
      let currencyjson = res.data;
      this.setState({
        namecurrency: currencyjson.nameCurrency,
        currencycode: currencyjson.currencyCode,
      });
    });}//void Update Currency
  updateCurrency = (e) => {
    e.preventDefault();
    let currencyjson = {id: this.state.id,
      nameCurrency: this.state.namecurrency,
      currencyCode: this.state.currencycode,
    };
    console.log("currencyjson => " + JSON.stringify(currencyjson));

    CurrencyService.updateCurrency(currencyjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/currency");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeNameCurrencyHandler = (event) => {
    this.setState({ namecurrency: event.target.value });
  };

  changeCurrencyCodeHandler = (event) => {
    this.setState({ currencycode: event.target.value });
  };

  cancel() {
    this.props.history.push("/currency");
    window.location.reload();
  }



  render() {

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Валюты</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Название валюты: </label>
                    <input
                      placeholder="Название валюты"
                      name="namecurrency"
                      className="form-control"
                      value={this.state.namecurrency}
                      onChange={this.changeNameCurrencyHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Код валюты: </label>
                    <input
                      placeholder="Код валюты"
                      name="currencycode"
                      className="form-control"
                      value={this.state.currencycode}
                      onChange={this.changeCurrencyCodeHandler}
                    />
                  </div>



                  <button className="btn btn-success" onClick={this.updateCurrency}>
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

export default UpdateCurrencyComponent;