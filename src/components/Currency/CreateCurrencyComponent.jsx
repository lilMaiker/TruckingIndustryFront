import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import CurrencyService from "../../services/CurrencyService";

class CreateCurrencyComponent extends Component {
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
    this.saveCurrency = this.saveCurrency.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    }//void Save Currency
  saveCurrency = (e) => {
    e.preventDefault();
    let currencyjson = {
      namecurrency: this.state.namecurrency,
      currencycode: this.state.currencycode,
    };
    console.log("currencyjson => " + JSON.stringify(currencyjson));

    CurrencyService.createCurrency(currencyjson)
      .then((response) => {
        this.setState({ loading: false, statusCode: response.status });
        this.props.history.push("/currency");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false, errors: error.response.data.errors });
      });
  };

  changeNameCurrencyHandler = (event) => {
    this.setState({ namecurrency: event.target.value });
  };

  changeCurrencyCodeHandler = (event) => {
    const value = event.target.value;
    if (value.length <= 3) {
        this.setState({ currencycode: value });
    }
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
            <div className="card col-md-6 offset-md-3 offset-md-3">
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



                  <button className="btn btn-success" onClick={this.saveCurrency}>
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

export default CreateCurrencyComponent;