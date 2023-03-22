import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import CargoService from "../../services/CargoService";
import Select from "react-select";
import TypeCargoService from "../../services/TypeCargoService";
import BidService from "../../services/BidService";

class CreateCargoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectOptionsTypeCargo: [],
      oIdTypeCargo: "",
      oNameTypeCargo: "",

      selectOptionsBid: [],
      oIdBid: "",
      oNameBid: "",

      id: this.props.match.params.id, 
      errors: null,
      namecargo: '',
      weightcargo: Number,
    }

    this.changeNameCargoHandler = this.changeNameCargoHandler.bind(this);
    this.changeWeightCargoHandler = this.changeWeightCargoHandler.bind(this);
    this.saveCargo = this.saveCargo.bind(this);
  }

  handleChangeTypeCargo(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdTypeCargo: e.value, oNameTypeCargo: e.label });
  }

  handleChangeBid(e) {
    console.log(e.value);
    console.log(e.label);
    this.setState({ oIdBid: e.value, oNameBid: e.label });
  }

  componentDidMount() {
    TypeCargoService.getTypeCargos().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.nameTypeCargo,
      }));
      this.setState({ selectOptionsTypeCargo: options });
    });

    BidService.getBid().then((res) => {
      const options = res.data.data.map((d) => ({
        value: d.id,
        label: d.id,
      }));
      this.setState({ selectOptionsBid: options });
    });

    }



    saveCargo = (e) => {
        e.preventDefault();
        let cargojson = {
          nameCargo: this.state.namecargo,
          weightCargo: this.state.weightcargo,
          typeCargoId: this.state.oIdTypeCargo,
          bidsId: this.state.oIdBid,
        };
        console.log("cargojson => " + JSON.stringify(cargojson));
      
        CargoService.createCargo(cargojson)
          .then((response) => {
            this.setState({ loading: false, statusCode: response.status });
            this.props.history.push("/cargo");
            window.location.reload();
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
              this.setState({ loading: false, errors: error.response.data.errors });
            } else if (error.response && error.response.data && error.response.data) {
              this.setState({ loading: false, errors: error.response.data });
            } else {
              this.setState({ loading: false, errors: [error.message] });
            }
          });

          console.log(this.state.errors);
      };
      
  changeNameCargoHandler = (event) => {
    this.setState({ namecargo: event.target.value });
  };

  changeWeightCargoHandler = (event) => {
    this.setState({ weightcargo: event.target.value });
  };

  cancel() {
    this.props.history.push("/cargo");
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
                    <label> Название груза: </label>
                    <input
                      placeholder="Название груза"
                      name="namecargo"
                      className="form-control"
                      value={this.state.namecargo}
                      onChange={this.changeNameCargoHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Вес груза, кг.: </label>
                    <input
                      placeholder="Вес груза, кг."
                      name="weightcargo"
                      className="form-control"
                      value={this.state.weightcargo}
                      onChange={this.changeWeightCargoHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите тип груза:
                      <Select
                        placeholder={<div>Выберите тип груза</div>}
                        options={this.state.selectOptionsTypeCargo}
                        onChange={this.handleChangeTypeCargo.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите № заявки:
                      <Select
                        placeholder={<div>Выберите № заявки</div>}
                        options={this.state.selectOptionsBid}
                        onChange={this.handleChangeBid.bind(this)}
                      />
                    </label>
                  </div>

                  <button className="btn btn-success" onClick={this.saveCargo}>
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
                        Ошибка при добавлении груза.
                      </Alert.Heading>
                      {Object.keys(this.state.errors).map((key) => (
                        <p key={key}>{this.state.errors[key]}</p>
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

export default CreateCargoComponent;