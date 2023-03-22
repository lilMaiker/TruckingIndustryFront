import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import CargoService from "../../services/CargoService";
import Select from "react-select";
import TypeCargoService from "../../services/TypeCargoService";
import BidService from "../../services/BidService";

class UpdateCargoComponent extends Component {
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

    //Handlers
    this.changeNameCargoHandler = this.changeNameCargoHandler.bind(this);
    this.changeWeightCargoHandler = this.changeWeightCargoHandler.bind(this);

    //void
    this.updateCargo = this.updateCargo.bind(this);
  }

  //#region Handlers For Select

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

  //#endregion

  componentDidMount() {
    //TypeCargo
    TypeCargoService.getTypeCargos().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.nameTypeCargo,
      }));
      this.setState({ selectOptionsTypeCargo: options });
    });

    //Bid
    BidService.getBid().then((res) => {
      const options = res.data.map((d) => ({
        value: d.id,
        label: d.id,
      }));
      this.setState({ selectOptionsBid: options });
    });

    CargoService.getCargoById(this.state.id).then((res) => {
      let cargojson = res.data;
      this.setState({
        namecargo: cargojson.nameCargo,
        weightcargo: cargojson.weightCargo,
        oIdTypeCargo: cargojson.typeCargoId,
        oNameTypeCargo: cargojson.typeCargo.nameTypeCargo,
        oIdBid: cargojson.bidsId,
        oNameBid: cargojson.bidsId,
      });
    });}//void Update Cargo
  updateCargo = (e) => {
    e.preventDefault();
    let cargojson = {id: this.state.id,
      nameCargo: this.state.namecargo,
      weightCargo: this.state.weightcargo,
      typeCargoId: this.state.oIdTypeCargo,
      bidsId: this.state.oIdBid,
    };
    console.log("cargojson => " + JSON.stringify(cargojson));

    CargoService.updateCargo(cargojson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/cargo");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
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
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Груз</h3>
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
                        placeholder={<div>Выберите тип груза</div>}value={{
                          id: this.state.oIdTypeCargo,
                          label: this.state.oNameTypeCargo,
                        }}                        options={this.state.selectOptionsTypeCargo}
                        onChange={this.handleChangeTypeCargo.bind(this)}
                      />
                    </label>
                  </div>

                  <div className="form-group">
                    <label>
                      Выберите № заявки:
                      <Select
                        placeholder={<div>Выберите № заявки</div>}value={{
                          id: this.state.oIdBid,
                          label: this.state.oNameBid,
                        }}                        options={this.state.selectOptionsBid}
                        onChange={this.handleChangeBid.bind(this)}
                      />
                    </label>
                  </div>



                  <button className="btn btn-success" onClick={this.updateCargo}>
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

export default UpdateCargoComponent;