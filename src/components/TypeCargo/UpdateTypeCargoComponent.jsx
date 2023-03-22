import Alert from "react-bootstrap/Alert";
import React, { Component } from "react";
import TypeCargoService from "../../services/TypeCargoService";

class UpdateTypeCargoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      errors: null,
      nametypecargo: "",
    };

    //Handlers
    this.changeNameTypeCargoHandler =
      this.changeNameTypeCargoHandler.bind(this);

    //void
    this.updateTypeCargo = this.updateTypeCargo.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    TypeCargoService.getTypeCargoById(this.state.id).then((res) => {
      let typecargojson = res.data;
      this.setState({
        nametypecargo: typecargojson.nameTypeCargo,
      });
    });
  }

  //void Update TypeCargo
  updateTypeCargo = (e) => {
    e.preventDefault();
    let typecargojson = {
      id: this.state.id,
      nameTypeCargo: this.state.nametypecargo,
    };
    console.log("typecargojson => " + JSON.stringify(typecargojson));

    TypeCargoService.updateTypeCargo(typecargojson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/typecargos");
        window.location.reload();
      })
      .catch((error) => {
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeNameTypeCargoHandler = (event) => {
    this.setState({ nametypecargo: event.target.value });
  };

  cancel() {
    this.props.history.push("/typecargos");
    window.location.reload();
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <br></br>
              <h3 className="text-center">Редактирование Типы грузов</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Тип груза: </label>
                    <input
                      placeholder="Тип груза"
                      name="nametypecargo"
                      className="form-control"
                      value={this.state.nametypecargo}
                      onChange={this.changeNameTypeCargoHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.updateTypeCargo}
                  >
                    <i class="fa-solid fa-floppy-disk"></i> Сохранить
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    <i class="fa-solid fa-xmark"></i> Закрыть
                  </button>
                </form>

                <br></br>
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

export default UpdateTypeCargoComponent;
