import Alert from "react-bootstrap/Alert";import React, { Component } from "react";
import CarService from "../../services/CarService";
import DatePicker from "react-widgets/DatePicker";

class UpdateCarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {

        id: this.props.match.params.id, 

        errors: null,
      brandtrailer: '',
      trailernumber: '',
      lastdatetechnicalinspection: new Date(),
      maxweight: Number,
      withopenside: false,
      withrefrigerator: false,
      withtent: false,
      withhydroboard: false,
      }

    //Handlers
    this.changeBrandTrailerHandler = this.changeBrandTrailerHandler.bind(this);
    this.changeTrailerNumberHandler = this.changeTrailerNumberHandler.bind(this);
    this.changeMaxWeightHandler = this.changeMaxWeightHandler.bind(this);
    this.changeWithOpenSideHandler = this.changeWithOpenSideHandler.bind(this);
    this.changeWithRefrigeratorHandler = this.changeWithRefrigeratorHandler.bind(this);
    this.changeWithTentHandler = this.changeWithTentHandler.bind(this);
    this.changeWithHydroboardHandler = this.changeWithHydroboardHandler.bind(this);

    //void
    this.updateCar = this.updateCar.bind(this);
  }

  //#region Handlers For Select

  //#endregion

  componentDidMount() {
    CarService.getCarById(this.state.id).then((res) => {
      let carjson = res.data;
      this.setState({
        brandtrailer: carjson.brandTrailer,
        trailernumber: carjson.trailerNumber,
        lastdatetechnicalinspection: new Date(carjson.lastDateTechnicalInspection),
        maxweight: carjson.maxWeight,
        withopenside: carjson.withOpenSide ? true : false,
        withrefrigerator: carjson.withRefrigerator ? true : false,
        withtent: carjson.withTent ? true : false,
        withhydroboard: carjson.withHydroboard ? true : false
      });

      console.log(this.state.brandtrailer);
    });}

    //void Update Car
  updateCar = (e) => {
    e.preventDefault();
    let carjson = {id: this.state.id,
      brandTrailer: this.state.brandtrailer,
      trailerNumber: this.state.trailernumber,
      lastDateTechnicalInspection: this.state.lastdatetechnicalinspection,
      maxWeight: this.state.maxweight,
      withOpenSide: this.state.withopenside,
      withRefrigerator: this.state.withrefrigerator,
      withTent: this.state.withtent,
      withHydroboard: this.state.withhydroboard,
    };
    console.log("carjson => " + JSON.stringify(carjson));

    CarService.updateCar(carjson)
      .then((response) => {
        this.setState({ statusCode: response.status });
        this.props.history.push("/car");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ errors: error.response.data.errors });
      });
  };

  changeBrandTrailerHandler = (event) => {
    this.setState({ brandtrailer: event.target.value });
  };

  changeTrailerNumberHandler = (event) => {
    this.setState({ trailernumber: event.target.value });
  };

  changeMaxWeightHandler = (event) => {
    this.setState({ maxweight: event.target.value });
  };

  changeWithOpenSideHandler = (event) => {
    this.setState({ withopenside: !this.state.withopenside });
  };

  changeWithRefrigeratorHandler = (event) => {
    this.setState({ withrefrigerator: !this.state.withrefrigerator });
  };

  changeWithTentHandler = (event) => {
    this.setState({ withtent: !this.state.withtent });
  };

  changeWithHydroboardHandler = (event) => {
    this.setState({ withhydroboard: !this.state.withhydroboard });
  };

  cancel() {
    this.props.history.push("/car");
    window.location.reload();
  }

  handleChangeLastDateTechnicalInspection = (lastdatetechnicalinspection) => {
    this.setState({
      lastdatetechnicalinspection,
    });
  };



  render() {
    const { lastdatetechnicalinspection } = this.state;

    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3"><br></br>
              <h3 className="text-center">Редактирование Транспорта</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Фирменный прицеп: </label>
                    <input
                      placeholder="Фирменный прицеп"
                      name="brandtrailer"
                      className="form-control"
                      value={this.state.brandtrailer}
                      onChange={this.changeBrandTrailerHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Номер трейлера: </label>
                    <input
                      placeholder="Номер трейлера"
                      name="trailernumber"
                      className="form-control"
                      value={this.state.trailernumber}
                      onChange={this.changeTrailerNumberHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Дата тех. обслуживания: </label>
                    <button></button>
                    <DatePicker
                        defaultValue={new Date()}
                        onChange={this.handleChangeLastDateTechnicalInspection}
                        value={lastdatetechnicalinspection}
                    />
                  </div>

                  <div className="form-group">
                    <label> Макс. вес, кг.: </label>
                    <input
                      placeholder="Макс. вес, кг."
                      name="maxweight"
                      className="form-control"
                      value={this.state.maxweight}
                      onChange={this.changeMaxWeightHandler}
                    />
                  </div>

                  <div className="form-group">
                  <label> Открытый борт:  </label>
                    <input
                      name="withopenside"
                      type="checkbox"
                      checked={this.state.withopenside}
                      onChange={this.changeWithOpenSideHandler}
                    /> 

                    <label> Холодильник:  </label>
                    <input
                      placeholder="Холодильник"
                      name="withrefrigerator"
                      type="checkbox"
                      checked={this.state.withrefrigerator}
                      onChange={this.changeWithRefrigeratorHandler}
                    /> 

                    <label> Тент:  </label>
                    <input
                      placeholder="Тент"
                      name="withtent"
                      type="checkbox"
                      checked={this.state.withtent}
                      onChange={this.changeWithTentHandler}
                    /> 
              

                  <label> Гидроборт:  </label>
                    <input
                      placeholder="Гидроборт"
                      name="withhydroboard"
                      type="checkbox"
                      checked={this.state.withhydroboard}
                      onChange={this.changeWithHydroboardHandler}
                    />
                  </div>



                  <button className="btn btn-success" onClick={this.updateCar}>
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

export default UpdateCarComponent;